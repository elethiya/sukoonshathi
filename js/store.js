// ==========================================================
// Sukoon Saathi — E-Commerce Store Engine
// Amazon & Flipkart Inspired Static Shopping Experience
// Pure Frontend · Zero Backend Required · LocalStorage State
// Icons Only · Zero Emojis · Tangible & Digital Wellness Items
// ==========================================================

// Unified Google Sheets Webhook Endpoint (Shared from js/main.js or fallback)
const GOOGLE_SHEETS_ORDERS_URL =
  window.SUKOON_SHEET_ENDPOINT ||
  "https://script.google.com/macros/s/AKfycbya4XxtryHc7s9ej222hsiKMGGcAQJ2CSFL_lvkVAwSs4m5lw7Lem1YAE8W_dj-uVi7/exec";

const PRODUCTS_DATA = [
  {
    id: "ss-mindful-journal",
    title: "Sukoon 90-Day Mindful Reflection & Gratitude Journal",
    subtitle: "Hardbound Gold-Foil Debossed Journal with Guided Daily Prompts",
    category: "journals",
    categoryLabel: "Mindful Journals",
    brand: "Sukoon Living",
    price: 599,
    mrp: 999,
    discountPercent: 40,
    rating: 4.8,
    reviewsCount: 420,
    badge: "Best Seller",
    badgeType: "bestseller",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
      "assets/hero.webp"
    ],
    deliveryInfo: "Free Express Delivery in 2-3 Days across India",
    format: "Physical Hardbound Book",
    inStock: true,
    highlights: [
      "120 GSM thick, bleed-proof wood-free archival paper",
      "Luxury debossed gold foil vegan leather hardbound cover",
      "90 daily structured morning and evening clarity prompts",
      "Includes satin bookmark ribbon and affirmation stickers pack"
    ],
    description: "Designed for daily calm, this 90-day guided reflection journal blends reflective mindfulness prompts with gratitude exercises. Requiring only 5 minutes each morning and evening, it helps clear mental fog, track daily habits, and build emotional balance.",
    specifications: {
      "Number of Pages": "224 Pages (120 GSM thick paper)",
      "Binding Style": "Thread-bound flat lay (opens 180 degrees)",
      "Cover Material": "Premium Vegan Leather with gold foil debossing",
      "Dimensions": "A5 Size (21 cm x 14.8 cm)",
      "Shipping": "Free across India with tracking details",
      "Included Bonus": "Pack of 12 Mindfulness Affirmation Stickers"
    },
    variants: ["Sage Green Cover", "Midnight Forest", "Terracotta Rose"],
    bundleWithId: "ss-aromatherapy-kit",
    reviews: [
      {
        name: "Meera D.",
        rating: 5,
        date: "5 days ago",
        verified: true,
        title: "Paper quality and prompts are exceptional",
        body: "The paper feels silky smooth even with fountain pens. The morning and evening prompts are realistic and grounding without feeling overwhelming.",
        helpful: 64
      },
      {
        name: "Arjun K.",
        rating: 5,
        date: "2 weeks ago",
        verified: true,
        title: "Clean layout, high quality build",
        body: "The flat-lay binding makes writing effortless. One of the highest quality journals available in this price category.",
        helpful: 31
      }
    ],
    faq: [
      {
        q: "What is the paper thickness, and does ink bleed through?",
        a: "The journal uses 120 GSM premium wood-free paper designed specifically to prevent ink bleed-through from gel pens and fountain pens."
      },
      {
        q: "How long does shipping take?",
        a: "Orders are dispatched within 24 hours. Express shipping delivers to all major cities across India within 2 to 3 business days."
      }
    ]
  },
  {
    id: "ss-aromatherapy-kit",
    title: "Sleep & Calming Aromatherapy Relaxation Kit",
    subtitle: "French Lavender Pillow Mist, Pulse Point Roll-On & Mulberry Silk Eye Mask",
    category: "kits",
    categoryLabel: "Wellness Kits",
    brand: "Sukoon Living",
    price: 849,
    mrp: 1399,
    discountPercent: 39,
    rating: 4.8,
    reviewsCount: 285,
    badge: "Sukoon's Choice",
    badgeType: "choice",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
    ],
    deliveryInfo: "Free Delivery by Tomorrow",
    format: "Physical Gift Box",
    inStock: true,
    highlights: [
      "100ml Pure Lavender & Chamomile soothing pillow mist",
      "10ml Bergamot & Sandalwood calming pulse point roll-on oil",
      "100% Grade 6A Mulberry Silk blackout eye mask with travel pouch",
      "Sensory grounding breathing card with guided techniques"
    ],
    description: "An aromatherapy sanctuary in a box. Formulated with 100% pure botanical essential oils, this kit eases sensory tension at the end of a long day, promotes deep relaxation, and supports restorative nighttime sleep.",
    specifications: {
      "Box Contents": "1x Pillow Mist (100ml), 1x Pulse Roll-On (10ml), 1x Pure Silk Eye Mask",
      "Active Botanicals": "French Lavender, Roman Chamomile, Bergamot, Mysore Sandalwood",
      "Safety & Purity": "100% Vegan, Paraben-Free, Non-Staining on Linen",
      "Packaging": "Luxury matte magnetic gift box with protective inserts"
    },
    variants: ["Calming Lavender & Chamomile", "Mysore Sandalwood & Cedar"],
    bundleWithId: "ss-mindful-journal",
    reviews: [
      {
        name: "Kavita S.",
        rating: 5,
        date: "1 week ago",
        verified: true,
        title: "A vital part of my evening unwind routine",
        body: "Two spritzes on my pillow and the silk eye mask completely transformed my night routine. The botanical aroma is natural, subtle, and calming.",
        helpful: 47
      }
    ],
    faq: [
      {
        q: "Is the pillow spray safe for sensitive skin and fabrics?",
        a: "Yes. The formulation is water-based, non-comedogenic, and safe for silk, cotton, and synthetic pillowcases."
      }
    ]
  },
  {
    id: "ss-weighted-blanket",
    title: "Therapeutic Organic Bamboo Weighted Calming Blanket",
    subtitle: "Gentle Deep Pressure Touch for Restful Sleep & Anxiety Relief",
    category: "living",
    categoryLabel: "Comfort & Living",
    brand: "Sukoon Living",
    price: 2499,
    mrp: 4499,
    discountPercent: 44,
    rating: 4.9,
    reviewsCount: 176,
    badge: "Premium",
    badgeType: "bestseller",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80"
    ],
    deliveryInfo: "Free Doorstep Delivery in 3-4 Days",
    format: "Physical Home Item",
    inStock: true,
    highlights: [
      "100% natural organic bamboo viscose fabric (breathable and cooling)",
      "High-density non-toxic micro glass beads with even weight distribution",
      "7-layer reinforced diamond stitching prevents bead shifting",
      "Engineered to provide therapeutic Deep Touch Pressure (DTP)"
    ],
    description: "Crafted with silky breathable bamboo fabric, this weighted blanket applies gentle, evenly distributed pressure across your body, simulating the comforting feeling of being held. It helps quiet nervous energy and encourages uninterrupted rest.",
    specifications: {
      "Weight Options": "5.5 kg (Ideal for 45-70 kg) or 7.0 kg (Ideal for 70+ kg)",
      "Fabric Material": "100% Natural Organic Bamboo Lyocell",
      "Filler": "Hypoallergenic, Lead-Free Micro Glass Beads",
      "Cleaning": "Machine washable on gentle cycle or spot clean",
      "Warranty": "1-Year Quality Warranty on Stitching & Construction"
    },
    variants: ["5.5 kg (Single Bed 48x72 in)", "7.0 kg (Queen Bed 60x80 in)"],
    bundleWithId: "ss-aromatherapy-kit",
    reviews: [
      {
        name: "Rohan M.",
        rating: 5,
        date: "4 days ago",
        verified: true,
        title: "Finally sleeping through the entire night",
        body: "I was skeptical about weighted blankets in warm Indian weather, but the bamboo fabric stays pleasantly cool. The weight distribution is completely even.",
        helpful: 52
      }
    ],
    faq: [
      {
        q: "Does this blanket trap heat during summer?",
        a: "No. The outer fabric is 100% organic bamboo viscose, which naturally wicks moisture and stays cooler than traditional cotton or fleece blankets."
      }
    ]
  },
  {
    id: "ss-calming-tea",
    title: "Sukoon Natural Whole-Leaf Herbal Calming Tea (100g Tin)",
    subtitle: "Caffeine-Free Infusion of Chamomile, Ashwagandha, Lavender & Lemongrass",
    category: "living",
    categoryLabel: "Calming Essentials",
    brand: "Sukoon Harvest",
    price: 399,
    mrp: 599,
    discountPercent: 33,
    rating: 4.7,
    reviewsCount: 310,
    badge: "Popular",
    badgeType: "bestseller",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80"
    ],
    deliveryInfo: "Delivery in 2 Days across India",
    format: "Food Grade Reusable Tin",
    inStock: true,
    highlights: [
      "100% pure whole flower chamomile buds and adaptogenic ashwagandha",
      "Zero caffeine, zero artificial flavorings or preservatives",
      "Yields 45 to 50 soothing cups of calming infusion",
      "Sealed in an airtight reusable food-grade gold tin"
    ],
    description: "A restorative evening herbal infusion hand-blended with whole Egyptian chamomile flowers, calming Himalayan lavender, and adaptogenic ashwagandha root. Naturally sweet and floral, it offers a peaceful grounding ritual before bed.",
    specifications: {
      "Net Quantity": "100g Loose Leaf (45-50 Servings)",
      "Ingredients": "Chamomile Flowers, Ashwagandha Root, Lavender, Lemongrass, Cardamom",
      "Caffeine Level": "100% Caffeine Free",
      "Shelf Life": "18 Months from packaging date",
      "Packaging": "Airtight Golden Matte Metal Canister"
    },
    variants: ["Chamomile & Ashwagandha", "Lavender & Lemongrass"],
    bundleWithId: "ss-mindful-journal",
    reviews: [
      {
        name: "Shreya V.",
        rating: 5,
        date: "1 week ago",
        verified: true,
        title: "Aromatic and genuinely relaxing",
        body: "The chamomile flowers are whole and vibrant, not crushed dust like supermarket tea bags. Drinking this while writing in the evening journal has become my favorite ritual.",
        helpful: 39
      }
    ],
    faq: [
      {
        q: "How should I brew this tea?",
        a: "Steep 1 teaspoon in 200ml of freshly boiled water for 4 to 5 minutes. Strain and enjoy warm. Honey can be added to taste."
      }
    ]
  },
  {
    id: "ss-worry-stone",
    title: "Tactile Sensory Worry Stone & Desk Grounding Object",
    subtitle: "Hand-Carved Polished Natural Gemstone with Ergonomic Thumb Indentation",
    category: "essentials",
    categoryLabel: "Mindful Essentials",
    brand: "Sukoon Living",
    price: 349,
    mrp: 599,
    discountPercent: 42,
    rating: 4.8,
    reviewsCount: 194,
    badge: "Trending",
    badgeType: "choice",
    image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80"
    ],
    deliveryInfo: "Free Express Delivery in 2-3 Days",
    format: "Physical Object with Pouch",
    inStock: true,
    highlights: [
      "Authentic natural polished mineral gemstone with smooth ergonomic groove",
      "Compact pocket size for discreet sensory grounding during work and study",
      "Cool-to-touch surface aids physical tactile grounding during tense moments",
      "Comes with a soft velvet drawstring carry pouch"
    ],
    description: "An ancient tactile grounding tool reimagined for modern workstations. Rubbing the smooth curved indent with your thumb stimulates acupressure nerve endings, redirecting anxious fidgeting and bringing your attention back to the present.",
    specifications: {
      "Stone Options": "Natural Green Aventurine, Rose Quartz, or Black Obsidian",
      "Dimensions": "Approx. 4.5 cm x 3.5 cm x 0.8 cm",
      "Weight": "Approx. 45 grams",
      "Finish": "High-luster smooth polish, zero sharp edges",
      "Carry Case": "Burgundy velvet drawstring travel pouch"
    },
    variants: ["Green Aventurine (Balance)", "Rose Quartz (Gentleness)", "Black Obsidian (Grounding)"],
    bundleWithId: "ss-mindful-journal",
    reviews: [
      {
        name: "Anil P.",
        rating: 5,
        date: "3 days ago",
        verified: true,
        title: "Sits on my desk during stressful meetings",
        body: "Whenever I feel overwhelmed with deadlines, holding this smooth, cool stone provides a quick physical anchor. Small, beautiful, and very effective.",
        helpful: 28
      }
    ],
    faq: [
      {
        q: "Is each stone unique?",
        a: "Yes. Because every stone is hand-carved from natural mineral deposits, each piece features unique organic veining and color depth."
      }
    ]
  },
  {
    id: "ss-soundscapes-audio",
    title: "Guided Mindfulness & Ambient Soundscapes Audio Deck",
    subtitle: "32 High-Fidelity Audio Meditations, Nature Soundscapes & Sleep Journeys",
    category: "digital",
    categoryLabel: "Digital Audio Pass",
    brand: "Sukoon Digital",
    price: 299,
    mrp: 699,
    discountPercent: 57,
    rating: 4.9,
    reviewsCount: 430,
    badge: "Instant Access",
    badgeType: "deal",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80"
    ],
    deliveryInfo: "Instant Digital Key Delivered to Email",
    format: "Digital Audio Pass",
    inStock: true,
    highlights: [
      "Lifetime unlimited access to 32 studio-grade audio tracks (12+ hours)",
      "Binaural theta frequencies, Himalayan forest sounds & bedtime stories",
      "Available in bilingual narration (Clear English & Soothing Hindi)",
      "Direct browser streaming plus DRM-free MP3 downloads for offline listening"
    ],
    description: "An audio sanctuary accessible on any device. Created with sound acoustics specialists, each track blends field recordings of Himalayan rainfall, Tibetan singing bowls, and gentle breath cues to ease restlessness and support focus.",
    specifications: {
      "Format": "320 kbps High-Definition MP3 + Instant Web Player",
      "Total Duration": "12 Hours 45 Minutes of curated audio",
      "Compatibility": "iPhone, Android, Windows, Mac (No app installation required)",
      "Offline Access": "Permanent downloadable DRM-free audio files",
      "Delivery": "Instant activation link and download pass sent via email"
    },
    variants: ["Lifetime Digital Streaming & Offline MP3 Pass"],
    bundleWithId: "ss-mindful-journal",
    reviews: [
      {
        name: "Vikram N.",
        rating: 5,
        date: "1 week ago",
        verified: true,
        title: "The rain soundscapes are masterfully recorded",
        body: "I put these on my headphones during deep work blocks and before sleeping. There is no repetitive looping or hiss. Extremely clean and atmospheric.",
        helpful: 67
      }
    ],
    faq: [
      {
        q: "Do I need to pay a monthly subscription?",
        a: "No. This is a one-time purchase that grants lifetime access with zero recurring fees."
      }
    ]
  },
  {
    id: "ss-gift-hamper",
    title: "Sukoon Mindful Living & Self-Care Gift Hamper",
    subtitle: "Journal + Hand-Poured Scented Candle + Herbal Tea + 52 Affirmation Cards",
    category: "kits",
    categoryLabel: "Gift Hampers",
    brand: "Sukoon Living",
    price: 1699,
    mrp: 2799,
    discountPercent: 39,
    rating: 4.9,
    reviewsCount: 152,
    badge: "Limited Edition",
    badgeType: "choice",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80"
    ],
    deliveryInfo: "Free Pan-India Delivery with Greeting Card",
    format: "Luxury Rigid Gift Box",
    inStock: true,
    highlights: [
      "Hardbound 90-Day Mindful Gratitude Journal with ribbon bookmark",
      "200g Pure Soy Wax Aromatherapy Candle (40-hour burn time)",
      "50g Handcrafted Herbal Calming Tea in reusable gold tin",
      "52 Daily Affirmation and Mindfulness Cards with wooden display stand"
    ],
    description: "The ultimate care package for friends, colleagues, or yourself. Packed inside an elegant matte forest green rigid gift box with satin ribbon, every item is thoughtfully selected to encourage everyday peace, presence, and calm moments.",
    specifications: {
      "Included Items": "Journal, Scented Candle, Tea Tin, 52-Card Deck, Personalized Note",
      "Box Style": "Rigid Keepsake Box with magnetic closure and gold foil logo",
      "Candle Wax": "100% Pure Non-Toxic Soy Wax with natural cotton wick",
      "Shipping": "Dispatched within 24 hours with gift wrapping and protective padding"
    },
    variants: ["Deluxe Calm Hamper (Forest Green)", "Serenity Hamper (Warm Cream)"],
    bundleWithId: "ss-worry-stone",
    reviews: [
      {
        name: "Pooja B.",
        rating: 5,
        date: "6 days ago",
        verified: true,
        title: "A truly thoughtful gift that made my sister cry happy tears",
        body: "The unboxing presentation is gorgeous. The candle smells clean and soothing, and the journal quality is unmatched. Worth every rupee.",
        helpful: 41
      }
    ],
    faq: [
      {
        q: "Can I add a custom handwritten message for gifting?",
        a: "Yes. You can write your custom message in the delivery notes at checkout, and our team will print it on a premium textured note card."
      }
    ]
  },
  {
    id: "ss-affirmation-cards",
    title: "Daily Affirmation & Mental Clarity Card Deck (52 Cards)",
    subtitle: "52 Illustrated Prompt Cards with Natural Beechwood Display Stand",
    category: "essentials",
    categoryLabel: "Mindful Essentials",
    brand: "Sukoon Living",
    price: 449,
    mrp: 799,
    discountPercent: 44,
    rating: 4.7,
    reviewsCount: 268,
    badge: "Best Seller",
    badgeType: "bestseller",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80"
    ],
    deliveryInfo: "Delivery in 2-3 Days across India",
    format: "Physical Card Deck with Wooden Stand",
    inStock: true,
    highlights: [
      "52 unique daily reflection prompts and cognitive affirmations",
      "Heavyweight 350 GSM matte laminated cardstock with gold foiled edges",
      "Solid beechwood desktop card stand for daily desk display",
      "Housed in a durable protective tuck box with magnetic clasp"
    ],
    description: "Start each morning with an intentional perspective. Draw one card daily to anchor your mind with grounded reflections on boundaries, self-compassion, resilience, and presence. Display your chosen card all day on the wooden stand.",
    specifications: {
      "Card Count": "52 Full-Color Cards + 2 Instruction Cards",
      "Paper Stock": "350 GSM High-Durability Matte Laminated Cards",
      "Stand Material": "Natural Polish Solid Beechwood (8 cm wide)",
      "Box Type": "Magnetic closure gift tuck box with gold debossing"
    },
    variants: ["Daily Clarity Edition", "Self-Compassion Edition"],
    bundleWithId: "ss-mindful-journal",
    reviews: [
      {
        name: "Deepa R.",
        rating: 5,
        date: "2 weeks ago",
        verified: true,
        title: "A wonderful desk companion for workday presence",
        body: "I pick one card every morning before checking my emails. The words are meaningful and mature, avoiding cliché quotes. The wooden stand looks elegant on my desk.",
        helpful: 35
      }
    ],
    faq: [
      {
        q: "What are the dimensions of the cards?",
        a: "Each card measures standard tarot size (7 cm x 12 cm), making the typography clean and readable from your desk."
      }
    ]
  }
];

// ==========================================================
// STORE STATE ENGINE (100% PURE CLIENT-SIDE STATIC)
// ==========================================================
class SukoonStore {
  constructor() {
    this.cart = this.loadStorage("sukoon_cart", []);
    this.favorites = this.loadStorage("sukoon_favorites", []);
    this.appliedCoupon = this.loadStorage("sukoon_coupon", null);
    this.currentCategory = "all";
    this.searchQuery = "";
    this.sortBy = "featured";
    this.selectedPriceRange = "all";
    this.selectedRating = "all";
    this.currentPdpProduct = null;
    this.currentPdpQty = 1;
    this.currentPdpVariant = "";

    this.bindEvents();
    this.renderProductsGrid();
    this.updateCounters();
  }

  // Storage helper
  loadStorage(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  saveStorage(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {}
  }

  // Floating Window Background Scroll Lock
  lockBodyScroll() {
    if (typeof window.lockBodyScroll === "function") {
      window.lockBodyScroll();
    } else {
      document.documentElement.classList.add("modal-open");
      document.body.classList.add("modal-open");
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }
  }

  unlockBodyScroll() {
    if (typeof window.unlockBodyScroll === "function") {
      window.unlockBodyScroll();
    } else {
      requestAnimationFrame(() => {
        const hasOpenModal = document.querySelector(
          ".pdp-modal-overlay.open, .checkout-modal-overlay.open, .cart-drawer-overlay.open, .wishlist-modal-overlay.open, #menuOverlay.open"
        );
        if (!hasOpenModal) {
          document.documentElement.classList.remove("modal-open");
          document.body.classList.remove("modal-open");
          document.documentElement.style.overflow = "";
          document.body.style.overflow = "";
        }
      });
    }
  }

  // Toast System (Clean SVGs, Zero Emojis)
  showToast(message, type = "info") {
    let toast = document.getElementById("storeToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "storeToast";
      toast.className = "store-toast";
      document.body.appendChild(toast);
    }

    const checkIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
    const heartIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
    const tagIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m20.59 13.41-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`;

    let icon = checkIcon;
    if (type === "favorite") icon = heartIcon;
    if (type === "coupon") icon = tagIcon;

    toast.innerHTML = `<span class="toast-ic">${icon}</span><span>${message}</span>`;
    toast.classList.add("show");
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }

  startCountdownTimer() {
    // Offer countdown removed as requested
  }

  // Coupon Logic
  applyCoupon(code) {
    code = (code || "").trim().toUpperCase();
    if (code === "SUKOON15") {
      this.appliedCoupon = { code: "SUKOON15", discountPct: 15 };
      this.saveStorage("sukoon_coupon", this.appliedCoupon);
      this.showToast("Coupon SUKOON15 applied! 15% discount deducted.", "coupon");
      this.renderCartDrawer();
      return true;
    } else if (code === "FIRST50") {
      this.appliedCoupon = { code: "FIRST50", discountFlat: 50 };
      this.saveStorage("sukoon_coupon", this.appliedCoupon);
      this.showToast("Coupon FIRST50 applied! Flat ₹50 deducted.", "coupon");
      this.renderCartDrawer();
      return true;
    } else if (code === "WELLNESS10") {
      this.appliedCoupon = { code: "WELLNESS10", discountPct: 10 };
      this.saveStorage("sukoon_coupon", this.appliedCoupon);
      this.showToast("Coupon WELLNESS10 applied! 10% discount deducted.", "coupon");
      this.renderCartDrawer();
      return true;
    } else {
      this.showToast("Invalid promo code. Try SUKOON15 or FIRST50");
      return false;
    }
  }

  removeCoupon() {
    this.appliedCoupon = null;
    localStorage.removeItem("sukoon_coupon");
    this.showToast("Coupon removed.");
    this.renderCartDrawer();
  }

  // Cart Calculation
  getCalculatedTotals() {
    let subtotalMrp = 0;
    let subtotalDeal = 0;

    this.cart.forEach((item) => {
      const prod = PRODUCTS_DATA.find((p) => p.id === item.id);
      if (prod) {
        subtotalMrp += prod.mrp * item.qty;
        subtotalDeal += prod.price * item.qty;
      }
    });

    let couponDiscount = 0;
    if (this.appliedCoupon) {
      if (this.appliedCoupon.discountPct) {
        couponDiscount = Math.round((subtotalDeal * this.appliedCoupon.discountPct) / 100);
      } else if (this.appliedCoupon.discountFlat) {
        couponDiscount = Math.min(this.appliedCoupon.discountFlat, subtotalDeal);
      }
    }

    const totalFinal = Math.max(0, subtotalDeal - couponDiscount);
    const totalSavings = subtotalMrp - totalFinal;

    return {
      subtotalMrp,
      subtotalDeal,
      dealDiscount: subtotalMrp - subtotalDeal,
      couponDiscount,
      totalFinal,
      totalSavings,
      count: this.cart.reduce((sum, item) => sum + item.qty, 0)
    };
  }

  // Cart Operations
  addToCart(productId, qty = 1, variant = null) {
    const prod = PRODUCTS_DATA.find((p) => p.id === productId);
    if (!prod) return;

    const chosenVariant = variant || prod.variants[0] || "Standard";
    const existing = this.cart.find((i) => i.id === productId && i.variant === chosenVariant);

    if (existing) {
      existing.qty += qty;
    } else {
      this.cart.push({ id: productId, qty: qty, variant: chosenVariant });
    }

    this.saveStorage("sukoon_cart", this.cart);
    this.updateCounters();
    this.renderCartDrawer();
  }

  updateItemQty(productId, variant, delta) {
    const item = this.cart.find((i) => i.id === productId && i.variant === variant);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
      this.cart = this.cart.filter((i) => !(i.id === productId && i.variant === variant));
      this.showToast("Item removed from cart");
    }
    this.saveStorage("sukoon_cart", this.cart);
    this.updateCounters();
    this.renderCartDrawer();
  }

  removeItem(productId, variant) {
    this.cart = this.cart.filter((i) => !(i.id === productId && i.variant === variant));
    this.saveStorage("sukoon_cart", this.cart);
    this.updateCounters();
    this.renderCartDrawer();
    this.showToast("Item removed from cart");
  }

  // Favorites / Wishlist Operations
  toggleFavorite(productId) {
    const prod = PRODUCTS_DATA.find((p) => p.id === productId);
    if (!prod) return;

    const idx = this.favorites.indexOf(productId);
    if (idx > -1) {
      this.favorites.splice(idx, 1);
      this.showToast(`Removed from Favorites`);
    } else {
      this.favorites.push(productId);
      this.showToast(`Saved to Favorites`, "favorite");
    }

    this.saveStorage("sukoon_favorites", this.favorites);
    this.updateCounters();
    this.renderFavoritesDrawer();
    this.renderProductsGrid();
  }

  isFavorite(productId) {
    return this.favorites.includes(productId);
  }

  // Live Counter Badges
  updateCounters() {
    const totals = this.getCalculatedTotals();
    document.querySelectorAll(".cart-counter-badge").forEach((el) => {
      el.textContent = totals.count;
      el.style.display = totals.count > 0 ? "flex" : "none";
    });

    const floatingBadge = document.getElementById("floatingCartBadge");
    if (floatingBadge) {
      floatingBadge.textContent = totals.count;
      floatingBadge.style.display = totals.count > 0 ? "inline-block" : "none";
    }

    document.querySelectorAll(".wishlist-counter-badge").forEach((el) => {
      el.textContent = this.favorites.length;
      el.style.display = this.favorites.length > 0 ? "flex" : "none";
    });
  }

  // Search Engine
  getFilteredProducts() {
    if (!this.searchQuery) return PRODUCTS_DATA;
    const q = this.searchQuery.toLowerCase();
    return PRODUCTS_DATA.filter((p) => {
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.highlights.some((h) => h.toLowerCase().includes(q))
      );
    });
  }

  // Render Star Rating SVG
  renderStars(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars += `<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
      } else {
        stars += `<svg viewBox="0 0 24 24" style="color: #d1c8b8;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
      }
    }
    return stars;
  }

  // Render Amazon & Flipkart Product Cards
  renderProductsGrid() {
    const grid = document.getElementById("amazonProductsGrid");
    const countEl = document.getElementById("resultsCountDisplay");
    if (!grid) return;

    const filtered = this.getFilteredProducts();

    if (countEl) {
      countEl.innerHTML = `Showing <strong>${filtered.length}</strong> of ${PRODUCTS_DATA.length} products`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--paper); border-radius: 16px; border: 1px dashed var(--line);">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#c9a35c" stroke-width="1.8" style="margin-bottom:12px;"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <h3 style="font-family: var(--serif); color: var(--forest); margin: 0 0 6px 0;">No products match your search</h3>
          <p style="color: var(--ink-soft); font-size: 0.9rem; margin-bottom: 16px;">Try searching for another mindfulness item, journal, or wellness kit.</p>
          <button class="btn-amz-buy" id="resetFiltersFromEmpty" style="margin: 0 auto; display: inline-flex;">Clear Search</button>
        </div>
      `;
      document.getElementById("resetFiltersFromEmpty")?.addEventListener("click", () => {
        this.resetAllFilters();
      });
      return;
    }

    grid.innerHTML = filtered
      .map((p) => {
        return `
        <article class="amz-card" data-product-id="${p.id}">
          <!-- Ribbon Badge -->
          <div class="amz-badge-wrap">
            <span class="amz-badge ${p.badgeType}">
              ${
                p.badgeType === "choice"
                  ? `Sukoon's <span class="gold">Choice</span>`
                  : p.badge
              }
            </span>
          </div>

          <!-- Image & Quick View -->
          <div class="amz-card-img-box" data-open-pdp="${p.id}">
            <img src="${p.image}" alt="${p.title}" class="amz-card-img" loading="lazy">
            <div class="amz-quick-view-overlay">
              <span class="amz-quick-view-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                Quick View
              </span>
            </div>
          </div>

          <!-- Card Body -->
          <div class="amz-card-body">
            <div class="amz-card-meta">
              <span class="amz-card-brand">${p.brand}</span>
              <span class="amz-card-category">${p.categoryLabel}</span>
            </div>

            <h3 class="amz-card-title" data-open-pdp="${p.id}">${p.title}</h3>

            <!-- Price -->
            <div class="amz-price-box">
              <span class="amz-deal-price">₹${p.price.toLocaleString("en-IN")}</span>
              <span class="amz-mrp-price">M.R.P.: ₹${p.mrp.toLocaleString("en-IN")}</span>
              <span class="amz-discount-pill">${p.discountPercent}% OFF</span>
            </div>

            <!-- Key Feature Bullets -->
            <ul class="amz-bullets-list">
              ${p.highlights
                .slice(0, 3)
                .map(
                  (h) => `
                <li>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>${h}</span>
                </li>
              `
                )
                .join("")}
            </ul>

            <!-- Single Action Button (Buy Now) -->
            <div class="amz-card-actions">
              <button class="btn-amz-buy" data-buy-now="${p.id}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                Buy Now
              </button>
            </div>
          </div>
        </article>
      `;
      })
      .join("");
  }

  // Open Product Detail Modal (PDP)
  openPdpModal(productId) {
    const prod = PRODUCTS_DATA.find((p) => p.id === productId);
    if (!prod) return;

    this.currentPdpProduct = prod;
    this.currentPdpQty = 1;
    this.currentPdpVariant = prod.variants[0] || "Standard";

    const modal = document.getElementById("pdpModalOverlay");
    const container = document.getElementById("pdpModalContent");
    if (!modal || !container) return;

    container.innerHTML = `
      <!-- Breadcrumbs -->
      <div class="pdp-breadcrumbs">
        <a href="#home">Home</a> &rsaquo;
        <a href="#products">Store</a> &rsaquo;
        <span>${prod.title}</span>
      </div>

      <!-- Main Grid -->
      <div class="pdp-main-grid">
        <!-- Left: Image Gallery with thumbnail switcher -->
        <div class="pdp-gallery-wrap">
          <div class="pdp-main-image-box">
            <img src="${prod.image}" alt="${prod.title}" class="pdp-main-image" id="pdpMainImage">
          </div>
          <div class="pdp-thumbnails-row">
            ${prod.gallery
              .map(
                (img, idx) => `
              <button class="pdp-thumb-btn ${idx === 0 ? "active" : ""}" data-thumb-img="${img}">
                <img src="${img}" alt="Angle ${idx + 1}">
              </button>
            `
              )
              .join("")}
          </div>
        </div>

        <!-- Right: Buy Box & Details -->
        <div class="pdp-info-wrap">
          <span class="pdp-brand-link">${prod.brand}</span>
          <h2 class="pdp-title">${prod.title}</h2>

          <!-- Product Status Banner -->
          <div class="pdp-deal-banner" style="margin-top: 10px;">
            <span style="display:flex; align-items:center; gap:6px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
              Sukoon Verified Authentic
            </span>
            <span>In Stock</span>
          </div>

          <!-- Price Section -->
          <div class="pdp-price-section">
            <div class="pdp-price-row">
              <span class="pdp-curr-price">₹${prod.price.toLocaleString("en-IN")}</span>
              <span class="pdp-mrp-price">M.R.P.: ₹${prod.mrp.toLocaleString("en-IN")}</span>
              <span class="pdp-discount-tag">Save ${prod.discountPercent}% (₹${(prod.mrp - prod.price).toLocaleString("en-IN")})</span>
            </div>
            <div class="pdp-tax-note">Inclusive of all applicable taxes</div>
          </div>

          <!-- Variant Selector -->
          ${
            prod.variants.length > 1
              ? `
            <div class="pdp-variant-wrap">
              <span class="variant-label">Select Option / Color:</span>
              <div class="variant-options-row">
                ${prod.variants
                  .map(
                    (v, idx) => `
                  <button class="variant-btn ${idx === 0 ? "active" : ""}" data-variant-choice="${v}">${v}</button>
                `
                  )
                  .join("")}
              </div>
            </div>
          `
              : ""
          }

          <!-- Quantity Stepper & Buy Now CTA -->
          <div class="pdp-buy-row">
            <div class="qty-stepper">
              <button class="qty-btn" id="pdpQtyDec">-</button>
              <span class="qty-val" id="pdpQtyDisplay">1</span>
              <button class="qty-btn" id="pdpQtyInc">+</button>
            </div>
            <div class="pdp-action-btns">
              <button class="btn-pdp-buy" id="pdpBuyNowBtn" style="flex: 1;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Detailed Tabs -->
      <div class="pdp-tabs-wrap">
        <div class="pdp-tab-headers">
          <button class="pdp-tab-btn active" data-pdp-tab="tab-overview">Overview & Highlights</button>
          <button class="pdp-tab-btn" data-pdp-tab="tab-specs">Product Specifications</button>
          <button class="pdp-tab-btn" data-pdp-tab="tab-faq">Questions & Answers</button>
        </div>

        <!-- Tab 1: Overview -->
        <div class="pdp-tab-panel active" id="tab-overview">
          <p style="font-size: 0.95rem; line-height: 1.65; color: var(--ink); margin-bottom: 16px;">${prod.description}</p>
          <h4 style="font-family: var(--serif); color: var(--forest); margin: 18px 0 10px 0;">Key Highlights:</h4>
          <ul style="padding-left: 20px; line-height: 1.6; color: var(--ink-soft); font-size: 0.9rem;">
            ${prod.highlights.map((h) => `<li>${h}</li>`).join("")}
          </ul>
        </div>

        <!-- Tab 2: Specs -->
        <div class="pdp-tab-panel" id="tab-specs">
          <table class="pdp-specs-table">
            <tbody>
              ${Object.entries(prod.specifications)
                .map(
                  ([k, v]) => `
                <tr>
                  <td class="spec-name">${k}</td>
                  <td class="spec-val">${v}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </div>

        <!-- Tab 3: FAQ -->
        <div class="pdp-tab-panel" id="tab-faq">
          <div style="display: flex; flex-direction: column; gap: 14px;">
            ${prod.faq
              .map(
                (item) => `
              <div style="background: var(--cream); border-radius: 10px; padding: 14px 16px;">
                <h4 style="font-size: 0.92rem; color: var(--forest); margin: 0 0 6px 0;">Q: ${item.q}</h4>
                <p style="font-size: 0.88rem; color: var(--ink-soft); margin: 0; line-height: 1.5;">A: ${item.a}</p>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </div>
    `;

    this.bindPdpEvents();
    modal.classList.add("open");
    this.lockBodyScroll();
  }

  closePdpModal() {
    const modal = document.getElementById("pdpModalOverlay");
    if (modal) modal.classList.remove("open");
    this.unlockBodyScroll();
    this.currentPdpProduct = null;
  }

  bindPdpEvents() {
    // Gallery thumbnails
    document.querySelectorAll(".pdp-thumb-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".pdp-thumb-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const src = btn.getAttribute("data-thumb-img");
        const main = document.getElementById("pdpMainImage");
        if (main) main.src = src;
      });
    });

    // Variants
    document.querySelectorAll("[data-variant-choice]").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("[data-variant-choice]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        this.currentPdpVariant = btn.getAttribute("data-variant-choice");
      });
    });

    // Qty
    const qtyVal = document.getElementById("pdpQtyDisplay");
    document.getElementById("pdpQtyDec")?.addEventListener("click", () => {
      if (this.currentPdpQty > 1) {
        this.currentPdpQty--;
        if (qtyVal) qtyVal.textContent = this.currentPdpQty;
      }
    });
    document.getElementById("pdpQtyInc")?.addEventListener("click", () => {
      this.currentPdpQty++;
      if (qtyVal) qtyVal.textContent = this.currentPdpQty;
    });

    // Buy now
    document.getElementById("pdpBuyNowBtn")?.addEventListener("click", () => {
      if (this.currentPdpProduct) {
        this.cart = [];
        this.addToCart(this.currentPdpProduct.id, this.currentPdpQty, this.currentPdpVariant);
        this.closePdpModal();
        this.openCheckoutModal();
      }
    });

    // Tabs
    document.querySelectorAll(".pdp-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".pdp-tab-btn").forEach((b) => b.classList.remove("active"));
        document.querySelectorAll(".pdp-tab-panel").forEach((p) => p.classList.remove("active"));
        btn.classList.add("active");
        const targetId = btn.getAttribute("data-pdp-tab");
        document.getElementById(targetId)?.classList.add("active");
      });
    });
  }

  // Render Slide-Out Cart Drawer
  renderCartDrawer() {
    const body = document.getElementById("cartDrawerBody");
    const footer = document.getElementById("cartDrawerFooter");
    const titleEl = document.getElementById("cartDrawerCountTitle");
    if (!body || !footer) return;

    const totals = this.getCalculatedTotals();

    if (titleEl) {
      titleEl.textContent = `Shopping Cart (${totals.count} items)`;
    }

    if (this.cart.length === 0) {
      body.innerHTML = `
        <div class="empty-cart-state">
          <svg class="empty-cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          <h3>Your cart is empty</h3>
          <p>Explore our mindful reflection journals, calming aromatherapy kits, and wellness essentials.</p>
          <button class="btn-amz-buy" id="cartExploreStoreBtn" style="margin: 0 auto;">Shop Today's Deals</button>
        </div>
      `;
      footer.style.display = "none";

      document.getElementById("cartExploreStoreBtn")?.addEventListener("click", () => {
        this.closeCartDrawer();
        location.hash = "#products";
      });
      return;
    }

    footer.style.display = "block";

    body.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        ${this.cart
          .map((item) => {
            const prod = PRODUCTS_DATA.find((p) => p.id === item.id);
            if (!prod) return "";
            const itemTotal = prod.price * item.qty;

            return `
            <div class="cart-item-card">
              <img src="${prod.image}" alt="${prod.title}" class="cart-item-img">
              <div class="cart-item-info">
                <div>
                  <h4 class="cart-item-title">${prod.title}</h4>
                  <div class="cart-item-variant">${item.variant || "Standard"}</div>
                </div>
                <div class="cart-item-bottom">
                  <span class="cart-item-price">₹${itemTotal.toLocaleString("en-IN")}</span>
                  <div class="cart-qty-stepper">
                    <button class="cart-qty-btn" data-cart-dec="${item.id}" data-cart-variant="${item.variant}">-</button>
                    <span class="cart-qty-val">${item.qty}</span>
                    <button class="cart-qty-btn" data-cart-inc="${item.id}" data-cart-variant="${item.variant}">+</button>
                  </div>
                </div>
              </div>
              <button class="cart-item-remove-btn" data-cart-remove="${item.id}" data-cart-variant="${item.variant}" title="Remove item">&times;</button>
            </div>
          `;
          })
          .join("")}
      </div>
    `;

    footer.innerHTML = `
      <div class="cart-bill-list">
        <div class="cart-bill-row">
          <span>Items M.R.P. Total</span>
          <span>₹${totals.subtotalMrp.toLocaleString("en-IN")}</span>
        </div>
        <div class="cart-bill-row discount">
          <span>Store Savings</span>
          <span>-₹${totals.dealDiscount.toLocaleString("en-IN")}</span>
        </div>
        <div class="cart-bill-row">
          <span>Delivery Charges</span>
          <span style="color: #1f5c4f; font-weight: 600;">FREE</span>
        </div>
        <div class="cart-bill-row total">
          <span>Total Payable</span>
          <span>₹${totals.totalFinal.toLocaleString("en-IN")}</span>
        </div>
      </div>
      <button class="btn-proceed-checkout" id="cartProceedCheckoutBtn">
        Proceed to Buy (${totals.count} items)
      </button>
    `;

    // Hook cart events
    document.querySelectorAll("[data-cart-dec]").forEach((b) => {
      b.addEventListener("click", () => {
        const id = b.getAttribute("data-cart-dec");
        const variant = b.getAttribute("data-cart-variant");
        this.updateItemQty(id, variant, -1);
      });
    });

    document.querySelectorAll("[data-cart-inc]").forEach((b) => {
      b.addEventListener("click", () => {
        const id = b.getAttribute("data-cart-inc");
        const variant = b.getAttribute("data-cart-variant");
        this.updateItemQty(id, variant, 1);
      });
    });

    document.querySelectorAll("[data-cart-remove]").forEach((b) => {
      b.addEventListener("click", () => {
        const id = b.getAttribute("data-cart-remove");
        const variant = b.getAttribute("data-cart-variant");
        this.removeItem(id, variant);
      });
    });

    document.getElementById("cartProceedCheckoutBtn")?.addEventListener("click", () => {
      this.closeCartDrawer();
      this.openCheckoutModal();
    });
  }

  openCartDrawer() {
    this.renderCartDrawer();
    const overlay = document.getElementById("cartDrawerOverlay");
    if (overlay) overlay.classList.add("open");
    this.lockBodyScroll();
  }

  closeCartDrawer() {
    const overlay = document.getElementById("cartDrawerOverlay");
    if (overlay) overlay.classList.remove("open");
    this.unlockBodyScroll();
  }

  // Favorites / Wishlist Drawer
  renderFavoritesDrawer() {
    const body = document.getElementById("wishlistDrawerBody");
    const countEl = document.getElementById("wishlistCountTitle");
    if (!body) return;

    if (countEl) countEl.textContent = `My Favorites (${this.favorites.length} items)`;

    if (this.favorites.length === 0) {
      body.innerHTML = `
        <div class="empty-cart-state">
          <svg class="empty-cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          <h3>Your Favorites List is Empty</h3>
          <p>Click the heart icon on any product to save it here for quick access.</p>
        </div>
      `;
      return;
    }

    body.innerHTML = this.favorites
      .map((id) => {
        const p = PRODUCTS_DATA.find((x) => x.id === id);
        if (!p) return "";
        return `
        <div class="cart-item-card" style="align-items: center;">
          <img src="${p.image}" alt="${p.title}" class="cart-item-img">
          <div class="cart-item-info">
            <h4 class="cart-item-title">${p.title}</h4>
            <div class="cart-item-price">₹${p.price.toLocaleString("en-IN")}</div>
            <div style="display: flex; gap: 8px; margin-top: 6px;">
              <button class="btn-amz-cart" style="padding: 5px 10px; font-size: 0.76rem;" data-fav-move-cart="${p.id}">Move to Cart</button>
              <button class="btn-amz-buy" style="padding: 5px 10px; font-size: 0.76rem;" data-fav-remove="${p.id}">Remove</button>
            </div>
          </div>
        </div>
      `;
      })
      .join("");

    document.querySelectorAll("[data-fav-move-cart]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-fav-move-cart");
        this.addToCart(id, 1);
        this.toggleFavorite(id);
      });
    });

    document.querySelectorAll("[data-fav-remove]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-fav-remove");
        this.toggleFavorite(id);
      });
    });
  }

  openFavoritesDrawer() {
    this.renderFavoritesDrawer();
    const overlay = document.getElementById("wishlistModalOverlay");
    if (overlay) overlay.classList.add("open");
    this.lockBodyScroll();
  }

  closeFavoritesDrawer() {
    const overlay = document.getElementById("wishlistModalOverlay");
    if (overlay) overlay.classList.remove("open");
    this.unlockBodyScroll();
  }

  // ==========================================================
  // STATIC CHECKOUT MODAL & PAYMENT FLOATING WINDOW
  // ==========================================================
  openCheckoutModal(step = 1) {
    const totals = this.getCalculatedTotals();
    if (step === 1 && totals.count === 0) {
      this.showToast("Your cart is empty! Add products to proceed.");
      return;
    }

    this.currentCheckoutStep = step;
    this.checkoutData = this.checkoutData || {};
    this.isMobileSummaryOpen = false;

    const modal = document.getElementById("checkoutModalOverlay");
    if (modal) {
      modal.classList.add("open");
      this.lockBodyScroll();
    }

    this.renderCheckoutCurrentStep();
  }

  renderCheckoutCurrentStep() {
    const container = document.getElementById("checkoutModalContent");
    if (!container) return;

    const step = this.currentCheckoutStep || 1;
    const totals = (step === 2 && this.confirmedTotals) ? this.confirmedTotals : this.getCalculatedTotals();

    // Mobile Collapsible Summary Toggle Strip (Step 1 only)
    const mobileSummaryStripHtml = step === 2 ? "" : `
      <button type="button" class="checkout-mobile-summary-strip ${this.isMobileSummaryOpen ? 'expanded' : ''}" id="checkoutMobileSummaryToggle" aria-expanded="${this.isMobileSummaryOpen}">
        <div class="cms-left">
          <span class="cms-cart-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            ${totals.count}
          </span>
          <span id="cmsLabelText">${this.isMobileSummaryOpen ? 'Hide order summary' : 'Show order summary'}</span>
          <svg class="cms-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="cms-right">
          <span class="cms-total">₹${totals.totalFinal.toLocaleString("en-IN")}</span>
        </div>
      </button>
    `;

    // Stepper Progress Bar (2-step: Order Details -> Order Received)
    const stepperHtml = `
      <div class="checkout-stepper-bar">
        <div class="step-pill ${step >= 1 ? (step > 1 ? 'completed' : 'active') : ''}">
          <span class="step-badge">${step > 1 ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : '1'}</span>
          <span class="step-title">Order Details</span>
        </div>
        <div class="step-line ${step >= 2 ? 'filled' : ''}"></div>
        <div class="step-pill ${step === 2 ? 'active completed' : ''}">
          <span class="step-badge">${step === 2 ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : '2'}</span>
          <span class="step-title">Order Received</span>
        </div>
      </div>
    `;

    // Flow Content for Active Step
    let stepContentHtml = "";
    if (step === 1) {
      stepContentHtml = this.getStep1FormHtml(totals);
    } else {
      stepContentHtml = this.getStep2ConfirmationHtml(totals);
    }

    const summarySidebarHtml = this.renderOrderSummaryHtml(totals);

    container.innerHTML = `
      ${mobileSummaryStripHtml}
      ${stepperHtml}
      <div class="checkout-main-grid">
        <div class="checkout-flow-column">
          ${stepContentHtml}
        </div>
        <div class="checkout-summary-column ${this.isMobileSummaryOpen ? 'mobile-open' : ''}" id="checkoutSummaryColumn">
          ${summarySidebarHtml}
        </div>
      </div>
    `;

    this.bindCheckoutEventListeners(step);
  }

  renderOrderSummaryHtml(totals) {
    const itemsHtml = this.cart
      .map((item) => {
        const p = PRODUCTS_DATA.find((x) => x.id === item.id) || {
          title: "Sukoon Wellness Item",
          price: 599,
          mrp: 999,
          image: "assets/hero.webp"
        };
        return `
          <div class="checkout-summary-item">
            <div class="summary-item-img-wrap">
              <img src="${p.image}" alt="${p.title}">
              <span class="summary-item-qty">${item.qty}</span>
            </div>
            <div class="summary-item-details">
              <h4 class="summary-item-title">${p.title}</h4>
              ${item.variant ? `<div class="summary-item-variant">Variant: ${item.variant}</div>` : ""}
              <div class="summary-item-price-row">
                <span class="summary-item-price">₹${(p.price * item.qty).toLocaleString("en-IN")}</span>
                ${p.mrp > p.price ? `<span class="summary-item-mrp">₹${(p.mrp * item.qty).toLocaleString("en-IN")}</span>` : ""}
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    return `
      <div class="checkout-summary-head">
        <h3 class="checkout-summary-title">Order Summary</h3>
        <span class="checkout-summary-badge">${totals.count} ${totals.count === 1 ? "item" : "items"}</span>
      </div>

      <div class="checkout-summary-items-list">
        ${itemsHtml}
      </div>

      <div class="checkout-summary-breakdown">
        <div class="breakdown-row">
          <span>Subtotal (MRP)</span>
          <span class="strikethrough-mrp">₹${totals.subtotalMrp.toLocaleString("en-IN")}</span>
        </div>
        <div class="breakdown-row">
          <span>Sukoon Price</span>
          <span>₹${totals.subtotalDeal.toLocaleString("en-IN")}</span>
        </div>
        <div class="breakdown-row">
          <span>Delivery Charges</span>
          <span class="free-delivery-badge">FREE</span>
        </div>
        <div class="breakdown-divider"></div>
        <div class="breakdown-total-row">
          <span>Total Payable</span>
          <span class="total-payable-amount">₹${totals.totalFinal.toLocaleString("en-IN")}</span>
        </div>
        <div class="total-savings-tag">
          You're saving ₹${totals.totalSavings.toLocaleString("en-IN")} on this order
        </div>
      </div>
    `;
  }

  getStep1FormHtml(totals) {
    const data = this.checkoutData || {};
    return `
      <h3 class="checkout-form-title">Delivery & Contact Details</h3>
      <p class="checkout-form-subtitle">
        Enter delivery address to receive your Sukoon wellness package. Your order will be placed directly with our team.
      </p>

      <form id="checkoutFormStep1" class="checkout-form-grid">
        <div class="two-col">
          <div class="field">
            <label for="chk-name">Full Name *</label>
            <input id="chk-name" name="name" type="text" required placeholder="e.g. Aarav Sharma" value="${data.name || ""}">
          </div>
          <div class="field">
            <label for="chk-phone">Mobile / WhatsApp Number *</label>
            <div class="phone-input-wrap">
              <span class="phone-prefix">+91</span>
              <input id="chk-phone" name="phone" type="tel" required placeholder="98765 43210" pattern="[0-9]{10}" maxlength="10" value="${data.phone || ""}">
            </div>
          </div>
        </div>

        <div class="field">
          <label for="chk-email">Email Address (For Order Confirmation & Updates) *</label>
          <input id="chk-email" name="email" type="email" required placeholder="aarav@example.com" value="${data.email || ""}">
        </div>

        <div class="field">
          <label for="chk-address">Delivery Address (House / Flat / Street / Landmark) *</label>
          <input id="chk-address" name="address" type="text" required placeholder="e.g. 402, Lotus Residency, MG Road" value="${data.address || ""}">
        </div>

        <div class="two-col keep-two-col-mobile">
          <div class="field">
            <label for="chk-city">City / District *</label>
            <input id="chk-city" name="city" type="text" required placeholder="e.g. Mumbai" value="${data.city || ""}">
          </div>
          <div class="field">
            <label for="chk-pincode">PIN Code *</label>
            <input id="chk-pincode" name="pincode" type="text" required placeholder="6-digit PIN" maxlength="6" pattern="[0-9]{6}" value="${data.pincode || ""}">
          </div>
        </div>

        <div class="field">
          <label for="chk-notes">Delivery Note / Gift Message (Optional)</label>
          <textarea id="chk-notes" name="notes" placeholder="Optional delivery instructions (e.g. Leave with security, call before arrival)">${data.notes || ""}</textarea>
        </div>

        <div class="checkout-bottom-sticky-bar">
          <button type="submit" class="btn-checkout-primary" id="btnPlaceOrder">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            <span id="btnPlaceOrderText">Place Order (₹${totals.totalFinal.toLocaleString("en-IN")})</span>
          </button>
        </div>
      </form>
    `;
  }

  getStep2ConfirmationHtml(totals) {
    const orderId = this.confirmedOrderId || ("OD-SUKOON-" + Math.floor(100000 + Math.random() * 900000));
    const data = this.confirmedOrderData || this.checkoutData || {};
    const now = new Date();
    const estDelivery = new Date(now.getTime() + 3 * 24 * 3600 * 1000).toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric"
    });

    return `
      <div class="order-success-container">
        <div class="success-check-circle">
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3 class="order-success-title">Order Received Successfully!</h3>
        <p style="font-size: 0.94rem; color: var(--ink-soft); margin-bottom: 14px; line-height: 1.5;">
          Thank you, <strong>${data.customerName || data.name || "Customer"}</strong>. Your order has been placed and recorded into our system.
        </p>

        <div class="order-id-chip-row">
          <span class="order-id-badge">Order ID: ${orderId}</span>
          <button type="button" class="btn-copy-order-id" id="btnCopyOrderId" data-order-id="${orderId}">Copy</button>
        </div>

        <!-- Google Sheet Sync Status Indicator -->
        <div class="order-sync-badge">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Order recorded & synced with Google Sheets</span>
        </div>

        <!-- Receipt / Customer Details Card -->
        <div class="order-receipt-card" style="margin-top: 18px;">
          <div class="receipt-heading">Delivery & Order Summary</div>
          <div class="receipt-info-grid">
            <div class="receipt-info-item">
              <strong>Customer Name</strong>
              <span>${data.customerName || data.name || "Customer"}</span>
            </div>
            <div class="receipt-info-item">
              <strong>Phone / WhatsApp</strong>
              <span>+91 ${data.phone || ""}</span>
            </div>
            <div class="receipt-info-item">
              <strong>Confirmation Email</strong>
              <span>${data.email || ""}</span>
            </div>
            <div class="receipt-info-item">
              <strong>Estimated Arrival</strong>
              <span>By ${estDelivery}</span>
            </div>
            <div class="receipt-info-item" style="grid-column: 1 / -1;">
              <strong>Delivery Address</strong>
              <span>${data.address || ""}, ${data.city || ""} - ${data.pincode || ""}</span>
            </div>
            ${data.notes ? `
              <div class="receipt-info-item" style="grid-column: 1 / -1;">
                <strong>Order Instructions</strong>
                <span>${data.notes}</span>
              </div>
            ` : ""}
          </div>
        </div>

        <!-- Support / WhatsApp contact box -->
        <div class="order-contact-card">
          <div class="contact-card-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <div class="contact-card-text">
            <strong>What happens next?</strong>
            <p>Our wellness fulfillment team will contact you via WhatsApp / Call on <strong>+91 ${data.phone || ""}</strong> to confirm dispatch details.</p>
          </div>
        </div>

        <div class="checkout-btn-row" style="justify-content: center; margin-top: 22px;">
          <button type="button" class="btn-checkout-primary" id="checkoutFinishBtn" style="max-width: 280px;">
            <span>Continue Shopping</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
    `;
  }

  async submitOrder(formData) {
    const btn = document.getElementById("btnPlaceOrder");
    const btnText = document.getElementById("btnPlaceOrderText");
    if (btn) {
      btn.disabled = true;
      btn.style.opacity = "0.75";
      if (btnText) {
        btnText.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 0.8s linear infinite; vertical-align: middle; margin-right: 6px;"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>
          Recording Order...
        `;
      }
    }

    const totals = this.getCalculatedTotals();
    const orderId = "OD-SUKOON-" + Math.floor(100000 + Math.random() * 900000);
    const now = new Date();

    const itemsList = this.cart.map((item) => {
      const p = PRODUCTS_DATA.find((x) => x.id === item.id) || { title: item.id, price: 0 };
      return `${p.title}${item.variant ? ` (${item.variant})` : ""} x ${item.qty} (₹${(p.price * item.qty).toLocaleString("en-IN")})`;
    });

    const orderPayload = {
      form_type: "order",
      orderId: orderId,
      timestamp: now.toISOString(),
      submitted_at: now.toISOString(),
      date: now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      customerName: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      pincode: formData.pincode,
      notes: formData.notes || "",
      itemsSummary: itemsList.join(" | "),
      totalItems: totals.count,
      totalAmount: `₹${totals.totalFinal.toLocaleString("en-IN")}`,
      orderStatus: "New Order (Pending Fulfillment)"
    };

    // 1. Save locally in localStorage so orders are never lost
    try {
      const orders = this.loadStorage("sukoon_orders", []);
      orders.unshift(orderPayload);
      this.saveStorage("sukoon_orders", orders);
    } catch (e) {
      console.warn("Storage write error:", e);
    }

    // 2. Submit to single Google Sheet via Google Apps Script Web App
    try {
      const endpoint = window.SUKOON_SHEET_ENDPOINT || GOOGLE_SHEETS_ORDERS_URL;
      if (endpoint && !endpoint.includes("PASTE_YOUR") && !endpoint.includes("SUKOON_SAATHI_ORDERS_WEBAPP")) {
        await fetch(endpoint, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8"
          },
          body: JSON.stringify(orderPayload)
        });
        console.log("Order saved to Google Sheets:", orderId);
      } else {
        console.log("Order recorded locally. Update window.SUKOON_SHEET_ENDPOINT in js/main.js to sync live with Google Sheets. Payload:", orderPayload);
      }
    } catch (err) {
      console.warn("Google Sheets submission notice (network):", err);
    }

    // 3. Clear cart and navigate to order confirmed screen
    this.confirmedOrderId = orderId;
    this.confirmedOrderData = orderPayload;
    this.confirmedTotals = { ...totals };
    this.cart = [];
    this.appliedCoupon = null;
    localStorage.removeItem("sukoon_cart");
    localStorage.removeItem("sukoon_coupon");
    this.updateCounters();

    this.currentCheckoutStep = 2;
    this.renderCheckoutCurrentStep();
  }

  bindCheckoutEventListeners(step) {
    // 1. Mobile Summary Toggle
    const mobileSummaryToggle = document.getElementById("checkoutMobileSummaryToggle");
    const summaryCol = document.getElementById("checkoutSummaryColumn");
    const labelText = document.getElementById("cmsLabelText");

    if (mobileSummaryToggle && summaryCol) {
      mobileSummaryToggle.addEventListener("click", () => {
        this.isMobileSummaryOpen = !this.isMobileSummaryOpen;
        mobileSummaryToggle.classList.toggle("expanded", this.isMobileSummaryOpen);
        summaryCol.classList.toggle("mobile-open", this.isMobileSummaryOpen);
        if (labelText) {
          labelText.textContent = this.isMobileSummaryOpen ? "Hide order summary" : "Show order summary";
        }
      });
    }

    // 2. Step 1: Form submission -> Submit to Google Sheets
    if (step === 1) {
      document.getElementById("checkoutFormStep1")?.addEventListener("submit", (e) => {
        e.preventDefault();
        const form = e.target;
        const data = Object.fromEntries(new FormData(form).entries());
        this.checkoutData = data;
        this.submitOrder(data);
      });
    }

    // 3. Step 2: Confirmation actions
    if (step === 2) {
      document.getElementById("btnCopyOrderId")?.addEventListener("click", (e) => {
        const orderId = e.currentTarget.getAttribute("data-order-id");
        if (orderId) {
          navigator.clipboard?.writeText(orderId);
          e.currentTarget.textContent = "Copied!";
          this.showToast("Order ID copied to clipboard!");
          setTimeout(() => {
            e.currentTarget.textContent = "Copy";
          }, 2000);
        }
      });

      document.getElementById("checkoutFinishBtn")?.addEventListener("click", () => {
        this.closeCheckoutModal();
        location.hash = "#products";
      });
    }
  }

  closeCheckoutModal() {
    const modal = document.getElementById("checkoutModalOverlay");
    if (modal) modal.classList.remove("open");
    this.unlockBodyScroll();
    this.currentCheckoutStep = 1;
    this.isMobileSummaryOpen = false;
  }

  // Reset Search
  resetAllFilters() {
    this.searchQuery = "";
    const searchInput = document.getElementById("storeSearchInput");
    if (searchInput) searchInput.value = "";
    document.getElementById("searchClearBtn")?.classList.remove("visible");

    this.renderProductsGrid();
  }

  // Bind Events
  bindEvents() {
    // Search
    const searchInput = document.getElementById("storeSearchInput");
    const clearBtn = document.getElementById("searchClearBtn");

    searchInput?.addEventListener("input", (e) => {
      this.searchQuery = e.target.value.trim();
      clearBtn?.classList.toggle("visible", this.searchQuery.length > 0);
      this.renderProductsGrid();
    });

    clearBtn?.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      this.searchQuery = "";
      clearBtn.classList.remove("visible");
      this.renderProductsGrid();
    });


    // Grid Clicks (Delegation)
    const grid = document.getElementById("amazonProductsGrid");
    grid?.addEventListener("click", (e) => {
      const card = e.target.closest(".amz-card");
      if (!card) return;
      const id = card.getAttribute("data-product-id");

      // Buy now
      const buyBtn = e.target.closest("[data-buy-now]");
      if (buyBtn) {
        e.stopPropagation();
        this.cart = [];
        this.addToCart(id, 1);
        this.openCheckoutModal();
        return;
      }

      // Open PDP
      if (
        e.target.closest("[data-open-pdp]") ||
        e.target.closest(".amz-card-img-box") ||
        e.target.closest(".amz-card-title")
      ) {
        this.openPdpModal(id);
      }
    });

    // PDP Close
    document.getElementById("pdpModalCloseBtn")?.addEventListener("click", () => {
      this.closePdpModal();
    });
    document.getElementById("pdpModalOverlay")?.addEventListener("click", (e) => {
      if (e.target.id === "pdpModalOverlay") this.closePdpModal();
    });

    // Checkout Close
    document.getElementById("checkoutCloseBtn")?.addEventListener("click", () => {
      this.closeCheckoutModal();
    });
    document.getElementById("checkoutModalOverlay")?.addEventListener("click", (e) => {
      if (e.target.id === "checkoutModalOverlay") this.closeCheckoutModal();
    });

    // Backdrop wheel and touchmove prevention to avoid background scroll bleed
    const overlayBackdrops = [
      "pdpModalOverlay",
      "checkoutModalOverlay",
      "cartDrawerOverlay",
      "wishlistModalOverlay"
    ];

    overlayBackdrops.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const stopBackdropScroll = (e) => {
        const scrollable = e.target.closest(
          ".checkout-modal-body, .checkout-flow-column, .checkout-summary-column, .cart-drawer-body, .pdp-modal-container, .wishlist-drawer-body"
        );
        if (!scrollable) {
          if (e.cancelable) e.preventDefault();
        }
      };

      el.addEventListener("wheel", stopBackdropScroll, { passive: false });
      el.addEventListener("touchmove", stopBackdropScroll, { passive: false });
    });

    // Escape listener
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closePdpModal();
        this.closeCartDrawer();
        this.closeFavoritesDrawer();
        this.closeCheckoutModal();
      }
    });
  }
}

// Global initialization
let sukoonStoreInstance = null;
document.addEventListener("DOMContentLoaded", () => {
  sukoonStoreInstance = new SukoonStore();
  window.sukoonStore = sukoonStoreInstance;
});
