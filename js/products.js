/* =========================================================
   DALAT FRESH - PRODUCTS PAGE
   ========================================================= */


/* =========================================================
   PRODUCT DATA
   ========================================================= */

const products = [

  {
    id: 1,
    name: "Bông cải xanh hữu cơ",
    category: "rau",
    categoryName: "Rau ăn lá",
    farm: "Green Valley Farms",
    date: "Thu hoạch hôm nay",
    freshness: 98,
    price: 89000,
    unit: "250g",
    image: "img/products/sup-lo.jpg",
    badge: "ORGANIC"
  },

  {
    id: 2,
    name: "Cà chua Đà Lạt",
    category: "cu-qua",
    categoryName: "Củ quả",
    farm: "Sunrise Organic Farm",
    date: "Thu hoạch hôm nay",
    freshness: 96,
    price: 79000,
    unit: "500g",
    image: "img/products/ca-chua.jpg",
    badge: "ORGANIC"
  },

  {
    id: 3,
    name: "Xà lách xanh",
    category: "rau",
    categoryName: "Rau ăn lá",
    farm: "Green Valley Farms",
    date: "Thu hoạch hôm nay",
    freshness: 97,
    price: 69000,
    unit: "1 cây",
    image: "img/products/xa-lach.jpg",
    badge: "ORGANIC"
  },

  {
    id: 4,
    name: "Ớt chuông Đà Lạt",
    category: "cu-qua",
    categoryName: "Củ quả",
    farm: "Hillside Organic Farm",
    date: "Thu hoạch hôm nay",
    freshness: 95,
    price: 109000,
    unit: "400g",
    image: "img/products/ot-chuong.jpg",
    badge: "ORGANIC"
  },

  {
    id: 5,
    name: "Cà rốt Đà Lạt",
    category: "cu-qua",
    categoryName: "Củ quả",
    farm: "Dalat Green Farm",
    date: "Thu hoạch hôm nay",
    freshness: 98,
    price: 49000,
    unit: "500g",
    image: "img/products/ca-rot.jpg",
    badge: "FRESH"
  },

  {
    id: 6,
    name: "Dâu tây Đà Lạt",
    category: "trai-cay",
    categoryName: "Trái cây",
    farm: "Dalat Strawberry Farm",
    date: "Thu hoạch sáng nay",
    freshness: 99,
    price: 129000,
    unit: "250g",
    image: "img/products/dau-tay.jpg",
    badge: "FRESH"
  },

  {
    id: 7,
    name: "Khoai tây Đà Lạt",
    category: "dac-san",
    categoryName: "Đặc sản Đà Lạt",
    farm: "Dalat Farm",
    date: "Thu hoạch hôm nay",
    freshness: 97,
    price: 59000,
    unit: "1kg",
    image: "img/products/khoai-tay.jpg",
    badge: "ORGANIC"
  }

];


/* =========================================================
   DOM
   ========================================================= */

const productGrid =
  document.getElementById("productGrid");

const emptyProducts =
  document.getElementById("emptyProducts");

const searchInput =
  document.getElementById("productSearch");

const headerSearch =
  document.getElementById("headerSearch");

const filterButtons =
  document.querySelectorAll(".filter-btn");

const cartCount =
  document.getElementById("cartCount");

const toast =
  document.getElementById("toast");


/* =========================================================
   STATE
   ========================================================= */

let currentCategory = "all";

let searchKeyword = "";

let cart = 0;


/* =========================================================
   FORMAT PRICE
   ========================================================= */

function formatPrice(price) {

  return price.toLocaleString("vi-VN") + "đ";

}


/* =========================================================
   PRODUCT CARD
   ========================================================= */

function createProductCard(product) {

  return `

    <article
      class="product-card"
      data-id="${product.id}"
    >

      <div class="product-image">

        <span
          class="product-badge
          ${product.badge === "FRESH" ? "sale" : ""}"
        >
          ${product.badge}
        </span>


        <button
          class="favorite-btn"
          type="button"
          aria-label="Yêu thích"
          data-favorite="${product.id}"
        >
          ♡
        </button>


        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
          onerror="this.style.opacity='0.15'"
        >

      </div>


      <div class="product-content">

        <span class="product-category">
          ${product.categoryName}
        </span>


        <h3 class="product-name">
          ${product.name}
        </h3>


        <div class="product-farm">
          🌱
          <span>
            ${product.farm}
          </span>
        </div>


        <div class="product-date">
          📅 ${product.date}
        </div>


        <div class="freshness">

          <span>
            Freshness Score
          </span>

          <strong>
            ${product.freshness}%
          </strong>

        </div>


        <div class="product-bottom">

          <div class="price">

            ${formatPrice(product.price)}

            <small>
              / ${product.unit}
            </small>

          </div>


          <button
            class="add-btn"
            type="button"
            data-add="${product.id}"
            aria-label="Thêm ${product.name} vào giỏ"
          >
            +
          </button>

        </div>

      </div>

    </article>

  `;
}


/* =========================================================
   RENDER
   ========================================================= */

function renderProducts() {

  const filteredProducts =
    products.filter(product => {

      const matchCategory =
        currentCategory === "all" ||
        product.category === currentCategory;

      const keyword =
        searchKeyword
          .toLowerCase()
          .trim();

      const matchSearch =
        product.name
          .toLowerCase()
          .includes(keyword) ||

        product.categoryName
          .toLowerCase()
          .includes(keyword) ||

        product.farm
          .toLowerCase()
          .includes(keyword);

      return matchCategory && matchSearch;

    });


  productGrid.innerHTML =
    filteredProducts
      .map(createProductCard)
      .join("");


  if (filteredProducts.length === 0) {

    emptyProducts.style.display =
      "block";

  } else {

    emptyProducts.style.display =
      "none";

  }


  attachProductEvents();

}


/* =========================================================
   FILTER
   ========================================================= */

filterButtons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      filterButtons.forEach(btn => {

        btn.classList.remove("active");

      });


      button.classList.add("active");


      currentCategory =
        button.dataset.category;


      renderProducts();

    }
  );

});


/* =========================================================
   SEARCH
   ========================================================= */

function performSearch(value) {

  searchKeyword = value;

  renderProducts();

}


if (searchInput) {

  searchInput.addEventListener(
    "input",
    event => {

      performSearch(
        event.target.value
      );

    }
  );

}


if (headerSearch) {

  headerSearch.addEventListener(
    "input",
    event => {

      performSearch(
        event.target.value
      );

    }
  );

}


/* =========================================================
   ADD TO CART
   ========================================================= */

function addToCart(productId) {

  const product =
    products.find(
      item => item.id === productId
    );

  if (!product) return;


  cart++;

  cartCount.textContent =
    cart;


  showToast(
    `${product.name} đã được thêm vào giỏ 🌿`
  );

}


/* =========================================================
   FAVORITE
   ========================================================= */

function toggleFavorite(button) {

  const isActive =
    button.dataset.active === "true";


  if (isActive) {

    button.textContent = "♡";

    button.dataset.active =
      "false";

  } else {

    button.textContent = "♥";

    button.dataset.active =
      "true";

    button.style.color =
      "#C94C4C";

  }

}


/* =========================================================
   EVENT PRODUCTS
   ========================================================= */

function attachProductEvents() {


  document
    .querySelectorAll("[data-add]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const productId =
            Number(
              button.dataset.add
            );

          addToCart(productId);

        }
      );

    });


  document
    .querySelectorAll("[data-favorite]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          toggleFavorite(button);

        }
      );

    });

}


/* =========================================================
   TOAST
   ========================================================= */

let toastTimer;

function showToast(message) {

  toast.textContent =
    message;

  toast.classList.add("show");


  clearTimeout(toastTimer);


  toastTimer =
    setTimeout(() => {

      toast.classList.remove("show");

    }, 2200);

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

const burger =
  document.getElementById("burger");

const nav =
  document.querySelector(".main-nav");


if (burger) {

  burger.addEventListener(
    "click",
    () => {

      const isOpen =
        nav.classList.toggle("mobile-open");

      burger.textContent =
        isOpen ? "✕" : "☰";

    }
  );

}


/* =========================================================
   INITIALIZE
   ========================================================= */

renderProducts();