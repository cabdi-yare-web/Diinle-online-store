/* ============================================================
   DIINLE — DATA (Complete with images)
   ============================================================
   
   SAWIRRADAADA:
   - iphone-15.png              → iPhone 15 Pro Max
   - iphone-17-pro-max-1.png    → iphone 17 pro max
   - galaxy-24.png              → Galaxy S24 Ultra
   - oneplus-12.png             → OnePlus 12
   - xiaom-14.png               → Xiaomi 14 Ultra
   - lg.png                     → UltraFine 5K
   - apple-watch.jpeg           → Apple Watch Ultra 2
   - momentum.jpeg              → Momentum 4
   - xps-15.jpg                 → XPS 15
   - macbook.jpg                → MacBook Pro 14
   - airode.jpeg                → AirPods Pro
   ============================================================ */

const CONFIG = {
  DEMO_MODE: true,
  STORE: {
    name: 'Diinle Electronics',
    email: 'Cabdidaahiryacquub@gmail.com',
    whatsappLocal: '0905771779',
    whatsappIntl: '252905771779',
    location: 'Somalia',
    country: 'Somalia',
    currency: 'USD'
  }
};

const I18N = {
  en: {
    nav: { home:'Home', shop:'Shop', about:'About' },
    hero: {
      eyebrow:'New arrivals · 2025 collection',
      l1:'Technology,', l2:'Reimagined.',
      sub:'Discover premium electronics built for the way you live. Curated devices, honest pricing, and free delivery across Somalia.',
      cta1:'Shop Now', cta2:'Explore Products',
      stat1:'Products', stat2:'Brands', stat3:'Free Delivery'
    },
    sections: {
      featured:'Featured', featuredSub:'Handpicked devices our customers love.',
      categories:'Categories', categoriesSub:'Browse our full collection.',
      newArrivals:'New Arrivals', newArrivalsSub:'Fresh out of the box.',
      bestsellers:'Best Sellers', bestsellersSub:'What Somalia is buying right now.',
      brands:'Trusted Brands', brandsSub:"We carry products from the world's leading manufacturers.",
      deals:'Limited Time Offer', dealsSub:'Exclusive demo pricing on selected devices. Ends soon.',
      why:'Why Diinle', whySub:'A better way to buy electronics.',
      reviews:'Customer Reviews', reviewsSub:'What people are saying.',
      newsletter:'Stay in the loop', newsletterSub:'New arrivals, demo deals, and product updates — no spam.'
    },
    buttons: {
      addToCart:'Add to cart', viewAll:'View all', shopNow:'Shop now',
      checkout:'Proceed to Checkout', continueShopping:'Continue shopping', placeOrder:'Place order',
      subscribe:'Subscribe', clear:'Clear all', filters:'Filters', buyNow:'Buy now',
      outOfStock:'Out of stock'
    },
    cart: { title:'Your Cart', empty:'Your cart is empty', emptySub:'Add products to get started.', subtotal:'Subtotal', delivery:'Delivery', total:'Total', free:'Free' },
    checkout: {
      title:'Checkout', shipping:'Shipping details', payment:'Payment method',
      fullName:'Full name', phone:'Phone number', city:'City', address:'Address',
      email:'Email', notes:'Order notes (optional)', required:'This field is required',
      invalidEmail:'Please enter a valid email', invalidPhone:'Please enter a valid phone number',
      orderSummary:'Order summary', international:'International', local:'Local (Mobile money)',
      demoNote:'Demo mode — no real payment will be processed.'
    },
    order: {
      confirmed:'Order confirmed', thanks:"Thank you, {name}. We've received your order.",
      orderId:'Order ID', status:'Status', paymentMethod:'Payment method', total:'Total',
      deliveryTo:'Delivering to', whatsapp:'Contact us on WhatsApp'
    },
    footer: { tagline:'Premium electronics, delivered free across Somalia.', shop:'Shop', support:'Support', company:'Company', contact:'Contact', rights:'All rights reserved.' },
    toast: { added:'Added to cart', removed:'Removed', wishlist:'Saved to wishlist', subscribed:'Subscribed' },
    search: { empty:'No products found', emptySub:'Try a different search term.' }
  },
  so: {
    nav: { home:'Bogga Hore', shop:'Dukaanka', about:'Ku Saabsan' },
    hero: {
      eyebrow:'Alaabta cusub · 2025',
      l1:'Tignoolajiyada,', l2:'Dib u Qaabeyn.',
      sub:'Soo hel qalabka elektaroonigga ah ee tayo sare leh. Qiimo hufan iyo gaarsiin bilaash ah Soomaaliya oo dhan.',
      cta1:'Hadda Iibso', cta2:'Eeg Alaabta',
      stat1:'Alaab', stat2:'Nooc', stat3:'Gaarsiin Bilaash'
    },
    sections: {
      featured:'La Xushay', featuredSub:'Qalabka macaamiisheena jecel.',
      categories:'Qaybaha', categoriesSub:'Eeg dhammaan alaabta aan hayno.',
      newArrivals:'Alaab Cusub', newArrivalsSub:'Si cusub u soo baxay.',
      bestsellers:'Kuwa Ugu Iibsiga Badan', bestsellersSub:'Waxa Soomaaliya ay hadda iibsanayso.',
      brands:'Calaamadaha La Aaminsan', brandsSub:'Waxaan haynaa alaab ka socota shirkadaha waaweyn.',
      deals:'Fursad Muddo Ah', dealsSub:'Qiimo dhimis gaar ah. Waqtiga dhammaanaya.',
      why:'Sababta Diinle', whySub:'Hab fiican oo alaabta looga iibsado.',
      reviews:'Faallooyinka Macaamiisha', reviewsSub:'Waxa dadka sheegayaan.',
      newsletter:'La Xiriir', newsletterSub:'Alaab cusub, qiimo dhimis, iyo warar — spam ma jiro.'
    },
    buttons: {
      addToCart:'Ku dar gaariga', viewAll:'Eeg dhammaan', shopNow:'Hadda iibso',
      checkout:'Sii wad lacag bixinta', continueShopping:'Sii wad iibka', placeOrder:'Dir dalabka',
      subscribe:'Isdiiwaangeli', clear:'Tirtir dhammaan', filters:'Shaandhayso', buyNow:'Hadda iibso',
      outOfStock:'Waa la dhammeeyay'
    },
    cart: { title:'Gaarigaaga', empty:'Gaarigaagu waa madhan', emptySub:'Ku dar alaab si aad u bilowdo.', subtotal:'Wadar hoose', delivery:'Gaarsiin', total:'Wadar', free:'Bilaash' },
    checkout: {
      title:'Lacag bixin', shipping:'Faahfaahinta gaarsiinta', payment:'Habka lacag bixinta',
      fullName:'Magaca buuxa', phone:'Lambarka telefoonka', city:'Magaalada', address:'Cinwaanka',
      email:'Iimayl', notes:'Qoraal dalab (ikhtiyaari)', required:'Goobtan waa loo baahan yahay',
      invalidEmail:'Fadlan geli iimayl sax ah', invalidPhone:'Fadlan geli lambar sax ah',
      orderSummary:'Soo koobidda dalabka', international:'Caalami', local:'Maxalli (Lacagta mobilka)',
      demoNote:'Habka demo — lacag dhab ah lama socodsiiyo.'
    },
    order: {
      confirmed:'Dalabka la xaqiijiyay', thanks:'Mahadsanid, {name}. Waxaan helnay dalabkaaga.',
      orderId:'Aqoonsiga dalabka', status:'Xaaladda', paymentMethod:'Habka lacag bixinta', total:'Wadar',
      deliveryTo:'Waxaa loo dirayaa', whatsapp:'Nala soo xiriir WhatsApp'
    },
    footer: { tagline:'Qalab elektaroonig ah oo tayo sare leh, oo bilaash ku gaarsiin Soomaaliya.', shop:'Dukaanka', support:'Taageero', company:'Shirkadda', contact:'Xiriir', rights:'Xuquuqda oo dhan way dhowran yihiin.' },
    toast: { added:'Gaariga lagu daray', removed:'La saaray', wishlist:'Liiska rabitaanka lagu daray', subscribed:'La isdiiwaangeliyay' },
    search: { empty:'Alaab lama helin', emptySub:'Isku day eray kale.' }
  }
};

const CATEGORIES = [
  { id:'Smartphones', name:'Smartphones', nameSo:'Telefoonada', icon:'phone' },
  { id:'Laptops', name:'Laptops', nameSo:'Laptops', icon:'laptop' },
  { id:'Tablets', name:'Tablets', nameSo:'Tablet', icon:'tablet' },
  { id:'Smartwatches', name:'Smartwatches', nameSo:'Saacadaha', icon:'watch' },
  { id:'Headphones', name:'Headphones', nameSo:'Headphones', icon:'headphone' },
  { id:'Earbuds', name:'Earbuds', nameSo:'Earbuds', icon:'earbuds' },
  { id:'Speakers', name:'Speakers', nameSo:'Sanooyinka', icon:'speaker' },
  { id:'Cameras', name:'Cameras', nameSo:'Kaamirooyinka', icon:'camera' },
  { id:'Monitors', name:'Monitors', nameSo:'Monitors', icon:'monitor' },
  { id:'Gaming', name:'Gaming', nameSo:'Ciyaaraha', icon:'gamepad' },
  { id:'Accessories', name:'Accessories', nameSo:'Qalabka', icon:'accessory' },
  { id:'Networking', name:'Networking', nameSo:'Shabakadda', icon:'wifi' }
];

const BRANDS = ['Apple','Samsung','Xiaomi','Huawei','Google','OnePlus','Sony','JBL','HP','Dell','Lenovo','ASUS','Acer','MSI','Canon','Nikon','LG','Microsoft','Logitech','Anker','Bose','Sennheiser'];

/* ============================================================
   DEFAULT PRODUCTS — Sawirradaada lagu daray
   ============================================================ */
let _pid = 0;
const P = (o) => ({ id:'p' + (++_pid), rating:4.6, reviews:42, stock:12, images:[], ...o });

const DEFAULT_PRODUCTS = [
  // ===== SMARTPHONES =====
  P({ name:'iPhone 15 Pro Max', brand:'Apple', category:'Smartphones', price:1199, oldPrice:1299, rating:4.9, reviews:284, stock:18, featured:true, bestseller:true,
      images:['images/iphone-15.png'],
      colors:['#1c1c1e','#c9c3ba','#4a5b6e'], storage:['256GB','512GB','1TB'],
      description:'A17 Pro chip, titanium design, and a pro camera system that captures stunning detail in any light.',
      specs:{Display:'6.7" Super Retina XDR', Chip:'A17 Pro', Camera:'48MP Main', Battery:'Up to 29h', OS:'iOS 17'} }),

  P({ name:'Galaxy S24 Ultra', brand:'Samsung', category:'Smartphones', price:1249, oldPrice:1399, rating:4.8, reviews:196, stock:14, featured:true, bestseller:true,
      images:['images/galaxy-24.png'],
      colors:['#3a3a3c','#e4d9c8','#7d5fd1'], storage:['256GB','512GB','1TB'],
      description:'Titanium frame, built-in S Pen, and a 200MP camera with Galaxy AI.',
      specs:{Display:'6.8" QHD+ AMOLED', Chip:'Snapdragon 8 Gen 3', Camera:'200MP', Battery:'5000mAh', OS:'Android 14'} }),

  P({ name:'Pixel 8 Pro', brand:'Google', category:'Smartphones', price:899, oldPrice:999, rating:4.7, reviews:142, stock:11, new:true,
      images:[],
      colors:['#c8d6e5','#1c1c1e'], storage:['128GB','256GB'],
      description:'Tensor G3, Google AI, and the best Pixel camera yet.',
      specs:{Display:'6.7" LTPO OLED', Chip:'Tensor G3', Camera:'50MP', Battery:'5050mAh', OS:'Android 14'} }),

  P({ name:'Xiaomi 14 Ultra', brand:'Xiaomi', category:'Smartphones', price:999, rating:4.6, reviews:88, stock:9, new:true,
      images:['images/xiaom-14.png'],
      colors:['#1c1c1e'], storage:['512GB'],
      description:'Leica quad camera and Snapdragon 8 Gen 3 performance.',
      specs:{Display:'6.73" AMOLED', Chip:'Snapdragon 8 Gen 3', Camera:'50MP Leica', Battery:'5300mAh'} }),

  P({ name:'OnePlus 12', brand:'OnePlus', category:'Smartphones', price:799, oldPrice:899, rating:4.6, reviews:76, stock:16,
      images:['images/oneplus-12.png'],
      colors:['#2b3a2f'], storage:['256GB'],
      description:'Flagship power with 100W fast charging.',
      specs:{Display:'6.82" LTPO', Chip:'Snapdragon 8 Gen 3', Camera:'50MP', Battery:'5400mAh'} }),

  // ===== LAPTOPS =====
  P({ name:'MacBook Pro 14" M3 Pro', brand:'Apple', category:'Laptops', price:1999, oldPrice:2199, rating:4.9, reviews:218, stock:12, featured:true, bestseller:true,
      images:['images/macbook.jpg'],
      colors:['#1c1c1e','#c9c3ba'], storage:['512GB','1TB'],
      description:'M3 Pro chip, Liquid Retina XDR, and all-day battery.',
      specs:{Display:'14.2" Liquid Retina XDR', Chip:'M3 Pro', RAM:'18GB', Storage:'512GB SSD'} }),

  P({ name:'XPS 15', brand:'Dell', category:'Laptops', price:1699, oldPrice:1899, rating:4.7, reviews:132, stock:10, featured:true,
      images:['images/xps-15.jpg'],
      colors:['#c9c3ba'], storage:['512GB','1TB'],
      description:'InfinityEdge display and RTX graphics in a premium chassis.',
      specs:{Display:'15.6" OLED 3.5K', CPU:'i7-13700H', RAM:'16GB', GPU:'RTX 4060'} }),

  P({ name:'ThinkPad X1 Carbon Gen 12', brand:'Lenovo', category:'Laptops', price:1799, rating:4.8, reviews:98, stock:14, bestseller:true,
      images:[],
      colors:['#1c1c1e'], storage:['512GB'],
      description:'The business laptop benchmark, now lighter and faster.',
      specs:{Display:'14" WUXGA', CPU:'Intel Core Ultra 7', RAM:'32GB', Storage:'1TB SSD'} }),

  P({ name:'Spectre x360', brand:'HP', category:'Laptops', price:1499, oldPrice:1699, rating:4.6, reviews:74, stock:9,
      images:[],
      colors:['#1c1c1e'], storage:['512GB'],
      description:'2-in-1 convertible with OLED touch display.',
      specs:{Display:'13.5" OLED Touch', CPU:'i7', RAM:'16GB', Storage:'1TB SSD'} }),

  P({ name:'ROG Zephyrus G14', brand:'ASUS', category:'Laptops', price:1599, rating:4.7, reviews:112, stock:11, new:true,
      images:[],
      colors:['#f4f4f5'], storage:['1TB'],
      description:'Compact gaming powerhouse with RTX 4070.',
      specs:{Display:'14" QHD+ 165Hz', CPU:'Ryzen 9', RAM:'16GB', GPU:'RTX 4070'} }),

  P({ name:'Surface Laptop 6', brand:'Microsoft', category:'Laptops', price:1299, rating:4.6, reviews:66, stock:10, new:true,
      images:[],
      colors:['#c9c3ba'], storage:['512GB'],
      description:'Copilot+ PC with all-day battery.',
      specs:{Display:'13.8" PixelSense', CPU:'Snapdragon X Elite', RAM:'16GB'} }),

  // ===== TABLETS =====
  P({ name:'iPad Pro 12.9" M2', brand:'Apple', category:'Tablets', price:1099, oldPrice:1199, rating:4.9, reviews:154, stock:15, featured:true,
      images:[],
      colors:['#c9c3ba'], storage:['256GB','512GB'],
      description:'M2 chip, Liquid Retina XDR, and Thunderbolt.',
      specs:{Display:'12.9" Liquid Retina XDR', Chip:'M2', Storage:'256GB'} }),

  P({ name:'Galaxy Tab S9 Ultra', brand:'Samsung', category:'Tablets', price:1049, rating:4.7, reviews:88, stock:12,
      images:[],
      colors:['#3a3a3c'], storage:['256GB'],
      description:'Massive AMOLED display with S Pen included.',
      specs:{Display:'14.6" AMOLED', Chip:'Snapdragon 8 Gen 2', Storage:'256GB'} }),

  P({ name:'Xiaomi Pad 6', brand:'Xiaomi', category:'Tablets', price:399, oldPrice:449, rating:4.5, reviews:96, stock:22,
      images:[],
      colors:['#c8d6e5'], storage:['128GB'],
      description:'144Hz display and Snapdragon 870.',
      specs:{Display:'11" 144Hz', Chip:'Snapdragon 870', Storage:'128GB'} }),

  // ===== SMARTWATCHES =====
  P({ name:'Apple Watch Ultra 2', brand:'Apple', category:'Smartwatches', price:799, rating:4.9, reviews:186, stock:14, featured:true, bestseller:true,
      images:['images/apple-watch.jpeg'],
      colors:['#c9c3ba'],
      description:'Rugged titanium design with the brightest Apple display.',
      specs:{Display:'49mm Always-On', Chip:'S9 SiP', Battery:'Up to 36h'} }),

  P({ name:'Galaxy Watch 6 Classic', brand:'Samsung', category:'Smartwatches', price:399, oldPrice:449, rating:4.6, reviews:74, stock:16,
      images:[],
      colors:['#1c1c1e'],
      description:'Rotating bezel and advanced health tracking.',
      specs:{Display:'47mm AMOLED', Battery:'425mAh', Water:'5ATM'} }),

  P({ name:'Watch GT 4', brand:'Huawei', category:'Smartwatches', price:299, rating:4.4, reviews:52, stock:20,
      images:[],
      colors:['#1c1c1e'],
      description:'14-day battery and comprehensive health monitoring.',
      specs:{Display:'46mm AMOLED', Battery:'14 days'} }),

  // ===== HEADPHONES =====
  P({ name:'WH-1000XM5', brand:'Sony', category:'Headphones', price:349, oldPrice:399, rating:4.9, reviews:312, stock:24, featured:true, bestseller:true,
      images:[],
      colors:['#1c1c1e','#c9c3ba'],
      description:'Industry-leading noise cancellation with exceptional sound.',
      specs:{Type:'Over-ear', Battery:'30h', ANC:'Yes'} }),

  P({ name:'QuietComfort Ultra', brand:'Bose', category:'Headphones', price:429, rating:4.8, reviews:142, stock:16,
      images:[],
      colors:['#1c1c1e'],
      description:'Immersive spatial audio and premium comfort.',
      specs:{Type:'Over-ear', Battery:'24h', ANC:'Yes'} }),

  P({ name:'Momentum 4', brand:'Sennheiser', category:'Headphones', price:299, oldPrice:349, rating:4.7, reviews:88, stock:14,
      images:['images/momentum.jpeg'],
      colors:['#1c1c1e'],
      description:'Audiophile-grade sound with 60-hour battery.',
      specs:{Type:'Over-ear', Battery:'60h', ANC:'Yes'} }),

  // ===== EARBUDS =====
  P({ name:'AirPods Pro (2nd gen)', brand:'Apple', category:'Earbuds', price:229, oldPrice:249, rating:4.8, reviews:412, stock:32, featured:true, bestseller:true,
      images:['images/airode.jpeg'],
      colors:['#ffffff'],
      description:'Adaptive audio with up to 2x more noise cancellation.',
      specs:{Type:'In-ear', Battery:'6h + 30h', ANC:'Yes'} }),

  P({ name:'Galaxy Buds 2 Pro', brand:'Samsung', category:'Earbuds', price:199, oldPrice:229, rating:4.6, reviews:168, stock:26,
      images:[],
      colors:['#1c1c1e'],
      description:'Hi-Fi 24bit audio in a compact form factor.',
      specs:{Type:'In-ear', Battery:'5h + 18h', ANC:'Yes'} }),

  P({ name:'WF-1000XM5', brand:'Sony', category:'Earbuds', price:279, rating:4.8, reviews:196, stock:20,
      images:[],
      colors:['#1c1c1e'],
      description:'Best-in-class noise cancellation earbuds.',
      specs:{Type:'In-ear', Battery:'8h + 16h', ANC:'Yes'} }),

  // ===== SPEAKERS =====
  P({ name:'Charge 5', brand:'JBL', category:'Speakers', price:149, oldPrice:179, rating:4.7, reviews:284, stock:28, bestseller:true,
      images:[],
      colors:['#1c1c1e','#4a5b6e'],
      description:'Portable waterproof speaker with 20 hours of playtime.',
      specs:{Output:'40W', Battery:'20h', Water:'IP67'} }),

  P({ name:'Sonos One SL', brand:'Sonos', category:'Speakers', price:199, rating:4.6, reviews:96, stock:12,
      images:[],
      colors:['#1c1c1e'],
      description:'Rich room-filling sound.',
      specs:{Output:'2x Class-D', Wireless:'Wi-Fi'} }),

  P({ name:'HomePod mini', brand:'Apple', category:'Speakers', price:99, rating:4.5, reviews:142, stock:24,
      images:[],
      colors:['#1c1c1e'],
      description:'Big sound in a small, elegant package.',
      specs:{Output:'Full-range', Wireless:'Wi-Fi'} }),

  // ===== CAMERAS =====
  P({ name:'EOS R6 Mark II', brand:'Canon', category:'Cameras', price:2499, oldPrice:2699, rating:4.9, reviews:86, stock:6, featured:true,
      images:[],
      colors:['#1c1c1e'],
      description:'24.2MP full-frame mirrorless with 40fps burst.',
      specs:{Sensor:'24.2MP Full-Frame', Video:'4K 60p', ISO:'100-102400'} }),

  P({ name:'Alpha 7 IV', brand:'Sony', category:'Cameras', price:2299, rating:4.8, reviews:112, stock:8, bestseller:true,
      images:[],
      colors:['#1c1c1e'],
      description:'33MP full-frame hybrid camera.',
      specs:{Sensor:'33MP Full-Frame', Video:'4K 60p'} }),

  // ===== MONITORS =====
  P({ name:'UltraFine 5K', brand:'LG', category:'Monitors', price:1299, oldPrice:1499, rating:4.6, reviews:48, stock:8, featured:true,
      images:['images/lg.png'],
      colors:['#c9c3ba'],
      description:'27" 5K display with P3 wide color.',
      specs:{Size:'27"', Resolution:'5120x2880', Panel:'IPS'} }),

  P({ name:'UltraSharp 4K USB-C', brand:'Dell', category:'Monitors', price:749, rating:4.7, reviews:64, stock:12, bestseller:true,
      images:[],
      colors:['#1c1c1e'],
      description:'Color-accurate 4K with 90W USB-C.',
      specs:{Size:'27"', Resolution:'4K', Panel:'IPS Black'} }),

  // ===== GAMING =====
  P({ name:'PlayStation 5 Slim', brand:'Sony', category:'Gaming', price:499, rating:4.9, reviews:394, stock:18, featured:true, bestseller:true,
      images:[],
      colors:['#f4f4f5'],
      description:'Next-gen gaming with ray tracing.',
      specs:{CPU:'AMD Zen 2', GPU:'10.28 TFLOPs', Storage:'1TB SSD'} }),

  P({ name:'Xbox Series X', brand:'Microsoft', category:'Gaming', price:499, rating:4.8, reviews:284, stock:14, bestseller:true,
      images:[],
      colors:['#1c1c1e'],
      description:'The fastest, most powerful Xbox ever.',
      specs:{CPU:'AMD Zen 2', GPU:'12 TFLOPs', Storage:'1TB SSD'} }),

  P({ name:'Nintendo Switch OLED', brand:'Nintendo', category:'Gaming', price:349, rating:4.8, reviews:342, stock:20,
      images:[],
      colors:['#1c1c1e'],
      description:'7" OLED screen and wired LAN dock.',
      specs:{Display:'7" OLED', Storage:'64GB'} }),

  P({ name:'MX Master 3S', brand:'Logitech', category:'Gaming', price:99, oldPrice:119, rating:4.8, reviews:246, stock:34, bestseller:true,
      images:[],
      colors:['#1c1c1e'],
      description:'Quiet clicks and 8K DPI tracking.',
      specs:{Sensor:'8K DPI', Battery:'70 days'} }),

  // ===== ACCESSORIES =====
  P({ name:'MagSafe Charger', brand:'Apple', category:'Accessories', price:39, rating:4.6, reviews:184, stock:48,
      images:[],
      colors:['#ffffff'],
      description:'Snap-on wireless charging for iPhone.',
      specs:{Power:'15W', Connector:'USB-C'} }),

  P({ name:'PowerCore 20K', brand:'Anker', category:'Accessories', price:59, oldPrice:79, rating:4.7, reviews:412, stock:56, bestseller:true,
      images:[],
      colors:['#1c1c1e'],
      description:'20,000mAh power bank with 65W USB-C.',
      specs:{Capacity:'20000mAh', Output:'65W'} }),

  P({ name:'Nano 65W Charger', brand:'Anker', category:'Accessories', price:39, rating:4.7, reviews:198, stock:44,
      images:[],
      colors:['#ffffff'],
      description:'Compact GaN charger.',
      specs:{Power:'65W', Type:'GaN'} }),

  P({ name:'MX Keys S', brand:'Logitech', category:'Accessories', price:109, rating:4.6, reviews:124, stock:22,
      images:[],
      colors:['#1c1c1e'],
      description:'Low-profile wireless keyboard.',
      specs:{Layout:'Full-size', Battery:'10 days'} }),

  // ===== NETWORKING =====
  P({ name:'Wi-Fi 6 Mesh System', brand:'ASUS', category:'Networking', price:299, rating:4.6, reviews:78, stock:14,
      images:[],
      colors:['#1c1c1e'],
      description:'Whole-home mesh Wi-Fi 6.',
      specs:{Standard:'Wi-Fi 6', Coverage:'5,500 sq ft'} }),

  P({ name:'Nighthawk AX6000', brand:'Netgear', category:'Networking', price:399, oldPrice:449, rating:4.5, reviews:64, stock:10,
      images:[],
      colors:['#1c1c1e'],
      description:'High-performance Wi-Fi 6 router.',
      specs:{Standard:'Wi-Fi 6', Speed:'AX6000'} }),

  // ===== CUSUB — iphone 17 pro max =====
  P({ name:'iphone 17 pro max', brand:'Apple', category:'Smartphones', price:799, rating:4.9, reviews:12, stock:10, new:true, featured:true,
      images:['images/iphone-17-pro-max-1.png'],
      colors:['#c9c3ba','#1c1c1e'], storage:['256GB','512GB','1TB'],
      description:'The latest iPhone with advanced camera system and A18 chip.',
      specs:{Display:'6.9" Super Retina XDR', Chip:'A18 Pro', Camera:'48MP Triple', Battery:'Up to 33h'} })
];

/* ============================================================
   LOAD FROM LOCALSTORAGE (admin edits) — FALLBACK TO DEFAULTS
   ============================================================ */
let PRODUCTS;
(function loadProducts() {
  try {
    const saved = localStorage.getItem('diinle_products');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        PRODUCTS = parsed;
        return;
      }
    }
  } catch(e) {
    console.warn('Could not read saved products, using defaults');
  }
  PRODUCTS = DEFAULT_PRODUCTS;
  try {
    localStorage.setItem('diinle_products', JSON.stringify(PRODUCTS));
  } catch(e) {
    console.warn('Could not save default products to localStorage');
  }
})();

/* ============================================================
   REVIEWS
   ============================================================ */
const REVIEWS = [
  { name:'Ayaan M.', rating:5, text:'Ordered a MacBook Pro and it arrived in Hargeisa within two days. Packaging was perfect.', product:'MacBook Pro 14"' },
  { name:'Mohamed A.', rating:5, text:'Best electronics store in Somalia. Customer service on WhatsApp was excellent.', product:'Galaxy S24 Ultra' },
  { name:'Hodan I.', rating:5, text:'AirPods Pro arrived sealed and genuine. Free delivery is a game changer.', product:'AirPods Pro' },
  { name:'Cabdirahman Y.', rating:5, text:'Sony WH-1000XM5 — sound is incredible and delivery was fast.', product:'WH-1000XM5' },
  { name:'Fartun A.', rating:5, text:'PS5 ordered and delivered in 3 days. Everything legit.', product:'PlayStation 5' },
  { name:'Yusuf H.', rating:5, text:'Great selection, honest pricing, quick WhatsApp responses.', product:'iPhone 15 Pro Max' }
];