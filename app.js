/* ============================================================
   DIINLE — APP LOGIC
   ============================================================ */
(() => {
  'use strict';

  const t = (path, vars) => {
    const parts = path.split('.');
    let v = I18N[state.lang];
    for (const p of parts) v = v?.[p];
    if (typeof v === 'string' && vars) return v.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
    return v ?? path;
  };

  const state = {
    lang: localStorage.getItem('diinle_lang') || 'en',
    theme: localStorage.getItem('diinle_theme') || (window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light'),
    cart: JSON.parse(localStorage.getItem('diinle_cart') || '[]'),
    wishlist: JSON.parse(localStorage.getItem('diinle_wish') || '[]'),
    filters: { categories: [], brands: [], priceMax: 3000, inStock: false, onSale: false },
    sort: 'featured',
    route: { name: 'home', parts: [], params: {} }
  };

  const save = () => {
    localStorage.setItem('diinle_cart', JSON.stringify(state.cart));
    localStorage.setItem('diinle_wish', JSON.stringify(state.wishlist));
    localStorage.setItem('diinle_lang', state.lang);
    localStorage.setItem('diinle_theme', state.theme);
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const money = (n) => '$' + Number(n).toLocaleString('en-US');
  const escape = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const stars = (r) => '★'.repeat(Math.round(r)) + '☆'.repeat(5 - Math.round(r));
  const catName = (id) => { const c = CATEGORIES.find(x => x.id === id); return c ? (state.lang === 'so' ? c.nameSo : c.name) : id; };
  const productById = (id) => PRODUCTS.find(p => p.id === id);
  const discountPct = (p) => p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;

  function toast(msg) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `<svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg><span>${escape(msg)}</span>`;
    $('#toasts').appendChild(el);
    setTimeout(() => el.remove(), 3200);
  }

  function productSVG(product) {
    // Haddii sawir dhab ah uu jiro → isticmaal
    const img = getFirstImage(product);
    if (img) {
      return `<img src="${img}" alt="${escape(product.name)}" loading="lazy"
              style="width:100%;height:100%;object-fit:contain;padding:8%"
              onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
            <div style="display:none;width:100%;height:100%;align-items:center;justify-content:center">${productSVGFallback(product)}</div>`;
    }
    return productSVGFallback(product);
  }

  function getFirstImage(p) {
    if (p.images && p.images.length) {
      const first = p.images.find(Boolean);
      if (first) return first;
    }
    if (p.image) return p.image;
    return null;
  }

  function productSVGFallback(product) {
    const c = product.colors?.[0] || '#1c1c1e';
    const isDark = state.theme === 'dark';
    const bg = isDark ? '#232327' : '#e7e7ea';
    const screen = isDark ? '#0c0c0e' : '#fafafa';
    const stroke = isDark ? '#3a3a3f' : '#c9c9cd';
    const cat = product.category;
    const frame = `<rect x="30" y="30" width="140" height="140" rx="20" fill="${bg}" stroke="${stroke}" stroke-width="1.5"/>`;
    const screens = {
      Smartphones: `<rect x="70" y="38" width="60" height="124" rx="12" fill="${c}"/><rect x="75" y="44" width="50" height="112" rx="8" fill="${screen}"/><rect x="92" y="40" width="16" height="3" rx="1.5" fill="${c}"/>`,
      Laptops: `<rect x="38" y="60" width="124" height="80" rx="6" fill="${c}"/><rect x="44" y="66" width="112" height="68" rx="3" fill="${screen}"/><path d="M28 145h144l-6 12H34z" fill="${c}"/>`,
      Tablets: `<rect x="55" y="45" width="90" height="110" rx="10" fill="${c}"/><rect x="61" y="52" width="78" height="96" rx="6" fill="${screen}"/>`,
      Smartwatches: `<rect x="80" y="70" width="40" height="60" rx="10" fill="${c}"/><rect x="84" y="75" width="32" height="50" rx="6" fill="${screen}"/>`,
      Headphones: `<path d="M55 110V90a45 45 0 0 1 90 0v20" fill="none" stroke="${c}" stroke-width="10" stroke-linecap="round"/><rect x="42" y="104" width="26" height="48" rx="12" fill="${c}"/><rect x="132" y="104" width="26" height="48" rx="12" fill="${c}"/>`,
      Earbuds: `<ellipse cx="75" cy="118" rx="14" ry="18" fill="${c}"/><ellipse cx="125" cy="118" rx="14" ry="18" fill="${c}"/>`,
      Speakers: `<rect x="60" y="55" width="80" height="110" rx="16" fill="${c}"/><circle cx="100" cy="90" r="18" fill="${screen}"/><circle cx="100" cy="135" r="10" fill="${screen}"/>`,
      Cameras: `<rect x="45" y="70" width="110" height="80" rx="12" fill="${c}"/><circle cx="100" cy="110" r="24" fill="${screen}"/>`,
      Monitors: `<rect x="35" y="55" width="130" height="80" rx="6" fill="${c}"/><rect x="41" y="61" width="118" height="68" rx="3" fill="${screen}"/>`,
      Gaming: `<rect x="55" y="75" width="90" height="60" rx="22" fill="${c}"/><circle cx="80" cy="100" r="6" fill="${screen}"/><circle cx="120" cy="100" r="6" fill="${screen}"/>`,
      Accessories: `<rect x="60" y="60" width="80" height="80" rx="14" fill="${c}"/>`,
      Networking: `<rect x="45" y="80" width="110" height="55" rx="10" fill="${c}"/><circle cx="65" cy="107" r="4" fill="${screen}"/><circle cx="80" cy="107" r="4" fill="${screen}"/><circle cx="95" cy="107" r="4" fill="${screen}"/>`
    };
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">${frame}${screens[cat] || screens.Accessories}</svg>`;
  }

  function catIcon(name) {
    const icons = {
      phone: '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/>',
      laptop: '<rect x="4" y="6" width="16" height="10" rx="1.5"/><path d="M2 19h20"/>',
      tablet: '<rect x="5" y="3" width="14" height="18" rx="2"/>',
      watch: '<rect x="8" y="7" width="8" height="10" rx="2"/><path d="M9 7V5a3 3 0 0 1 6 0v2M9 17v2a3 3 0 0 0 6 0v-2"/>',
      headphone: '<path d="M4 14v-2a8 8 0 1 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="2"/><rect x="17" y="14" width="4" height="6" rx="2"/>',
      earbuds: '<path d="M8 8a3 3 0 1 1 3-3v10a3 3 0 1 1-3 3M16 8a3 3 0 1 0-3-3v10a3 3 0 1 0 3 3"/>',
      speaker: '<rect x="6" y="3" width="12" height="18" rx="2"/><circle cx="12" cy="9" r="2.5"/><circle cx="12" cy="15.5" r="1.5"/>',
      camera: '<rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13.5" r="4"/><path d="M8 7l1.5-3h5L16 7"/>',
      monitor: '<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M9 20h6M12 16v4"/>',
      gamepad: '<rect x="3" y="8" width="18" height="10" rx="5"/><circle cx="8" cy="13" r="1" fill="currentColor"/><circle cx="16" cy="13" r="1" fill="currentColor"/>',
      accessory: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 12h8M12 8v8"/>',
      wifi: '<path d="M5 12a10 10 0 0 1 14 0M8 15a5 5 0 0 1 8 0M12 19h.01"/>'
    };
    return `<svg class="icon" viewBox="0 0 24 24" style="width:22px;height:22px">${icons[name] || icons.accessory}</svg>`;
  }

  /* Cart */
  function addToCart(id, qty = 1, opts = {}) {
    const existing = state.cart.find(c => c.id === id && JSON.stringify(c.opts || {}) === JSON.stringify(opts));
    if (existing) existing.qty += qty;
    else state.cart.push({ id, qty, opts });
    save(); updateBadge(); renderCart();
    const b = $('#cartBadge'); b.classList.add('bump'); setTimeout(() => b.classList.remove('bump'), 400);
    toast(t('toast.added'));
  }
  function removeFromCart(i) { state.cart.splice(i, 1); save(); updateBadge(); renderCart(); toast(t('toast.removed')); }
  function setQty(i, q) { if (q <= 0) return removeFromCart(i); state.cart[i].qty = q; save(); updateBadge(); renderCart(); }
  function cartTotal() { return state.cart.reduce((s, i) => s + (productById(i.id)?.price || 0) * i.qty, 0); }
  function updateBadge() {
    const n = state.cart.reduce((s, i) => s + i.qty, 0);
    const b = $('#cartBadge');
    b.textContent = n;
    b.classList.toggle('show', n > 0);
  }
  function renderCart() {
    const body = $('#cartBody'), foot = $('#cartFoot');
    $('#cartTitle').textContent = `${t('cart.title')} · ${state.cart.reduce((s, i) => s + i.qty, 0)}`;
    if (!state.cart.length) {
      body.innerHTML = `<div class="cart-empty">
      <div class="ico"><svg class="icon" viewBox="0 0 24 24" style="width:26px;height:26px"><path d="M3 4h2l2.5 12h11l2-8H6"/><circle cx="9" cy="20" r="1.3"/><circle cx="18" cy="20" r="1.3"/></svg></div>
      <h3 style="font-size:1.05rem">${escape(t('cart.empty'))}</h3>
      <p style="font-size:.88rem">${escape(t('cart.emptySub'))}</p>
      <button class="btn btn-primary btn-sm" onclick="document.getElementById('cartDrawer').classList.remove('open');document.getElementById('overlay').classList.remove('open');location.hash='#/shop'">${escape(t('buttons.shopNow'))}</button>
    </div>`;
      foot.innerHTML = ''; return;
    }
    body.innerHTML = state.cart.map((item, i) => {
      const p = productById(item.id); if (!p) return '';
      return `<div class="cart-item">
      <div class="thumb">${productSVG(p)}</div>
      <div><div class="nm">${escape(p.name)}</div><div class="br">${escape(p.brand)}</div><div class="pr">${money(p.price)}</div></div>
      <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end">
        <div class="qty"><button data-q="${i}" data-d="-1">−</button><span>${item.qty}</span><button data-q="${i}" data-d="1">+</button></div>
        <button class="btn-icon" style="width:26px;height:26px" data-rm="${i}"><svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
      </div>
    </div>`;
    }).join('');
    const total = cartTotal();
    foot.innerHTML = `
    <div class="sum-row"><span>${escape(t('cart.subtotal'))}</span><span>${money(total)}</span></div>
    <div class="sum-row"><span>${escape(t('cart.delivery'))}</span><span class="free-tag">${escape(t('cart.free'))}</span></div>
    <div class="sum-row total"><span>${escape(t('cart.total'))}</span><span class="v">${money(total)}</span></div>
    <button class="btn btn-primary" style="width:100%;padding:14px" id="goCheckout">${escape(t('buttons.checkout'))}</button>`;
    body.querySelectorAll('[data-q]').forEach(b => b.onclick = () => { const i = +b.dataset.q, d = +b.dataset.d; setQty(i, state.cart[i].qty + d); });
    body.querySelectorAll('[data-rm]').forEach(b => b.onclick = () => removeFromCart(+b.dataset.rm));
    $('#goCheckout').onclick = () => { closeAll(); location.hash = '#/checkout'; };
  }

  function productCard(p, d = 0) {
    const inWish = state.wishlist.includes(p.id);
    const off = discountPct(p);
    const oos = p.stock <= 0;
    return `<article class="pcard reveal reveal-d${d % 4 + 1}">
    <div class="pcard-media">
      <div class="pcard-badges">
        ${off ? `<span class="pbadge sale">−${off}%</span>` : ''}
        ${p.new ? `<span class="pbadge new">New</span>` : ''}
        ${p.bestseller && !off && !p.new ? `<span class="pbadge">Best</span>` : ''}
      </div>
      <button class="pcard-wish ${inWish ? 'active' : ''}" data-wish="${p.id}">
        <svg class="icon icon-sm" viewBox="0 0 24 24" fill="${inWish ? 'currentColor' : 'none'}" stroke="currentColor"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
      </button>
      <a href="#/product/${p.id}" style="position:absolute;inset:0;z-index:1"></a>
      ${productSVG(p)}
    </div>
    <div class="pcard-body">
      <div class="pcard-brand">${escape(p.brand)}</div>
      <a href="#/product/${p.id}" class="pcard-name">${escape(p.name)}</a>
      <div class="pcard-rating"><span class="stars">${stars(p.rating)}</span><span>${p.rating} · ${p.reviews}</span></div>
      <div class="pcard-price"><span class="now">${money(p.price)}</span>${p.oldPrice ? `<span class="was">${money(p.oldPrice)}</span>` : ''}</div>
      <div class="pcard-cta">
        <button class="btn ${oos ? 'btn-ghost' : 'btn-primary'} btn-sm" data-add="${p.id}" ${oos ? 'disabled' : ''}>${oos ? escape(t('buttons.outOfStock')) : escape(t('buttons.addToCart'))}</button>
      </div>
    </div>
  </article>`;
  }

  function renderFooter() {
    $('#footerMount').innerHTML = `
  <footer>
    <div class="container">
      <div class="foot-grid">
        <div class="foot-brand">
          <a class="logo" href="#/"><span class="logo-mark">D</span>Diinle</a>
          <p>${escape(t('footer.tagline'))}</p>
          <div style="margin-top:18px;display:flex;gap:6px;flex-wrap:wrap">
            ${CONFIG.DEMO_MODE ? '<span class="pbadge">Demo</span>' : ''}
            <span class="pbadge new">Free Delivery · ${escape(CONFIG.STORE.country)}</span>
          </div>
        </div>
        <div class="foot-col"><h4>${escape(t('footer.shop'))}</h4><ul>
          <li><a href="#/shop">All Products</a></li>
          <li><a href="#/shop?cat=Smartphones">Smartphones</a></li>
          <li><a href="#/shop?cat=Laptops">Laptops</a></li>
          <li><a href="#/shop?deals=1">Deals</a></li>
        </ul></div>
        <div class="foot-col"><h4>${escape(t('footer.support'))}</h4><ul>
          <li><a href="#/about">Shipping</a></li>
          <li><a href="#/about">Warranty</a></li>
          <li><a href="#/about">Contact</a></li>
        </ul></div>
        <div class="foot-col"><h4>${escape(t('footer.company'))}</h4><ul>
          <li><a href="#/about">About</a></li>
          <li><a href="admin.html">Admin</a></li>
        </ul></div>
        <div class="foot-col"><h4>${escape(t('footer.contact'))}</h4><ul>
          <li><a href="mailto:${CONFIG.STORE.email}">${escape(CONFIG.STORE.email)}</a></li>
          <li><a href="https://wa.me/${CONFIG.STORE.whatsappIntl}" target="_blank" rel="noopener">WhatsApp · ${CONFIG.STORE.whatsappLocal}</a></li>
          <li style="color:var(--fg-3);font-size:.88rem">${escape(CONFIG.STORE.location)}</li>
        </ul></div>
      </div>
      <div class="foot-bottom">
        <span>© ${new Date().getFullYear()} Diinle Electronics. ${escape(t('footer.rights'))}</span>
        <div class="foot-social">
          <a href="#/"><svg class="icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/></svg></a>
          <a href="#/"><svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M15 8h3V4h-3a5 5 0 0 0-5 5v2H7v4h3v7h4v-7h3l1-4h-4V9a1 1 0 0 1 1-1z"/></svg></a>
        </div>
      </div>
    </div>
  </footer>`;
  }

  /* Routing */
  function parseHash() {
    const h = location.hash.replace(/^#/, '') || '/';
    const [path, query] = h.split('?');
    const parts = path.split('/').filter(Boolean);
    const params = Object.fromEntries(new URLSearchParams(query || ''));
    return { parts, params };
  }
  function navigate() {
    const { parts, params } = parseHash();
    closeAll();
    let name = 'home';
    if (parts[0] === 'shop') name = 'shop';
    else if (parts[0] === 'product' && parts[1]) name = 'product';
    else if (parts[0] === 'checkout') name = 'checkout';
    else if (parts[0] === 'order' && parts[1]) name = 'order';
    else if (parts[0] === 'about') name = 'about';
    state.route = { name, parts, params };
    window.scrollTo(0, 0);
    render();
  }

  /* Home */
  function renderHome() {
    const featured = PRODUCTS.filter(p => p.featured).slice(0, 8);
    const newArrivals = PRODUCTS.filter(p => p.new).slice(0, 8);
    const bestsellers = PRODUCTS.filter(p => p.bestseller).slice(0, 8);
    const dealP = PRODUCTS.filter(p => p.oldPrice).sort((a, b) => discountPct(b) - discountPct(a))[0];
    return `
  <section class="hero">
    <div class="hero-bg"></div><div class="hero-grid"></div>
    <div class="container hero-inner">
      <div>
        <div class="hero-eyebrow"><span class="dot"></span>${escape(t('hero.eyebrow'))}</div>
        <h1>
          <span class="line"><span>${escape(t('hero.l1'))}</span></span>
          <span class="line"><span><em class="serif" style="font-style:italic">${escape(t('hero.l2'))}</em></span></span>
        </h1>
        <p class="hero-sub">${escape(t('hero.sub'))}</p>
        <div class="hero-cta">
          <a href="#/shop" class="btn btn-primary">${escape(t('hero.cta1'))} <svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
          <a href="#/shop" class="btn btn-ghost">${escape(t('hero.cta2'))}</a>
        </div>
        <div class="hero-stats">
          <div class="hero-stat"><div class="num">${PRODUCTS.length}+</div><div class="lbl">${escape(t('hero.stat1'))}</div></div>
          <div class="hero-stat"><div class="num">${BRANDS.length}+</div><div class="lbl">${escape(t('hero.stat2'))}</div></div>
          <div class="hero-stat"><div class="num">100%</div><div class="lbl">${escape(t('hero.stat3'))}</div></div>
        </div>
      </div>
      <div class="hero-visual">
  <div class="hero-device">
    <img src="images/hero.png" 
         alt="Featured product" 
         loading="eager"
         style="width:100%;height:100%;object-fit:contain;padding:6%"
         onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
    <div style="display:none;width:100%;height:100%;align-items:center;justify-content:center">
      ${productSVG(PRODUCTS[0])}
    </div>
  </div>
  <div class="hero-float hero-float-1">...</div>
  <div class="hero-float hero-float-2">...</div>
  <div class="hero-float hero-float-3">...</div>
</div>
    </div>
    <div class="scroll-ind"><div class="bar"></div><span>Scroll</span></div>
  </section>

  <section>
    <div class="container">
      <div class="section-head reveal">
        <div><div class="section-eyebrow">${escape(t('sections.featured'))}</div><h2>${escape(t('sections.featuredSub'))}</h2></div>
        <a href="#/shop" class="btn btn-ghost btn-sm">${escape(t('buttons.viewAll'))}</a>
      </div>
      <div class="grid-products">${featured.map((p, i) => productCard(p, i)).join('')}</div>
    </div>
  </section>

  <section style="background:var(--bg-2);border-top:1px solid var(--border);border-bottom:1px solid var(--border)">
    <div class="container">
      <div class="section-head reveal">
        <div><div class="section-eyebrow">${escape(t('sections.categories'))}</div><h2>${escape(t('sections.categoriesSub'))}</h2></div>
      </div>
      <div class="grid-categories">
        ${CATEGORIES.map((c, i) => `
          <a href="#/shop?cat=${encodeURIComponent(c.id)}" class="catcard reveal reveal-d${i % 4 + 1}">
            <div class="icon">${catIcon(c.icon)}</div>
            <div><div class="name">${escape(state.lang === 'so' ? c.nameSo : c.name)}</div><div class="count">${PRODUCTS.filter(p => p.category === c.id).length} products</div></div>
          </a>`).join('')}
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="section-head reveal">
        <div><div class="section-eyebrow">${escape(t('sections.newArrivals'))}</div><h2>${escape(t('sections.newArrivalsSub'))}</h2></div>
        <a href="#/shop" class="btn btn-ghost btn-sm">${escape(t('buttons.viewAll'))}</a>
      </div>
      <div class="grid-products">${newArrivals.map((p, i) => productCard(p, i)).join('')}</div>
    </div>
  </section>

  <section style="background:var(--bg-2);border-top:1px solid var(--border);border-bottom:1px solid var(--border)">
    <div class="container">
      <div class="section-head reveal">
        <div><div class="section-eyebrow">${escape(t('sections.bestsellers'))}</div><h2>${escape(t('sections.bestsellersSub'))}</h2></div>
        <a href="#/shop" class="btn btn-ghost btn-sm">${escape(t('buttons.viewAll'))}</a>
      </div>
      <div class="grid-products">${bestsellers.map((p, i) => productCard(p, i)).join('')}</div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="section-head reveal">
        <div><div class="section-eyebrow">${escape(t('sections.brands'))}</div><h2>${escape(t('sections.brandsSub'))}</h2></div>
      </div>
      <div class="brands-strip reveal">${BRANDS.slice(0, 18).map(b => `<div class="brand-cell">${escape(b)}</div>`).join('')}</div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="deals-wrap reveal">
        <div class="deals-info">
          <div class="eyebrow">${escape(t('sections.deals'))}</div>
          <h2>${escape(t('sections.dealsSub'))}</h2>
          <div class="countdown" id="countdown">
            <div class="cd-unit"><div class="v" id="cd-d">00</div><div class="l">Days</div></div>
            <div class="cd-unit"><div class="v" id="cd-h">00</div><div class="l">Hours</div></div>
            <div class="cd-unit"><div class="v" id="cd-m">00</div><div class="l">Minutes</div></div>
            <div class="cd-unit"><div class="v" id="cd-s">00</div><div class="l">Seconds</div></div>
          </div>
          <p style="font-size:.86rem;opacity:.7">Free delivery across all Somalia</p>
          <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:6px">
            <a href="#/product/${dealP.id}" class="btn" style="background:var(--accent-fg);color:var(--accent)">${escape(t('buttons.shopNow'))}</a>
            <a href="#/shop?deals=1" class="btn" style="border:1px solid color-mix(in srgb,var(--accent-fg) 30%,transparent);color:var(--accent-fg)">${escape(t('buttons.viewAll'))}</a>
          </div>
        </div>
        <div class="deals-visual">${productSVG(dealP)}</div>
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="section-head reveal">
        <div><div class="section-eyebrow">${escape(t('sections.why'))}</div><h2>${escape(t('sections.whySub'))}</h2></div>
      </div>
      <div class="grid-feats">
        ${[
        { t: 'Wide Selection', d: `Over ${PRODUCTS.length} curated products across ${CATEGORIES.length} categories.` },
        { t: 'Free Delivery', d: 'Delivered free to any city in Somalia — no minimum order.' },
        { t: 'Secure Checkout', d: 'Guest checkout with multiple payment options.' },
        { t: 'Real Support', d: 'Reply within minutes on WhatsApp — before and after your order.' }
      ].map((f, i) => `
          <div class="feat reveal reveal-d${i + 1}">
            <div class="ico">${['◆', '✈', '✓', '★'][i]}</div>
            <h3>${escape(f.t)}</h3><p>${escape(f.d)}</p>
          </div>`).join('')}
      </div>
    </div>
  </section>

  <section style="background:var(--bg-2);border-top:1px solid var(--border);border-bottom:1px solid var(--border)">
    <div class="container">
      <div class="section-head reveal">
        <div><div class="section-eyebrow">${escape(t('sections.reviews'))}</div><h2>${escape(t('sections.reviewsSub'))}</h2></div>
      </div>
      <div class="grid-reviews">
        ${REVIEWS.slice(0, 3).map((r, i) => `
          <div class="review reveal reveal-d${i + 1}">
            <div class="stars">${stars(r.rating)}</div>
            <p>"${escape(r.text)}"</p>
            <div class="who">
              <div class="avatar">${escape(r.name.charAt(0))}</div>
              <div><div class="nm">${escape(r.name)}</div><div class="rl">Purchased: ${escape(r.product)}</div></div>
            </div>
          </div>`).join('')}
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="newsletter reveal">
        <div><h2>${escape(t('sections.newsletter'))}</h2><p style="margin-top:12px;font-size:.95rem">${escape(t('sections.newsletterSub'))}</p></div>
        <form class="nl-form" id="nlForm" novalidate>
          <input type="email" id="nlEmail" placeholder="you@example.com" required>
          <button class="btn btn-primary" type="submit">${escape(t('buttons.subscribe'))}</button>
        </form>
      </div>
    </div>
  </section>`;
  }

  /* Shop */
  function getFilteredProducts() {
    const { params } = state.route;
    let list = PRODUCTS.slice();
    if (params.cat) list = list.filter(p => p.category === params.cat);
    if (params.brand) list = list.filter(p => p.brand === params.brand);
    if (params.deals) list = list.filter(p => p.oldPrice);
    if (params.q) {
      const q = params.q.toLowerCase();
      list = list.filter(p => (p.name + p.brand + p.category).toLowerCase().includes(q));
    }
    const f = state.filters;
    if (f.categories.length) list = list.filter(p => f.categories.includes(p.category));
    if (f.brands.length) list = list.filter(p => f.brands.includes(p.brand));
    if (f.priceMax < 3000) list = list.filter(p => p.price <= f.priceMax);
    if (f.inStock) list = list.filter(p => p.stock > 0);
    if (f.onSale) list = list.filter(p => p.oldPrice);
    switch (state.sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      default: list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return list;
  }
  function renderShop() {
    const list = getFilteredProducts();
    const activeCat = state.route.params.cat || '';
    return `
  <div class="page-header"><div class="container">
    <div class="breadcrumbs"><a href="#/">Home</a><span>/</span><a href="#/shop">Shop</a>${activeCat ? `<span>/</span><span>${escape(catName(activeCat))}</span>` : ''}</div>
    <h1>${activeCat ? escape(catName(activeCat)) : (state.route.params.deals ? 'Deals' : 'All Products')}</h1>
  </div></div>
  <div class="container">
    <div class="filter-mobile-bar">
      <button class="btn btn-ghost btn-sm" id="openFilters">${escape(t('buttons.filters'))}</button>
      <select id="sortMobile"><option value="featured">Featured</option><option value="price-asc">Price ↑</option><option value="price-desc">Price ↓</option><option value="rating">Top rated</option></select>
    </div>
    <div class="shop-layout">
      <aside class="filters" id="filterSidebar">${renderFilterPanel()}</aside>
      <div>
        <div class="shop-topbar">
          <div class="count">Showing <strong>${list.length}</strong> products</div>
          <select id="sortDesktop"><option value="featured">Featured</option><option value="price-asc">Price ↑</option><option value="price-desc">Price ↓</option><option value="rating">Top rated</option></select>
        </div>
        ${list.length === 0 ? `<div class="empty-state"><h3>No products found</h3><p>Try adjusting filters.</p><button class="btn btn-primary" id="clearFiltersEmpty">Clear filters</button></div>` :
        `<div class="grid-products">${list.map((p, i) => productCard(p, i)).join('')}</div>`}
      </div>
    </div>
  </div>`;
  }
  function renderFilterPanel() {
    const cats = [...new Set(PRODUCTS.map(p => p.category))];
    const brands = [...new Set(PRODUCTS.map(p => p.brand))].sort();
    const f = state.filters;
    return `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
      <h4 style="margin:0">${escape(t('buttons.filters'))}</h4>
      <button class="btn btn-sm" style="color:var(--fg-3);padding:4px 8px;font-size:.8rem" id="clearFilters">${escape(t('buttons.clear'))}</button>
    </div>
    <div class="filter-group"><h4>Category</h4>
      ${cats.map(c => `<label class="filter-opt"><input type="checkbox" data-fcat="${c}" ${f.categories.includes(c) ? 'checked' : ''}><span>${escape(catName(c))}</span><span class="cnt">${PRODUCTS.filter(p => p.category === c).length}</span></label>`).join('')}
    </div>
    <div class="filter-group"><h4>Brand</h4>
      ${brands.slice(0, 12).map(b => `<label class="filter-opt"><input type="checkbox" data-fbrand="${b}" ${f.brands.includes(b) ? 'checked' : ''}><span>${escape(b)}</span><span class="cnt">${PRODUCTS.filter(p => p.brand === b).length}</span></label>`).join('')}
    </div>
    <div class="filter-group"><h4>Price</h4>
      <input type="range" min="0" max="3000" step="50" value="${f.priceMax}" id="priceRange" style="width:100%;accent-color:var(--accent)">
      <div style="display:flex;justify-content:space-between;font-size:.8rem;color:var(--fg-3);margin-top:6px"><span>$0</span><span id="priceLabel">Up to ${money(f.priceMax)}</span></div>
    </div>
    <div class="filter-group"><h4>Availability</h4>
      <label class="filter-opt"><input type="checkbox" id="fStock" ${f.inStock ? 'checked' : ''}><span>In stock only</span></label>
      <label class="filter-opt"><input type="checkbox" id="fSale" ${f.onSale ? 'checked' : ''}><span>On sale</span></label>
    </div>`;
  }
  function bindShopControls() {
    const sD = $('#sortDesktop'), sM = $('#sortMobile');
    if (sD) { sD.value = state.sort; sD.onchange = () => { state.sort = sD.value; render(); }; }
    if (sM) sM.onchange = () => { state.sort = sM.value; render(); };
    const openF = $('#openFilters');
    if (openF) openF.onclick = () => {
      $('#filterDrawerContent').innerHTML = renderFilterPanel();
      bindFilters($('#filterDrawerContent'));
      $('#filterDrawer').classList.add('open');
      $('#overlay').classList.add('open');
    };
    bindFilters(document);
    const cf = $('#clearFilters');
    if (cf) cf.onclick = () => { state.filters = { categories: [], brands: [], priceMax: 3000, inStock: false, onSale: false }; render(); };
    const cfe = $('#clearFiltersEmpty');
    if (cfe) cfe.onclick = () => { state.filters = { categories: [], brands: [], priceMax: 3000, inStock: false, onSale: false }; render(); };
  }
  function bindFilters(root) {
    root.querySelectorAll('[data-fcat]').forEach(el => el.onchange = () => {
      const v = el.dataset.fcat;
      state.filters.categories = el.checked ? [...state.filters.categories, v] : state.filters.categories.filter(x => x !== v);
      render();
    });
    root.querySelectorAll('[data-fbrand]').forEach(el => el.onchange = () => {
      const v = el.dataset.fbrand;
      state.filters.brands = el.checked ? [...state.filters.brands, v] : state.filters.brands.filter(x => x !== v);
      render();
    });
    const pr = root.querySelector('#priceRange');
    if (pr) { pr.oninput = () => { state.filters.priceMax = +pr.value; const l = root.querySelector('#priceLabel'); if (l) l.textContent = 'Up to ' + money(+pr.value); }; pr.onchange = () => render(); }
    const fs = root.querySelector('#fStock'); if (fs) fs.onchange = () => { state.filters.inStock = fs.checked; render(); };
    const fl = root.querySelector('#fSale'); if (fl) fl.onchange = () => { state.filters.onSale = fl.checked; render(); };
  }

  /* Product detail */
  function renderProduct() {
    const id = state.route.parts[1];
    const p = productById(id);
    if (!p) return `<div class="container empty-state" style="padding-top:160px"><h1>Product not found</h1><a href="#/shop" class="btn btn-primary">Back to shop</a></div>`;
    const related = PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
    const off = discountPct(p);
    const inWish = state.wishlist.includes(p.id);
    return `
  <div class="pd"><div class="container">
    <div class="breadcrumbs" style="font-size:.8rem;color:var(--fg-3);margin-bottom:24px;display:flex;gap:8px;flex-wrap:wrap">
      <a href="#/">Home</a><span>/</span><a href="#/shop">Shop</a><span>/</span><a href="#/shop?cat=${encodeURIComponent(p.category)}">${escape(catName(p.category))}</a>
    </div>
    <div class="pd-grid">
     <div class="pd-gallery">
  <div class="pd-main" id="pdMain">${productSVG(p)}</div>
  <div class="pd-thumbs" id="pdThumbs">
    ${(() => {
        const imgs = getAllImages(p);
        if (!imgs.length) return [0, 1, 2, 3].map(i => `<div class="pd-thumb ${i === 0 ? 'active' : ''}">${productSVG(p)}</div>`).join('');
        return imgs.map((img, i) => `
        <div class="pd-thumb ${i === 0 ? 'active' : ''}" data-img="${escape(img)}">
          <img src="${escape(img)}" alt="${escape(p.name)} view ${i + 1}" style="width:100%;height:100%;object-fit:contain;padding:8%">
        </div>`).join('');
      })()}
  </div>
</div>
      <div class="pd-info">
        <div class="pd-brand">${escape(p.brand)} · ${escape(catName(p.category))}</div>
        <h1 class="pd-title">${escape(p.name)}</h1>
        <div class="pd-rating">
          <span class="stars" style="color:var(--fg)">${stars(p.rating)}</span>
          <span>${p.rating} · ${p.reviews} reviews</span>
          <span class="pbadge" style="background:var(--bg-2);color:var(--fg-2);border:1px solid var(--border)">${p.stock > 0 ? p.stock + ' in stock' : 'Out of stock'}</span>
        </div>
        <div class="pd-price">
          <span class="now">${money(p.price)}</span>
          ${p.oldPrice ? `<span class="was">${money(p.oldPrice)}</span><span class="off">−${off}%</span>` : ''}
        </div>
        <div class="pd-stock"><span class="dot" style="background:${p.stock > 0 ? 'var(--success)' : 'var(--danger)'}"></span><span>${p.stock > 0 ? 'Ships within 1–2 days' : 'Out of stock'}</span></div>
        ${p.colors ? `<div class="pd-opt"><h4>Color</h4><div class="opt-row">${p.colors.map((c, i) => `<button class="color-opt ${i === 0 ? 'active' : ''}" data-color="${c}"><span style="background:${c}"></span></button>`).join('')}</div></div>` : ''}
        ${p.storage ? `<div class="pd-opt"><h4>Storage</h4><div class="opt-row">${p.storage.map((s, i) => `<button class="opt ${i === 0 ? 'active' : ''}" data-storage="${s}">${escape(s)}</button>`).join('')}</div></div>` : ''}
        <div class="pd-actions">
          <button class="btn btn-primary" id="pdAdd" ${p.stock <= 0 ? 'disabled' : ''}>${escape(t('buttons.addToCart'))}</button>
          <button class="btn btn-ghost" id="pdBuy">${escape(t('buttons.buyNow'))}</button>
          <button class="btn-icon" id="pdWish" style="border:1px solid var(--border)"><svg class="icon" viewBox="0 0 24 24" fill="${inWish ? 'currentColor' : 'none'}" stroke="currentColor" style="color:${inWish ? 'var(--danger)' : 'var(--fg-2)'}"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg></button>
        </div>
        <div class="pd-meta">
          <div><svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M3 7h13l5 5v5h-3"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg><span>Free delivery across Somalia</span></div>
          <div><svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg><span>Genuine products only</span></div>
          <div><svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z"/></svg><span>1-year warranty</span></div>
          <div><svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7 12.8 12.8 0 0 0 .6 2.6 2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5 12.8 12.8 0 0 0 2.6.6A2 2 0 0 1 21.7 16z"/></svg><span>Chat on WhatsApp</span></div>
        </div>
      </div>
    </div>
    <div class="pd-tabs">
      <div class="pd-tablist">
        <button class="active" data-tab="0">Description</button>
        <button data-tab="1">Specifications</button>
        <button data-tab="2">Reviews</button>
      </div>
      <div>
        <div class="pd-tabpanel" data-panel="0">
          <p style="max-width:680px;font-size:1rem;line-height:1.7">${escape(p.description)}</p>
          <div style="margin-top:24px;display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;max-width:900px">
            ${Object.entries(p.specs).map(([k, v]) => `<div style="padding:16px;border:1px solid var(--border);border-radius:12px"><div style="font-size:.76rem;text-transform:uppercase;letter-spacing:.08em;color:var(--fg-3);margin-bottom:6px">${escape(k)}</div><div style="font-weight:500">${escape(v)}</div></div>`).join('')}
          </div>
        </div>
        <div class="pd-tabpanel" data-panel="1" style="display:none">
          <div class="spec-table" style="max-width:800px">${Object.entries(p.specs).map(([k, v]) => `<div>${escape(k)}</div><div>${escape(v)}</div>`).join('')}</div>
        </div>
        <div class="pd-tabpanel" data-panel="2" style="display:none">
          <div style="display:flex;flex-direction:column;gap:16px;max-width:800px">
            <div style="padding:20px;border:1px solid var(--border);border-radius:12px">
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
                <div class="avatar">A</div>
                <div><div style="font-weight:500">Ahmed H.</div><div style="font-size:.8rem;color:var(--fg-3)">Verified demo review</div></div>
                <div class="stars" style="margin-left:auto">${stars(5)}</div>
              </div>
              <p>Excellent product, exactly as described. Delivery was fast.</p>
            </div>
            <div style="padding:20px;border:1px solid var(--border);border-radius:12px">
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
                <div class="avatar" style="background:var(--bg-3);color:var(--fg)">F</div>
                <div><div style="font-weight:500">Fartun M.</div><div style="font-size:.8rem;color:var(--fg-3)">Verified demo review</div></div>
                <div class="stars" style="margin-left:auto">${stars(5)}</div>
              </div>
              <p>Genuine product, works perfectly. Support answered all my questions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top:96px">
      <div class="section-head"><div><div class="section-eyebrow">You might also like</div><h2>Related products</h2></div></div>
      <div class="grid-products">${related.map((r, i) => productCard(r, i)).join('')}</div>
    </div>
  </div></div>`;
  }

  /* Checkout */
  const PAY_METHODS = [
    { id: 'visa', name: 'Visa', cat: 'international' },
    { id: 'mastercard', name: 'Mastercard', cat: 'international' },
    { id: 'paypal', name: 'PayPal', cat: 'international' },
    { id: 'stripe', name: 'Stripe', cat: 'international' },
    { id: 'evc', name: 'EVC Plus', cat: 'local' },
    { id: 'zaad', name: 'Zaad', cat: 'local' },
    { id: 'sahal', name: 'Sahal', cat: 'local' },
    { id: 'edahab', name: 'eDahab', cat: 'local' }
  ];
  let paySelected = 'evc';

  function renderCheckout() {
    if (!state.cart.length) return `<div class="container empty-state" style="padding-top:160px"><h1>Cart is empty</h1><a href="#/shop" class="btn btn-primary">Browse products</a></div>`;
    const total = cartTotal();
    return `
  <div class="page-header"><div class="container">
    <div class="breadcrumbs"><a href="#/">Home</a><span>/</span><span>Checkout</span></div>
    <h1>${escape(t('checkout.title'))}</h1>
    <p style="margin-top:12px;font-size:.9rem">${escape(t('checkout.demoNote'))}</p>
  </div></div>
  <div class="container">
    <form id="checkoutForm" novalidate><div class="checkout-grid">
      <div>
        <div class="form-card">
          <h3><span class="num">1</span>${escape(t('checkout.shipping'))}</h3>
          <div class="form-grid">
            <div class="field"><label>${escape(t('checkout.fullName'))} *</label><input id="cf-name" required><div class="err">${escape(t('checkout.required'))}</div></div>
            <div class="field"><label>${escape(t('checkout.phone'))} *</label><input id="cf-phone" type="tel" required placeholder="+252 ..."><div class="err">${escape(t('checkout.invalidPhone'))}</div></div>
            <div class="field"><label>${escape(t('checkout.email'))} *</label><input id="cf-email" type="email" required><div class="err">${escape(t('checkout.invalidEmail'))}</div></div>
            <div class="field"><label>${escape(t('checkout.city'))} *</label><input id="cf-city" required placeholder="Mogadishu"><div class="err">${escape(t('checkout.required'))}</div></div>
            <div class="field full"><label>${escape(t('checkout.address'))} *</label><input id="cf-addr" required><div class="err">${escape(t('checkout.required'))}</div></div>
            <div class="field full"><label>${escape(t('checkout.notes'))}</label><textarea id="cf-notes" rows="3"></textarea></div>
          </div>
        </div>
        <div class="form-card">
          <h3><span class="num">2</span>${escape(t('checkout.payment'))}</h3>
          <div style="margin-bottom:18px">
            <div style="font-size:.8rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--fg-3);margin-bottom:10px">${escape(t('checkout.local'))}</div>
            <div class="paymethods">${PAY_METHODS.filter(m => m.cat === 'local').map(m => `<label class="paymethod ${paySelected === m.id ? 'active' : ''}" data-pm="${m.id}"><input type="radio" name="payment" value="${m.id}" ${paySelected === m.id ? 'checked' : ''} style="display:none"><div class="logo">${m.name.slice(0, 2).toUpperCase()}</div><span>${escape(m.name)}</span></label>`).join('')}</div>
          </div>
          <div style="margin-bottom:18px">
            <div style="font-size:.8rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--fg-3);margin-bottom:10px">${escape(t('checkout.international'))}</div>
            <div class="paymethods">${PAY_METHODS.filter(m => m.cat === 'international').map(m => `<label class="paymethod ${paySelected === m.id ? 'active' : ''}" data-pm="${m.id}"><input type="radio" name="payment" value="${m.id}" ${paySelected === m.id ? 'checked' : ''} style="display:none"><div class="logo">${m.name.slice(0, 2).toUpperCase()}</div><span>${escape(m.name)}</span></label>`).join('')}</div>
          </div>
          <div id="payInstructions" style="padding:16px;border:1px dashed var(--border-2);border-radius:12px;font-size:.88rem;background:var(--bg-2)"></div>
        </div>
      </div>
      <aside class="order-summary">
        <h3>${escape(t('checkout.orderSummary'))}</h3>
        ${state.cart.map(i => { const p = productById(i.id); if (!p) return ''; return `<div class="os-item"><div class="thumb">${productSVG(p)}<span class="q">${i.qty}</span></div><div><div class="nm">${escape(p.name)}</div><div style="font-size:.76rem;color:var(--fg-3)">${escape(p.brand)}</div></div><div class="pr">${money(p.price * i.qty)}</div></div>`; }).join('')}
        <div style="padding-top:16px;margin-top:16px;border-top:1px solid var(--border);display:flex;flex-direction:column;gap:10px">
          <div class="sum-row"><span>${escape(t('cart.subtotal'))}</span><span>${money(total)}</span></div>
          <div class="sum-row"><span>${escape(t('cart.delivery'))}</span><span class="free-tag">${escape(t('cart.free'))}</span></div>
          <div class="sum-row total"><span>${escape(t('cart.total'))}</span><span class="v">${money(total)}</span></div>
        </div>
        <button type="submit" class="btn btn-primary" style="width:100%;padding:14px;margin-top:18px">${escape(t('buttons.placeOrder'))}</button>
        <p style="font-size:.78rem;color:var(--fg-3);text-align:center;margin-top:12px">${escape(t('checkout.demoNote'))}</p>
      </aside>
    </div></form>
  </div>`;
  }
  function bindCheckout() {
    const form = $('#checkoutForm'); if (!form) return;
    form.querySelectorAll('[data-pm]').forEach(el => el.onclick = () => {
      paySelected = el.dataset.pm;
      form.querySelectorAll('[data-pm]').forEach(x => x.classList.toggle('active', x.dataset.pm === paySelected));
      updatePayInstructions();
    });
    updatePayInstructions();
    form.onsubmit = (e) => { e.preventDefault(); if (!validateCheckout(form)) return; processOrder(form); };
  }
  function updatePayInstructions() {
    const el = $('#payInstructions'); if (!el) return;
    const m = PAY_METHODS.find(x => x.id === paySelected);
    const total = cartTotal();
    if (m.cat === 'local') el.innerHTML = `<strong>${escape(m.name)} (demo)</strong><br>Send <strong>${money(total)}</strong> to <strong>${CONFIG.STORE.whatsappLocal}</strong> and press Place order. Order details will be sent to us on WhatsApp.`;
    else el.innerHTML = `<strong>${escape(m.name)} (demo)</strong><br>On submitting, a demo payment will be simulated. <strong>No real money will be moved.</strong>`;
  }
  function validateCheckout(form) {
    let ok = true;
    const check = (id, fn, msg) => {
      const field = form.querySelector('#' + id).closest('.field');
      const input = form.querySelector('#' + id);
      const valid = fn(input.value.trim());
      field.classList.toggle('invalid', !valid);
      const err = field.querySelector('.err'); if (err && msg) err.textContent = msg;
      if (!valid) ok = false;
    };
    check('cf-name', v => v.length >= 2, t('checkout.required'));
    check('cf-phone', v => /^[+\d][\d\s\-()]{6,}$/.test(v), t('checkout.invalidPhone'));
    check('cf-email', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), t('checkout.invalidEmail'));
    check('cf-city', v => v.length >= 2, t('checkout.required'));
    check('cf-addr', v => v.length >= 4, t('checkout.required'));
    return ok;
  }
  function processOrder(form) {
    const data = {
      name: form['cf-name'].value.trim(),
      phone: form['cf-phone'].value.trim(),
      email: form['cf-email'].value.trim(),
      city: form['cf-city'].value.trim(),
      address: form['cf-addr'].value.trim(),
      notes: form['cf-notes'].value.trim()
    };
    const method = PAY_METHODS.find(m => m.id === paySelected);
    const orderId = 'DIN-' + Date.now().toString(36).toUpperCase().slice(-6);
    const items = state.cart.map(i => { const p = productById(i.id); return { id: i.id, name: p.name, brand: p.brand, price: p.price, qty: i.qty }; });
    const total = cartTotal();
    const order = { id: orderId, date: new Date().toISOString(), customer: data, items, total, payment: method.name, paymentCategory: method.cat, status: method.cat === 'international' ? 'paid' : 'pending', demo: true };
    const orders = JSON.parse(localStorage.getItem('diinle_orders') || '[]');
    orders.push(order);
    localStorage.setItem('diinle_orders', JSON.stringify(orders));
    if (method.cat === 'local') {
      const lines = items.map(i => `• ${i.name}${i.qty > 1 ? ` × ${i.qty}` : ''} — ${money(i.price * i.qty)}`).join('\n');
      const msg = `New order — Diinle Electronics\n\nOrder ID: ${orderId}\nName: ${data.name}\nPhone: ${data.phone}\nCity: ${data.city}\nAddress: ${data.address}\nEmail: ${data.email}\n` + (data.notes ? `Notes: ${data.notes}\n` : '') + `\nProducts:\n${lines}\n\nPayment: ${method.name}\nDelivery: FREE across Somalia\nTotal: ${money(total)}\n\nPlease confirm. Mahadsanid!`;
      setTimeout(() => window.open(`https://wa.me/${CONFIG.STORE.whatsappIntl}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener'), 400);
    }
    state.cart = []; save(); updateBadge();
    location.hash = '#/order/' + orderId;
  }

  /* Order confirmation */
  function renderOrder() {
    const id = state.route.parts[1];
    const orders = JSON.parse(localStorage.getItem('diinle_orders') || '[]');
    const order = orders.find(o => o.id === id);
    if (!order) return `<div class="container empty-state" style="padding-top:160px"><h1>Order not found</h1><a href="#/" class="btn btn-primary">Back home</a></div>`;
    return `
  <div class="container confirm-wrap">
    <div class="confirm-icon"><svg class="icon" style="width:38px;height:38px" viewBox="0 0 24 24" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg></div>
    <h1>${escape(t('order.confirmed'))}</h1>
    <p>${escape(t('order.thanks', { name: order.customer.name }))}</p>
    <div class="confirm-card">
      <div class="confirm-row"><span class="k">${escape(t('order.orderId'))}</span><span class="v">${escape(order.id)}</span></div>
      <div class="confirm-row"><span class="k">${escape(t('order.status'))}</span><span class="v"><span class="status ${order.status}"><span class="dot"></span>${escape(order.status)}</span></span></div>
      <div class="confirm-row"><span class="k">${escape(t('order.paymentMethod'))}</span><span class="v">${escape(order.payment)}</span></div>
      <div class="confirm-row"><span class="k">${escape(t('checkout.fullName'))}</span><span class="v">${escape(order.customer.name)}</span></div>
      <div class="confirm-row"><span class="k">${escape(t('checkout.phone'))}</span><span class="v">${escape(order.customer.phone)}</span></div>
      <div class="confirm-row"><span class="k">${escape(t('order.deliveryTo'))}</span><span class="v">${escape(order.customer.city)} — ${escape(order.customer.address)}</span></div>
      <div class="confirm-row"><span class="k">${escape(t('order.total'))}</span><span class="v">${money(order.total)}</span></div>
    </div>
    <div style="margin-top:24px;text-align:left;padding:20px;border:1px solid var(--border);border-radius:14px">
      <div style="font-size:.82rem;text-transform:uppercase;letter-spacing:.08em;color:var(--fg-3);margin-bottom:12px">Items</div>
      ${order.items.map(i => `<div class="confirm-row"><span class="k">${escape(i.name)} × ${i.qty}</span><span class="v">${money(i.price * i.qty)}</span></div>`).join('')}
    </div>
    <div class="confirm-actions">
      <a href="#/shop" class="btn btn-primary">${escape(t('buttons.continueShopping'))}</a>
      <a href="https://wa.me/${CONFIG.STORE.whatsappIntl}?text=${encodeURIComponent('Hello Diinle, regarding order ' + order.id)}" target="_blank" rel="noopener" class="btn btn-ghost">${escape(t('order.whatsapp'))}</a>
    </div>
    <p style="font-size:.78rem;color:var(--fg-3);margin-top:26px">${escape(CONFIG.STORE.email)} · WhatsApp ${escape(CONFIG.STORE.whatsappLocal)}</p>
  </div>`;
  }

  /* About */
  function renderAbout() {
    return `
  <div class="page-header"><div class="container"><div class="breadcrumbs"><a href="#/">Home</a><span>/</span><span>About</span></div><h1>About Diinle</h1></div></div>
  <div class="container" style="padding-bottom:80px;max-width:840px">
    <p style="font-size:1.15rem;color:var(--fg);line-height:1.7">Diinle Electronics is a premium electronics retailer serving customers across Somalia. We bring together the world's leading technology brands and deliver them with honest pricing, careful curation, and free delivery nationwide.</p>
    <div style="margin-top:40px;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px">
      ${[{ t: 'Curated', d: 'Every product is selected for quality, reliability, and value.' }, { t: 'Delivered', d: 'Free shipping to every region of Somalia.' }, { t: 'Trusted', d: 'Real support on WhatsApp before and after your order.' }, { t: 'Simple', d: 'Guest checkout. No accounts. No friction.' }].map(x => `<div style="padding:24px;border:1px solid var(--border);border-radius:14px"><h3 style="margin-bottom:8px">${x.t}</h3><p style="font-size:.9rem">${x.d}</p></div>`).join('')}
    </div>
    <div style="margin-top:44px;padding:28px;border:1px solid var(--border);border-radius:16px;background:var(--bg-2)"><h3 style="margin-bottom:8px">Demo notice</h3><p style="font-size:.9rem">This website is a portfolio/demo project. Products, prices, reviews, and orders are illustrative and not real commercial offerings.</p></div>
  </div>`;
  }

  /* Render */
  function render() {
    const app = $('#app');
    let html = '';
    switch (state.route.name) {
      case 'home': html = renderHome(); break;
      case 'shop': html = renderShop(); break;
      case 'product': html = renderProduct(); break;
      case 'checkout': html = renderCheckout(); break;
      case 'order': html = renderOrder(); break;
      case 'about': html = renderAbout(); break;
      default: html = renderHome();
    }
    app.innerHTML = html;
    renderFooter();
    if (state.route.name === 'shop') bindShopControls();
    if (state.route.name === 'product') bindProductDetail();
    if (state.route.name === 'checkout') bindCheckout();
    bindCardActions();
    observeReveals();
    if (state.route.name === 'home') startCountdown();
    updateBadge();
  }
  function bindCardActions() {
    $$('[data-add]').forEach(b => b.onclick = (e) => { e.preventDefault(); addToCart(b.dataset.add, 1); });
    $$('[data-wish]').forEach(b => b.onclick = (e) => {
      e.preventDefault();
      const id = b.dataset.wish;
      if (state.wishlist.includes(id)) state.wishlist = state.wishlist.filter(x => x !== id);
      else { state.wishlist.push(id); toast(t('toast.wishlist')); }
      save(); render();
    });
  }
  function bindProductDetail() {
    const p = productById(state.route.parts[1]); if (!p) return;
    let color = p.colors?.[0], storage = p.storage?.[0];
    $$('[data-color]').forEach(b => b.onclick = () => { color = b.dataset.color; $$('[data-color]').forEach(x => x.classList.toggle('active', x === b)); });
    $$('[data-storage]').forEach(b => b.onclick = () => { storage = b.dataset.storage; $$('[data-storage]').forEach(x => x.classList.toggle('active', x === b)); });
    $$('.pd-thumb').forEach(t => t.onclick = () => {
      $$('.pd-thumb').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      const img = t.dataset.img;
      if (img) {
        $('#pdMain').innerHTML = `<img src="${escape(img)}" alt="${escape(p.name)}" style="width:100%;height:100%;object-fit:contain;padding:5%" onerror="this.style.display='none';this.parentElement.innerHTML='${productSVG(p).replace(/'/g, '&#39;').replace(/"/g, '&quot;')}'">`;
      } else {
        $('#pdMain').innerHTML = productSVG(p);
      }
    });
    const tabs = $$('.pd-tablist button');
    tabs.forEach(b => b.onclick = () => {
      tabs.forEach(x => x.classList.remove('active')); b.classList.add('active');
      $$('.pd-tabpanel').forEach(panel => panel.style.display = 'none');
      const target = document.querySelector(`[data-panel="${b.dataset.tab}"]`); if (target) target.style.display = 'block';
    });
    const add = $('#pdAdd'); if (add) add.onclick = () => addToCart(p.id, 1, { color, storage });
    const buy = $('#pdBuy'); if (buy) buy.onclick = () => { addToCart(p.id, 1, { color, storage }); location.hash = '#/checkout'; };
    const wish = $('#pdWish'); if (wish) wish.onclick = () => { const id = p.id; if (state.wishlist.includes(id)) state.wishlist = state.wishlist.filter(x => x !== id); else { state.wishlist.push(id); toast(t('toast.wishlist')); } save(); render(); };
  }

  let revealObs;
  function observeReveals() {
    if (revealObs) revealObs.disconnect();
    revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealObs.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach(el => revealObs.observe(el));
  }

  let cdTimer;
  function startCountdown() {
    clearInterval(cdTimer);
    const target = new Date();
    target.setDate(target.getDate() + 3);
    target.setHours(23, 59, 59, 0);
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor(diff % 86400000 / 3600000);
      const m = Math.floor(diff % 3600000 / 60000);
      const s = Math.floor(diff % 60000 / 1000);
      const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = String(v).padStart(2, '0'); };
      set('cd-d', d); set('cd-h', h); set('cd-m', m); set('cd-s', s);
    };
    tick();
    cdTimer = setInterval(tick, 1000);
  }

  function openSearch() {
    $('#searchModal').classList.add('open'); $('#overlay').classList.add('open');
    setTimeout(() => $('#searchInput').focus(), 200);
    renderSearchResults('');
  }
  function closeAll() {
    $('#searchModal').classList.remove('open');
    $('#cartDrawer').classList.remove('open');
    $('#mobileMenu').classList.remove('open');
    $('#filterDrawer').classList.remove('open');
    $('#overlay').classList.remove('open');
    $('#hamBtn').classList.remove('open');
  }
  function renderSearchResults(q) {
    const res = $('#searchResults');
    const query = q.trim().toLowerCase();
    let list = query ? PRODUCTS.filter(p => (p.name + ' ' + p.brand + ' ' + p.category).toLowerCase().includes(query)).slice(0, 8) : PRODUCTS.slice(0, 5);
    if (!list.length) { res.innerHTML = `<div class="search-empty"><h3>${escape(t('search.empty'))}</h3><p>${escape(t('search.emptySub'))}</p></div>`; return; }
    res.innerHTML = list.map(p => `<a href="#/product/${p.id}" class="search-result" data-result><div class="thumb">${productSVG(p)}</div><div><div class="nm">${escape(p.name)}</div><div class="sub">${escape(p.brand)} · ${escape(catName(p.category))}</div></div><div class="pr">${money(p.price)}</div></a>`).join('');
    res.querySelectorAll('[data-result]').forEach(el => el.onclick = closeAll);
  }

  function initEvents() {
    const nav = $('#nav');
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    document.documentElement.setAttribute('data-theme', state.theme);
    $('#themeToggle').onclick = () => { state.theme = state.theme === 'dark' ? 'light' : 'dark'; document.documentElement.setAttribute('data-theme', state.theme); save(); render(); };
    $$('.lang-switch button').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === state.lang);
      b.onclick = () => { state.lang = b.dataset.lang; $$('.lang-switch button').forEach(x => x.classList.toggle('active', x === b)); save(); render(); };
    });
    $('#cartBtn').onclick = () => { renderCart(); $('#cartDrawer').classList.add('open'); $('#overlay').classList.add('open'); };
    $('#cartClose').onclick = closeAll;
    $('#searchBtn').onclick = openSearch;
    $('#searchClose').onclick = closeAll;
    $('#searchInput').oninput = (e) => renderSearchResults(e.target.value);
    $('#overlay').onclick = closeAll;
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAll();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
      if (e.key === 'Enter' && document.activeElement === $('#searchInput')) {
        const q = $('#searchInput').value.trim();
        if (q) { location.hash = '#/shop?q=' + encodeURIComponent(q); closeAll(); }
      }
    });
    const ham = $('#hamBtn');
    ham.onclick = () => {
      const open = !ham.classList.contains('open');
      ham.classList.toggle('open', open);
      $('#mobileMenu').classList.toggle('open', open);
      $('#overlay').classList.toggle('open', open);
    };
    $$('#mobileMenu a').forEach(a => a.onclick = closeAll);
    document.body.addEventListener('submit', (e) => {
      if (e.target.id === 'nlForm') {
        e.preventDefault();
        const v = $('#nlEmail').value.trim();
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { toast(t('toast.subscribed')); e.target.reset(); }
        else toast(t('checkout.invalidEmail'));
      }
    });
  }

  function boot() {
    initEvents();
    window.addEventListener('hashchange', navigate);
    navigate();
    setTimeout(() => $('#loader').classList.add('hide'), 500);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();