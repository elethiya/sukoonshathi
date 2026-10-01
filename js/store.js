// ==========================================================
// Sukoon Saathi — E-Commerce Store Engine
// Amazon & Flipkart Inspired Static Shopping Experience
// Pure Frontend · Zero Backend Required · LocalStorage State
// Icons Only · Zero Emojis · Tangible & Digital Wellness Items
// ==========================================================

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
    this.showToast(`Added <strong>${prod.title}</strong> to cart!`);
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
        const starsHtml = this.renderStars(p.rating);

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

            <!-- Rating -->
            <div class="amz-rating-row" data-open-pdp="${p.id}">
              <div class="star-rating-stars">${starsHtml}</div>
              <span class="star-rating-val">${p.rating}</span>
              <span class="star-rating-count">(${p.reviewsCount})</span>
            </div>

            <!-- Price -->
            <div class="amz-price-box">
              <span class="amz-deal-price">₹${p.price.toLocaleString("en-IN")}</span>
              <span class="amz-mrp-price">M.R.P.: ₹${p.mrp.toLocaleString("en-IN")}</span>
              <span class="amz-discount-pill">${p.discountPercent}% OFF</span>
            </div>

            <!-- Delivery info -->
            <div class="amz-delivery-info">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1f5c4f" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              <span>${p.deliveryInfo}</span>
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

    const starsHtml = this.renderStars(prod.rating);
    const bundleProd = prod.bundleWithId ? PRODUCTS_DATA.find((p) => p.id === prod.bundleWithId) : null;
    const bundlePrice = bundleProd ? prod.price + bundleProd.price - 120 : 0;

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

          <!-- Ratings line -->
          <div class="pdp-ratings-line">
            <div class="star-rating-stars">${starsHtml}</div>
            <strong style="color: var(--forest);">${prod.rating}</strong>
            <span style="color: var(--ink-soft);">| ${prod.reviewsCount} verified customer reviews</span>
            <span class="pdp-verified-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              Sukoon Verified
            </span>
          </div>

          <!-- Product Status Banner -->
          <div class="pdp-deal-banner">
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
            <div class="pdp-tax-note">Inclusive of all applicable taxes · Free doorstep shipping</div>
          </div>

          <!-- Available Offers Box (Flipkart/Amazon style) -->
          <div class="pdp-offers-box">
            <div class="offers-box-title">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m20.59 13.41-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
              Available Store Offers
            </div>
            <ul class="offers-list">
              <li><strong>Coupon Offer:</strong> Apply code <strong>SUKOON15</strong> at checkout for 15% instant savings.</li>
              <li><strong>First Order Offer:</strong> Apply code <strong>FIRST50</strong> for flat ₹50 off on this purchase.</li>
              <li><strong>Delivery Promise:</strong> Dispatched in tamper-evident protective box with free returns.</li>
            </ul>
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

          <!-- Pincode Checker -->
          <div class="pdp-pincode-box">
            <div class="pincode-input-row">
              <input type="text" class="pincode-input" id="pdpPincodeInput" placeholder="Enter 6-digit PIN code for delivery estimate" maxlength="6">
              <button class="pincode-check-btn" id="pdpPincodeCheckBtn">Check</button>
            </div>
            <div class="pincode-result" id="pdpPincodeResult">
              Free Express Delivery available for your location in 2-3 business days.
            </div>
          </div>

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

          <!-- Assurance Badges (Amazon A+ style) -->
          <div class="pdp-assurances-grid">
            <div class="assurance-chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <span>100% Safe Checkout</span>
            </div>
            <div class="assurance-chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
              <span>Quality Verified</span>
            </div>
            <div class="assurance-chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>
              <span>7-Day Replacement</span>
            </div>
            <div class="assurance-chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              <span>Pan-India Delivery</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Frequently Bought Together Bundle -->
      ${
        bundleProd
          ? `
        <div class="bundle-box">
          <h4 class="bundle-title">Frequently Bought Together</h4>
          <div class="bundle-items-row">
            <div class="bundle-item-card">
              <img src="${prod.image}" alt="${prod.title}">
              <div>
                <strong style="font-size: 0.85rem; color: var(--forest);">${prod.title}</strong>
                <div style="font-size: 0.8rem; color: var(--ink-soft);">₹${prod.price}</div>
              </div>
            </div>
            <span class="bundle-plus">+</span>
            <div class="bundle-item-card">
              <img src="${bundleProd.image}" alt="${bundleProd.title}">
              <div>
                <strong style="font-size: 0.85rem; color: var(--forest);">${bundleProd.title}</strong>
                <div style="font-size: 0.8rem; color: var(--ink-soft);">₹${bundleProd.price}</div>
              </div>
            </div>
            <div class="bundle-pricing">
              <div class="bundle-price-text">Bundle Price: <strong class="bundle-price-val">₹${bundlePrice.toLocaleString("en-IN")}</strong></div>
              <div style="font-size: 0.76rem; color: #1f5c4f; font-weight: 600;">Save extra ₹120 combo discount</div>
              <button class="bundle-btn" id="pdpAddBundleBtn" data-bundle-p1="${prod.id}" data-bundle-p2="${bundleProd.id}">
                Buy Both (Save ₹120)
              </button>
            </div>
          </div>
        </div>
      `
          : ""
      }

      <!-- Detailed Tabs -->
      <div class="pdp-tabs-wrap">
        <div class="pdp-tab-headers">
          <button class="pdp-tab-btn active" data-pdp-tab="tab-overview">Overview & Highlights</button>
          <button class="pdp-tab-btn" data-pdp-tab="tab-specs">Product Specifications</button>
          <button class="pdp-tab-btn" data-pdp-tab="tab-reviews">Customer Reviews (${prod.reviewsCount})</button>
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

        <!-- Tab 3: Customer Reviews (Amazon Breakdown) -->
        <div class="pdp-tab-panel" id="tab-reviews">
          <div class="reviews-breakdown-row">
            <div class="overall-score-box">
              <div class="score-num">${prod.rating}</div>
              <div class="score-stars">${starsHtml}</div>
              <div class="score-total">Based on ${prod.reviewsCount} customer reviews</div>
            </div>
            <div class="rating-bars-list">
              <div class="rating-bar-item">
                <span class="bar-label">5 star</span>
                <div class="bar-track"><div class="bar-fill" style="width: 86%;"></div></div>
                <span class="bar-pct">86%</span>
              </div>
              <div class="rating-bar-item">
                <span class="bar-label">4 star</span>
                <div class="bar-track"><div class="bar-fill" style="width: 10%;"></div></div>
                <span class="bar-pct">10%</span>
              </div>
              <div class="rating-bar-item">
                <span class="bar-label">3 star</span>
                <div class="bar-track"><div class="bar-fill" style="width: 3%;"></div></div>
                <span class="bar-pct">3%</span>
              </div>
              <div class="rating-bar-item">
                <span class="bar-label">2 star</span>
                <div class="bar-track"><div class="bar-fill" style="width: 1%;"></div></div>
                <span class="bar-pct">1%</span>
              </div>
              <div class="rating-bar-item">
                <span class="bar-label">1 star</span>
                <div class="bar-track"><div class="bar-fill" style="width: 0%;"></div></div>
                <span class="bar-pct">0%</span>
              </div>
            </div>
          </div>

          <div class="verified-reviews-list">
            ${prod.reviews
              .map(
                (r) => `
              <div class="verified-review-card">
                <div class="review-author-line">
                  <div class="author-avatar">${r.name.charAt(0)}</div>
                  <div>
                    <span class="author-name">${r.name}</span>
                    <span class="verified-pill">Verified Purchase</span>
                  </div>
                  <span style="margin-left: auto; font-size: 0.76rem; color: var(--ink-soft);">${r.date}</span>
                </div>
                <div class="star-rating-stars" style="margin-bottom: 6px;">${this.renderStars(r.rating)}</div>
                <strong style="font-size: 0.92rem; color: var(--forest);">${r.title}</strong>
                <p class="review-text">${r.body}</p>
                <button class="review-helpful-btn" onclick="this.textContent = 'Helpful (' + (${r.helpful} + 1) + ')'; this.disabled = true;">
                  Helpful (${r.helpful})
                </button>
              </div>
            `
              )
              .join("")}
          </div>
        </div>

        <!-- Tab 4: FAQ -->
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
    document.body.style.overflow = "hidden";
  }

  closePdpModal() {
    const modal = document.getElementById("pdpModalOverlay");
    if (modal) modal.classList.remove("open");
    document.body.style.overflow = "";
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

    // Pincode check
    document.getElementById("pdpPincodeCheckBtn")?.addEventListener("click", () => {
      const input = document.getElementById("pdpPincodeInput");
      const res = document.getElementById("pdpPincodeResult");
      if (!input || !res) return;
      if (input.value.trim().length >= 4) {
        res.classList.add("show");
        res.innerHTML = `Free Express Delivery verified for PIN <strong>${input.value.trim()}</strong>! Dispatched in 24 hours.`;
      } else {
        res.classList.add("show");
        res.innerHTML = `<span style="color:#b9382b;">Please enter a valid 6-digit PIN code.</span>`;
      }
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

    // Bundle
    document.getElementById("pdpAddBundleBtn")?.addEventListener("click", (e) => {
      const p1 = e.currentTarget.getAttribute("data-bundle-p1");
      const p2 = e.currentTarget.getAttribute("data-bundle-p2");
      if (p1 && p2) {
        this.cart = [];
        this.addToCart(p1, 1);
        this.addToCart(p2, 1);
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

      <!-- Coupon Promo Box -->
      <div class="cart-coupon-box" style="margin-top: 14px;">
        <div class="coupon-input-row">
          <input type="text" class="coupon-input" id="cartCouponInput" placeholder="Enter coupon code (SUKOON15)">
          <button class="coupon-apply-btn" id="cartCouponApplyBtn">Apply</button>
        </div>
        ${
          this.appliedCoupon
            ? `
          <div class="applied-coupon-pill">
            <span>Coupon <strong>${this.appliedCoupon.code}</strong> applied (-₹${totals.couponDiscount})</span>
            <button style="background:transparent; border:none; color:var(--forest); font-weight:700; cursor:pointer;" id="cartRemoveCouponBtn">&times;</button>
          </div>
        `
            : `
          <div class="coupon-chips-row">
            <span class="coupon-chip" data-quick-coupon="SUKOON15">Apply SUKOON15 (15% OFF)</span>
            <span class="coupon-chip" data-quick-coupon="FIRST50">FIRST50 (₹50 OFF)</span>
          </div>
        `
        }
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
        ${
          totals.couponDiscount > 0
            ? `
          <div class="cart-bill-row discount">
            <span>Coupon Discount (${this.appliedCoupon?.code})</span>
            <span>-₹${totals.couponDiscount.toLocaleString("en-IN")}</span>
          </div>
        `
            : ""
        }
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

    document.getElementById("cartCouponApplyBtn")?.addEventListener("click", () => {
      const code = document.getElementById("cartCouponInput")?.value;
      this.applyCoupon(code);
    });

    document.getElementById("cartRemoveCouponBtn")?.addEventListener("click", () => {
      this.removeCoupon();
    });

    document.querySelectorAll("[data-quick-coupon]").forEach((chip) => {
      chip.addEventListener("click", () => {
        const code = chip.getAttribute("data-quick-coupon");
        this.applyCoupon(code);
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
    document.body.style.overflow = "hidden";
  }

  closeCartDrawer() {
    const overlay = document.getElementById("cartDrawerOverlay");
    if (overlay) overlay.classList.remove("open");
    document.body.style.overflow = "";
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
    document.body.style.overflow = "hidden";
  }

  closeFavoritesDrawer() {
    const overlay = document.getElementById("wishlistModalOverlay");
    if (overlay) overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  // ==========================================================
  // STATIC CHECKOUT MODAL & PAYMENT FLOATING WINDOW
  // ==========================================================
  openCheckoutModal(step = 1) {
    const totals = this.getCalculatedTotals();
    if (totals.count === 0) {
      this.showToast("Your cart is empty! Add products to proceed.");
      return;
    }

    this.currentCheckoutStep = step;
    this.checkoutData = this.checkoutData || {};
    this.selectedPaymentMethod = this.selectedPaymentMethod || "upi";
    this.upiMode = this.upiMode || "qr";
    this.selectedBank = this.selectedBank || "HDFC Bank";
    this.isMobileSummaryOpen = false;

    const modal = document.getElementById("checkoutModalOverlay");
    if (modal) {
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    }

    this.renderCheckoutCurrentStep();
  }

  renderCheckoutCurrentStep() {
    const container = document.getElementById("checkoutModalContent");
    if (!container) return;

    const totals = this.getCalculatedTotals();
    const step = this.currentCheckoutStep || 1;

    // Mobile Collapsible Summary Toggle Strip
    const mobileSummaryStripHtml = `
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

    // Stepper Progress Bar
    const stepperHtml = `
      <div class="checkout-stepper-bar">
        <div class="step-pill ${step >= 1 ? (step > 1 ? 'completed' : 'active') : ''}">
          <span class="step-badge">${step > 1 ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : '1'}</span>
          <span class="step-title">Delivery Details</span>
        </div>
        <div class="step-line ${step >= 2 ? 'filled' : ''}"></div>
        <div class="step-pill ${step >= 2 ? (step > 2 ? 'completed' : 'active') : ''}">
          <span class="step-badge">${step > 2 ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : '2'}</span>
          <span class="step-title">Payment Method</span>
        </div>
        <div class="step-line ${step >= 3 ? 'filled' : ''}"></div>
        <div class="step-pill ${step === 3 ? 'active completed' : ''}">
          <span class="step-badge">${step === 3 ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : '3'}</span>
          <span class="step-title">Order Confirmed</span>
        </div>
      </div>
    `;

    // Flow Content for Active Step
    let stepContentHtml = "";
    if (step === 1) {
      stepContentHtml = this.getStep1FormHtml(totals);
    } else if (step === 2) {
      stepContentHtml = this.getStep2PaymentHtml(totals);
    } else {
      stepContentHtml = this.getStep3ConfirmationHtml(totals);
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

    const couponSectionHtml = this.appliedCoupon
      ? `
        <div class="checkout-coupon-applied-card">
          <div class="applied-coupon-info">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
            <span><strong>${this.appliedCoupon.code}</strong> applied (${this.appliedCoupon.discountPct ? `${this.appliedCoupon.discountPct}% OFF` : `₹${this.appliedCoupon.discountFlat} OFF`})</span>
          </div>
          <button type="button" class="btn-remove-coupon" id="checkoutRemoveCouponBtn" aria-label="Remove coupon">&times;</button>
        </div>
      `
      : `
        <div class="checkout-coupon-input-wrap">
          <input type="text" id="checkoutCouponInput" placeholder="Discount code (e.g. SUKOON15)" aria-label="Discount code">
          <button type="button" id="checkoutCouponApplyBtn">Apply</button>
        </div>
      `;

    return `
      <div class="checkout-summary-head">
        <h3 class="checkout-summary-title">Order Summary</h3>
        <span class="checkout-summary-badge">${totals.count} ${totals.count === 1 ? "item" : "items"}</span>
      </div>

      <div class="checkout-summary-items-list">
        ${itemsHtml}
      </div>

      <div class="checkout-summary-coupon-box">
        ${couponSectionHtml}
      </div>

      <div class="checkout-summary-breakdown">
        <div class="breakdown-row">
          <span>Subtotal (MRP)</span>
          <span class="strikethrough-mrp">₹${totals.subtotalMrp.toLocaleString("en-IN")}</span>
        </div>
        <div class="breakdown-row">
          <span>Sukoon Offer Price</span>
          <span>₹${totals.subtotalDeal.toLocaleString("en-IN")}</span>
        </div>
        ${totals.couponDiscount > 0 ? `
          <div class="breakdown-row discount-row">
            <span>Coupon Discount</span>
            <span>-₹${totals.couponDiscount.toLocaleString("en-IN")}</span>
          </div>
        ` : ""}
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

      <div class="checkout-summary-trust-strip">
        <div class="trust-item">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <span>7-Day Hassle-Free Replacement</span>
        </div>
        <div class="trust-item">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>Dispatches Within 24 Hours</span>
        </div>
        <div class="trust-item">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="20 6 9 17 4 12"/></svg>
          <span>100% Genuine Ayurvedic & Wellness</span>
        </div>
      </div>
    `;
  }

  getStep1FormHtml(totals) {
    const data = this.checkoutData || {};
    return `
      <h3 class="checkout-form-title">Shipping & Contact Details</h3>
      <p class="checkout-form-subtitle">
        Enter delivery address to receive your Sukoon wellness package and live tracking updates.
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
          <label for="chk-email">Email Address (For Tax Invoice & Updates) *</label>
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
          <textarea id="chk-notes" name="notes" placeholder="Optional delivery instructions (e.g. Leave with security, ring bell twice)">${data.notes || ""}</textarea>
        </div>

        <label class="checkout-checkbox-row">
          <input type="checkbox" id="chk-save-details" checked>
          <span>Save this delivery address for faster 1-click checkout</span>
        </label>

        <div class="checkout-bottom-sticky-bar">
          <button type="submit" class="btn-checkout-primary">
            <span>Continue to Payment (₹${totals.totalFinal.toLocaleString("en-IN")})</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </form>
    `;
  }

  getStep2PaymentHtml(totals) {
    const method = this.selectedPaymentMethod || "upi";
    const upiMode = this.upiMode || "qr";
    const selectedBank = this.selectedBank || "HDFC Bank";

    // Crisp Vector SVG QR Code Frame with Sukoon Leaf Emblem
    const qrSvg = `
      <svg viewBox="0 0 100 100" fill="var(--forest)">
        <rect x="5" y="5" width="26" height="26" fill="none" stroke="var(--forest)" stroke-width="3" rx="4"/>
        <rect x="11" y="11" width="14" height="14" rx="2"/>
        <rect x="69" y="5" width="26" height="26" fill="none" stroke="var(--forest)" stroke-width="3" rx="4"/>
        <rect x="75" y="11" width="14" height="14" rx="2"/>
        <rect x="5" y="69" width="26" height="26" fill="none" stroke="var(--forest)" stroke-width="3" rx="4"/>
        <rect x="11" y="75" width="14" height="14" rx="2"/>
        <rect x="36" y="8" width="5" height="5"/>
        <rect x="46" y="8" width="5" height="5"/>
        <rect x="56" y="8" width="5" height="5"/>
        <rect x="36" y="18" width="5" height="5"/>
        <rect x="46" y="18" width="10" height="5"/>
        <rect x="8" y="36" width="5" height="5"/>
        <rect x="18" y="36" width="5" height="5"/>
        <rect x="28" y="36" width="5" height="10"/>
        <rect x="8" y="46" width="10" height="5"/>
        <rect x="36" y="36" width="6" height="6"/>
        <rect x="58" y="36" width="6" height="6"/>
        <rect x="36" y="58" width="6" height="6"/>
        <rect x="58" y="58" width="6" height="6"/>
        <rect x="69" y="36" width="5" height="5"/>
        <rect x="79" y="36" width="10" height="5"/>
        <rect x="89" y="46" width="5" height="5"/>
        <rect x="69" y="46" width="5" height="10"/>
        <rect x="36" y="69" width="10" height="5"/>
        <rect x="56" y="69" width="5" height="10"/>
        <rect x="46" y="79" width="5" height="10"/>
        <rect x="69" y="69" width="5" height="5"/>
        <rect x="79" y="79" width="10" height="10"/>
        <circle cx="50" cy="50" r="13" fill="#fffdf8" stroke="var(--forest)" stroke-width="2"/>
        <path d="M47 54C47 50 53 46 53 46S55 52 50 55C48 56 47 55 47 54Z" fill="var(--forest)"/>
        <path d="M50 48C46 48 44 44 44 44S49 43 51 46C52 47 51 48 50 48Z" fill="#c9a35c"/>
      </svg>
    `;

    return `
      <h3 class="checkout-form-title">Select Payment Method</h3>
      <p class="checkout-form-subtitle">
        100% Encrypted & Safe Static Transaction Simulation. Choose an option:
      </p>

      <div class="payment-methods-accordion">
        <!-- 1. UPI / QR Code -->
        <div class="payment-method-item ${method === 'upi' ? 'active' : ''}" data-method="upi">
          <div class="payment-method-header">
            <div class="pm-header-left">
              <input type="radio" name="payMethodOption" value="upi" ${method === 'upi' ? 'checked' : ''} id="pm-upi">
              <div class="pm-title-wrap">
                <strong>UPI / Instant QR Code</strong>
                <span>Google Pay, PhonePe, Paytm, BHIM & CRED</span>
              </div>
            </div>
            <div class="pm-header-badges">
              <span class="pm-rec-tag">Recommended</span>
              <span class="pm-badge-chip">Zero Fee</span>
            </div>
          </div>
          <div class="payment-method-content">
            <div class="upi-mode-tabs">
              <button type="button" class="upi-tab-btn ${upiMode === 'qr' ? 'active' : ''}" data-upi-mode="qr">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                Scan Dynamic QR Code
              </button>
              <button type="button" class="upi-tab-btn ${upiMode === 'id' ? 'active' : ''}" data-upi-mode="id">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Enter UPI ID / VPA
              </button>
            </div>

            ${upiMode === 'qr' ? `
              <div class="upi-qr-card">
                <div class="qr-code-frame">
                  ${qrSvg}
                </div>
                <div class="qr-scan-hint">Scan with any UPI App to pay ₹${totals.totalFinal.toLocaleString("en-IN")}</div>
                <div class="qr-timer-pill">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span>QR Valid for 09:54</span>
                </div>
                <div class="upi-id-copy-row">
                  <span>VPA: sukoonshathi@okhdfcbank</span>
                  <button type="button" class="btn-copy-upi" id="btnCopyUpi">Copy</button>
                </div>
              </div>
            ` : `
              <div style="display: flex; flex-direction: column; gap: 10px;">
                <label style="font-size: 0.82rem; font-weight: 600; color: var(--forest);">Enter Virtual Payment Address (VPA):</label>
                <div style="display: flex; gap: 8px;">
                  <input type="text" id="chkUpiIdInput" placeholder="e.g. mobile@okaxis, yourname@upi" value="${this.enteredUpiId || ''}" style="flex: 1; height: 42px; border: 1.5px solid var(--line); border-radius: 8px; padding: 0 12px; font-size: 0.88rem;">
                  <button type="button" id="btnVerifyUpi" style="background: var(--forest); color: #fffdf8; border: none; border-radius: 8px; padding: 0 16px; font-size: 0.82rem; font-weight: 600; cursor: pointer;">Verify</button>
                </div>
                <span id="upiVerifyStatus" style="font-size: 0.76rem; color: var(--green); display: none;">✓ Verified Beneficiary: Sukoon Living Pvt Ltd</span>
              </div>
            `}
          </div>
        </div>

        <!-- 2. Cards -->
        <div class="payment-method-item ${method === 'card' ? 'active' : ''}" data-method="card">
          <div class="payment-method-header">
            <div class="pm-header-left">
              <input type="radio" name="payMethodOption" value="card" ${method === 'card' ? 'checked' : ''} id="pm-card">
              <div class="pm-title-wrap">
                <strong>Credit or Debit Card</strong>
                <span>Visa, MasterCard, RuPay, Maestro</span>
              </div>
            </div>
            <div class="pm-header-badges">
              <span class="pm-badge-chip">Cards</span>
            </div>
          </div>
          <div class="payment-method-content">
            <div class="card-fields-grid">
              <div class="field">
                <label style="font-size: 0.8rem; font-weight: 600; color: var(--forest);">Card Number</label>
                <input type="text" id="chkCardNum" placeholder="4532 8901 2345 6789" maxlength="19" value="${this.enteredCardNum || ''}" style="height: 42px; font-family: monospace; letter-spacing: 1px;">
              </div>
              <div class="card-field-row">
                <div class="field">
                  <label style="font-size: 0.8rem; font-weight: 600; color: var(--forest);">Expiry Date</label>
                  <input type="text" id="chkCardExpiry" placeholder="MM / YY" maxlength="7" value="${this.enteredCardExpiry || ''}" style="height: 42px;">
                </div>
                <div class="field">
                  <label style="font-size: 0.8rem; font-weight: 600; color: var(--forest);">CVV / CVC</label>
                  <input type="password" id="chkCardCvv" placeholder="•••" maxlength="4" value="${this.enteredCardCvv || ''}" style="height: 42px;">
                </div>
              </div>
              <div class="field">
                <label style="font-size: 0.8rem; font-weight: 600; color: var(--forest);">Name on Card</label>
                <input type="text" id="chkCardName" placeholder="Cardholder Name" value="${this.enteredCardName || (this.checkoutData?.name || '')}" style="height: 42px;">
              </div>
              <div class="card-security-note">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span>Encrypted 256-bit SSL transaction. Card details never stored.</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Net Banking -->
        <div class="payment-method-item ${method === 'netbanking' ? 'active' : ''}" data-method="netbanking">
          <div class="payment-method-header">
            <div class="pm-header-left">
              <input type="radio" name="payMethodOption" value="netbanking" ${method === 'netbanking' ? 'checked' : ''} id="pm-netbanking">
              <div class="pm-title-wrap">
                <strong>Net Banking</strong>
                <span>All Major Indian Public & Private Banks</span>
              </div>
            </div>
            <div class="pm-header-badges">
              <span class="pm-badge-chip">50+ Banks</span>
            </div>
          </div>
          <div class="payment-method-content">
            <div style="font-size: 0.8rem; font-weight: 600; color: var(--forest); margin-bottom: 8px;">Popular Indian Banks:</div>
            <div class="bank-quick-grid">
              ${["HDFC Bank", "State Bank of India", "ICICI Bank", "Axis Bank", "Kotak Mahindra", "Punjab National"].map((b) => `
                <button type="button" class="bank-select-btn ${selectedBank === b ? 'active' : ''}" data-bank-name="${b}">
                  ${b}
                </button>
              `).join("")}
            </div>
            <select id="otherBanksSelect" style="width: 100%; height: 40px; border: 1.5px solid var(--line); border-radius: 8px; font-size: 0.84rem; background: #fffdf8; padding: 0 10px;">
              <option value="">-- Or Select from Other Banks --</option>
              <option value="Bank of Baroda">Bank of Baroda</option>
              <option value="Canara Bank">Canara Bank</option>
              <option value="Union Bank of India">Union Bank of India</option>
              <option value="IndusInd Bank">IndusInd Bank</option>
              <option value="IDBI Bank">IDBI Bank</option>
              <option value="Federal Bank">Federal Bank</option>
              <option value="Yes Bank">Yes Bank</option>
            </select>
          </div>
        </div>

        <!-- 4. Cash on Delivery (COD) -->
        <div class="payment-method-item ${method === 'cod' ? 'active' : ''}" data-method="cod">
          <div class="payment-method-header">
            <div class="pm-header-left">
              <input type="radio" name="payMethodOption" value="cod" ${method === 'cod' ? 'checked' : ''} id="pm-cod">
              <div class="pm-title-wrap">
                <strong>Cash on Delivery (COD)</strong>
                <span>Pay in Cash or Scan QR with delivery agent</span>
              </div>
            </div>
            <div class="pm-header-badges">
              <span class="pm-badge-chip">Pay on Arrival</span>
            </div>
          </div>
          <div class="payment-method-content">
            <div class="cod-reassurance-box">
              <div class="cod-check-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div class="cod-text">
                <strong>Free Doorstep Verification:</strong>
                <p>No prepayment needed. Pay via Cash or UPI directly to the Blue Dart / Delhivery courier partner upon physical parcel receipt.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="checkout-guarantee-banner">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <div>
          <strong>Sukoon Saathi Buyer Protection:</strong>
          Free 7-day hassle-free replacement if damaged during transit. 100% genuine guaranteed.
        </div>
      </div>

      <div class="checkout-bottom-sticky-bar">
        <div class="checkout-btn-row">
          <button type="button" class="btn-checkout-primary" id="checkoutConfirmOrderBtn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span>Confirm Order & Pay ₹${totals.totalFinal.toLocaleString("en-IN")}</span>
          </button>
          <button type="button" class="btn-checkout-secondary" id="checkoutBackStep1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            <span>Back</span>
          </button>
        </div>
      </div>
    `;
  }

  getStep3ConfirmationHtml(totals) {
    const orderId = this.confirmedOrderId || ("OD-SUKOON-" + Math.floor(100000 + Math.random() * 900000));
    const now = new Date();
    const estDelivery = new Date(now.getTime() + 3 * 24 * 3600 * 1000).toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric"
    });

    const paymentLabel = {
      upi: "UPI / Instant QR",
      card: "Credit / Debit Card",
      netbanking: `Net Banking (${this.selectedBank || "HDFC Bank"})`,
      cod: "Cash on Delivery (Doorstep)"
    }[this.selectedPaymentMethod || "upi"];

    return `
      <div class="order-success-container">
        <div class="success-check-circle">
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3 class="order-success-title">Order Placed Successfully!</h3>
        <p style="font-size: 0.94rem; color: var(--ink-soft); margin-bottom: 12px;">
          Thank you <strong>${this.checkoutData?.name || "Customer"}</strong>. Your order is confirmed and is being packaged for dispatch.
        </p>

        <div class="order-id-chip-row">
          <span class="order-id-badge">Order ID: ${orderId}</span>
          <button type="button" class="btn-copy-order-id" id="btnCopyOrderId" data-order-id="${orderId}">Copy</button>
        </div>

        <!-- Shipment tracker -->
        <div class="shipment-tracker-card">
          <div class="tracker-title">
            <span>Estimated Delivery Schedule</span>
            <span class="estimated-date-badge">By ${estDelivery}</span>
          </div>
          <div class="tracker-steps-row">
            <div class="tracker-step-dot done">
              <div class="dot-circle">✓</div>
              <span>Placed</span>
            </div>
            <div class="tracker-step-dot active">
              <div class="dot-circle">2</div>
              <span>Packed</span>
            </div>
            <div class="tracker-step-dot">
              <div class="dot-circle">3</div>
              <span>Dispatched</span>
            </div>
            <div class="tracker-step-dot">
              <div class="dot-circle">4</div>
              <span>Delivered</span>
            </div>
          </div>
        </div>

        <!-- Receipt Card -->
        <div class="order-receipt-card">
          <div class="receipt-heading">Delivery & Invoice Summary</div>
          <div class="receipt-info-grid">
            <div class="receipt-info-item">
              <strong>Delivery Address</strong>
              <span>${this.checkoutData?.address || "Address"}, ${this.checkoutData?.city || "City"} - ${this.checkoutData?.pincode || ""}</span>
            </div>
            <div class="receipt-info-item">
              <strong>Tracking Updates</strong>
              <span>+91 ${this.checkoutData?.phone || "Phone"}</span>
            </div>
            <div class="receipt-info-item">
              <strong>Invoice Dispatched To</strong>
              <span>${this.checkoutData?.email || "Email"}</span>
            </div>
            <div class="receipt-info-item">
              <strong>Payment Mode</strong>
              <span>${paymentLabel} (₹${totals.totalFinal.toLocaleString("en-IN")})</span>
            </div>
          </div>
        </div>

        <div class="checkout-btn-row" style="justify-content: center;">
          <button type="button" class="btn-checkout-primary" id="checkoutFinishBtn">
            <span>Continue Shopping</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <button type="button" class="btn-checkout-secondary" onclick="window.print()">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            <span>Print Tax Invoice</span>
          </button>
        </div>
      </div>
    `;
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

    // 2. Coupon Apply & Remove
    document.getElementById("checkoutCouponApplyBtn")?.addEventListener("click", () => {
      const code = document.getElementById("checkoutCouponInput")?.value;
      if (this.applyCoupon(code)) {
        this.renderCheckoutCurrentStep();
      }
    });

    document.getElementById("checkoutRemoveCouponBtn")?.addEventListener("click", () => {
      this.removeCoupon();
      this.renderCheckoutCurrentStep();
    });

    // 3. Step 1: Form submission
    if (step === 1) {
      document.getElementById("checkoutFormStep1")?.addEventListener("submit", (e) => {
        e.preventDefault();
        const form = e.target;
        const data = Object.fromEntries(new FormData(form).entries());
        this.checkoutData = data;
        this.currentCheckoutStep = 2;
        this.renderCheckoutCurrentStep();
      });
    }

    // 4. Step 2: Payment method selection & interactions
    if (step === 2) {
      // Payment method card radio selector
      document.querySelectorAll(".payment-method-item").forEach((item) => {
        item.addEventListener("click", (e) => {
          if (e.target.closest(".payment-method-content") && !e.target.classList.contains("payment-method-header")) {
            return;
          }
          const m = item.getAttribute("data-method");
          if (m) {
            this.selectedPaymentMethod = m;
            document.querySelectorAll(".payment-method-item").forEach((it) => it.classList.remove("active"));
            item.classList.add("active");
            const radio = item.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
          }
        });
      });

      // UPI tab switch
      document.querySelectorAll(".upi-tab-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const mode = btn.getAttribute("data-upi-mode");
          if (mode) {
            this.upiMode = mode;
            this.renderCheckoutCurrentStep();
          }
        });
      });

      // Copy UPI ID button
      document.getElementById("btnCopyUpi")?.addEventListener("click", (e) => {
        e.stopPropagation();
        const btn = e.target;
        navigator.clipboard?.writeText("sukoonshathi@okhdfcbank");
        const originalText = btn.textContent;
        btn.textContent = "Copied!";
        this.showToast("UPI ID copied to clipboard!");
        setTimeout(() => {
          btn.textContent = originalText;
        }, 2000);
      });

      // UPI Verify button
      document.getElementById("btnVerifyUpi")?.addEventListener("click", (e) => {
        e.stopPropagation();
        const val = document.getElementById("chkUpiIdInput")?.value?.trim();
        if (!val || !val.includes("@")) {
          this.showToast("Please enter a valid UPI ID (e.g. mobile@upi)");
          return;
        }
        this.enteredUpiId = val;
        const status = document.getElementById("upiVerifyStatus");
        if (status) status.style.display = "block";
        this.showToast("UPI ID verified successfully!");
      });

      // Card inputs auto-formatting
      const cardNumInput = document.getElementById("chkCardNum");
      cardNumInput?.addEventListener("input", (e) => {
        let val = e.target.value.replace(/\D/g, "");
        if (val.length > 16) val = val.substring(0, 16);
        const formatted = val.match(/.{1,4}/g)?.join(" ") || val;
        e.target.value = formatted;
        this.enteredCardNum = formatted;
      });

      document.getElementById("chkCardExpiry")?.addEventListener("input", (e) => {
        let val = e.target.value.replace(/\D/g, "");
        if (val.length > 4) val = val.substring(0, 4);
        if (val.length >= 3) {
          e.target.value = val.substring(0, 2) + " / " + val.substring(2);
        } else {
          e.target.value = val;
        }
        this.enteredCardExpiry = e.target.value;
      });

      // Bank quick selector
      document.querySelectorAll(".bank-select-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          document.querySelectorAll(".bank-select-btn").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          this.selectedBank = btn.getAttribute("data-bank-name");
        });
      });

      document.getElementById("otherBanksSelect")?.addEventListener("change", (e) => {
        if (e.target.value) {
          this.selectedBank = e.target.value;
          document.querySelectorAll(".bank-select-btn").forEach((b) => b.classList.remove("active"));
        }
      });

      // Back to step 1
      document.getElementById("checkoutBackStep1")?.addEventListener("click", () => {
        this.currentCheckoutStep = 1;
        this.renderCheckoutCurrentStep();
      });

      // Confirm & Pay
      document.getElementById("checkoutConfirmOrderBtn")?.addEventListener("click", () => {
        this.processOrderPlacement();
      });
    }

    // 5. Step 3: Confirmation actions
    if (step === 3) {
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

  processOrderPlacement() {
    const btn = document.getElementById("checkoutConfirmOrderBtn");
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 0.8s linear infinite;"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>
        <span>Securing Safe Payment...</span>
      `;
    }

    setTimeout(() => {
      this.confirmedOrderId = "OD-SUKOON-" + Math.floor(100000 + Math.random() * 900000);
      this.cart = [];
      this.appliedCoupon = null;
      localStorage.removeItem("sukoon_cart");
      localStorage.removeItem("sukoon_coupon");
      this.updateCounters();

      this.currentCheckoutStep = 3;
      this.renderCheckoutCurrentStep();
    }, 700);
  }

  closeCheckoutModal() {
    const modal = document.getElementById("checkoutModalOverlay");
    if (modal) modal.classList.remove("open");
    document.body.style.overflow = "";
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

    // Escape listener
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closePdpModal();
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
