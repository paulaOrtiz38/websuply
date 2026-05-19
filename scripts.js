
// ── PRODUCTS DATA ──
const products = [
  // Mobiliario
  { id:1, name:'Silla Tiffany Blanca', category:'Mobiliario', price:8000, unit:'c/u', desc:'Elegante silla Tiffany de resina, ideal para ceremonias y banquetes. Resistente y liviana.', icon:'🪑', img:"fotos/celular.jpg" },
  { id:2, name:'Mesa Redonda 180cm', category:'Mobiliario', price:25000, unit:'c/u', desc:'Mesa redonda de madera pintada en blanco, incluye tela de mantel premium hasta el piso.', icon:'🪵' },
  { id:3, name:'Silla Ghost Cristal', category:'Mobiliario', price:12000, unit:'c/u', desc:'Silla de policarbonato transparente, diseño moderno y sofisticado para eventos de lujo.', icon:'💎' },
  { id:4, name:'Barra de Cóctel Alta', category:'Mobiliario', price:45000, unit:'c/u', desc:'Mesa alta tipo bar con cubierta de mármol sintético. Perfecta para cócteles y brindis.', icon:'🍸' },
  { id:5, name:'Sillón Lounge', category:'Mobiliario', price:35000, unit:'c/u', desc:'Confortable sillón tapizado en terciopelo color champagne, ideal para zonas VIP.', icon:'🛋️' },

  // Iluminación
  { id:6, name:'Cortina de Luces LED', category:'Iluminación', price:18000, unit:'tramo', desc:'Cortina de microluces blancas cálidas de 3×1m. Crea una atmósfera romántica y mágica.', icon:'✨' },
  { id:7, name:'Piso de LED Danzante', category:'Iluminación', price:120000, unit:'kit', desc:'Plataforma luminosa 4×4m con paneles RGB programables. El epicentro de cualquier fiesta.', icon:'🪩' },
  { id:8, name:'Candelabro Colgante', category:'Iluminación', price:30000, unit:'c/u', desc:'Espectacular candelabro de cristal con 80 lágrimas. Incluye focos de bajo consumo.', icon:'🕯️' },
  { id:9, name:'Spots de Color', category:'Iluminación', price:12000, unit:'c/u', desc:'Foco LED RGBW de 30W para iluminación ambiental en diferentes colores.', icon:'💡' },

  // Decoración
  { id:10, name:'Arco Floral Premium', category:'Decoración', price:85000, unit:'c/u', desc:'Arco de 2,4m con flores artificiales de alta calidad. Perfecto para la entrada o altar.', icon:'🌸' },
  { id:11, name:'Globos Metalizados', category:'Decoración', price:5000, unit:'por 10', desc:'Globos metalizados en oro, plata o rose gold. Incluye inflado con helio.', icon:'🎈' },
  { id:12, name:'Backdrop Lentejuelas', category:'Decoración', price:40000, unit:'c/u', desc:'Panel colgante de lentejuelas reversible dorado/plateado, 2×2m. Ideal para selfies.', icon:'🥂' },
  { id:13, name:'Centros de Mesa Espejo', category:'Decoración', price:15000, unit:'c/u', desc:'Base de espejo circular con composición floral premium y velas LED incluidas.', icon:'🪞' },

  // Vajilla
  { id:14, name:'Vajilla Porcelana Blanca', category:'Vajilla', price:3500, unit:'cubierto', desc:'Set completo: plato base, plato hondo, plato de pan y taza de café en porcelana fina.', icon:'🍽️' },
  { id:15, name:'Copas de Cristal', category:'Vajilla', price:2000, unit:'c/u', desc:'Copa de cristal transparente para vino, agua o champagne. Apta para lavavajillas.', icon:'🥂' },
  { id:16, name:'Cubiertos Acero Inox', category:'Vajilla', price:1800, unit:'set', desc:'Set de 4 piezas: tenedor, cuchillo, cuchara y cucharita. Acabado espejo plateado.', icon:'🍴' },

  // Sonido
  { id:17, name:'Sistema de Sonido 2000W', category:'Sonido', price:95000, unit:'día', desc:'Par de bafles activos 1000W c/u + subwoofer 18", mezcladora y soporte incluidos.', icon:'🔊' },
  { id:18, name:'Micrófono Inalámbrico', category:'Sonido', price:15000, unit:'c/u', desc:'Micrófono de mano UHF con receptor y baterías. Perfecto para ceremonias y discursos.', icon:'🎤' },
  { id:19, name:'DJ Controller Profesional', category:'Sonido', price:55000, unit:'día', desc:'Controladora Pioneer DDJ-400 con Serato DJ Lite. Incluye cable y soporte.', icon:'🎧' },

  // Carpas
  { id:20, name:'Carpa Pagoda 5×5m', category:'Carpas', price:150000, unit:'c/u', desc:'Carpa estilo pagoda blanca premium con faldones laterales opcionales. Capacidad: 20 pax.', icon:'⛺' },
  { id:21, name:'Carpa Árabe 10×10m', category:'Carpas', price:280000, unit:'c/u', desc:'Imponente carpa árabe con techo con pliegues y laterales de tela. Capacidad: 60 pax.', icon:'🏕️' },
];

let cart = {};
let activeCategory = 'Todos';

// ── RENDER PRODUCTS ──
function renderProducts(list) {
  const grid = document.getElementById('productGrid');
  const noRes = document.getElementById('noResults');
  grid.innerHTML = '';
  if (!list.length) { noRes.classList.remove('d-none'); return; }
  noRes.classList.add('d-none');

  list.forEach(p => {
    const inCart = cart[p.id];
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-lg-4';
    col.setAttribute('data-category', p.category);
    col.innerHTML = `
      <div class="product-card">
        <div class="product-img">
          <span>${p.icon}</span>
          <div class="product-category-tag">${p.category}</div>
        </div>
        <div class="product-body">
          <div class="product-name">${p.name}</div>
          <div class="product-desc">${p.desc}</div>
          <div class="product-price">$${p.price.toLocaleString('es-AR')} <span>/ ${p.unit}</span></div>
          <button class="add-btn ${inCart ? 'added' : ''}" id="btn-${p.id}" onclick="addToCart(${p.id})">
            <i class="bi ${inCart ? 'bi-check2' : 'bi-plus-lg'}"></i>
            ${inCart ? 'En mi Lista' : 'Agregar a Lista'}
          </button>
        </div>
      </div>`;
    grid.appendChild(col);
  });
}

// ── FILTER LOGIC ──
function getFilteredProducts() {
  const q = document.getElementById('searchInput').value.toLowerCase().trim();
  return products.filter(p => {
    const matchCat = activeCategory === 'Todos' || p.category === activeCategory;
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    return matchCat && matchQ;
  });
}

function filterProducts() { renderProducts(getFilteredProducts()); }

function filterByCategory(cat, btn) {
  activeCategory = cat;
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  filterProducts();
}

// ── CART ──
function addToCart(id) {
  const p = products.find(x => x.id === id);
  if (cart[id]) {
    cart[id].qty++;
  } else {
    cart[id] = { ...p, qty: 1 };
  }
  updateCartUI();
  bumpCount();
  showToast(`<i class="bi bi-check2-circle me-2" style="color:var(--champagne)"></i>${p.name} agregado a tu lista`);

  const btn = document.getElementById(`btn-${id}`);
  if (btn) {
    btn.classList.add('added');
    btn.innerHTML = '<i class="bi bi-check2"></i> En mi Lista';
  }
}

function changeQty(id, delta) {
  if (!cart[id]) return;
  cart[id].qty += delta;
  if (cart[id].qty <= 0) delete cart[id];
  updateCartUI();
  renderProducts(getFilteredProducts());
}

function removeItem(id) {
  delete cart[id];
  updateCartUI();
  renderProducts(getFilteredProducts());
}

function clearCart() {
  cart = {};
  updateCartUI();
  renderProducts(getFilteredProducts());
  showToast('<i class="bi bi-trash me-2"></i>Lista vaciada');
}

function updateCartUI() {
  const items = Object.values(cart);
  const count = items.reduce((a, x) => a + x.qty, 0);
  const total = items.reduce((a, x) => a + x.price * x.qty, 0);

  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartEmpty').style.display = count ? 'none' : 'block';
  document.getElementById('cartFooter').classList.toggle('d-none', count === 0);
  document.getElementById('cartTotal').textContent = `$${total.toLocaleString('es-AR')}`;

  const container = document.getElementById('cartItems');
  container.innerHTML = '';
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div class="cart-item-icon">${item.icon}</div>
      <div class="flex-grow-1">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${item.price.toLocaleString('es-AR')} / ${item.unit}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)"><i class="bi bi-dash"></i></button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)"><i class="bi bi-plus"></i></button>
        </div>
      </div>
      <button class="remove-btn" onclick="removeItem(${item.id})" title="Eliminar"><i class="bi bi-x-lg"></i></button>`;
    container.appendChild(div);
  });
}

function bumpCount() {
  const el = document.getElementById('cartCount');
  el.classList.add('bump');
  setTimeout(() => el.classList.remove('bump'), 300);
}

// ── OFFCANVAS ──
function openCart() {
  const oc = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));
  oc.show();
}

// ── NOTA MODAL ──
function openNoteModal() {
  const items = Object.values(cart);
  let preview = '<strong style="color:var(--champagne)">Resumen de Lista:</strong><br>';
  items.forEach(i => {
    preview += `• ${i.name} × ${i.qty} = $${(i.price * i.qty).toLocaleString('es-AR')}<br>`;
  });
  const total = items.reduce((a, x) => a + x.price * x.qty, 0);
  preview += `<br><strong style="color:var(--champagne)">Total estimado: $${total.toLocaleString('es-AR')}</strong>`;
  document.getElementById('notePreview').innerHTML = preview;
  new bootstrap.Modal(document.getElementById('noteModal')).show();
}

function saveNote() {
  const name = document.getElementById('noteName').value.trim();
  const email = document.getElementById('noteEmail').value.trim();
  if (!name || !email) {
    showToast('<i class="bi bi-exclamation-circle me-2" style="color:#e05555"></i>Completá nombre y correo');
    return;
  }
  bootstrap.Modal.getInstance(document.getElementById('noteModal')).hide();
  showToast(`<i class="bi bi-envelope-check me-2" style="color:var(--champagne)"></i>¡Lista guardada! Te contactaremos pronto, ${name}.`);
}

// ── TOAST ──
function showToast(msg) {
  document.getElementById('toastBody').innerHTML = msg;
  const t = new bootstrap.Toast(document.getElementById('toastMsg'));
  t.show();
}

// ── INIT ──
renderProducts(products);