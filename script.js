// ══════════════════════════════════════
// Bravd Studios — Main Script
// ══════════════════════════════════════

// ── Navbar scroll effect ──
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── Mobile menu ──
const toggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    toggle.classList.toggle('active');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ── Fade-in on scroll ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.15 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── Particles ──
function createParticles(container) {
  if (!container) return;
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.bottom = '-5px';
    p.style.width = p.style.height = (Math.random() * 3 + 1) + 'px';
    p.style.animationDuration = (Math.random() * 8 + 6) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    container.appendChild(p);
  }
}
createParticles(document.querySelector('.particles'));

// ── Typed text effect ──
const typed = document.getElementById('typed-text');
if (typed) {
  const words = ['Únicas', 'Personalizadas', 'Exclusivas', 'Originales'];
  let wi = 0, ci = 0, deleting = false;
  function typeLoop() {
    const word = words[wi];
    typed.textContent = word.substring(0, ci);
    if (!deleting) {
      ci++;
      if (ci > word.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
    } else {
      ci--;
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(typeLoop, deleting ? 50 : 120);
  }
  typeLoop();
}

// ══════════════════════════════════════
// SCROLL PROGRESS BAR
// ══════════════════════════════════════
const scrollProgress = document.querySelector('.scroll-progress');
if (scrollProgress) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = progress + '%';
  });
}

// ══════════════════════════════════════
// PARALLAX HERO EFFECT
// ══════════════════════════════════════
const heroWatermark = document.querySelector('.hero-watermark');
const heroContent = document.querySelector('.hero-content');
if (heroWatermark) {
  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    heroWatermark.style.transform = `translate(-50%, calc(-50% + ${scroll * 0.15}px))`;
    if (heroContent) {
      heroContent.style.transform = `translateY(${scroll * 0.08}px)`;
      heroContent.style.opacity = Math.max(1 - scroll / 600, 0);
    }
  });
}

// ══════════════════════════════════════
// ANIMATED STATS COUNTER
// ══════════════════════════════════════
function animateCounter(el, target, suffix = '') {
  const duration = 2000;
  const startTime = performance.now();
  const isPlus = suffix.includes('+');

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      animateCounter(el, target, suffix);
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => statsObserver.observe(el));

// ══════════════════════════════════════
// GALLERY LIGHTBOX
// ══════════════════════════════════════
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCounter = document.getElementById('lightbox-counter');
let lightboxImages = [];
let lightboxIndex = 0;

function openLightbox(index) {
  if (!lightbox) return;
  lightboxIndex = index;
  lightboxImg.src = lightboxImages[index];
  lightboxCounter.textContent = `${index + 1} / ${lightboxImages.length}`;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function navigateLightbox(delta) {
  lightboxIndex = (lightboxIndex + delta + lightboxImages.length) % lightboxImages.length;
  lightboxImg.src = lightboxImages[lightboxIndex];
  lightboxCounter.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
}

// Init lightbox
if (lightbox) {
  document.querySelectorAll('.gallery-item img').forEach((img, i) => {
    lightboxImages.push(img.src);
    img.addEventListener('click', () => openLightbox(i));
  });

  document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
  document.getElementById('lightbox-prev')?.addEventListener('click', () => navigateLightbox(-1));
  document.getElementById('lightbox-next')?.addEventListener('click', () => navigateLightbox(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });
}

// ══════════════════════════════════════
// FAQ ACCORDION
// ══════════════════════════════════════
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isActive = item.classList.contains('active');

    // Close all other items
    document.querySelectorAll('.faq-item').forEach(faq => faq.classList.remove('active'));

    // Toggle clicked item
    if (!isActive) item.classList.add('active');
  });
});

// ══════════════════════════════════════
// PAGE TRANSITION
// ══════════════════════════════════════
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return;

  link.addEventListener('click', (e) => {
    // Don't intercept if it's a checkout button inside the cart
    if (link.closest('.cart-footer')) return;
    e.preventDefault();
    const overlay = document.createElement('div');
    overlay.className = 'page-transition';
    overlay.style.animation = 'none';
    overlay.style.opacity = '0';
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.style.transition = 'opacity .3s ease';
      overlay.style.opacity = '1';
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  });
});

// ══════════════════════════════════════
// CART SYSTEM
// ══════════════════════════════════════

const Cart = {
  items: JSON.parse(localStorage.getItem('bravd_cart') || '[]'),

  save() {
    localStorage.setItem('bravd_cart', JSON.stringify(this.items));
    this.updateBadge();
    this.renderDrawer();
  },

  add(product) {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) {
      existing.quantity += (product.quantity || 1);
    } else {
      this.items.push({ ...product, quantity: product.quantity || 1 });
    }
    this.save();
    showToast(`${product.name} agregado al carrito`);
  },

  remove(id) {
    this.items = this.items.filter(i => i.id !== id);
    this.save();
  },

  updateQty(id, delta) {
    const item = this.items.find(i => i.id === id);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) this.remove(id);
    else this.save();
  },

  getEffectiveItemPrice(item) {
    const count = this.getCount();
    const tier = count >= 12 ? 350 : count >= 3 ? 400 : 500;
    // Never charge MORE than the stored price (pack items already discounted)
    return Math.min(item.price, tier);
  },

  getEffectiveUnitPrice() {
    const count = this.getCount();
    if (count >= 12) return 350;
    if (count >= 3) return 400;
    return 500;
  },

  getTotal() {
    return this.items.reduce((sum, i) => sum + this.getEffectiveItemPrice(i) * i.quantity, 0);
  },

  getCount() {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  },

  clear() {
    this.items = [];
    this.save();
  },

  updateBadge() {
    document.querySelectorAll('.cart-badge').forEach(badge => {
      const count = this.getCount();
      badge.textContent = count;
      badge.classList.toggle('show', count > 0);
      badge.classList.remove('pulse');
      void badge.offsetWidth;
      if (count > 0) badge.classList.add('pulse');
    });
  },

  renderDrawer() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('cart-checkout-btn');
    if (!container) return;

    if (this.items.length === 0) {
      container.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty-icon">—</div>
          <p>Tu carrito está vacío</p>
        </div>`;
      if (totalEl) totalEl.textContent = 'C$ 0';
      if (checkoutBtn) checkoutBtn.style.display = 'none';
      return;
    }

    if (checkoutBtn) checkoutBtn.style.display = '';

    const totalQty = this.getCount();
    const highestStored = Math.max(...this.items.map(i => i.price));

    // Tier label / hint
    let tierLabel = '';
    if (totalQty >= 12) {
      tierLabel = `<div class="cart-tier-label">Pack Mayoreo (12+) — C$ 350 c/u</div>`;
    } else if (totalQty >= 3) {
      // At 400 tier — only hint about 350 if some item still costs more than 350
      if (highestStored > 350) {
        const needed = 12 - totalQty;
        tierLabel = `<div class="cart-tier-label">Pack Equipo (3+) — C$ 400 c/u</div>`
          + `<div class="cart-tier-hint">Agrega ${needed} camisa${needed > 1 ? 's' : ''} más para bajar a C$ 350 c/u</div>`;
      } else {
        tierLabel = `<div class="cart-tier-label">Pack Mayoreo — C$ 350 c/u</div>`;
      }
    } else {
      // At 500 tier — only hint if items can benefit from lower tier
      if (highestStored > 400) {
        const needed3 = 3 - totalQty;
        tierLabel = `<div class="cart-tier-hint">Agrega ${needed3} camisa${needed3 > 1 ? 's' : ''} más para bajar a C$ 400 c/u</div>`;
      } else if (highestStored > 350) {
        const needed12 = 12 - totalQty;
        tierLabel = `<div class="cart-tier-hint">Agrega ${needed12} camisas más para bajar a C$ 350 c/u</div>`;
      }
    }

    container.innerHTML = tierLabel + this.items.map(item => {
      const effPrice = this.getEffectiveItemPrice(item);
      return `
      <div class="cart-item">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <div class="cart-item-price">C$ ${effPrice.toLocaleString()} × ${item.quantity} = C$ ${(effPrice * item.quantity).toLocaleString()}</div>
        </div>
        <div class="cart-item-controls">
          <button onclick="Cart.updateQty('${item.id}', -1)" aria-label="Menos">−</button>
          <span class="cart-qty">${item.quantity}</span>
          <button onclick="Cart.updateQty('${item.id}', 1)" aria-label="Más">+</button>
        </div>
        <button class="cart-item-remove" onclick="Cart.remove('${item.id}')" aria-label="Eliminar">✕</button>
      </div>`;
    }).join('');

    if (totalEl) totalEl.textContent = 'C$ ' + this.getTotal().toLocaleString();
  }
};

// ── Cart Drawer Toggle ──
function openCart() {
  document.getElementById('cart-overlay')?.classList.add('open');
  document.getElementById('cart-drawer')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  document.getElementById('cart-overlay')?.classList.remove('open');
  document.getElementById('cart-drawer')?.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('cart-overlay')?.addEventListener('click', closeCart);
document.getElementById('cart-close')?.addEventListener('click', closeCart);
document.getElementById('cart-icon')?.addEventListener('click', openCart);

// ── Toast Notification ──
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = '✓ ' + msg;
  toast.classList.remove('show');
  void toast.offsetWidth;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ── Add to Cart Buttons ──
document.querySelectorAll('[data-add-cart]').forEach(btn => {
  btn.addEventListener('click', () => {
    const product = {
      id: btn.dataset.id,
      name: btn.dataset.name,
      price: parseInt(btn.dataset.price),
    };
    Cart.add(product);
  });
});

// ── Init ──
Cart.updateBadge();
Cart.renderDrawer();

// ── Pricing Calculator ──
const qtyEl = document.getElementById('calc-qty');
const totalEl = document.getElementById('calc-total');
const unitEl = document.getElementById('calc-unit');
const savingsEl = document.getElementById('calc-savings');

function updateCalc() {
  if (!qtyEl) return;
  let qty = parseInt(qtyEl.textContent);
  let unitPrice = qty >= 12 ? 350 : qty >= 3 ? 400 : 500;
  let total = qty * unitPrice;
  let saved = qty * 500 - total;
  totalEl.textContent = 'C$ ' + total.toLocaleString();
  unitEl.textContent = 'C$ ' + unitPrice + ' por unidad';
  savingsEl.textContent = saved > 0 ? '¡Ahorras C$ ' + saved + '!' : '';
}

document.getElementById('qty-minus')?.addEventListener('click', () => {
  let q = parseInt(qtyEl.textContent);
  if (q > 1) { qtyEl.textContent = q - 1; updateCalc(); }
});
document.getElementById('qty-plus')?.addEventListener('click', () => {
  let q = parseInt(qtyEl.textContent);
  if (q < 100) { qtyEl.textContent = q + 1; updateCalc(); }
});

if (qtyEl) updateCalc();

// ══════════════════════════════════════
// SPOT SECTION
// ══════════════════════════════════════

// ── Filtros ──
const spotFilterBtns = document.querySelectorAll('.spot-filter-btn');
const spotCards = document.querySelectorAll('.spot-card');

spotFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    spotFilterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    spotCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ── Quick View Modal ──
const spotModal = document.getElementById('spot-modal');
const spotModalImg = document.getElementById('spot-modal-img');
const spotModalName = document.getElementById('spot-modal-name');
const spotModalSub = document.getElementById('spot-modal-sub');
const spotModalAdd = document.getElementById('spot-modal-add');
const spotModalClose = document.getElementById('spot-modal-close');

let currentSpotCard = null;

document.querySelectorAll('.spot-quick-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = btn.closest('.spot-card');
    currentSpotCard = card;
    const img = card.querySelector('img');
    const name = card.querySelector('.spot-card-name').textContent;
    const sub = card.querySelector('.spot-card-sub').textContent;

    spotModalImg.src = img.src;
    spotModalImg.alt = img.alt;
    spotModalName.textContent = name;
    spotModalSub.textContent = sub;

    // Sync add button with the card's add-cart button
    const addBtn = card.querySelector('[data-add-cart]');
    spotModalAdd.dataset.id = addBtn.dataset.id;
    spotModalAdd.dataset.name = addBtn.dataset.name;
    spotModalAdd.dataset.price = addBtn.dataset.price;

    spotModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

// Size buttons in modal
document.querySelectorAll('.size-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Modal add to cart
if (spotModalAdd) {
  spotModalAdd.addEventListener('click', () => {
    const selectedSize = document.querySelector('.size-btn.active')?.textContent || 'S';
    Cart.add({
      id: spotModalAdd.dataset.id + '-' + selectedSize,
      name: spotModalAdd.dataset.name + ' (Talla ' + selectedSize + ')',
      price: parseInt(spotModalAdd.dataset.price),
    });
    closeSpotModal();
    openCart();
  });
}

function closeSpotModal() {
  if (spotModal) {
    spotModal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

spotModalClose?.addEventListener('click', closeSpotModal);
spotModal?.addEventListener('click', (e) => {
  if (e.target === spotModal) closeSpotModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && spotModal?.classList.contains('active')) closeSpotModal();
});

// ── SPOT Add to Cart directo (botón +Carrito en tarjeta) ──
document.querySelectorAll('.spot-add-btn[data-add-cart]').forEach(btn => {
  btn.addEventListener('click', () => {
    Cart.add({
      id: btn.dataset.id,
      name: btn.dataset.name,
      price: parseInt(btn.dataset.price),
    });
  });
});

