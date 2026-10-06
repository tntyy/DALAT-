(function () {
  'use strict';

  // =========================
  // DỮ LIỆU SẢN PHẨM
  // =========================

  const PRODUCTS = [
    {
      id: 'xa-lach',
      name: 'Xà lách Romaine',
      unit: 'Gói 300g · Hái 5h sáng',
      price: 28000,
      old: null,
      img: 'img/products/xa-lach.jpg',
      tag: 'Mới hái'
    },

    {
      id: 'ca-rot',
      name: 'Cà rốt Baby Đơn Dương',
      unit: 'Bó 500g · Rửa sạch',
      price: 35000,
      old: 45000,
      img: 'img/products/ca-rot.jpg',
      tag: '-22%',
      sale: true
    },

    {
      id: 'ca-chua',
      name: 'Cà chua Cherry',
      unit: 'Khay 500g · Nhà kính',
      price: 42000,
      old: null,
      img: 'img/products/ca-chua.jpg',
      tag: 'Bán chạy'
    },

    {
      id: 'dau-tay',
      name: 'Dâu tây Đà Lạt',
      unit: 'Hộp 250g · Giao lạnh',
      price: 145000,
      old: null,
      img: 'img/products/dau-tay.jpg',
      tag: 'Theo mùa'
    },

    {
      id: 'ot-chuong',
      name: 'Ớt chuông Đà Lạt',
      unit: 'Túi 500g · Hái trong ngày',
      price: 59000,
      old: null,
      img: 'img/products/ot-chuong.jpg',
      tag: 'Mới hái'
    },

    {
      id: 'sup-lo',
      name: 'Súp lơ xanh',
      unit: '1 bông ~700g',
      price: 39000,
      old: null,
      img: 'img/products/sup-lo.jpg',
      tag: 'Hữu cơ'
    },

    {
      id: 'khoai-tay',
      name: 'Khoai tây Đà Lạt',
      unit: 'Túi 1kg · Đất đỏ Bazan',
      price: 45000,
      old: null,
      img: 'img/products/khoai-tay.jpg',
      tag: 'Đặc sản'
    },

    {
      id: 'dua-leo',
      name: 'Dưa leo Baby',
      unit: 'Túi 500g · Giòn ngọt',
      price: 32000,
      old: null,
      img: 'img/products/dua-leo.jpg',
      tag: 'Mới hái'
    }
  ];


  // =========================
  // ĐỊNH DẠNG TIỀN VIỆT
  // =========================

  function formatPrice(price) {
    return price.toLocaleString('vi-VN') + ' ₫';
  }


  // =========================
  // HIỂN THỊ SẢN PHẨM
  // =========================

  const productGrid = document.getElementById('productGrid');

  if (productGrid) {

    productGrid.innerHTML = PRODUCTS.map(product => {

      return `
        <article class="product-card">

          <span class="pc-tag ${product.sale ? 'is-sale' : ''}">
            ${product.tag}
          </span>

          <div class="pc-media">
            <img
              src="${product.img}"
              alt="${product.name}"
              loading="lazy"
              width="240"
              height="240"
            >
          </div>

          <h3 class="pc-name">
            ${product.name}
          </h3>

          <p class="pc-meta">
            ${product.unit}
          </p>

          <div class="pc-foot">

            <span class="pc-price">
              ${formatPrice(product.price)}

              ${
                product.old
                  ? `<small>${formatPrice(product.old)}</small>`
                  : ''
              }
            </span>

            <button
              class="pc-add"
              type="button"
              data-id="${product.id}"
              aria-label="Thêm ${product.name} vào giỏ"
            >
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  d="M10 4v12M4 10h12"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                />
              </svg>
            </button>

          </div>

        </article>
      `;

    }).join('');
  }


  // =========================
  // GIỎ HÀNG
  // =========================

  let cart = 0;

  const cartCount = document.getElementById('cartCount');
  const cartBtn = document.getElementById('cartBtn');
  const toastEl = document.getElementById('toast');

  let toastTimer;


  function showToast(message) {

    if (!toastEl) return;

    toastEl.textContent = message;

    toastEl.classList.add('show');

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2200);
  }


  // =========================
  // THÊM SẢN PHẨM VÀO GIỎ
  // =========================

  document.addEventListener('click', function (event) {

    const button = event.target.closest('.pc-add');

    if (!button) return;

    const product = PRODUCTS.find(
      item => item.id === button.dataset.id
    );

    cart++;

    if (cartCount) {
      cartCount.textContent = cart;
    }

    if (cartBtn) {

      cartBtn.classList.remove('bump');

      void cartBtn.offsetWidth;

      cartBtn.classList.add('bump');
    }

    showToast(
      `Đã thêm ${product ? product.name : 'sản phẩm'} vào giỏ`
    );

  });


  // =========================
  // CLICK GIỎ HÀNG
  // =========================

  if (cartBtn) {

    cartBtn.addEventListener('click', function () {

      if (cart > 0) {

        showToast(
          `Giỏ hàng đang có ${cart} sản phẩm`
        );

      } else {

        showToast(
          'Giỏ hàng đang trống'
        );

      }

    });

  }


  // =========================
  // MENU MOBILE
  // =========================

  const burger = document.getElementById('burger');
  const nav = document.getElementById('mainNav');

  if (burger && nav) {

    burger.addEventListener('click', function () {

      const isOpen =
        nav.classList.toggle('is-open');

      burger.setAttribute(
        'aria-expanded',
        String(isOpen)
      );

      burger.setAttribute(
        'aria-label',
        isOpen
          ? 'Đóng menu'
          : 'Mở menu'
      );

    });

  }


  // =========================
  // DROPDOWN MENU
  // =========================

  const menus =
    document.querySelectorAll('.has-menu');

  menus.forEach(function (menu) {

    const button =
      menu.querySelector('.nav-toggle');

    button.addEventListener('click', function (event) {

      event.stopPropagation();

      const isOpen =
        menu.classList.contains('is-open');

      menus.forEach(function (item) {

        item.classList.remove('is-open');

        item
          .querySelector('.nav-toggle')
          .setAttribute(
            'aria-expanded',
            'false'
          );

      });

      if (!isOpen) {

        menu.classList.add('is-open');

        button.setAttribute(
          'aria-expanded',
          'true'
        );

      }

    });

  });


  document.addEventListener('click', function () {

    menus.forEach(function (menu) {

      menu.classList.remove('is-open');

      menu
        .querySelector('.nav-toggle')
        .setAttribute(
          'aria-expanded',
          'false'
        );

    });

  });


  // =========================
  // HEADER KHI CUỘN
  // =========================

  const header =
    document.getElementById('siteHeader');

  if (header) {

    function checkScroll() {

      header.classList.toggle(
        'is-stuck',
        window.scrollY > 12
      );

    }

    checkScroll();

    window.addEventListener(
      'scroll',
      checkScroll,
      { passive: true }
    );

  }


  // =========================
  // TÌM KIẾM
  // =========================

  const searchForm =
    document.querySelector('.search');

  if (searchForm) {

    searchForm.addEventListener(
      'submit',
      function (event) {

        event.preventDefault();

        const input =
          document.getElementById('q');

        const value =
          input.value.trim();

        showToast(
          value
            ? `Đang tìm "${value}"...`
            : 'Nhập tên rau củ bạn muốn tìm'
        );

      }
    );

  }

})();