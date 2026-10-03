package main

import (
	"archive/zip"
	"crypto/rand"
	_ "embed"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"sort"
	"strings"
	"sync"
	"time"
)

//go:embed admin.html
var adminHTML []byte

type Config struct {
	AdminUsername string
	AdminPassword string
	SessionSecret string
	ProjectPath   string
	WebsiteName   string
	Port          string
}

type AuditEntry struct {
	ID        string `json:"id"`
	Timestamp string `json:"timestamp"`
	TimeAgo   string `json:"timeAgo"`
	User      string `json:"user"`
	Action    string `json:"action"`
	Category  string `json:"category"`
	Target    string `json:"target"`
	Details   string `json:"details"`
	Status    string `json:"status"`
	IP        string `json:"ip"`
}

var (
	cfg         Config
	projectRoot string
	backendDir  string
	mu          sync.Mutex

	sessionMu sync.RWMutex
	sessions  = make(map[string]time.Time)

	// Logging & Activity Tracking
	loggerMu          sync.Mutex
	activeLogFile     *os.File
	activeLogDate     string
	activeLogFileName string
	activeLogRelPath  string

	// Audit Trail Mutex
	auditMu sync.Mutex
)

func main() {
	// 1. Resolve backend directory and load .env
	var err error
	backendDir, err = filepath.Abs(".")
	if err != nil {
		backendDir = "."
	}

	loadConfiguration()

	// Initialize file and console logging
	initLogger()

	logEvent("INFO", "=====================================================")
	logEvent("INFO", "Sukoon Saathi - Admin Studio (Protected Edition)")
	logEvent("INFO", "Target Website Name: %s", cfg.WebsiteName)
	logEvent("INFO", "Target Project Path: %s", projectRoot)
	logEvent("INFO", "Admin Login Username: %s", cfg.AdminUsername)
	logEvent("INFO", "Server Listening Address: http://localhost:%s", cfg.Port)
	logEvent("INFO", "Static website is NOT hosted here.")
	logEvent("INFO", "Real ZIP file backups stored in: %s", filepath.Join(backendDir, "backups"))
	logEvent("INFO", "Activity logs recorded in: %s", activeLogRelPath)
	logEvent("INFO", "Audit logs stored in: backend/logs/audit.json")
	logEvent("INFO", "=====================================================")

	// Ensure backups and logs directory exist
	_ = os.MkdirAll(filepath.Join(backendDir, "backups"), 0755)
	_ = os.MkdirAll(filepath.Join(backendDir, "logs"), 0755)

	mux := http.NewServeMux()

	// Public routes
	mux.HandleFunc("/", handleAdminUI)
	mux.HandleFunc("/api/login", handleLogin)
	mux.HandleFunc("/api/logout", handleLogout)
	mux.HandleFunc("/api/me", handleMe)

	// Image previews (read-only)
	productsDir := filepath.Join(projectRoot, "data", "products")
	pfpDir := filepath.Join(projectRoot, "data", "pfp")
	assetsDir := filepath.Join(projectRoot, "assets")
	mux.Handle("/data/products/", http.StripPrefix("/data/products/", http.FileServer(http.Dir(productsDir))))
	mux.Handle("/data/pfp/", http.StripPrefix("/data/pfp/", http.FileServer(http.Dir(pfpDir))))
	mux.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir(assetsDir))))

	// Protected API routes
	mux.HandleFunc("/api/status", requireAuth(handleStatus))
	mux.HandleFunc("/api/reset", requireAuth(handleReset))

	// Products
	mux.HandleFunc("/api/products", requireAuth(handleProducts))
	mux.HandleFunc("/api/upload", requireAuth(handleUpload))

	// Specialists
	mux.HandleFunc("/api/specialists", requireAuth(handleSpecialists))
	mux.HandleFunc("/api/upload-pfp", requireAuth(handleUploadPFP))

	// About
	mux.HandleFunc("/api/about", requireAuth(handleAbout))

	// ZIP Backups
	mux.HandleFunc("/api/backups", requireAuth(handleBackups))
	mux.HandleFunc("/api/backups/create", requireAuth(handleCreateBackup))
	mux.HandleFunc("/api/backups/download", requireAuth(handleDownloadBackup))
	mux.HandleFunc("/api/backups/restore", requireAuth(handleRestoreBackup))
	mux.HandleFunc("/api/backups/delete", requireAuth(handleDeleteBackup))

	// Deploy
	mux.HandleFunc("/api/deploy", requireAuth(handleDeploy))

	// Audit Logs API (for History page)
	mux.HandleFunc("/api/audit-logs", requireAuth(handleAuditLogs))
	mux.HandleFunc("/api/audit-logs/export", requireAuth(handleExportAuditLogs))

	// Raw Terminal Logs API (Optional downloads)
	mux.HandleFunc("/api/history/files", requireAuth(handleHistoryFiles))
	mux.HandleFunc("/api/history/view", requireAuth(handleHistoryView))
	mux.HandleFunc("/api/history/download", requireAuth(handleHistoryDownload))

	serverAddr := ":" + cfg.Port
	logEvent("INFO", "HTTP server started and ready to accept connections on %s", serverAddr)
	if err := http.ListenAndServe(serverAddr, loggingMiddleware(mux)); err != nil {
		logEvent("FATAL", "Server stopped: %v", err)
	}
}

// -------------------------------------------------------------
// Logging Engine (Logs every minor activity to console & file)
// -------------------------------------------------------------
func initLogger() {
	now := time.Now()
	activeLogDate = now.Format("2006-01-02")
	activeLogFileName = now.Format("15-04-05") + ".log"

	logDir := filepath.Join(backendDir, "logs", activeLogDate)
	if err := os.MkdirAll(logDir, 0755); err != nil {
		fmt.Printf("Error creating logs directory %s: %v\n", logDir, err)
	}

	fullLogPath := filepath.Join(logDir, activeLogFileName)
	f, err := os.OpenFile(fullLogPath, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0644)
	if err != nil {
		fmt.Printf("Error opening log file %s: %v\n", fullLogPath, err)
	} else {
		activeLogFile = f
	}

	activeLogRelPath = filepath.Join("backend", "logs", activeLogDate, activeLogFileName)
}

func logEvent(category, format string, args ...interface{}) {
	msg := fmt.Sprintf(format, args...)
	ts := time.Now().Format("2006-01-02 15:04:05")
	line := fmt.Sprintf("%s [%s] %s", ts, category, msg)

	loggerMu.Lock()
	defer loggerMu.Unlock()

	// Print clean text to terminal stdout (no emojis, no ANSI color codes)
	fmt.Println(line)

	// Persist directly to backend/logs/<date>/<time>.log
	if activeLogFile != nil {
		_, _ = fmt.Fprintln(activeLogFile, line)
		_ = activeLogFile.Sync()
	}
}

type loggingResponseWriter struct {
	http.ResponseWriter
	statusCode   int
	bytesWritten int
}

func (lrw *loggingResponseWriter) WriteHeader(code int) {
	lrw.statusCode = code
	lrw.ResponseWriter.WriteHeader(code)
}

func (lrw *loggingResponseWriter) Write(b []byte) (int, error) {
	n, err := lrw.ResponseWriter.Write(b)
	lrw.bytesWritten += n
	return n, err
}

func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		lrw := &loggingResponseWriter{ResponseWriter: w, statusCode: http.StatusOK}

		next.ServeHTTP(lrw, r)

		duration := time.Since(start)
		ip := getClientIP(r)

		// Log every minor activity of every request
		logEvent("HTTP", "%s %s - %d %s (client: %s, duration: %v, size: %d bytes)",
			r.Method, r.URL.Path, lrw.statusCode, http.StatusText(lrw.statusCode), ip, duration.Round(time.Microsecond), lrw.bytesWritten)
	})
}

// -------------------------------------------------------------
// Audit Log Engine (Tracks meaningful administrative events)
// -------------------------------------------------------------
func getClientIP(r *http.Request) string {
	if r == nil {
		return "127.0.0.1"
	}
	if fwd := r.Header.Get("X-Forwarded-For"); fwd != "" {
		parts := strings.Split(fwd, ",")
		return strings.TrimSpace(parts[0])
	}
	return r.RemoteAddr
}

func recordAudit(r *http.Request, action, category, target, details, status string) {
	auditMu.Lock()
	defer auditMu.Unlock()

	user := cfg.AdminUsername
	ip := getClientIP(r)

	now := time.Now()
	id := fmt.Sprintf("aud_%d", now.UnixNano())
	ts := now.Format("2006-01-02 15:04:05")

	entry := AuditEntry{
		ID:        id,
		Timestamp: ts,
		TimeAgo:   "just now",
		User:      user,
		Action:    action,
		Category:  category,
		Target:    target,
		Details:   details,
		Status:    status,
		IP:        ip,
	}

	auditDir := filepath.Join(backendDir, "logs")
	_ = os.MkdirAll(auditDir, 0755)
	auditFilePath := filepath.Join(auditDir, "audit.json")

	var entries []AuditEntry
	if data, err := os.ReadFile(auditFilePath); err == nil {
		_ = json.Unmarshal(data, &entries)
	}

	// Prepend newest entry to the top
	entries = append([]AuditEntry{entry}, entries...)

	// Keep last 3000 audit records
	if len(entries) > 3000 {
		entries = entries[:3000]
	}

	if formatted, err := json.MarshalIndent(entries, "", "  "); err == nil {
		_ = os.WriteFile(auditFilePath, formatted, 0644)
	}

	// Also log into terminal and active session file
	logEvent("AUDIT", "[%s] %s (target: %s, user: %s, ip: %s, status: %s)",
		action, details, target, user, ip, status)
}

func readAuditEntries() []AuditEntry {
	auditMu.Lock()
	defer auditMu.Unlock()

	auditFilePath := filepath.Join(backendDir, "logs", "audit.json")
	var entries []AuditEntry
	if data, err := os.ReadFile(auditFilePath); err == nil {
		_ = json.Unmarshal(data, &entries)
	}

	// Update TimeAgo dynamically
	for i := range entries {
		t, err := time.Parse("2006-01-02 15:04:05", entries[i].Timestamp)
		if err == nil {
			entries[i].TimeAgo = formatTimeAgo(t)
		}
	}
	return entries
}

// GET /api/audit-logs?category=...&search=...
func handleAuditLogs(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	entries := readAuditEntries()
	categoryFilter := strings.TrimSpace(r.URL.Query().Get("category"))
	searchFilter := strings.ToLower(strings.TrimSpace(r.URL.Query().Get("search")))

	var filtered []AuditEntry
	for _, e := range entries {
		if categoryFilter != "" && categoryFilter != "ALL" && !strings.EqualFold(e.Category, categoryFilter) {
			continue
		}
		if searchFilter != "" {
			fullText := strings.ToLower(fmt.Sprintf("%s %s %s %s %s %s", e.Action, e.Category, e.Target, e.Details, e.User, e.IP))
			if !strings.Contains(fullText, searchFilter) {
				continue
			}
		}
		filtered = append(filtered, e)
	}

	writeJSON(w, http.StatusOK, filtered)
}

// GET /api/audit-logs/export
func handleExportAuditLogs(w http.ResponseWriter, r *http.Request) {
	entries := readAuditEntries()
	w.Header().Set("Content-Type", "text/csv; charset=utf-8")
	w.Header().Set("Content-Disposition", fmt.Sprintf(`attachment; filename="audit-log-%s.csv"`, time.Now().Format("2006-01-02")))

	var sb strings.Builder
	sb.WriteString("Timestamp,User,Category,Action,Target,Status,IP,Details\n")
	for _, e := range entries {
		escapedDetails := strings.ReplaceAll(e.Details, `"`, `""`)
		sb.WriteString(fmt.Sprintf(`"%s","%s","%s","%s","%s","%s","%s","%s"`+"\n",
			e.Timestamp, e.User, e.Category, e.Action, e.Target, e.Status, e.IP, escapedDetails))
	}
	w.Write([]byte(sb.String()))
}

// -------------------------------------------------------------
// Configuration & .env loader
// -------------------------------------------------------------
func loadConfiguration() {
	envFiles := []string{".env", "backend/.env", "../backend/.env"}
	envMap := make(map[string]string)

	for _, file := range envFiles {
		if data, err := os.ReadFile(file); err == nil {
			lines := strings.Split(string(data), "\n")
			for _, line := range lines {
				line = strings.TrimSpace(line)
				if line == "" || strings.HasPrefix(line, "#") {
					continue
				}
				parts := strings.SplitN(line, "=", 2)
				if len(parts) == 2 {
					key := strings.TrimSpace(parts[0])
					val := strings.TrimSpace(parts[1])
					val = strings.Trim(val, `"'`)
					envMap[key] = val
				}
			}
			break
		}
	}

	getVal := func(key, fallback string) string {
		if v := os.Getenv(key); v != "" {
			return v
		}
		if v, ok := envMap[key]; ok && v != "" {
			return v
		}
		return fallback
	}

	cfg = Config{
		AdminUsername: getVal("ADMIN_USERNAME", "admin"),
		AdminPassword: getVal("ADMIN_PASSWORD", "sukoonadmin"),
		SessionSecret: getVal("SESSION_SECRET", "sukoon-secret-2026"),
		ProjectPath:   getVal("PROJECT_PATH", ".."),
		WebsiteName:   getVal("WEBSITE_NAME", "Sukoon Saathi Static Website"),
		Port:          getVal("PORT", "8080"),
	}

	// Resolve projectRoot
	if filepath.IsAbs(cfg.ProjectPath) {
		projectRoot = filepath.Clean(cfg.ProjectPath)
	} else {
		projectRoot, _ = filepath.Abs(filepath.Join(backendDir, cfg.ProjectPath))
	}

	// Verify data folder exists in projectRoot
	dataDir := filepath.Join(projectRoot, "data")
	if _, err := os.Stat(dataDir); os.IsNotExist(err) {
		if _, err2 := os.Stat("data"); err2 == nil {
			projectRoot, _ = filepath.Abs(".")
		} else if _, err3 := os.Stat("../data"); err3 == nil {
			projectRoot, _ = filepath.Abs("..")
		}
	}
}

// -------------------------------------------------------------
// Authentication
// -------------------------------------------------------------
func generateToken() string {
	b := make([]byte, 24)
	_, _ = rand.Read(b)
	return hex.EncodeToString(b)
}

func handleLogin(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		logEvent("WARN", "Invalid login request payload from %s: %v", r.RemoteAddr, err)
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
		return
	}

	logEvent("AUTH", "Login attempt received for username: '%s' from %s", req.Username, r.RemoteAddr)

	if req.Username != cfg.AdminUsername || req.Password != cfg.AdminPassword {
		time.Sleep(300 * time.Millisecond) // Thwart brute force
		logEvent("WARN", "Login failed: invalid credentials for username: '%s' from %s", req.Username, r.RemoteAddr)
		recordAudit(r, "LOGIN_FAILED", "AUTH", "Session", fmt.Sprintf("Failed login attempt with username '%s'", req.Username), "FAILED")
		writeJSON(w, http.StatusUnauthorized, map[string]string{"error": "Invalid username or password"})
		return
	}

	token := generateToken()
	sessionMu.Lock()
	sessions[token] = time.Now().Add(24 * time.Hour)
	sessionMu.Unlock()

	logEvent("AUTH", "Login successful for username: '%s' from %s (session token issued)", cfg.AdminUsername, r.RemoteAddr)
	recordAudit(r, "LOGIN_SUCCESS", "AUTH", "Session", fmt.Sprintf("Admin user '%s' logged in successfully", cfg.AdminUsername), "SUCCESS")

	http.SetCookie(w, &http.Cookie{
		Name:     "sukoon_admin_session",
		Value:    token,
		Path:     "/",
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
		MaxAge:   86400,
	})

	writeJSON(w, http.StatusOK, map[string]interface{}{
		"success":  true,
		"username": cfg.AdminUsername,
		"token":    token,
	})
}

func handleLogout(w http.ResponseWriter, r *http.Request) {
	if cookie, err := r.Cookie("sukoon_admin_session"); err == nil {
		sessionMu.Lock()
		delete(sessions, cookie.Value)
		sessionMu.Unlock()
		logEvent("AUTH", "Session terminated for logout from %s", r.RemoteAddr)
		recordAudit(r, "LOGOUT", "AUTH", "Session", fmt.Sprintf("Admin user '%s' logged out", cfg.AdminUsername), "SUCCESS")
	} else {
		logEvent("AUTH", "Logout requested with no active cookie from %s", r.RemoteAddr)
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "sukoon_admin_session",
		Value:    "",
		Path:     "/",
		HttpOnly: true,
		MaxAge:   -1,
	})

	writeJSON(w, http.StatusOK, map[string]bool{"success": true})
}

func handleMe(w http.ResponseWriter, r *http.Request) {
	authenticated := isAuthenticated(r)
	writeJSON(w, http.StatusOK, map[string]interface{}{
		"authenticated": authenticated,
		"username":      cfg.AdminUsername,
		"websiteName":   cfg.WebsiteName,
		"projectPath":   projectRoot,
	})
}

func isAuthenticated(r *http.Request) bool {
	cookie, err := r.Cookie("sukoon_admin_session")
	if err != nil {
		authHeader := r.Header.Get("Authorization")
		if strings.HasPrefix(authHeader, "Bearer ") {
			cookie = &http.Cookie{Value: strings.TrimPrefix(authHeader, "Bearer ")}
		} else {
			return false
		}
	}

	sessionMu.RLock()
	expiry, exists := sessions[cookie.Value]
	sessionMu.RUnlock()

	if !exists || time.Now().After(expiry) {
		return false
	}
	return true
}

func requireAuth(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if !isAuthenticated(r) {
			logEvent("WARN", "Unauthorized access blocked: %s %s from %s", r.Method, r.URL.Path, r.RemoteAddr)
			writeJSON(w, http.StatusUnauthorized, map[string]string{
				"error": "Unauthorized. Please log in to access the Admin Studio.",
			})
			return
		}
		next(w, r)
	}
}

// Serve embedded Dark UI
func handleAdminUI(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Write(adminHTML)
}

// -------------------------------------------------------------
// Status & Git Info
// -------------------------------------------------------------
func handleStatus(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	mu.Lock()
	defer mu.Unlock()

	branch := runGit(projectRoot, "rev-parse", "--abbrev-ref", "HEAD")
	remote := runGit(projectRoot, "config", "--get", "remote.origin.url")
	statusOutput := runGit(projectRoot, "status", "--porcelain", "data/")
	lastCommit := runGit(projectRoot, "log", "-1", "--format=%h - %s (%cr)")

	lines := strings.Split(strings.TrimSpace(statusOutput), "\n")
	changeCount := 0
	for _, l := range lines {
		if strings.TrimSpace(l) != "" {
			changeCount++
		}
	}

	writeJSON(w, http.StatusOK, map[string]interface{}{
		"branch":       strings.TrimSpace(branch),
		"remote":       strings.TrimSpace(remote),
		"hasChanges":   changeCount > 0,
		"changeCount":  changeCount,
		"statusOutput": statusOutput,
		"lastCommit":   strings.TrimSpace(lastCommit),
		"projectPath":  projectRoot,
		"websiteName":  cfg.WebsiteName,
	})
}

// -------------------------------------------------------------
// ZIP Backups Engine (NO direct git tag manipulation)
// -------------------------------------------------------------
func createZipArchive(srcDir, destZipPath string) (int, error) {
	logEvent("BACKUP", "Initiating ZIP creation from source directory: %s", srcDir)
	zipFile, err := os.Create(destZipPath)
	if err != nil {
		logEvent("ERROR", "Failed to create destination zip file %s: %v", destZipPath, err)
		return 0, err
	}
	defer zipFile.Close()

	archive := zip.NewWriter(zipFile)
	defer archive.Close()

	fileCount := 0

	err = filepath.Walk(srcDir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if info.IsDir() {
			return nil
		}

		relPath, err := filepath.Rel(srcDir, path)
		if err != nil {
			return err
		}

		header, err := zip.FileInfoHeader(info)
		if err != nil {
			return err
		}

		header.Name = filepath.ToSlash(relPath)
		header.Method = zip.Deflate

		writer, err := archive.CreateHeader(header)
		if err != nil {
			return err
		}

		file, err := os.Open(path)
		if err != nil {
			return err
		}
		defer file.Close()

		_, err = io.Copy(writer, file)
		if err == nil {
			fileCount++
		}
		return err
	})

	logEvent("BACKUP", "Finished ZIP creation: archived %d files into %s", fileCount, destZipPath)
	return fileCount, err
}

func extractZipArchive(zipPath, targetDir string) error {
	logEvent("BACKUP", "Extracting ZIP archive: %s into %s", zipPath, targetDir)
	reader, err := zip.OpenReader(zipPath)
	if err != nil {
		logEvent("ERROR", "Failed to open ZIP reader for %s: %v", zipPath, err)
		return err
	}
	defer reader.Close()

	extractedCount := 0
	for _, f := range reader.File {
		cleanName := filepath.Clean(f.Name)
		if strings.HasPrefix(cleanName, "..") || strings.HasPrefix(cleanName, "/") {
			logEvent("WARN", "Skipping potentially insecure zip entry: %s", f.Name)
			continue // Zip Slip protection
		}

		destPath := filepath.Join(targetDir, cleanName)
		if f.FileInfo().IsDir() {
			_ = os.MkdirAll(destPath, 0755)
			continue
		}

		_ = os.MkdirAll(filepath.Dir(destPath), 0755)
		dstFile, err := os.OpenFile(destPath, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, f.Mode())
		if err != nil {
			logEvent("ERROR", "Failed to open destination file for extraction %s: %v", destPath, err)
			return err
		}

		srcFile, err := f.Open()
		if err != nil {
			dstFile.Close()
			return err
		}

		_, err = io.Copy(dstFile, srcFile)
		srcFile.Close()
		dstFile.Close()
		if err != nil {
			logEvent("ERROR", "Failed copying zip content to %s: %v", destPath, err)
			return err
		}
		extractedCount++
	}
	logEvent("BACKUP", "Successfully extracted %d entries from %s", extractedCount, zipPath)
	return nil
}

// GET /api/backups - List all zip backup files
func handleBackups(w http.ResponseWriter, r *http.Request) {
	backupsDir := filepath.Join(backendDir, "backups")
	entries, err := os.ReadDir(backupsDir)
	if err != nil {
		logEvent("WARN", "Could not read backups folder: %v", err)
		writeJSON(w, http.StatusOK, []interface{}{})
		return
	}

	type BackupItem struct {
		Filename  string `json:"filename"`
		SizeStr   string `json:"sizeStr"`
		SizeBytes int64  `json:"sizeBytes"`
		ModTime   string `json:"modTime"`
		TimeAgo   string `json:"timeAgo"`
	}

	var list []BackupItem
	for _, e := range entries {
		if !e.IsDir() && strings.HasSuffix(e.Name(), ".zip") {
			info, err := e.Info()
			if err != nil {
				continue
			}

			sizeKB := float64(info.Size()) / 1024
			sizeStr := fmt.Sprintf("%.1f KB", sizeKB)
			if sizeKB > 1024 {
				sizeStr = fmt.Sprintf("%.2f MB", sizeKB/1024)
			}

			list = append(list, BackupItem{
				Filename:  e.Name(),
				SizeStr:   sizeStr,
				SizeBytes: info.Size(),
				ModTime:   info.ModTime().Format("2006-01-02 15:04:05"),
				TimeAgo:   formatTimeAgo(info.ModTime()),
			})
		}
	}

	// Sort newest first
	sort.Slice(list, func(i, j int) bool {
		return list[i].ModTime > list[j].ModTime
	})

	writeJSON(w, http.StatusOK, list)
}

// POST /api/backups/create - Manual on-demand ZIP backup
func handleCreateBackup(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	mu.Lock()
	defer mu.Unlock()

	dataDir := filepath.Join(projectRoot, "data")
	timestamp := time.Now().Format("2006-01-02_15-04-05")
	filename := fmt.Sprintf("backup-manual_%s.zip", timestamp)
	zipPath := filepath.Join(backendDir, "backups", filename)

	count, err := createZipArchive(dataDir, zipPath)
	if err != nil {
		logEvent("ERROR", "Manual backup creation failed: %v", err)
		recordAudit(r, "BACKUP_FAILED", "BACKUPS", filename, "Failed to create manual backup: "+err.Error(), "FAILED")
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to create ZIP: " + err.Error()})
		return
	}

	recordAudit(r, "BACKUP_CREATE", "BACKUPS", filename, fmt.Sprintf("Created manual backup archive (%d files)", count), "SUCCESS")

	writeJSON(w, http.StatusOK, map[string]interface{}{
		"success":   true,
		"filename":  filename,
		"fileCount": count,
		"message":   fmt.Sprintf("Created backup %s with %d files", filename, count),
	})
}

// GET /api/backups/download?file=...
func handleDownloadBackup(w http.ResponseWriter, r *http.Request) {
	filename := filepath.Base(r.URL.Query().Get("file"))
	if filename == "" || !strings.HasSuffix(filename, ".zip") {
		logEvent("WARN", "Invalid backup download request: %s from %s", r.URL.Query().Get("file"), r.RemoteAddr)
		http.Error(w, "Invalid filename", http.StatusBadRequest)
		return
	}

	zipPath := filepath.Join(backendDir, "backups", filename)
	if _, err := os.Stat(zipPath); os.IsNotExist(err) {
		logEvent("WARN", "Requested backup file not found: %s", filename)
		http.Error(w, "Backup file not found", http.StatusNotFound)
		return
	}

	logEvent("BACKUP", "Serving backup download: %s to %s", filename, r.RemoteAddr)
	recordAudit(r, "BACKUP_DOWNLOAD", "BACKUPS", filename, fmt.Sprintf("Downloaded backup archive %s", filename), "SUCCESS")
	w.Header().Set("Content-Type", "application/zip")
	w.Header().Set("Content-Disposition", fmt.Sprintf(`attachment; filename="%s"`, filename))
	http.ServeFile(w, r, zipPath)
}

// POST /api/backups/restore
func handleRestoreBackup(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	mu.Lock()
	defer mu.Unlock()

	var req struct {
		Filename string `json:"filename"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil || req.Filename == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "filename is required"})
		return
	}

	cleanFilename := filepath.Base(req.Filename)
	zipPath := filepath.Join(backendDir, "backups", cleanFilename)
	if _, err := os.Stat(zipPath); os.IsNotExist(err) {
		logEvent("WARN", "Restore target file not found: %s", cleanFilename)
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "Backup file not found"})
		return
	}

	// 1. Create a pre-restore safety backup of current state
	dataDir := filepath.Join(projectRoot, "data")
	safetyName := fmt.Sprintf("backup-pre-restore_%s.zip", time.Now().Format("2006-01-02_15-04-05"))
	safetyPath := filepath.Join(backendDir, "backups", safetyName)
	logEvent("BACKUP", "Creating safety pre-restore backup %s before unpacking %s", safetyName, cleanFilename)
	_, _ = createZipArchive(dataDir, safetyPath)

	// 2. Extract selected ZIP over data/
	if err := extractZipArchive(zipPath, dataDir); err != nil {
		logEvent("ERROR", "Extraction failed during restore from %s: %v", cleanFilename, err)
		recordAudit(r, "RESTORE_FAILED", "BACKUPS", cleanFilename, "Failed to restore backup: "+err.Error(), "FAILED")
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to extract ZIP: " + err.Error()})
		return
	}

	recordAudit(r, "BACKUP_RESTORE", "BACKUPS", cleanFilename, fmt.Sprintf("Restored all data from %s (safety copy: %s)", cleanFilename, safetyName), "SUCCESS")

	writeJSON(w, http.StatusOK, map[string]interface{}{
		"success": true,
		"message": fmt.Sprintf("Data restored from %s successfully! Safety copy saved as %s.", cleanFilename, safetyName),
	})
}

// DELETE /api/backups/delete?file=...
func handleDeleteBackup(w http.ResponseWriter, r *http.Request) {
	filename := filepath.Base(r.URL.Query().Get("file"))
	if filename == "" || !strings.HasSuffix(filename, ".zip") {
		http.Error(w, "Invalid filename", http.StatusBadRequest)
		return
	}

	zipPath := filepath.Join(backendDir, "backups", filename)
	if err := os.Remove(zipPath); err != nil {
		logEvent("ERROR", "Failed to delete backup file %s: %v", filename, err)
		recordAudit(r, "BACKUP_DELETE_FAILED", "BACKUPS", filename, "Failed to delete backup: "+err.Error(), "FAILED")
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to delete: " + err.Error()})
		return
	}

	recordAudit(r, "BACKUP_DELETE", "BACKUPS", filename, fmt.Sprintf("Permanently deleted backup archive %s", filename), "SUCCESS")
	writeJSON(w, http.StatusOK, map[string]bool{"success": true})
}

// -------------------------------------------------------------
// Reset Changes (Using ZIP for safety, then git checkout on data files)
// -------------------------------------------------------------
func handleReset(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	mu.Lock()
	defer mu.Unlock()

	// 1. Always create a ZIP backup before resetting!
	dataDir := filepath.Join(projectRoot, "data")
	safetyName := fmt.Sprintf("backup-pre-reset_%s.zip", time.Now().Format("2006-01-02_15-04-05"))
	safetyPath := filepath.Join(backendDir, "backups", safetyName)
	_, _ = createZipArchive(dataDir, safetyPath)

	// 2. Revert tracked data files cleanly
	out, err := execGit(projectRoot, "checkout", "HEAD", "--", "data/products.json", "data/specialists.json", "data/about.json")
	if err != nil {
		logEvent("ERROR", "Git checkout failed during reset: %s (%v)", out, err)
		recordAudit(r, "RESET_FAILED", "RESET", "data/", "Reset failed: "+out, "FAILED")
		writeJSON(w, http.StatusInternalServerError, map[string]interface{}{
			"success": false,
			"error":   "Git checkout failed: " + out,
		})
		return
	}

	recordAudit(r, "RESET_CHANGES", "RESET", "data/", fmt.Sprintf("Reverted uncommitted data to Git HEAD (safety backup: %s)", safetyName), "SUCCESS")

	writeJSON(w, http.StatusOK, map[string]interface{}{
		"success": true,
		"message": "All data changes reset to latest Git commit. A safety ZIP backup was created.",
		"backup":  safetyName,
	})
}

// -------------------------------------------------------------
// Deploy with Automatic ZIP Backup (NO Git tags)
// -------------------------------------------------------------
func handleDeploy(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	mu.Lock()
	defer mu.Unlock()

	var payload struct {
		CommitMessage string `json:"commitMessage"`
	}
	_ = json.NewDecoder(r.Body).Decode(&payload)

	timestamp := time.Now().Format("2006-01-02 15:04:05")
	commitMsg := strings.TrimSpace(payload.CommitMessage)
	if commitMsg == "" {
		commitMsg = fmt.Sprintf("Update catalog via Admin Studio (%s)", timestamp)
	}

	logEvent("DEPLOY", "Deploy requested by %s with commit message: '%s'", r.RemoteAddr, commitMsg)

	var logLines []string
	appendLog := func(msg string) {
		logLines = append(logLines, msg)
		logEvent("DEPLOY", "%s", msg)
	}

	appendLog("Starting deploy process...")

	// 1. ALWAYS CREATE A ZIP BACKUP FIRST
	dataDir := filepath.Join(projectRoot, "data")
	backupName := fmt.Sprintf("backup-pre-deploy_%s.zip", time.Now().Format("2006-01-02_15-04-05"))
	backupPath := filepath.Join(backendDir, "backups", backupName)
	count, zipErr := createZipArchive(dataDir, backupPath)
	if zipErr == nil {
		appendLog(fmt.Sprintf("Created safety ZIP archive: %s (%d files)", backupName, count))
	} else {
		appendLog("ZIP backup warning: " + zipErr.Error())
	}

	// 2. Stage updated files in data/
	addOutput, err := execGit(projectRoot, "add", "data/products.json", "data/specialists.json", "data/about.json", "data/products/", "data/pfp/")
	if err != nil {
		appendLog("git add failed: " + addOutput)
		recordAudit(r, "DEPLOY_FAILED", "DEPLOY", "origin", "git add failed: "+addOutput, "FAILED")
		writeJSON(w, http.StatusInternalServerError, map[string]interface{}{
			"success": false,
			"error":   "Failed to stage changes",
			"log":     strings.Join(logLines, "\n"),
		})
		return
	}
	appendLog("Staged data/ files and uploaded images")

	// 3. Check if there are staged differences
	_, diffErr := execGit(projectRoot, "diff", "--cached", "--quiet")
	if diffErr == nil {
		appendLog("No new changes detected. GitHub repository is already up to date.")
		recordAudit(r, "DEPLOY_CHECK", "DEPLOY", "origin", "Deploy checked: repository already up to date", "SUCCESS")
		writeJSON(w, http.StatusOK, map[string]interface{}{
			"success": true,
			"message": "No new changes detected. GitHub is already up to date.",
			"backup":  backupName,
			"log":     strings.Join(logLines, "\n"),
		})
		return
	}

	// 4. Commit
	commitOutput, err := execGit(projectRoot, "commit", "-m", commitMsg)
	if err != nil {
		appendLog("git commit failed: " + commitOutput)
		recordAudit(r, "DEPLOY_FAILED", "DEPLOY", "origin", "git commit failed: "+commitOutput, "FAILED")
		writeJSON(w, http.StatusInternalServerError, map[string]interface{}{
			"success": false,
			"error":   "Failed to commit changes",
			"log":     strings.Join(logLines, "\n"),
		})
		return
	}
	appendLog("Committed: " + strings.TrimSpace(commitOutput))

	// 5. Determine current branch
	branch := strings.TrimSpace(runGit(projectRoot, "rev-parse", "--abbrev-ref", "HEAD"))
	if branch == "" {
		branch = "main"
	}
	appendLog(fmt.Sprintf("Current branch: %s", branch))

	// 6. Push to origin
	appendLog(fmt.Sprintf("Pushing to origin %s (commit push, zero tags)...", branch))
	pushOutput, err := execGit(projectRoot, "push", "origin", branch)
	if err != nil {
		appendLog("git push failed: " + pushOutput)
		recordAudit(r, "DEPLOY_FAILED", "DEPLOY", branch, "git push failed: "+pushOutput, "FAILED")
		writeJSON(w, http.StatusInternalServerError, map[string]interface{}{
			"success": false,
			"error":   "Failed to push to GitHub. Verify credentials.",
			"log":     strings.Join(logLines, "\n"),
		})
		return
	}

	appendLog("Push output: " + strings.TrimSpace(pushOutput))
	appendLog("Deploy completed successfully!")

	recordAudit(r, "DEPLOY_SUCCESS", "DEPLOY", branch, fmt.Sprintf("Pushed changes to GitHub origin/%s. Commit: '%s'. Pre-deploy ZIP: '%s'", branch, commitMsg, backupName), "SUCCESS")

	writeJSON(w, http.StatusOK, map[string]interface{}{
		"success": true,
		"message": "Catalog changes pushed to GitHub successfully!",
		"backup":  backupName,
		"log":     strings.Join(logLines, "\n"),
	})
}

// -------------------------------------------------------------
// Products API
// -------------------------------------------------------------
func handleProducts(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		getProducts(w, r)
	case http.MethodPost:
		createProduct(w, r)
	case http.MethodPut:
		updateProduct(w, r)
	case http.MethodDelete:
		deleteProduct(w, r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func readProductsFile() ([]map[string]interface{}, error) {
	path := filepath.Join(projectRoot, "data", "products.json")
	data, err := os.ReadFile(path)
	if err != nil {
		logEvent("ERROR", "Failed to read products file from %s: %v", path, err)
		return nil, err
	}
	var products []map[string]interface{}
	if err := json.Unmarshal(data, &products); err != nil {
		logEvent("ERROR", "Failed to parse products json from %s: %v", path, err)
		return nil, err
	}
	return products, nil
}

func writeProductsFile(products []map[string]interface{}) error {
	path := filepath.Join(projectRoot, "data", "products.json")
	formatted, err := json.MarshalIndent(products, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(path, formatted, 0644)
}

func getProducts(w http.ResponseWriter, r *http.Request) {
	mu.Lock()
	defer mu.Unlock()

	products, err := readProductsFile()
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to read products: " + err.Error()})
		return
	}
	writeJSON(w, http.StatusOK, products)
}

func createProduct(w http.ResponseWriter, r *http.Request) {
	mu.Lock()
	defer mu.Unlock()

	var newProd map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&newProd); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid JSON: " + err.Error()})
		return
	}

	id, _ := newProd["id"].(string)
	if strings.TrimSpace(id) == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Product id is required"})
		return
	}

	products, err := readProductsFile()
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to read products"})
		return
	}

	for _, p := range products {
		if p["id"] == id {
			logEvent("WARN", "Product creation rejected: ID '%s' already exists", id)
			writeJSON(w, http.StatusConflict, map[string]string{"error": fmt.Sprintf("ID '%s' already exists", id)})
			return
		}
	}

	products = append(products, newProd)
	if err := writeProductsFile(products); err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to save products"})
		return
	}

	recordAudit(r, "PRODUCT_CREATE", "PRODUCTS", id, fmt.Sprintf("Created product '%s' (Price: INR %v, MRP: INR %v)", newProd["title"], newProd["price"], newProd["mrp"]), "SUCCESS")

	writeJSON(w, http.StatusCreated, map[string]interface{}{
		"success": true,
		"message": "Product created",
		"product": newProd,
	})
}

func updateProduct(w http.ResponseWriter, r *http.Request) {
	mu.Lock()
	defer mu.Unlock()

	var updatedProd map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&updatedProd); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid JSON: " + err.Error()})
		return
	}

	id, _ := updatedProd["id"].(string)
	if strings.TrimSpace(id) == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Product id is required"})
		return
	}

	products, err := readProductsFile()
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to read products"})
		return
	}

	found := false
	for i, p := range products {
		if p["id"] == id {
			products[i] = updatedProd
			found = true
			break
		}
	}

	if !found {
		logEvent("WARN", "Product update rejected: ID '%s' not found", id)
		writeJSON(w, http.StatusNotFound, map[string]string{"error": fmt.Sprintf("ID '%s' not found", id)})
		return
	}

	if err := writeProductsFile(products); err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to save products"})
		return
	}

	recordAudit(r, "PRODUCT_UPDATE", "PRODUCTS", id, fmt.Sprintf("Updated product '%s' (Price: INR %v, InStock: %v)", updatedProd["title"], updatedProd["price"], updatedProd["inStock"]), "SUCCESS")

	writeJSON(w, http.StatusOK, map[string]interface{}{
		"success": true,
		"message": "Product updated",
		"product": updatedProd,
	})
}

func deleteProduct(w http.ResponseWriter, r *http.Request) {
	mu.Lock()
	defer mu.Unlock()

	id := r.URL.Query().Get("id")
	if strings.TrimSpace(id) == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "id parameter required"})
		return
	}

	products, err := readProductsFile()
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to read products"})
		return
	}

	var newProducts []map[string]interface{}
	found := false
	for _, p := range products {
		if p["id"] == id {
			found = true
			continue
		}
		newProducts = append(newProducts, p)
	}

	if !found {
		logEvent("WARN", "Product delete rejected: ID '%s' not found", id)
		writeJSON(w, http.StatusNotFound, map[string]string{"error": fmt.Sprintf("ID '%s' not found", id)})
		return
	}

	if err := writeProductsFile(newProducts); err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to save products"})
		return
	}

	recordAudit(r, "PRODUCT_DELETE", "PRODUCTS", id, fmt.Sprintf("Deleted product with ID '%s'", id), "SUCCESS")

	writeJSON(w, http.StatusOK, map[string]interface{}{
		"success": true,
		"message": fmt.Sprintf("Deleted product '%s'", id),
	})
}

// -------------------------------------------------------------
// Specialists API
// -------------------------------------------------------------
func handleSpecialists(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		getSpecialists(w, r)
	case http.MethodPost:
		createSpecialist(w, r)
	case http.MethodPut:
		updateSpecialist(w, r)
	case http.MethodDelete:
		deleteSpecialist(w, r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func readSpecialistsFile() ([]map[string]interface{}, error) {
	path := filepath.Join(projectRoot, "data", "specialists.json")
	data, err := os.ReadFile(path)
	if err != nil {
		logEvent("ERROR", "Failed to read specialists file %s: %v", path, err)
		return nil, err
	}
	var specs []map[string]interface{}
	if err := json.Unmarshal(data, &specs); err != nil {
		logEvent("ERROR", "Failed to parse specialists json from %s: %v", path, err)
		return nil, err
	}
	return specs, nil
}

func writeSpecialistsFile(specs []map[string]interface{}) error {
	path := filepath.Join(projectRoot, "data", "specialists.json")
	formatted, err := json.MarshalIndent(specs, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(path, formatted, 0644)
}

func getSpecialists(w http.ResponseWriter, r *http.Request) {
	mu.Lock()
	defer mu.Unlock()

	specs, err := readSpecialistsFile()
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to read specialists: " + err.Error()})
		return
	}
	writeJSON(w, http.StatusOK, specs)
}

func createSpecialist(w http.ResponseWriter, r *http.Request) {
	mu.Lock()
	defer mu.Unlock()

	var newSpec map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&newSpec); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid JSON: " + err.Error()})
		return
	}

	id, _ := newSpec["id"].(string)
	if strings.TrimSpace(id) == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Specialist id is required"})
		return
	}

	specs, err := readSpecialistsFile()
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to read specialists"})
		return
	}

	for _, s := range specs {
		if s["id"] == id {
			logEvent("WARN", "Specialist creation rejected: ID '%s' already exists", id)
			writeJSON(w, http.StatusConflict, map[string]string{"error": fmt.Sprintf("ID '%s' already exists", id)})
			return
		}
	}

	specs = append(specs, newSpec)
	if err := writeSpecialistsFile(specs); err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to save specialists"})
		return
	}

	recordAudit(r, "SPECIALIST_CREATE", "SPECIALISTS", id, fmt.Sprintf("Added care specialist '%s' (%s, %s)", newSpec["name"], newSpec["role"], newSpec["registration"]), "SUCCESS")

	writeJSON(w, http.StatusCreated, map[string]interface{}{
		"success":    true,
		"message":    "Specialist added",
		"specialist": newSpec,
	})
}

func updateSpecialist(w http.ResponseWriter, r *http.Request) {
	mu.Lock()
	defer mu.Unlock()

	var updatedSpec map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&updatedSpec); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid JSON: " + err.Error()})
		return
	}

	id, _ := updatedSpec["id"].(string)
	if strings.TrimSpace(id) == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Specialist id is required"})
		return
	}

	specs, err := readSpecialistsFile()
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to read specialists"})
		return
	}

	found := false
	for i, s := range specs {
		if s["id"] == id {
			specs[i] = updatedSpec
			found = true
			break
		}
	}

	if !found {
		logEvent("WARN", "Specialist update rejected: ID '%s' not found", id)
		writeJSON(w, http.StatusNotFound, map[string]string{"error": fmt.Sprintf("ID '%s' not found", id)})
		return
	}

	if err := writeSpecialistsFile(specs); err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to save specialists"})
		return
	}

	recordAudit(r, "SPECIALIST_UPDATE", "SPECIALISTS", id, fmt.Sprintf("Updated care specialist '%s' (%s)", updatedSpec["name"], updatedSpec["role"]), "SUCCESS")

	writeJSON(w, http.StatusOK, map[string]interface{}{
		"success":    true,
		"message":    "Specialist updated",
		"specialist": updatedSpec,
	})
}

func deleteSpecialist(w http.ResponseWriter, r *http.Request) {
	mu.Lock()
	defer mu.Unlock()

	id := r.URL.Query().Get("id")
	if strings.TrimSpace(id) == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "id parameter required"})
		return
	}

	specs, err := readSpecialistsFile()
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to read specialists"})
		return
	}

	var newSpecs []map[string]interface{}
	found := false
	for _, s := range specs {
		if s["id"] == id {
			found = true
			continue
		}
		newSpecs = append(newSpecs, s)
	}

	if !found {
		logEvent("WARN", "Specialist delete rejected: ID '%s' not found", id)
		writeJSON(w, http.StatusNotFound, map[string]string{"error": fmt.Sprintf("ID '%s' not found", id)})
		return
	}

	if err := writeSpecialistsFile(newSpecs); err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to save specialists"})
		return
	}

	recordAudit(r, "SPECIALIST_DELETE", "SPECIALISTS", id, fmt.Sprintf("Deleted care specialist with ID '%s'", id), "SUCCESS")

	writeJSON(w, http.StatusOK, map[string]interface{}{
		"success": true,
		"message": fmt.Sprintf("Deleted specialist '%s'", id),
	})
}

// -------------------------------------------------------------
// About API
// -------------------------------------------------------------
func handleAbout(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		getAbout(w, r)
	case http.MethodPut:
		updateAbout(w, r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func getAbout(w http.ResponseWriter, r *http.Request) {
	mu.Lock()
	defer mu.Unlock()

	path := filepath.Join(projectRoot, "data", "about.json")
	data, err := os.ReadFile(path)
	if err != nil {
		logEvent("ERROR", "Failed to read about.json from %s: %v", path, err)
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to read about.json: " + err.Error()})
		return
	}

	var about map[string]interface{}
	if err := json.Unmarshal(data, &about); err != nil {
		logEvent("ERROR", "Failed to parse about.json: %v", err)
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to parse about.json"})
		return
	}
	writeJSON(w, http.StatusOK, about)
}

func updateAbout(w http.ResponseWriter, r *http.Request) {
	mu.Lock()
	defer mu.Unlock()

	var updatedAbout map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&updatedAbout); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid JSON: " + err.Error()})
		return
	}

	path := filepath.Join(projectRoot, "data", "about.json")
	formatted, err := json.MarshalIndent(updatedAbout, "", "  ")
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to format about.json"})
		return
	}

	if err := os.WriteFile(path, formatted, 0644); err != nil {
		logEvent("ERROR", "Failed to save updated about.json: %v", err)
		recordAudit(r, "ABOUT_FAILED", "ABOUT", "data/about.json", "Failed saving about.json: "+err.Error(), "FAILED")
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to write about.json"})
		return
	}

	recordAudit(r, "ABOUT_UPDATE", "ABOUT", "data/about.json", "Updated About page content, stories, and statistics", "SUCCESS")

	writeJSON(w, http.StatusOK, map[string]interface{}{
		"success": true,
		"message": "About page details updated",
		"about":   updatedAbout,
	})
}

// -------------------------------------------------------------
// Image Uploads
// -------------------------------------------------------------
func handleUpload(w http.ResponseWriter, r *http.Request) {
	uploadToProjectDir(w, r, "products", "data/products")
}

func handleUploadPFP(w http.ResponseWriter, r *http.Request) {
	uploadToProjectDir(w, r, "pfp", "data/pfp")
}

func uploadToProjectDir(w http.ResponseWriter, r *http.Request, formKey string, targetRelDir string) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	if err := r.ParseMultipartForm(25 << 20); err != nil {
		logEvent("WARN", "Upload form parsing failed from %s: %v", r.RemoteAddr, err)
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Could not parse form: " + err.Error()})
		return
	}

	file, header, err := r.FormFile("image")
	if err != nil {
		file, header, err = r.FormFile("file")
	}
	if err != nil {
		logEvent("WARN", "Upload failed: missing file form field from %s", r.RemoteAddr)
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "No file uploaded with key 'image' or 'file'"})
		return
	}
	defer file.Close()

	cleanFilename := filepath.Base(header.Filename)
	cleanFilename = strings.ReplaceAll(cleanFilename, " ", "-")

	targetDir := filepath.Join(projectRoot, targetRelDir)
	_ = os.MkdirAll(targetDir, 0755)

	targetPath := filepath.Join(targetDir, cleanFilename)
	dst, err := os.Create(targetPath)
	if err != nil {
		logEvent("ERROR", "Failed to create target file for upload %s: %v", targetPath, err)
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to create target file: " + err.Error()})
		return
	}
	defer dst.Close()

	writtenBytes, err := io.Copy(dst, file)
	if err != nil {
		logEvent("ERROR", "Failed saving uploaded data to %s: %v", targetPath, err)
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to save file: " + err.Error()})
		return
	}

	relPath := fmt.Sprintf("%s/%s", targetRelDir, cleanFilename)
	logEvent("UPLOAD", "Saved uploaded file %s (%d bytes) to %s", cleanFilename, writtenBytes, relPath)
	recordAudit(r, "FILE_UPLOAD", "UPLOADS", cleanFilename, fmt.Sprintf("Uploaded %s image '%s' (%d bytes) to %s", formKey, cleanFilename, writtenBytes, relPath), "SUCCESS")

	writeJSON(w, http.StatusOK, map[string]interface{}{
		"success":  true,
		"filename": cleanFilename,
		"path":     relPath,
	})
}

// -------------------------------------------------------------
// Raw Terminal Logs API (Optional downloads)
// -------------------------------------------------------------
func handleHistoryFiles(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	logDir := filepath.Join(backendDir, "logs")
	_ = os.MkdirAll(logDir, 0755)

	type LogFileInfo struct {
		Filename  string `json:"filename"`
		Path      string `json:"path"`
		SizeStr   string `json:"sizeStr"`
		SizeBytes int64  `json:"sizeBytes"`
		ModTime   string `json:"modTime"`
		IsCurrent bool   `json:"isCurrent"`
	}

	type DateGroup struct {
		Date  string        `json:"date"`
		Files []LogFileInfo `json:"files"`
	}

	dateEntries, err := os.ReadDir(logDir)
	if err != nil {
		writeJSON(w, http.StatusOK, []DateGroup{})
		return
	}

	var groups []DateGroup
	for _, de := range dateEntries {
		if !de.IsDir() {
			continue
		}
		dateStr := de.Name()
		subDir := filepath.Join(logDir, dateStr)
		fileEntries, err := os.ReadDir(subDir)
		if err != nil {
			continue
		}

		var files []LogFileInfo
		for _, fe := range fileEntries {
			if fe.IsDir() || !strings.HasSuffix(fe.Name(), ".log") {
				continue
			}
			info, err := fe.Info()
			if err != nil {
				continue
			}

			sizeKB := float64(info.Size()) / 1024
			sizeStr := fmt.Sprintf("%.1f KB", sizeKB)
			if sizeKB > 1024 {
				sizeStr = fmt.Sprintf("%.2f MB", sizeKB/1024)
			}

			isCurrent := (dateStr == activeLogDate && fe.Name() == activeLogFileName)

			files = append(files, LogFileInfo{
				Filename:  fe.Name(),
				Path:      fmt.Sprintf("%s/%s", dateStr, fe.Name()),
				SizeStr:   sizeStr,
				SizeBytes: info.Size(),
				ModTime:   info.ModTime().Format("2006-01-02 15:04:05"),
				IsCurrent: isCurrent,
			})
		}

		sort.Slice(files, func(i, j int) bool {
			return files[i].Filename > files[j].Filename
		})

		if len(files) > 0 {
			groups = append(groups, DateGroup{
				Date:  dateStr,
				Files: files,
			})
		}
	}

	sort.Slice(groups, func(i, j int) bool {
		return groups[i].Date > groups[j].Date
	})

	writeJSON(w, http.StatusOK, groups)
}

func handleHistoryView(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	dateParam := filepath.Base(r.URL.Query().Get("date"))
	fileParam := filepath.Base(r.URL.Query().Get("file"))

	if dateParam == "" || fileParam == "" || !strings.HasSuffix(fileParam, ".log") {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Valid date and file parameters required"})
		return
	}

	targetFile := filepath.Join(backendDir, "logs", dateParam, fileParam)
	if _, err := os.Stat(targetFile); os.IsNotExist(err) {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "Log file not found"})
		return
	}

	if dateParam == activeLogDate && fileParam == activeLogFileName && activeLogFile != nil {
		loggerMu.Lock()
		_ = activeLogFile.Sync()
		loggerMu.Unlock()
	}

	data, err := os.ReadFile(targetFile)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to read log file: " + err.Error()})
		return
	}

	content := string(data)
	lines := strings.Split(content, "\n")
	lineCount := len(lines)
	if len(lines) > 0 && lines[len(lines)-1] == "" {
		lineCount--
	}

	isCurrent := (dateParam == activeLogDate && fileParam == activeLogFileName)

	writeJSON(w, http.StatusOK, map[string]interface{}{
		"date":      dateParam,
		"file":      fileParam,
		"content":   content,
		"lineCount": lineCount,
		"sizeBytes": len(data),
		"isCurrent": isCurrent,
	})
}

func handleHistoryDownload(w http.ResponseWriter, r *http.Request) {
	dateParam := filepath.Base(r.URL.Query().Get("date"))
	fileParam := filepath.Base(r.URL.Query().Get("file"))

	if dateParam == "" || fileParam == "" || !strings.HasSuffix(fileParam, ".log") {
		http.Error(w, "Invalid parameters", http.StatusBadRequest)
		return
	}

	targetFile := filepath.Join(backendDir, "logs", dateParam, fileParam)
	if _, err := os.Stat(targetFile); os.IsNotExist(err) {
		http.Error(w, "Log file not found", http.StatusNotFound)
		return
	}

	if dateParam == activeLogDate && fileParam == activeLogFileName && activeLogFile != nil {
		loggerMu.Lock()
		_ = activeLogFile.Sync()
		loggerMu.Unlock()
	}

	downloadName := fmt.Sprintf("sukoon-log_%s_%s", dateParam, fileParam)
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.Header().Set("Content-Disposition", fmt.Sprintf(`attachment; filename="%s"`, downloadName))
	http.ServeFile(w, r, targetFile)
}

// -------------------------------------------------------------
// Helpers
// -------------------------------------------------------------
func runGit(dir string, args ...string) string {
	out, err := execGit(dir, args...)
	if err != nil {
		return ""
	}
	return out
}

func execGit(dir string, args ...string) (string, error) {
	cmd := exec.Command("git", args...)
	cmd.Dir = dir
	out, err := cmd.CombinedOutput()
	return string(out), err
}

func formatTimeAgo(t time.Time) string {
	d := time.Since(t)
	if d < time.Minute {
		return "just now"
	}
	if d < time.Hour {
		mins := int(d.Minutes())
		return fmt.Sprintf("%dm ago", mins)
	}
	if d < 24*time.Hour {
		hrs := int(d.Hours())
		return fmt.Sprintf("%dh ago", hrs)
	}
	days := int(d.Hours() / 24)
	return fmt.Sprintf("%dd ago", days)
}

func writeJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(data)
}
