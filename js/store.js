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
          <button class="pdp-tab-btn" data-pdp-tab="tab-reviews">Customer Reviews</button>
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

        <!-- Tab 3: Customer Reviews -->
        <div class="pdp-tab-panel" id="tab-reviews">
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

    const step = this.currentCheckoutStep || 1;
    const totals = (step === 3 && this.confirmedTotals) ? this.confirmedTotals : this.getCalculatedTotals();

    // Mobile Collapsible Summary Toggle Strip (Steps 1 & 2 only)
    const mobileSummaryStripHtml = step === 3 ? "" : `
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
          <textarea id="chk-notes" name="notes" placeholder="Optional delivery instructions (e.g. Leave with security, ring bell twice)">${data.notes || ""}</textarea>
        </div>

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

    let confirmBtnText = `Confirm Order & Pay ₹${totals.totalFinal.toLocaleString("en-IN")}`;
    if (method === "bank_transfer") {
      confirmBtnText = `Confirm via Bank Transfer (₹${totals.totalFinal.toLocaleString("en-IN")})`;
    } else if (method === "cod") {
      confirmBtnText = `Confirm Order (Cash on Delivery ₹${totals.totalFinal.toLocaleString("en-IN")})`;
    }

    return `
      <h3 class="checkout-form-title">Select Payment Method</h3>
      <p class="checkout-form-subtitle">
        Choose your preferred secure payment option below:
      </p>

      <div class="payment-methods-accordion">
        <!-- 1. UPI / Instant QR Code -->
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
                  <svg viewBox="0 0 37 37" class="real-upi-qr-svg" style="width: 100%; height: 100%; display: block;" xmlns="http://www.w3.org/2000/svg"><path d="M2,2H3V3H2zM3,2H4V3H3zM4,2H5V3H4zM5,2H6V3H5zM6,2H7V3H6zM7,2H8V3H7zM8,2H9V3H8zM10,2H11V3H10zM14,2H15V3H14zM15,2H16V3H15zM16,2H17V3H16zM17,2H18V3H17zM18,2H19V3H18zM20,2H21V3H20zM23,2H24V3H23zM24,2H25V3H24zM25,2H26V3H25zM28,2H29V3H28zM29,2H30V3H29zM30,2H31V3H30zM31,2H32V3H31zM32,2H33V3H32zM33,2H34V3H33zM34,2H35V3H34zM2,3H3V4H2zM8,3H9V4H8zM13,3H14V4H13zM14,3H15V4H14zM15,3H16V4H15zM16,3H17V4H16zM19,3H20V4H19zM21,3H22V4H21zM22,3H23V4H22zM23,3H24V4H23zM24,3H25V4H24zM28,3H29V4H28zM34,3H35V4H34zM2,4H3V5H2zM4,4H5V5H4zM5,4H6V5H5zM6,4H7V5H6zM8,4H9V5H8zM12,4H13V5H12zM14,4H15V5H14zM16,4H17V5H16zM17,4H18V5H17zM18,4H19V5H18zM19,4H20V5H19zM23,4H24V5H23zM25,4H26V5H25zM26,4H27V5H26zM28,4H29V5H28zM30,4H31V5H30zM31,4H32V5H31zM32,4H33V5H32zM34,4H35V5H34zM2,5H3V6H2zM4,5H5V6H4zM5,5H6V6H5zM6,5H7V6H6zM8,5H9V6H8zM10,5H11V6H10zM11,5H12V6H11zM12,5H13V6H12zM13,5H14V6H13zM18,5H19V6H18zM20,5H21V6H20zM21,5H22V6H21zM28,5H29V6H28zM30,5H31V6H30zM31,5H32V6H31zM32,5H33V6H32zM34,5H35V6H34zM2,6H3V7H2zM4,6H5V7H4zM5,6H6V7H5zM6,6H7V7H6zM8,6H9V7H8zM10,6H11V7H10zM12,6H13V7H12zM15,6H16V7H15zM18,6H19V7H18zM20,6H21V7H20zM22,6H23V7H22zM25,6H26V7H25zM28,6H29V7H28zM30,6H31V7H30zM31,6H32V7H31zM32,6H33V7H32zM34,6H35V7H34zM2,7H3V8H2zM8,7H9V8H8zM10,7H11V8H10zM15,7H16V8H15zM17,7H18V8H17zM20,7H21V8H20zM21,7H22V8H21zM23,7H24V8H23zM28,7H29V8H28zM34,7H35V8H34zM2,8H3V9H2zM3,8H4V9H3zM4,8H5V9H4zM5,8H6V9H5zM6,8H7V9H6zM7,8H8V9H7zM8,8H9V9H8zM10,8H11V9H10zM12,8H13V9H12zM14,8H15V9H14zM16,8H17V9H16zM18,8H19V9H18zM20,8H21V9H20zM22,8H23V9H22zM24,8H25V9H24zM26,8H27V9H26zM28,8H29V9H28zM29,8H30V9H29zM30,8H31V9H30zM31,8H32V9H31zM32,8H33V9H32zM33,8H34V9H33zM34,8H35V9H34zM10,9H11V10H10zM11,9H12V10H11zM12,9H13V10H12zM19,9H20V10H19zM20,9H21V10H20zM23,9H24V10H23zM26,9H27V10H26zM2,10H3V11H2zM6,10H7V11H6zM8,10H9V11H8zM9,10H10V11H9zM10,10H11V11H10zM11,10H12V11H11zM12,10H13V11H12zM17,10H18V11H17zM19,10H20V11H19zM22,10H23V11H22zM23,10H24V11H23zM24,10H25V11H24zM25,10H26V11H25zM27,10H28V11H27zM28,10H29V11H28zM29,10H30V11H29zM30,10H31V11H30zM31,10H32V11H31zM34,10H35V11H34zM2,11H3V12H2zM4,11H5V12H4zM5,11H6V12H5zM7,11H8V12H7zM12,11H13V12H12zM14,11H15V12H14zM16,11H17V12H16zM17,11H18V12H17zM18,11H19V12H18zM23,11H24V12H23zM24,11H25V12H24zM25,11H26V12H25zM26,11H27V12H26zM27,11H28V12H27zM29,11H30V12H29zM32,11H33V12H32zM33,11H34V12H33zM2,12H3V13H2zM4,12H5V13H4zM6,12H7V13H6zM7,12H8V13H7zM8,12H9V13H8zM9,12H10V13H9zM10,12H11V13H10zM11,12H12V13H11zM15,12H16V13H15zM16,12H17V13H16zM17,12H18V13H17zM22,12H23V13H22zM25,12H26V13H25zM26,12H27V13H26zM27,12H28V13H27zM28,12H29V13H28zM29,12H30V13H29zM30,12H31V13H30zM31,12H32V13H31zM33,12H34V13H33zM2,13H3V14H2zM3,13H4V14H3zM4,13H5V14H4zM5,13H6V14H5zM7,13H8V14H7zM9,13H10V14H9zM10,13H11V14H10zM12,13H13V14H12zM13,13H14V14H13zM15,13H16V14H15zM18,13H19V14H18zM19,13H20V14H19zM20,13H21V14H20zM21,13H22V14H21zM23,13H24V14H23zM24,13H25V14H24zM25,13H26V14H25zM28,13H29V14H28zM29,13H30V14H29zM30,13H31V14H30zM34,13H35V14H34zM2,14H3V15H2zM3,14H4V15H3zM5,14H6V15H5zM6,14H7V15H6zM8,14H9V15H8zM10,14H11V15H10zM12,14H13V15H12zM13,14H14V15H13zM15,14H16V15H15zM17,14H18V15H17zM19,14H20V15H19zM21,14H22V15H21zM22,14H23V15H22zM24,14H25V15H24zM26,14H27V15H26zM27,14H28V15H27zM28,14H29V15H28zM30,14H31V15H30zM33,14H34V15H33zM34,14H35V15H34zM2,15H3V16H2zM5,15H6V16H5zM7,15H8V16H7zM12,15H13V16H12zM16,15H17V16H16zM24,15H25V16H24zM25,15H26V16H25zM29,15H30V16H29zM32,15H33V16H32zM2,16H3V17H2zM4,16H5V17H4zM6,16H7V17H6zM7,16H8V17H7zM8,16H9V17H8zM10,16H11V17H10zM11,16H12V17H11zM14,16H15V17H14zM15,16H16V17H15zM17,16H18V17H17zM18,16H19V17H18zM19,16H20V17H19zM20,16H21V17H20zM23,16H24V17H23zM25,16H26V17H25zM26,16H27V17H26zM29,16H30V17H29zM30,16H31V17H30zM33,16H34V17H33zM2,17H3V18H2zM7,17H8V18H7zM11,17H12V18H11zM12,17H13V18H12zM13,17H14V18H13zM14,17H15V18H14zM18,17H19V18H18zM19,17H20V18H19zM23,17H24V18H23zM27,17H28V18H27zM29,17H30V18H29zM30,17H31V18H30zM33,17H34V18H33zM2,18H3V19H2zM3,18H4V19H3zM4,18H5V19H4zM6,18H7V19H6zM8,18H9V19H8zM9,18H10V19H9zM10,18H11V19H10zM11,18H12V19H11zM13,18H14V19H13zM14,18H15V19H14zM19,18H20V19H19zM23,18H24V19H23zM24,18H25V19H24zM25,18H26V19H25zM26,18H27V19H26zM28,18H29V19H28zM29,18H30V19H29zM30,18H31V19H30zM34,18H35V19H34zM3,19H4V20H3zM5,19H6V20H5zM7,19H8V20H7zM10,19H11V20H10zM11,19H12V20H11zM14,19H15V20H14zM16,19H17V20H16zM17,19H18V20H17zM18,19H19V20H18zM20,19H21V20H20zM25,19H26V20H25zM29,19H30V20H29zM33,19H34V20H33zM2,20H3V21H2zM4,20H5V21H4zM5,20H6V21H5zM6,20H7V21H6zM7,20H8V21H7zM8,20H9V21H8zM9,20H10V21H9zM12,20H13V21H12zM13,20H14V21H13zM14,20H15V21H14zM15,20H16V21H15zM17,20H18V21H17zM19,20H20V21H19zM20,20H21V21H20zM24,20H25V21H24zM25,20H26V21H25zM27,20H28V21H27zM28,20H29V21H28zM33,20H34V21H33zM3,21H4V22H3zM4,21H5V22H4zM6,21H7V22H6zM7,21H8V22H7zM14,21H15V22H14zM19,21H20V22H19zM20,21H21V22H20zM21,21H22V22H21zM22,21H23V22H22zM23,21H24V22H23zM25,21H26V22H25zM27,21H28V22H27zM31,21H32V22H31zM33,21H34V22H33zM34,21H35V22H34zM3,22H4V23H3zM4,22H5V23H4zM5,22H6V23H5zM6,22H7V23H6zM8,22H9V23H8zM15,22H16V23H15zM16,22H17V23H16zM17,22H18V23H17zM18,22H19V23H18zM19,22H20V23H19zM20,22H21V23H20zM22,22H23V23H22zM23,22H24V23H23zM24,22H25V23H24zM26,22H27V23H26zM28,22H29V23H28zM29,22H30V23H29zM30,22H31V23H30zM31,22H32V23H31zM33,22H34V23H33zM34,22H35V23H34zM2,23H3V24H2zM3,23H4V24H3zM4,23H5V24H4zM5,23H6V24H5zM13,23H14V24H13zM14,23H15V24H14zM15,23H16V24H15zM16,23H17V24H16zM18,23H19V24H18zM19,23H20V24H19zM23,23H24V24H23zM25,23H26V24H25zM28,23H29V24H28zM29,23H30V24H29zM31,23H32V24H31zM5,24H6V25H5zM6,24H7V25H6zM7,24H8V25H7zM8,24H9V25H8zM10,24H11V25H10zM12,24H13V25H12zM13,24H14V25H13zM15,24H16V25H15zM16,24H17V25H16zM17,24H18V25H17zM18,24H19V25H18zM19,24H20V25H19zM24,24H25V25H24zM25,24H26V25H25zM26,24H27V25H26zM28,24H29V25H28zM29,24H30V25H29zM31,24H32V25H31zM32,24H33V25H32zM33,24H34V25H33zM4,25H5V26H4zM5,25H6V26H5zM6,25H7V26H6zM10,25H11V26H10zM12,25H13V26H12zM19,25H20V26H19zM22,25H23V26H22zM23,25H24V26H23zM25,25H26V26H25zM26,25H27V26H26zM27,25H28V26H27zM30,25H31V26H30zM33,25H34V26H33zM34,25H35V26H34zM2,26H3V27H2zM3,26H4V27H3zM6,26H7V27H6zM8,26H9V27H8zM9,26H10V27H9zM15,26H16V27H15zM17,26H18V27H17zM19,26H20V27H19zM21,26H22V27H21zM22,26H23V27H22zM23,26H24V27H23zM24,26H25V27H24zM26,26H27V27H26zM27,26H28V27H27zM28,26H29V27H28zM29,26H30V27H29zM30,26H31V27H30zM33,26H34V27H33zM10,27H11V28H10zM11,27H12V28H11zM13,27H14V28H13zM14,27H15V28H14zM15,27H16V28H15zM16,27H17V28H16zM17,27H18V28H17zM18,27H19V28H18zM19,27H20V28H19zM20,27H21V28H20zM25,27H26V28H25zM26,27H27V28H26zM30,27H31V28H30zM33,27H34V28H33zM2,28H3V29H2zM3,28H4V29H3zM4,28H5V29H4zM5,28H6V29H5zM6,28H7V29H6zM7,28H8V29H7zM8,28H9V29H8zM10,28H11V29H10zM11,28H12V29H11zM12,28H13V29H12zM13,28H14V29H13zM16,28H17V29H16zM17,28H18V29H17zM18,28H19V29H18zM19,28H20V29H19zM20,28H21V29H20zM22,28H23V29H22zM23,28H24V29H23zM24,28H25V29H24zM26,28H27V29H26zM28,28H29V29H28zM30,28H31V29H30zM31,28H32V29H31zM32,28H33V29H32zM33,28H34V29H33zM2,29H3V30H2zM8,29H9V30H8zM14,29H15V30H14zM15,29H16V30H15zM17,29H18V30H17zM18,29H19V30H18zM19,29H20V30H19zM20,29H21V30H20zM21,29H22V30H21zM22,29H23V30H22zM23,29H24V30H23zM26,29H27V30H26zM30,29H31V30H30zM31,29H32V30H31zM34,29H35V30H34zM2,30H3V31H2zM4,30H5V31H4zM5,30H6V31H5zM6,30H7V31H6zM8,30H9V31H8zM10,30H11V31H10zM11,30H12V31H11zM13,30H14V31H13zM15,30H16V31H15zM23,30H24V31H23zM24,30H25V31H24zM26,30H27V31H26zM27,30H28V31H27zM28,30H29V31H28zM29,30H30V31H29zM30,30H31V31H30zM34,30H35V31H34zM2,31H3V32H2zM4,31H5V32H4zM5,31H6V32H5zM6,31H7V32H6zM8,31H9V32H8zM13,31H14V32H13zM14,31H15V32H14zM15,31H16V32H15zM16,31H17V32H16zM18,31H19V32H18zM19,31H20V32H19zM20,31H21V32H20zM23,31H24V32H23zM25,31H26V32H25zM27,31H28V32H27zM28,31H29V32H28zM30,31H31V32H30zM2,32H3V33H2zM4,32H5V33H4zM5,32H6V33H5zM6,32H7V33H6zM8,32H9V33H8zM11,32H12V33H11zM14,32H15V33H14zM15,32H16V33H15zM16,32H17V33H16zM17,32H18V33H17zM19,32H20V33H19zM22,32H23V33H22zM26,32H27V33H26zM27,32H28V33H27zM28,32H29V33H28zM29,32H30V33H29zM30,32H31V33H30zM32,32H33V33H32zM2,33H3V34H2zM8,33H9V34H8zM12,33H13V34H12zM13,33H14V34H13zM14,33H15V34H14zM17,33H18V34H17zM18,33H19V34H18zM19,33H20V34H19zM20,33H21V34H20zM23,33H24V34H23zM26,33H27V34H26zM31,33H32V34H31zM2,34H3V35H2zM3,34H4V35H3zM4,34H5V35H4zM5,34H6V35H5zM6,34H7V35H6zM7,34H8V35H7zM8,34H9V35H8zM10,34H11V35H10zM11,34H12V35H11zM13,34H14V35H13zM14,34H15V35H14zM16,34H17V35H16zM17,34H18V35H17zM21,34H22V35H21zM22,34H23V35H22zM23,34H24V35H23zM24,34H25V35H24zM25,34H26V35H25zM26,34H27V35H26zM29,34H30V35H29zM30,34H31V35H30zM34,34H35V35H34z" id="qr-path" fill="#0f3d34" fill-opacity="1" fill-rule="nonzero" stroke="none"/></svg>
                </div>
                <div class="qr-scan-hint">Scan with any UPI App to pay ₹${totals.totalFinal.toLocaleString("en-IN")}</div>
                <div class="qr-timer-pill">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span>QR Active &bull; Instant Verification</span>
                </div>
                <div class="upi-id-copy-row">
                  <span>VPA: sukoonshathi@okhdfcbank</span>
                  <button type="button" class="btn-copy-upi" id="btnCopyUpi" data-copy-text="sukoonshathi@okhdfcbank">Copy</button>
                </div>
                <a href="upi://pay?pa=sukoonshathi@okhdfcbank&pn=SukoonSaathi&am=${totals.totalFinal}&cu=INR" class="btn-open-upi-intent">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  <span>Tap to Pay with Installed UPI App</span>
                </a>
              </div>
            ` : `
              <div style="display: flex; flex-direction: column; gap: 10px;">
                <label style="font-size: 0.82rem; font-weight: 600; color: var(--forest);">Enter Virtual Payment Address (VPA):</label>
                <div style="display: flex; gap: 8px;">
                  <input type="text" id="chkUpiIdInput" placeholder="e.g. mobile@okaxis, yourname@upi" value="${this.enteredUpiId || ''}" style="flex: 1; height: 42px; border: 1.5px solid var(--line); border-radius: 8px; padding: 0 12px; font-size: 0.88rem;">
                  <button type="button" id="btnVerifyUpi" style="background: var(--forest); color: #fffdf8; border: none; border-radius: 8px; padding: 0 16px; font-size: 0.82rem; font-weight: 600; cursor: pointer;">Verify</button>
                </div>
                <span id="upiVerifyStatus" style="font-size: 0.76rem; color: var(--green); display: none;">✓ Verified Beneficiary: Sukoon Living Wellness Pvt Ltd</span>
              </div>
            `}
          </div>
        </div>

        <!-- 2. Direct Bank Transfer -->
        <div class="payment-method-item ${method === 'bank_transfer' ? 'active' : ''}" data-method="bank_transfer">
          <div class="payment-method-header">
            <div class="pm-header-left">
              <input type="radio" name="payMethodOption" value="bank_transfer" ${method === 'bank_transfer' ? 'checked' : ''} id="pm-bank">
              <div class="pm-title-wrap">
                <strong>Direct Bank Transfer</strong>
                <span>IMPS, NEFT & RTGS Instant Account Transfer</span>
              </div>
            </div>
            <div class="pm-header-badges">
              <span class="pm-badge-chip">Direct Account</span>
            </div>
          </div>
          <div class="payment-method-content">
            <div class="bank-transfer-card">
              <div class="bank-card-header">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 3l9 7H3l9-7z"/></svg>
                <span>Receiver Official Bank Account Details</span>
              </div>
              <div class="bank-details-grid">
                <div class="bank-detail-row">
                  <span class="bank-label">Account Holder:</span>
                  <div class="bank-val-wrap">
                    <strong class="bank-value">Sukoon Living Wellness Pvt. Ltd.</strong>
                    <button type="button" class="btn-copy-mini" data-copy-text="Sukoon Living Wellness Pvt. Ltd.">Copy</button>
                  </div>
                </div>
                <div class="bank-detail-row highlight">
                  <span class="bank-label">Account Number:</span>
                  <div class="bank-val-wrap">
                    <strong class="bank-value">50200084920194</strong>
                    <button type="button" class="btn-copy-mini" data-copy-text="50200084920194">Copy</button>
                  </div>
                </div>
                <div class="bank-detail-row highlight">
                  <span class="bank-label">IFSC Code:</span>
                  <div class="bank-val-wrap">
                    <strong class="bank-value">HDFC0001234</strong>
                    <button type="button" class="btn-copy-mini" data-copy-text="HDFC0001234">Copy</button>
                  </div>
                </div>
                <div class="bank-detail-row">
                  <span class="bank-label">Bank & Branch:</span>
                  <div class="bank-val-wrap">
                    <span class="bank-value">HDFC Bank Ltd., Indiranagar, Bengaluru</span>
                  </div>
                </div>
                <div class="bank-detail-row">
                  <span class="bank-label">Account Type:</span>
                  <div class="bank-val-wrap">
                    <span class="bank-value">Current Account</span>
                  </div>
                </div>
                <div class="bank-detail-row amount-row">
                  <span class="bank-label">Exact Payable:</span>
                  <div class="bank-val-wrap">
                    <strong class="bank-value amount-text">₹${totals.totalFinal.toLocaleString("en-IN")}.00</strong>
                    <button type="button" class="btn-copy-mini" data-copy-text="${totals.totalFinal}">Copy</button>
                  </div>
                </div>
              </div>

              <div class="bank-instructions-box">
                <div class="instruction-step">
                  <span class="step-num">1</span>
                  <span>Transfer <strong>₹${totals.totalFinal.toLocaleString("en-IN")}</strong> to the receiver account above using your mobile banking app or netbanking.</span>
                </div>
                <div class="instruction-step">
                  <span class="step-num">2</span>
                  <span>Enter your 12-digit UTR / Reference ID below (optional) and tap Confirm Order.</span>
                </div>
              </div>

              <div class="bank-utr-field">
                <label for="chkBankUtr">Transaction UTR / Reference Number (Optional):</label>
                <input type="text" id="chkBankUtr" placeholder="e.g. 428901234567 (12 digits)" maxlength="24" value="${this.enteredBankUtr || ''}">
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Cash on Delivery (COD) -->
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
                <strong>Doorstep Payment on Delivery:</strong>
                <p>No advance payment required. Pay via Cash or UPI directly to the courier partner upon physical parcel receipt.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="checkout-bottom-sticky-bar">
        <div class="checkout-btn-row">
          <button type="button" class="btn-checkout-secondary" id="checkoutBackStep1" aria-label="Go back to address">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            <span>Back</span>
          </button>
          <button type="button" class="btn-checkout-primary" id="checkoutConfirmOrderBtn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span id="checkoutConfirmBtnText">${confirmBtnText}</span>
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
      bank_transfer: "Direct Bank Transfer (IMPS/NEFT)",
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

        ${this.selectedPaymentMethod === 'bank_transfer' ? `
          <div class="confirmed-bank-info-box">
            <div class="bank-card-header" style="margin-bottom:8px; padding-bottom:6px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 3l9 7H3l9-7z"/></svg>
              <span>Direct Bank Transfer Reference</span>
            </div>
            <div style="font-size: 0.82rem; line-height: 1.5; color: var(--ink);">
              <div>Receiver Account: <strong>Sukoon Living Wellness Pvt. Ltd.</strong></div>
              <div>Bank A/C: <strong>50200084920194</strong> &bull; IFSC: <strong>HDFC0001234</strong></div>
              <div>Payable Amount: <strong style="color:var(--forest);">₹${totals.totalFinal.toLocaleString("en-IN")}.00</strong></div>
              ${this.enteredBankUtr ? `<div>Submitted UTR / Ref: <strong style="color:var(--green);">${this.enteredBankUtr}</strong></div>` : `<div style="color:#c97a00; font-size:0.78rem; margin-top:4px;">Please complete the bank transfer of ₹${totals.totalFinal} if not done yet.</div>`}
            </div>
          </div>
        ` : ''}

        <!-- Receipt Card -->
        <div class="order-receipt-card">
          <div class="receipt-heading">Delivery & Order Summary</div>
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
              <strong>Confirmation Sent To</strong>
              <span>${this.checkoutData?.email || "Email"}</span>
            </div>
            <div class="receipt-info-item">
              <strong>Payment Mode</strong>
              <span>${paymentLabel} (₹${totals.totalFinal.toLocaleString("en-IN")})</span>
            </div>
          </div>
        </div>

        <div class="checkout-btn-row" style="justify-content: center;">
          <button type="button" class="btn-checkout-primary" id="checkoutFinishBtn" style="max-width: 320px;">
            <span>Continue Shopping</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
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

    // 2. Step 1: Form submission
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

    // 3. Step 2: Payment method selection & interactions
    if (step === 2) {
      // Payment method card radio selector
      document.querySelectorAll(".payment-method-item").forEach((item) => {
        item.addEventListener("click", (e) => {
          if (e.target.closest(".payment-method-content") && !e.target.closest(".payment-method-header")) {
            return;
          }
          const m = item.getAttribute("data-method");
          if (m && m !== this.selectedPaymentMethod) {
            this.selectedPaymentMethod = m;
            this.renderCheckoutCurrentStep();
          }
        });
      });

      // Quick Copy buttons (Bank account, IFSC, UPI ID, etc.)
      document.querySelectorAll("[data-copy-text]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const txt = btn.getAttribute("data-copy-text");
          if (txt) {
            navigator.clipboard?.writeText(txt);
            const orig = btn.textContent;
            btn.textContent = "Copied!";
            this.showToast(`Copied to clipboard: ${txt}`);
            setTimeout(() => {
              btn.textContent = orig;
            }, 2000);
          }
        });
      });

      // Bank UTR input
      document.getElementById("chkBankUtr")?.addEventListener("input", (e) => {
        this.enteredBankUtr = e.target.value.trim();
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

    // 4. Step 3: Confirmation actions
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

    const totals = this.getCalculatedTotals();

    setTimeout(() => {
      this.confirmedOrderId = "OD-SUKOON-" + Math.floor(100000 + Math.random() * 900000);
      this.confirmedTotals = { ...totals };
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
