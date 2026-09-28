/* ============================================================
   DIINLE — ADMIN LOGIC (with 4-image upload)
   ============================================================ */
(() => {
'use strict';

const DEFAULT_SETTINGS = {
  storeName:'Diinle Electronics', email:'Cabdidaahiryacquub@gmail.com',
  whatsappLocal:'0905771779', whatsappIntl:'252905771779',
  currency:'USD', location:'Somalia', country:'Somalia',
  deliveryNote:'Free delivery across all Somalia'
};
const ADMIN_CREDS = { email:'admin@diinle.demo', password:'demo1234' };
const CATEGORIES = ['Smartphones','Laptops','Tablets','Smartwatches','Headphones','Earbuds','Speakers','Cameras','Monitors','Gaming','Accessories','Networking'];
const ORDER_STATUSES = ['pending','processing','paid','shipped','delivered','cancelled'];

const DEFAULT_PRODUCTS = [
  { name:'iPhone 15 Pro Max', brand:'Apple', category:'Smartphones', price:1199, oldPrice:1299, stock:18, rating:4.9, reviews:284, featured:true, bestseller:true, images:[], description:'A17 Pro chip, titanium design.', specs:{Display:'6.7"', Chip:'A17 Pro', Camera:'48MP'} },
  { name:'Galaxy S24 Ultra', brand:'Samsung', category:'Smartphones', price:1249, oldPrice:1399, stock:14, rating:4.8, reviews:196, featured:true, bestseller:true, images:[], description:'Titanium frame with S Pen.', specs:{Display:'6.8"', Chip:'Snapdragon 8 Gen 3', Camera:'200MP'} },
  { name:'Pixel 8 Pro', brand:'Google', category:'Smartphones', price:899, oldPrice:999, stock:11, rating:4.7, reviews:142, new:true, images:[], description:'Tensor G3, Google AI.', specs:{Display:'6.7"', Chip:'Tensor G3'} },
  { name:'Xiaomi 14 Ultra', brand:'Xiaomi', category:'Smartphones', price:999, stock:9, rating:4.6, reviews:88, new:true, images:[], description:'Leica quad camera.', specs:{Display:'6.73"'} },
  { name:'OnePlus 12', brand:'OnePlus', category:'Smartphones', price:799, oldPrice:899, stock:16, rating:4.6, reviews:76, images:[], description:'100W fast charging.', specs:{Display:'6.82"'} },
  { name:'MacBook Pro 14" M3 Pro', brand:'Apple', category:'Laptops', price:1999, oldPrice:2199, stock:12, rating:4.9, reviews:218, featured:true, bestseller:true, images:[], description:'M3 Pro, Liquid Retina XDR.', specs:{Display:'14.2"', Chip:'M3 Pro'} },
  { name:'XPS 15', brand:'Dell', category:'Laptops', price:1699, oldPrice:1899, stock:10, rating:4.7, reviews:132, featured:true, images:[], description:'InfinityEdge, RTX graphics.', specs:{Display:'15.6" OLED'} },
  { name:'ThinkPad X1 Carbon Gen 12', brand:'Lenovo', category:'Laptops', price:1799, stock:14, rating:4.8, reviews:98, bestseller:true, images:[], description:'Business laptop benchmark.', specs:{Display:'14"'} },
  { name:'Spectre x360', brand:'HP', category:'Laptops', price:1499, oldPrice:1699, stock:9, rating:4.6, reviews:74, images:[], description:'2-in-1 convertible.', specs:{Display:'13.5" OLED'} },
  { name:'ROG Zephyrus G14', brand:'ASUS', category:'Laptops', price:1599, stock:11, rating:4.7, reviews:112, new:true, images:[], description:'Compact gaming.', specs:{Display:'14" QHD+'} },
  { name:'Surface Laptop 6', brand:'Microsoft', category:'Laptops', price:1299, stock:10, rating:4.6, reviews:66, new:true, images:[], description:'Copilot+ PC.', specs:{Display:'13.8"'} },
  { name:'iPad Pro 12.9" M2', brand:'Apple', category:'Tablets', price:1099, oldPrice:1199, stock:15, rating:4.9, reviews:154, featured:true, images:[], description:'M2 chip, Liquid Retina XDR.', specs:{Display:'12.9"'} },
  { name:'Galaxy Tab S9 Ultra', brand:'Samsung', category:'Tablets', price:1049, stock:12, rating:4.7, reviews:88, images:[], description:'Massive AMOLED.', specs:{Display:'14.6"'} },
  { name:'Xiaomi Pad 6', brand:'Xiaomi', category:'Tablets', price:399, oldPrice:449, stock:22, rating:4.5, reviews:96, images:[], description:'144Hz display.', specs:{Display:'11"'} },
  { name:'Apple Watch Ultra 2', brand:'Apple', category:'Smartwatches', price:799, stock:14, rating:4.9, reviews:186, featured:true, bestseller:true, images:[], description:'Rugged titanium.', specs:{Display:'49mm'} },
  { name:'Galaxy Watch 6 Classic', brand:'Samsung', category:'Smartwatches', price:399, oldPrice:449, stock:16, rating:4.6, reviews:74, images:[], description:'Rotating bezel.', specs:{Display:'47mm'} },
  { name:'Watch GT 4', brand:'Huawei', category:'Smartwatches', price:299, stock:20, rating:4.4, reviews:52, images:[], description:'14-day battery.', specs:{Display:'46mm'} },
  { name:'WH-1000XM5', brand:'Sony', category:'Headphones', price:349, oldPrice:399, stock:24, rating:4.9, reviews:312, featured:true, bestseller:true, images:[], description:'Best noise cancellation.', specs:{Type:'Over-ear'} },
  { name:'QuietComfort Ultra', brand:'Bose', category:'Headphones', price:429, stock:16, rating:4.8, reviews:142, images:[], description:'Spatial audio.', specs:{Type:'Over-ear'} },
  { name:'Momentum 4', brand:'Sennheiser', category:'Headphones', price:299, oldPrice:349, stock:14, rating:4.7, reviews:88, images:[], description:'60-hour battery.', specs:{Type:'Over-ear'} },
  { name:'AirPods Pro (2nd gen)', brand:'Apple', category:'Earbuds', price:229, oldPrice:249, stock:32, rating:4.8, reviews:412, featured:true, bestseller:true, images:[], description:'Adaptive audio.', specs:{Type:'In-ear'} },
  { name:'Galaxy Buds 2 Pro', brand:'Samsung', category:'Earbuds', price:199, oldPrice:229, stock:26, rating:4.6, reviews:168, images:[], description:'Hi-Fi 24bit.', specs:{Type:'In-ear'} },
  { name:'WF-1000XM5', brand:'Sony', category:'Earbuds', price:279, stock:20, rating:4.8, reviews:196, images:[], description:'Best-in-class ANC.', specs:{Type:'In-ear'} },
  { name:'Charge 5', brand:'JBL', category:'Speakers', price:149, oldPrice:179, stock:28, rating:4.7, reviews:284, bestseller:true, images:[], description:'Waterproof speaker.', specs:{Output:'40W'} },
  { name:'Sonos One SL', brand:'Sonos', category:'Speakers', price:199, stock:12, rating:4.6, reviews:96, images:[], description:'Room-filling sound.', specs:{Output:'2x Class-D'} },
  { name:'HomePod mini', brand:'Apple', category:'Speakers', price:99, stock:24, rating:4.5, reviews:142, images:[], description:'Big sound, small package.', specs:{Output:'Full-range'} },
  { name:'EOS R6 Mark II', brand:'Canon', category:'Cameras', price:2499, oldPrice:2699, stock:6, rating:4.9, reviews:86, featured:true, images:[], description:'24.2MP mirrorless.', specs:{Sensor:'24.2MP'} },
  { name:'Alpha 7 IV', brand:'Sony', category:'Cameras', price:2299, stock:8, rating:4.8, reviews:112, bestseller:true, images:[], description:'33MP hybrid.', specs:{Sensor:'33MP'} },
  { name:'UltraFine 5K', brand:'LG', category:'Monitors', price:1299, oldPrice:1499, stock:8, rating:4.6, reviews:48, featured:true, images:[], description:'27" 5K display.', specs:{Size:'27"'} },
  { name:'UltraSharp 4K USB-C', brand:'Dell', category:'Monitors', price:749, stock:12, rating:4.7, reviews:64, bestseller:true, images:[], description:'Color-accurate 4K.', specs:{Size:'27"'} },
  { name:'PlayStation 5 Slim', brand:'Sony', category:'Gaming', price:499, stock:18, rating:4.9, reviews:394, featured:true, bestseller:true, images:[], description:'Next-gen gaming.', specs:{Storage:'1TB SSD'} },
  { name:'Xbox Series X', brand:'Microsoft', category:'Gaming', price:499, stock:14, rating:4.8, reviews:284, bestseller:true, images:[], description:'Most powerful Xbox.', specs:{Storage:'1TB SSD'} },
  { name:'Nintendo Switch OLED', brand:'Nintendo', category:'Gaming', price:349, stock:20, rating:4.8, reviews:342, images:[], description:'7" OLED screen.', specs:{Display:'7" OLED'} },
  { name:'MX Master 3S', brand:'Logitech', category:'Gaming', price:99, oldPrice:119, stock:34, rating:4.8, reviews:246, bestseller:true, images:[], description:'8K DPI tracking.', specs:{Sensor:'8K DPI'} },
  { name:'MagSafe Charger', brand:'Apple', category:'Accessories', price:39, stock:48, rating:4.6, reviews:184, images:[], description:'Wireless charging.', specs:{Power:'15W'} },
  { name:'PowerCore 20K', brand:'Anker', category:'Accessories', price:59, oldPrice:79, stock:56, rating:4.7, reviews:412, bestseller:true, images:[], description:'20,000mAh.', specs:{Capacity:'20000mAh'} },
  { name:'Nano 65W Charger', brand:'Anker', category:'Accessories', price:39, stock:44, rating:4.7, reviews:198, images:[], description:'Compact GaN.', specs:{Power:'65W'} },
  { name:'MX Keys S', brand:'Logitech', category:'Accessories', price:109, stock:22, rating:4.6, reviews:124, images:[], description:'Low-profile keyboard.', specs:{Layout:'Full-size'} },
  { name:'Wi-Fi 6 Mesh System', brand:'ASUS', category:'Networking', price:299, stock:14, rating:4.6, reviews:78, images:[], description:'Whole-home mesh.', specs:{Standard:'Wi-Fi 6'} },
  { name:'Nighthawk AX6000', brand:'Netgear', category:'Networking', price:399, oldPrice:449, stock:10, rating:4.5, reviews:64, images:[], description:'High-performance router.', specs:{Standard:'Wi-Fi 6'} }
];

const KEYS = { PRODUCTS:'diinle_products', ORDERS:'diinle_orders', SETTINGS:'diinle_settings', THEME:'diinle_theme', ADMIN:'diinle_admin' };

function loadProducts() {
  const saved = localStorage.getItem(KEYS.PRODUCTS);
  if (saved) { try { return JSON.parse(saved); } catch(e) {} }
  const seeded = DEFAULT_PRODUCTS.map((p,i) => ({ id:'p'+(i+1), rating:4.6, reviews:42, images:[], ...p }));
  localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(seeded));
  return seeded;
}
function saveProducts(list) { localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(list)); }
function loadSettings() {
  const saved = localStorage.getItem(KEYS.SETTINGS);
  if (saved) { try { return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }; } catch(e) {} }
  return { ...DEFAULT_SETTINGS };
}
function saveSettings(o) { localStorage.setItem(KEYS.SETTINGS, JSON.stringify(o)); }
const getOrders = () => JSON.parse(localStorage.getItem(KEYS.ORDERS) || '[]');
const saveOrders = (o) => localStorage.setItem(KEYS.ORDERS, JSON.stringify(o));

let PRODUCTS = loadProducts();
let SETTINGS = loadSettings();

const state = {
  theme: localStorage.getItem(KEYS.THEME) || 'light',
  authed: sessionStorage.getItem(KEYS.ADMIN) === '1',
  page: 'dashboard', orderSearch: '', orderStatus: 'all',
  selectedOrder: null, sidebarOpen: false
};

const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const money = (n) => '$' + Number(n).toLocaleString('en-US');
const escape = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function toast(msg) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg><span>${escape(msg)}</span>`;
  $('#toasts').appendChild(el);
  setTimeout(() => el.remove(), 3200);
}
function nextId() {
  const nums = PRODUCTS.map(p => parseInt(String(p.id).replace(/[^\d]/g,'')) || 0);
  return 'p' + (Math.max(0, ...nums) + 1);
}
function getFirstImage(p) {
  if (p.images && p.images.length && p.images[0]) return p.images[0];
  if (p.image) return p.image;
  return null;
}
function productSVG(product) {
  const colors = { Smartphones:'#1c1c1e', Laptops:'#c9c3ba', Tablets:'#3a3a3c', Smartwatches:'#1c1c1e', Headphones:'#1c1c1e', Earbuds:'#ffffff', Speakers:'#1c1c1e', Cameras:'#1c1c1e', Monitors:'#c9c3ba', Gaming:'#f4f4f5', Accessories:'#1c1c1e', Networking:'#1c1c1e' };
  const c = colors[product.category] || '#1c1c1e';
  const isDark = state.theme === 'dark';
  const bg = isDark ? '#232327' : '#e7e7ea';
  const stroke = isDark ? '#3a3a3f' : '#c9c9cd';
  const screen = isDark ? '#0c0c0e' : '#fafafa';
  const cat = product.category;
  const frame = `<rect x="30" y="30" width="140" height="140" rx="20" fill="${bg}" stroke="${stroke}" stroke-width="1.5"/>`;
  const shapes = {
    Smartphones:`<rect x="70" y="38" width="60" height="124" rx="12" fill="${c}"/><rect x="75" y="44" width="50" height="112" rx="8" fill="${screen}"/>`,
    Laptops:`<rect x="38" y="60" width="124" height="80" rx="6" fill="${c}"/><rect x="44" y="66" width="112" height="68" rx="3" fill="${screen}"/>`,
    Tablets:`<rect x="55" y="45" width="90" height="110" rx="10" fill="${c}"/><rect x="61" y="52" width="78" height="96" rx="6" fill="${screen}"/>`,
    Smartwatches:`<rect x="80" y="70" width="40" height="60" rx="10" fill="${c}"/><rect x="84" y="75" width="32" height="50" rx="6" fill="${screen}"/>`,
    Headphones:`<path d="M55 110V90a45 45 0 0 1 90 0v20" fill="none" stroke="${c}" stroke-width="10" stroke-linecap="round"/><rect x="42" y="104" width="26" height="48" rx="12" fill="${c}"/><rect x="132" y="104" width="26" height="48" rx="12" fill="${c}"/>`,
    Earbuds:`<ellipse cx="75" cy="118" rx="14" ry="18" fill="${c}"/><ellipse cx="125" cy="118" rx="14" ry="18" fill="${c}"/>`,
    Speakers:`<rect x="60" y="55" width="80" height="110" rx="16" fill="${c}"/><circle cx="100" cy="90" r="18" fill="${screen}"/><circle cx="100" cy="135" r="10" fill="${screen}"/>`,
    Cameras:`<rect x="45" y="70" width="110" height="80" rx="12" fill="${c}"/><circle cx="100" cy="110" r="24" fill="${screen}"/>`,
    Monitors:`<rect x="35" y="55" width="130" height="80" rx="6" fill="${c}"/><rect x="41" y="61" width="118" height="68" rx="3" fill="${screen}"/>`,
    Gaming:`<rect x="55" y="75" width="90" height="60" rx="22" fill="${c}"/><circle cx="80" cy="100" r="6" fill="${screen}"/><circle cx="120" cy="100" r="6" fill="${screen}"/>`,
    Accessories:`<rect x="60" y="60" width="80" height="80" rx="14" fill="${c}"/>`,
    Networking:`<rect x="45" y="80" width="110" height="55" rx="10" fill="${c}"/><circle cx="65" cy="107" r="4" fill="${screen}"/><circle cx="80" cy="107" r="4" fill="${screen}"/><circle cx="95" cy="107" r="4" fill="${screen}"/>`
  };
  return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">${frame}${shapes[cat] || shapes.Accessories}</svg>`;
}

/* Product thumbnail HTML (image OR svg) */
function productThumb(p) {
  const img = getFirstImage(p);
  if (img) {
    return `<img src="${escape(img)}" alt="${escape(p.name)}" style="width:100%;height:100%;object-fit:contain;padding:6%" onerror="this.style.display='none';this.parentElement.innerHTML='${productSVG(p).replace(/'/g,'&#39;').replace(/"/g,'&quot;')}'">`;
  }
  return productSVG(p);
}

function icon(n) {
  const icons = {
    grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
    tag:'<path d="M20.6 13.4L13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
    stack:'<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 12l10 5 10-5M2 17l10 5 10-5"/>',
    users:'<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="18" cy="9" r="2"/><path d="M15 20a4 4 0 0 1 7-2.6"/>',
    settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
    menu:'<path d="M3 6h18M3 12h18M3 18h18"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2"/>',
    moon:'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    x:'<path d="M18 6L6 18M6 6l12 12"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',
    edit:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    trash:'<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
    check:'<path d="M20 6L9 17l-5-5"/>',
    upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>'
  };
  return `<svg class="icon" viewBox="0 0 24 24">${icons[n]||''}</svg>`;
}

/* ============ LOGIN ============ */
function renderLogin() {
  return `
  <div class="login-wrap"><div class="login-card">
    <div class="logo"><span class="logo-mark">D</span>Diinle Admin</div>
    <p class="muted" style="font-size:.88rem;margin-bottom:24px">Sign in to manage the store.</p>
    <form id="loginForm">
      <div class="field"><label>Email</label><input type="email" id="admE" value="admin@diinle.demo" required></div>
      <div class="field"><label>Password</label><input type="password" id="admP" value="demo1234" required><div class="err">Invalid credentials</div></div>
      <button class="btn btn-primary" style="width:100%;padding:13px" type="submit">Sign in</button>
    </form>
    <p class="muted" style="font-size:.78rem;text-align:center;margin-top:16px">Demo: <strong>admin@diinle.demo</strong> / <strong>demo1234</strong></p>
    <p style="text-align:center;margin-top:12px"><a href="index.html" style="font-size:.82rem;color:var(--fg-3)">← Back to store</a></p>
  </div></div>`;
}

/* ============ LAYOUT ============ */
function renderLayout(content) {
  const orders = getOrders();
  const pendingCount = orders.filter(o => o.status === 'pending' || o.status === 'processing').length;
  return `
  <div class="admin">
    <aside class="side ${state.sidebarOpen?'open':''}" id="sidebar">
      <div class="logo"><span class="logo-mark">D</span>Admin</div>
      <nav class="nav-list">
        <a data-page="dashboard" class="${state.page==='dashboard'?'active':''}">${icon('grid')} Dashboard</a>
        <a data-page="orders" class="${state.page==='orders'?'active':''}">${icon('box')} Orders ${pendingCount?`<span class="badge">${pendingCount}</span>`:''}</a>
        <a data-page="products" class="${state.page==='products'?'active':''}">${icon('tag')} Products</a>
        <a data-page="inventory" class="${state.page==='inventory'?'active':''}">${icon('stack')} Inventory</a>
        <a data-page="customers" class="${state.page==='customers'?'active':''}">${icon('users')} Customers</a>
        <a data-page="settings" class="${state.page==='settings'?'active':''}">${icon('settings')} Settings</a>
        <a id="logoutBtn" style="color:var(--fg-3)">${icon('logout')} Logout</a>
      </nav>
    </aside>
    <div class="backdrop" id="backdrop"></div>
    <main class="main">
      <div class="top">
        <div style="display:flex;align-items:center;gap:12px">
          <button class="menu-btn" id="menuBtn">${icon('menu')}</button>
          <div><h1 id="pageTitle"></h1><div class="sub" id="pageSub"></div></div>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="btn-icon" id="themeBtn">${icon(state.theme==='dark'?'sun':'moon')}</button>
          <a href="index.html" class="btn btn-ghost btn-sm">View store →</a>
        </div>
      </div>
      <div id="pageContent">${content}</div>
    </main>
  </div>`;
}

/* ============ DASHBOARD ============ */
function renderDashboard() {
  const orders = getOrders();
  const sales = orders.reduce((s,o) => s + o.total, 0);
  const pending = orders.filter(o => o.status === 'pending').length;
  const completed = orders.filter(o => o.status === 'delivered' || o.status === 'paid').length;
  const lowStock = PRODUCTS.filter(p => p.stock <= 8);
  const chart = Array.from({length:12}, (_,i) => { const base = 20 + Math.sin(i*1.7)*20 + orders.length * 4; return Math.max(14, Math.round(base + (i%3)*8)); });
  return `
  <div class="stats">
    <div class="stat"><div class="lbl">Total sales</div><div class="v">${money(sales)}</div><div class="delta up">+${(orders.length*4.2).toFixed(1)}% vs last week</div></div>
    <div class="stat"><div class="lbl">Orders</div><div class="v">${orders.length}</div><div class="delta">${completed} completed</div></div>
    <div class="stat"><div class="lbl">Products</div><div class="v">${PRODUCTS.length}</div><div class="delta">In catalog</div></div>
    <div class="stat"><div class="lbl">Low stock</div><div class="v">${lowStock.length}</div><div class="delta warn">Needs attention</div></div>
  </div>
  <div class="card">
    <div class="card-head"><div><div class="muted" style="font-size:.76rem;text-transform:uppercase;letter-spacing:.08em">Revenue (last 12 days)</div><div class="serif" style="font-size:1.5rem;margin-top:4px">${money(sales + 1240)}</div></div></div>
    <div class="chart">${chart.map(v => `<div class="bar" style="height:${v}%"></div>`).join('')}</div>
    <div class="chart-labels">${Array.from({length:12},(_,i)=>`<span>${i+1}</span>`).join('')}</div>
  </div>
  <div class="card" style="padding:0;overflow:hidden">
    <div class="card-head" style="padding:20px 24px;margin:0;border-bottom:1px solid var(--border)"><h3>Recent orders</h3><a data-page="orders" style="font-size:.85rem;color:var(--fg-3);cursor:pointer">View all →</a></div>
    <div class="table-scroll"><table>
      <thead><tr><th>Order ID</th><th>Customer</th><th>Payment</th><th>Status</th><th style="text-align:right">Total</th></tr></thead>
      <tbody>
        ${orders.length ? orders.slice().reverse().slice(0,5).map(o => `
          <tr data-order="${o.id}" style="cursor:pointer">
            <td><strong>${escape(o.id)}</strong></td>
            <td><div style="font-weight:500">${escape(o.customer.name)}</div><div class="muted" style="font-size:.78rem">${escape(o.customer.city)}</div></td>
            <td>${escape(o.payment)}</td>
            <td><span class="status ${o.status}"><span class="dot"></span>${escape(o.status)}</span></td>
            <td style="text-align:right;font-family:'Fraunces',serif">${money(o.total)}</td>
          </tr>`).join('') : `<tr><td colspan="5" class="empty">No orders yet.</td></tr>`}
      </tbody>
    </table></div>
  </div>`;
}

/* ============ ORDERS ============ */
function getOrderCounts() {
  const orders = getOrders();
  const counts = { all: orders.length };
  ORDER_STATUSES.forEach(s => counts[s] = orders.filter(o => o.status === s).length);
  return counts;
}
function renderOrders() {
  const counts = getOrderCounts();
  let list = getOrders().slice().reverse();
  if (state.orderSearch) { const q = state.orderSearch.toLowerCase(); list = list.filter(o => (o.id + o.customer.name + o.customer.phone + o.customer.city).toLowerCase().includes(q)); }
  if (state.orderStatus !== 'all') list = list.filter(o => o.status === state.orderStatus);
  const tabLabel = (s) => s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1);
  const tabs = ['all', ...ORDER_STATUSES].map(s => `
    <button class="order-tab tab-${s} ${state.orderStatus===s?'active':''}" data-status-tab="${s}">
      ${tabLabel(s)} <span class="cnt">${counts[s] || 0}</span>
    </button>`).join('');
  return `
  <div class="card" style="padding:20px">
    <div class="order-tabs" id="orderTabs">${tabs}</div>
    <div class="filter-bar">
      <input type="text" id="orderSearch" placeholder="Search by ID, name, phone, city…" value="${escape(state.orderSearch)}">
    </div>
    <div class="table-scroll"><table>
      <thead><tr><th>Order ID</th><th>Date</th><th>Customer</th><th>Payment</th><th>Status</th><th style="text-align:right">Total</th></tr></thead>
      <tbody>
        ${list.length ? list.map(o => `
          <tr data-order="${o.id}" style="cursor:pointer">
            <td><strong>${escape(o.id)}</strong></td>
            <td class="muted">${new Date(o.date).toLocaleDateString()}</td>
            <td><div style="font-weight:500">${escape(o.customer.name)}</div><div class="muted" style="font-size:.78rem">${escape(o.customer.phone)}</div></td>
            <td>${escape(o.payment)}</td>
            <td><span class="status ${o.status}"><span class="dot"></span>${escape(o.status)}</span></td>
            <td style="text-align:right;font-family:'Fraunces',serif">${money(o.total)}</td>
          </tr>`).join('') : `<tr><td colspan="6" class="empty">No orders in this category.</td></tr>`}
      </tbody>
    </table></div>
  </div>`;
}

/* ============ PRODUCTS ============ */
function renderProducts() {
  return `
  <div class="card" style="padding:20px">
    <div class="filter-bar" style="justify-content:space-between">
      <div style="display:flex;gap:10px;flex:1;flex-wrap:wrap">
        <input type="text" id="prodSearch" placeholder="Search products…">
        <select id="prodCatFilter">
          <option value="">All categories</option>
          ${CATEGORIES.map(c => `<option value="${c}">${escape(c)}</option>`).join('')}
        </select>
      </div>
      <button class="btn btn-primary btn-sm" id="addProductBtn">${icon('plus')} Add Product</button>
    </div>
    <div class="table-scroll"><table id="prodTable">
      <thead><tr><th>Product</th><th>Brand</th><th>Category</th><th>Price</th><th>Stock</th><th>Images</th><th style="text-align:right">Actions</th></tr></thead>
      <tbody>
        ${PRODUCTS.map(p => {
          const imgCount = (p.images && p.images.filter(Boolean).length) || (p.image ? 1 : 0);
          return `
          <tr data-cat="${escape(p.category)}" data-name="${escape(p.name.toLowerCase())}">
            <td><div class="prod-cell"><div class="prod-thumb">${productThumb(p)}</div><div style="font-weight:500;font-size:.86rem">${escape(p.name)}</div></div></td>
            <td>${escape(p.brand)}</td>
            <td><span class="muted" style="font-size:.82rem">${escape(p.category)}</span></td>
            <td style="font-family:'Fraunces',serif">${money(p.price)}</td>
            <td>${p.stock}</td>
            <td><span class="status ${imgCount===0?'cancelled':imgCount>=4?'delivered':'processing'}"><span class="dot"></span>${imgCount}/4</span></td>
            <td>
              <div class="row-actions">
                <button class="btn-icon-sm" data-edit="${p.id}" title="Edit">${icon('edit')}</button>
                <button class="btn-icon-sm" data-del="${p.id}" title="Delete">${icon('trash')}</button>
              </div>
            </td>
          </tr>`;
        }).join('')}
      </tbody>
    </table></div>
  </div>`;
}

/* ============ PRODUCT MODAL (with 4-image upload) ============ */
function openProductModal(product) {
  const isEdit = !!product;
  const p = product || {
    name:'', brand:'', category:'Smartphones', price:0, oldPrice:null,
    stock:10, rating:4.5, reviews:0, featured:false, bestseller:false, new:false,
    description:'', specs:{}, images:[]
  };
  // Support old single-image field
  let existingImages = Array.isArray(p.images) ? [...p.images] : [];
  if (p.image && !existingImages.length) existingImages = [p.image];
  while (existingImages.length < 4) existingImages.push('');

  const specsText = Object.entries(p.specs || {}).map(([k,v]) => `${k}: ${v}`).join('\n');

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = 'productModal';
  modal.innerHTML = `
    <div class="modal-head">
      <h3>${isEdit ? 'Edit product' : 'Add new product'}</h3>
      <button class="btn-icon" id="modalClose">${icon('x')}</button>
    </div>
    <div class="modal-body">
      <div class="field-row">
        <div class="field full"><label>Product name *</label><input id="pf-name" value="${escape(p.name)}" placeholder="e.g. iPhone 16 Pro"></div>
        <div class="field"><label>Brand *</label><input id="pf-brand" value="${escape(p.brand)}" placeholder="Apple"></div>
        <div class="field"><label>Category *</label>
          <select id="pf-category">${CATEGORIES.map(c => `<option value="${c}" ${p.category===c?'selected':''}>${c}</option>`).join('')}</select>
        </div>
        <div class="field"><label>Price (USD) *</label><input id="pf-price" type="number" min="0" step="0.01" value="${p.price}" placeholder="999"></div>
        <div class="field"><label>Old price (optional)</label><input id="pf-oldPrice" type="number" min="0" step="0.01" value="${p.oldPrice || ''}" placeholder="1099"></div>
        <div class="field"><label>Stock *</label><input id="pf-stock" type="number" min="0" value="${p.stock}" placeholder="10"></div>
        <div class="field"><label>Rating (0–5)</label><input id="pf-rating" type="number" min="0" max="5" step="0.1" value="${p.rating}"></div>
      </div>

      <div class="field full" style="margin-top:8px">
        <label style="margin-bottom:8px">Product images (up to 4 angles)</label>
        <p class="muted" style="font-size:.78rem;margin-bottom:12px">Upload sawir ama geli URL — afarta jiho ayaa wada muuqan doona bogga alaabta.</p>
        <div class="image-grid" id="imageGrid">
          ${[0,1,2,3].map(i => `
            <div class="image-slot" data-slot="${i}">
              <div class="img-preview" data-preview="${i}" title="Click to upload">
                ${existingImages[i]
                  ? `<img src="${escape(existingImages[i])}" alt="Image ${i+1}" data-img="${i}">`
                  : `<div class="img-empty"><svg class="icon" viewBox="0 0 24 24" style="width:22px;height:22px;stroke:currentColor;fill:none;stroke-width:1.6"><path d="M12 5v14M5 12h14"/></svg><span>Image ${i+1}</span></div>`}
              </div>
              <input type="file" accept="image/*" data-file="${i}" style="display:none">
              <input type="text" data-url="${i}" value="${existingImages[i] && !existingImages[i].startsWith('data:') ? escape(existingImages[i]) : ''}" placeholder="URL ama upload">
              <button type="button" class="img-remove" data-remove="${i}" title="Remove" style="display:${existingImages[i] ? 'flex' : 'none'}">×</button>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="field full" style="margin-top:16px">
        <label>Description</label>
        <textarea id="pf-desc" placeholder="Short product description…">${escape(p.description)}</textarea>
      </div>
      <div class="field full">
        <label>Specifications (one per line, format: Label: Value)</label>
        <textarea id="pf-specs" placeholder="Display: 6.7&quot;&#10;Chip: A17 Pro">${escape(specsText)}</textarea>
      </div>
      <div class="check-row">
        <label><input type="checkbox" id="pf-featured" ${p.featured?'checked':''}> Featured</label>
        <label><input type="checkbox" id="pf-bestseller" ${p.bestseller?'checked':''}> Best seller</label>
        <label><input type="checkbox" id="pf-new" ${p.new?'checked':''}> New arrival</label>
      </div>
    </div>
    <div class="modal-foot">
      ${isEdit ? `<button class="btn btn-ghost btn-danger" id="modalDelete">Delete</button>` : ''}
      <button class="btn btn-ghost" id="modalCancel">Cancel</button>
      <button class="btn btn-primary" id="modalSave">${isEdit ? 'Save changes' : 'Add product'}</button>
    </div>
  `;

  const bg = document.createElement('div');
  bg.className = 'modal-bg';
  bg.id = 'productModalBg';
  document.body.appendChild(bg);
  document.body.appendChild(modal);
  requestAnimationFrame(() => { modal.classList.add('open'); bg.classList.add('open'); });

  const close = () => {
    modal.classList.remove('open'); bg.classList.remove('open');
    setTimeout(() => { modal.remove(); bg.remove(); }, 300);
  };
  bg.onclick = close;
  $('#modalClose').onclick = close;
  $('#modalCancel').onclick = close;

  /* ---------- Image slot handling ---------- */
  const imageData = [...existingImages];

  function refreshSlot(i) {
    const preview = modal.querySelector(`[data-preview="${i}"]`);
    const removeBtn = modal.querySelector(`[data-remove="${i}"]`);
    const urlInput = modal.querySelector(`[data-url="${i}"]`);
    const val = imageData[i];
    if (val) {
      preview.innerHTML = `<img src="${escape(val)}" alt="Image ${i+1}">`;
      removeBtn.style.display = 'flex';
      if (!val.startsWith('data:') && urlInput.value !== val) urlInput.value = val;
    } else {
      preview.innerHTML = `<div class="img-empty"><svg class="icon" viewBox="0 0 24 24" style="width:22px;height:22px;stroke:currentColor;fill:none;stroke-width:1.6"><path d="M12 5v14M5 12h14"/></svg><span>Image ${i+1}</span></div>`;
      removeBtn.style.display = 'none';
      urlInput.value = '';
    }
  }

  modal.querySelectorAll('[data-preview]').forEach(el => {
    el.onclick = () => modal.querySelector(`[data-file="${el.dataset.preview}"]`).click();
  });

  modal.querySelectorAll('[data-file]').forEach(input => {
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 1.5 * 1024 * 1024) {
        toast('Sawirku wuu weyn yahay (max 1.5MB). Fadlan yaree.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        const idx = +input.dataset.file;
        imageData[idx] = ev.target.result;
        refreshSlot(idx);
      };
      reader.readAsDataURL(file);
    };
  });

  modal.querySelectorAll('[data-url]').forEach(input => {
    input.oninput = (e) => {
      const idx = +input.dataset.url;
      const v = e.target.value.trim();
      if (v) {
        imageData[idx] = v;
        const preview = modal.querySelector(`[data-preview="${idx}"]`);
        preview.innerHTML = `<img src="${escape(v)}" alt="Image ${idx+1}" onerror="this.src=''">`;
        modal.querySelector(`[data-remove="${idx}"]`).style.display = 'flex';
      } else {
        imageData[idx] = '';
        refreshSlot(idx);
      }
    };
  });

  modal.querySelectorAll('[data-remove]').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const idx = +btn.dataset.remove;
      imageData[idx] = '';
      refreshSlot(idx);
    };
  });

  /* ---------- Save ---------- */
  $('#modalSave').onclick = () => {
    const name = $('#pf-name').value.trim();
    const brand = $('#pf-brand').value.trim();
    const category = $('#pf-category').value;
    const price = parseFloat($('#pf-price').value);
    const stock = parseInt($('#pf-stock').value, 10);
    if (!name) { toast('Product name is required'); return; }
    if (!brand) { toast('Brand is required'); return; }
    if (!category) { toast('Category is required'); return; }
    if (isNaN(price) || price < 0) { toast('Valid price is required'); return; }
    if (isNaN(stock) || stock < 0) { toast('Valid stock is required'); return; }

    const specsLines = $('#pf-specs').value.split('\n').map(l => l.trim()).filter(Boolean);
    const specs = {};
    specsLines.forEach(line => {
      const idx = line.indexOf(':');
      if (idx > 0) {
        const k = line.slice(0, idx).trim();
        const v = line.slice(idx + 1).trim();
        if (k) specs[k] = v;
      }
    });
    const oldPriceVal = parseFloat($('#pf-oldPrice').value);
    const cleanImages = imageData.filter(Boolean);

    const data = {
      name, brand, category, price, stock,
      oldPrice: !isNaN(oldPriceVal) && oldPriceVal > 0 ? oldPriceVal : null,
      rating: parseFloat($('#pf-rating').value) || 4.5,
      reviews: isEdit ? p.reviews : 0,
      featured: $('#pf-featured').checked,
      bestseller: $('#pf-bestseller').checked,
      new: $('#pf-new').checked,
      description: $('#pf-desc').value.trim(),
      specs,
      images: cleanImages
    };
    if (isEdit) {
      const idx = PRODUCTS.findIndex(x => x.id === p.id);
      if (idx >= 0) PRODUCTS[idx] = { ...PRODUCTS[idx], ...data };
      toast('Product updated');
    } else {
      PRODUCTS.push({ id: nextId(), ...data });
      toast('Product added');
    }
    try {
      saveProducts(PRODUCTS);
    } catch(e) {
      toast('Kaydinta waa buuxdaa — sawirrada yaree');
      return;
    }
    close();
    setTimeout(render, 350);
  };

  const delBtn = $('#modalDelete');
  if (delBtn) delBtn.onclick = () => {
    if (!confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
    PRODUCTS = PRODUCTS.filter(x => x.id !== p.id);
    saveProducts(PRODUCTS);
    toast('Product deleted');
    close();
    setTimeout(render, 350);
  };
}

/* ============ INVENTORY ============ */
function renderInventory() {
  const sorted = PRODUCTS.slice().sort((a,b) => a.stock - b.stock);
  return `
  <div class="card" style="padding:20px">
    <div class="card-head" style="margin-bottom:16px"><h3>Inventory status</h3><span class="muted" style="font-size:.85rem">${PRODUCTS.filter(p=>p.stock<=8).length} products need attention</span></div>
    <div class="table-scroll"><table>
      <thead><tr><th>SKU</th><th>Product</th><th>Stock</th><th>Status</th><th style="text-align:right">Price</th></tr></thead>
      <tbody>
        ${sorted.map(p => `
          <tr>
            <td><code style="font-size:.82rem">SKU-${String(p.id).toUpperCase()}</code></td>
            <td>${escape(p.name)}<div class="muted" style="font-size:.75rem">${escape(p.brand)}</div></td>
            <td><strong>${p.stock}</strong></td>
            <td><span class="status ${p.stock===0?'cancelled':p.stock<=4?'pending':p.stock<=8?'processing':'delivered'}"><span class="dot"></span>${p.stock===0?'Out':p.stock<=4?'Low':p.stock<=8?'Limited':'Healthy'}</span></td>
            <td style="text-align:right;font-family:'Fraunces',serif">${money(p.price)}</td>
          </tr>`).join('')}
      </tbody>
    </table></div>
  </div>`;
}

/* ============ CUSTOMERS ============ */
function renderCustomers() {
  const orders = getOrders();
  const customers = {};
  orders.forEach(o => {
    const key = o.customer.phone || o.customer.name;
    if (!customers[key]) customers[key] = { name:o.customer.name, phone:o.customer.phone, email:o.customer.email, city:o.customer.city, orders:[], total:0 };
    customers[key].orders.push(o.id);
    customers[key].total += o.total;
  });
  const list = Object.values(customers).sort((a,b) => b.total - a.total);
  return `
  <div class="card" style="padding:20px">
    <div class="card-head" style="margin-bottom:16px"><h3>Customers</h3><span class="muted" style="font-size:.85rem">${list.length} unique customers</span></div>
    ${list.length ? `
    <div class="table-scroll"><table>
      <thead><tr><th>Name</th><th>Phone</th><th>City</th><th>Orders</th><th style="text-align:right">Total spent</th></tr></thead>
      <tbody>
        ${list.map(c => `
          <tr>
            <td><strong>${escape(c.name)}</strong><div class="muted" style="font-size:.76rem">${escape(c.email)}</div></td>
            <td>${escape(c.phone)}</td>
            <td>${escape(c.city)}</td>
            <td>${c.orders.length}</td>
            <td style="text-align:right;font-family:'Fraunces',serif">${money(c.total)}</td>
          </tr>`).join('')}
      </tbody>
    </table></div>` : `<div class="empty"><h3>No customers yet</h3><p>Customer data is generated from store orders.</p></div>`}
  </div>`;
}

/* ============ SETTINGS ============ */
function renderSettings() {
  const s = SETTINGS;
  return `
  <div class="card">
    <div class="card-head"><h3>Store settings</h3><span class="muted" style="font-size:.82rem">Changes save automatically to your browser</span></div>
    <form id="settingsForm">
      <div class="settings-section">
        <h4>Store information</h4>
        <div class="field-row">
          <div class="field"><label>Store name</label><input id="sf-storeName" value="${escape(s.storeName)}"></div>
          <div class="field"><label>Email</label><input id="sf-email" type="email" value="${escape(s.email)}"></div>
          <div class="field"><label>Location</label><input id="sf-location" value="${escape(s.location)}"></div>
          <div class="field"><label>Country</label><input id="sf-country" value="${escape(s.country)}"></div>
          <div class="field"><label>Currency code</label>
            <select id="sf-currency">
              ${['USD','EUR','GBP','SOS','KES','AED','SAR'].map(c => `<option value="${c}" ${s.currency===c?'selected':''}>${c}</option>`).join('')}
            </select>
          </div>
        </div>
      </div>
      <div class="settings-section">
        <h4>Contact</h4>
        <div class="field-row">
          <div class="field"><label>WhatsApp (local)</label><input id="sf-whatsappLocal" value="${escape(s.whatsappLocal)}" placeholder="0905771779"></div>
          <div class="field"><label>WhatsApp (international)</label><input id="sf-whatsappIntl" value="${escape(s.whatsappIntl)}" placeholder="252905771779"></div>
        </div>
      </div>
      <div class="settings-section">
        <h4>Delivery</h4>
        <div class="field-row">
          <div class="field full"><label>Delivery note</label><input id="sf-deliveryNote" value="${escape(s.deliveryNote)}"></div>
        </div>
      </div>
      <div class="settings-actions">
        <button type="button" class="btn btn-ghost" id="resetSettings">Reset to defaults</button>
        <button type="submit" class="btn btn-primary">${icon('check')} Save settings</button>
      </div>
    </form>
  </div>
  <div class="card">
    <div class="card-head"><h3>Payment methods</h3></div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px">
      ${['Visa','Mastercard','PayPal','Stripe','EVC Plus','Zaad','Sahal','eDahab'].map(m => `<div style="padding:12px 14px;border:1px solid var(--border);border-radius:10px;display:flex;align-items:center;gap:10px"><span class="status delivered"><span class="dot"></span>Active</span><span style="font-size:.88rem;font-weight:500">${escape(m)}</span></div>`).join('')}
    </div>
    <p class="muted" style="font-size:.82rem;margin-top:16px">All payments run in <strong>DEMO mode</strong>.</p>
  </div>
  <div class="card">
    <div class="card-head"><h3>Danger zone</h3></div>
    <div style="display:flex;gap:10px;flex-wrap:wrap">
      <button class="btn btn-ghost btn-danger" id="clearOrdersBtn">Clear all orders</button>
      <button class="btn btn-ghost btn-danger" id="resetProductsBtn">Reset products to default</button>
    </div>
    <p class="muted" style="font-size:.82rem;margin-top:12px">These actions cannot be undone.</p>
  </div>`;
}

/* ============ ORDER DRAWER ============ */
function renderOrderDrawer(order) {
  return `
  <div class="drawer-head"><div><div class="muted" style="font-size:.76rem;text-transform:uppercase;letter-spacing:.08em">Order</div><h3 class="serif" style="margin-top:4px">${escape(order.id)}</h3></div><button class="btn-icon" id="closeDrawer">${icon('x')}</button></div>
  <div class="drawer-body">
    <div style="margin-bottom:20px">
      <label style="font-size:.8rem;font-weight:500;color:var(--fg-2);display:block;margin-bottom:6px">Status</label>
      <select id="orderStatusSelect" style="width:100%;padding:10px 14px;border:1px solid var(--border-2);border-radius:10px;background:var(--bg);font-size:.9rem;outline:none">
        ${ORDER_STATUSES.map(s => `<option value="${s}" ${order.status===s?'selected':''}>${s.charAt(0).toUpperCase()+s.slice(1)}</option>`).join('')}
      </select>
    </div>
    <div style="margin-bottom:16px">
      <div class="muted" style="font-size:.76rem;text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px">Customer</div>
      <div class="detail-row"><span class="k">Name</span><span class="v">${escape(order.customer.name)}</span></div>
      <div class="detail-row"><span class="k">Phone</span><span class="v">${escape(order.customer.phone)}</span></div>
      <div class="detail-row"><span class="k">Email</span><span class="v" style="font-size:.8rem">${escape(order.customer.email)}</span></div>
      <div class="detail-row"><span class="k">City</span><span class="v">${escape(order.customer.city)}</span></div>
      <div class="detail-row"><span class="k">Address</span><span class="v" style="max-width:60%;word-break:break-word">${escape(order.customer.address)}</span></div>
      ${order.customer.notes ? `<div class="detail-row"><span class="k">Notes</span><span class="v" style="max-width:60%;word-break:break-word">${escape(order.customer.notes)}</span></div>` : ''}
    </div>
    <div style="margin-bottom:16px">
      <div class="muted" style="font-size:.76rem;text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px">Payment</div>
      <div class="detail-row"><span class="k">Method</span><span class="v">${escape(order.payment)}</span></div>
      <div class="detail-row"><span class="k">Date</span><span class="v">${new Date(order.date).toLocaleString()}</span></div>
    </div>
    <div style="margin-bottom:16px">
      <div class="muted" style="font-size:.76rem;text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px">Items</div>
      ${order.items.map(i => `<div class="detail-row"><span class="k">${escape(i.name)} × ${i.qty}</span><span class="v">${money(i.price*i.qty)}</span></div>`).join('')}
      <div class="detail-row" style="padding-top:14px;font-size:1rem"><span class="k">Total</span><span class="v serif" style="font-size:1.2rem">${money(order.total)}</span></div>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button class="btn btn-primary" id="waOrderBtn" style="flex:1">Send on WhatsApp</button>
      <button class="btn btn-ghost" id="copyOrderBtn">Copy</button>
    </div>
  </div>`;
}

/* ============ RENDER ============ */
function render() {
  const app = $('#app');
  if (!state.authed) { app.innerHTML = renderLogin(); bindLogin(); return; }
  let content = '', title = '', sub = '';
  switch (state.page) {
    case 'dashboard': content = renderDashboard(); title = 'Dashboard'; sub = new Date().toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' }); break;
    case 'orders': content = renderOrders(); title = 'Orders'; sub = `${getOrders().length} total orders`; break;
    case 'products': content = renderProducts(); title = 'Products'; sub = `${PRODUCTS.length} products in catalog`; break;
    case 'inventory': content = renderInventory(); title = 'Inventory'; sub = 'Stock levels and status'; break;
    case 'customers': content = renderCustomers(); title = 'Customers'; sub = 'Derived from orders'; break;
    case 'settings': content = renderSettings(); title = 'Settings'; sub = 'Store configuration'; break;
  }
  app.innerHTML = renderLayout(content);
  $('#pageTitle').textContent = title;
  $('#pageSub').textContent = sub;
  bindLayout();
  bindPageEvents();
  if (state.selectedOrder) {
    const order = getOrders().find(o => o.id === state.selectedOrder);
    if (order) openDrawer(order);
  }
}

function bindLogin() {
  $('#loginForm').onsubmit = (e) => {
    e.preventDefault();
    if ($('#admE').value.trim() === ADMIN_CREDS.email && $('#admP').value === ADMIN_CREDS.password) {
      state.authed = true; sessionStorage.setItem(KEYS.ADMIN, '1'); render(); toast('Welcome back');
    } else { $('#admP').closest('.field').classList.add('invalid'); }
  };
}

function bindLayout() {
  $$('.nav-list a[data-page]').forEach(a => a.onclick = () => { state.page = a.dataset.page; state.sidebarOpen = false; render(); });
  $$('[data-page]').forEach(el => {
    if (!el.classList.contains('nav-list') && !el.closest('.nav-list')) {
      el.onclick = () => { state.page = el.dataset.page; render(); };
    }
  });
  const logout = $('#logoutBtn'); if (logout) logout.onclick = () => { state.authed = false; sessionStorage.removeItem(KEYS.ADMIN); render(); };
  const themeBtn = $('#themeBtn'); if (themeBtn) themeBtn.onclick = () => { state.theme = state.theme === 'dark' ? 'light' : 'dark'; document.documentElement.setAttribute('data-theme', state.theme); localStorage.setItem(KEYS.THEME, state.theme); render(); };
  const menuBtn = $('#menuBtn'); if (menuBtn) menuBtn.onclick = () => { state.sidebarOpen = true; $('#sidebar').classList.add('open'); $('#backdrop').classList.add('open'); };
  const backdrop = $('#backdrop'); if (backdrop) backdrop.onclick = () => { state.sidebarOpen = false; $('#sidebar').classList.remove('open'); $('#backdrop').classList.remove('open'); };
}

function bindPageEvents() {
  if (state.page === 'orders') {
    $$('[data-status-tab]').forEach(tab => tab.onclick = () => { state.orderStatus = tab.dataset.statusTab; render(); });
    const s = $('#orderSearch');
    if (s) s.oninput = (e) => {
      state.orderSearch = e.target.value; render();
      setTimeout(() => { const el = $('#orderSearch'); if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); } }, 0);
    };
  }
  if (state.page === 'products') {
    const s = $('#prodSearch');
    if (s) s.oninput = () => { const q = s.value.toLowerCase(); $$('#prodTable tbody tr').forEach(tr => tr.style.display = tr.dataset.name.includes(q) ? '' : 'none'); };
    const c = $('#prodCatFilter');
    if (c) c.onchange = () => { $$('#prodTable tbody tr').forEach(tr => { const match = !c.value || tr.dataset.cat === c.value; const visible = match && (!s.value || tr.dataset.name.includes(s.value.toLowerCase())); tr.style.display = visible ? '' : 'none'; }); };
    const addBtn = $('#addProductBtn'); if (addBtn) addBtn.onclick = () => openProductModal(null);
    $$('[data-edit]').forEach(b => b.onclick = () => {
      const prod = PRODUCTS.find(x => x.id === b.dataset.edit);
      if (prod) openProductModal(prod);
    });
    $$('[data-del]').forEach(b => b.onclick = () => {
      const prod = PRODUCTS.find(x => x.id === b.dataset.del);
      if (!prod) return;
      if (!confirm(`Delete "${prod.name}"? This cannot be undone.`)) return;
      PRODUCTS = PRODUCTS.filter(x => x.id !== b.dataset.del);
      saveProducts(PRODUCTS);
      toast('Product deleted');
      render();
    });
  }
  $$('tr[data-order]').forEach(tr => tr.onclick = () => {
    state.selectedOrder = tr.dataset.order;
    const order = getOrders().find(o => o.id === state.selectedOrder);
    if (order) openDrawer(order);
  });
  if (state.page === 'settings') {
    const form = $('#settingsForm');
    if (form) form.onsubmit = (e) => {
      e.preventDefault();
      SETTINGS = {
        storeName: $('#sf-storeName').value.trim() || DEFAULT_SETTINGS.storeName,
        email: $('#sf-email').value.trim() || DEFAULT_SETTINGS.email,
        location: $('#sf-location').value.trim() || DEFAULT_SETTINGS.location,
        country: $('#sf-country').value.trim() || DEFAULT_SETTINGS.country,
        currency: $('#sf-currency').value,
        whatsappLocal: $('#sf-whatsappLocal').value.trim() || DEFAULT_SETTINGS.whatsappLocal,
        whatsappIntl: $('#sf-whatsappIntl').value.trim() || DEFAULT_SETTINGS.whatsappIntl,
        deliveryNote: $('#sf-deliveryNote').value.trim() || DEFAULT_SETTINGS.deliveryNote
      };
      saveSettings(SETTINGS);
      toast('Settings saved');
    };
    const rs = $('#resetSettings');
    if (rs) rs.onclick = () => { if (!confirm('Reset all settings to defaults?')) return; SETTINGS = { ...DEFAULT_SETTINGS }; saveSettings(SETTINGS); render(); toast('Settings reset'); };
    const cb = $('#clearOrdersBtn');
    if (cb) cb.onclick = () => { if (confirm('Clear all orders?')) { saveOrders([]); render(); toast('All orders cleared'); } };
    const rb = $('#resetProductsBtn');
    if (rb) rb.onclick = () => {
      if (!confirm('Reset all products to the default demo catalog?')) return;
      localStorage.removeItem(KEYS.PRODUCTS);
      PRODUCTS = loadProducts();
      toast('Products reset');
      render();
    };
  }
}

function openDrawer(order) {
  const existing = $('#orderDrawer'); if (existing) existing.remove();
  const backdrop = document.createElement('div'); backdrop.className = 'backdrop-modal'; backdrop.id = 'drawerBackdrop';
  const drawer = document.createElement('aside'); drawer.className = 'drawer'; drawer.id = 'orderDrawer';
  drawer.innerHTML = renderOrderDrawer(order);
  document.body.appendChild(backdrop);
  document.body.appendChild(drawer);
  requestAnimationFrame(() => { drawer.classList.add('open'); backdrop.classList.add('open'); });
  backdrop.onclick = closeDrawer;
  $('#closeDrawer').onclick = closeDrawer;
  $('#orderStatusSelect').onchange = (e) => {
    const all = getOrders();
    const idx = all.findIndex(o => o.id === order.id);
    if (idx >= 0) { all[idx].status = e.target.value; saveOrders(all); toast('Status updated'); }
  };
  $('#waOrderBtn').onclick = () => {
    const lines = order.items.map(i => `• ${i.name}${i.qty>1?` × ${i.qty}`:''} — ${money(i.price*i.qty)}`).join('\n');
    const msg = `Diinle order ${order.id}\n\nCustomer: ${order.customer.name}\nPhone: ${order.customer.phone}\nCity: ${order.customer.city}\nAddress: ${order.customer.address}\n\nItems:\n${lines}\n\nPayment: ${order.payment}\nTotal: ${money(order.total)}\nStatus: ${order.status}`;
    window.open(`https://wa.me/${order.customer.phone.replace(/[^\d]/g,'')}?text=${encodeURIComponent(msg)}`, '_blank');
  };
  $('#copyOrderBtn').onclick = () => {
    const lines = order.items.map(i => `${i.name} × ${i.qty} — ${money(i.price*i.qty)}`).join('\n');
    const text = `Order ${order.id}\nCustomer: ${order.customer.name}\nPhone: ${order.customer.phone}\nCity: ${order.customer.city}\nAddress: ${order.customer.address}\nEmail: ${order.customer.email}\n\nItems:\n${lines}\n\nPayment: ${order.payment}\nTotal: ${money(order.total)}\nStatus: ${order.status}`;
    navigator.clipboard.writeText(text).then(() => toast('Copied')).catch(() => toast('Copy failed'));
  };
}
function closeDrawer() {
  const drawer = $('#orderDrawer'); const backdrop = $('#drawerBackdrop');
  if (drawer) { drawer.classList.remove('open'); setTimeout(() => drawer.remove(), 400); }
  if (backdrop) { backdrop.classList.remove('open'); setTimeout(() => backdrop.remove(), 400); }
  state.selectedOrder = null;
}

function boot() {
  document.documentElement.setAttribute('data-theme', state.theme);
  render();
}
boot();
})();