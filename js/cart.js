const productsContainer = document.getElementById("cart-products");
let convertProductArray = localStorage.getItem("c-product");
let products = JSON.parse(convertProductArray);

// get  products
function getProducts() {
  productsContainer.innerHTML = "";
  products.forEach((product, i) => {
    let productCard = `
        <!-- Product start -->
        <div class="card-body border border-bottom">
          <!-- Single item -->
          <div class="row">
            <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
              <!-- Image -->
              <div
                class="bg-image hover-overlay hover-zoom ripple rounded"
                data-mdb-ripple-color="light"
              >
                <img
                  src="${product.image}"
                  class="w-100"
                />
                <a href="#!">
                  <div
                    class="mask"
                    style="background-color: rgba(251, 251, 251, 0.2)"
                  ></div>
                </a>
              </div>
              <!-- Image -->
            </div>
    
            <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
              <!-- Data -->
              <p><strong>${product.title}</strong></p>
              <p>${product.description}</p>
              <p>rate: ${product.rating.rate}</p>
    
              <button
                type="button"
                data-mdb-button-init
                data-mdb-ripple-init
                class="btn btn-danger btn-sm me-1 mb-2"
                data-mdb-tooltip-init
                title="Remove item"
                id="${i}"
              >
                <i class="fas fa-trash"></i>
              </button>
              <!-- Data -->
            </div>
    
            <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
              <!-- Price -->
              <p class="text-start text-md-center">
                <strong>$${product.price}</strong>
              </p>
              <!-- Price -->
            </div>
          </div>
          <!-- Single item -->
        </div>
        <!-- Product end -->
        `;
    productsContainer.insertAdjacentHTML("beforeend", productCard);

    btn = document.querySelector(`.btn[id="${i}"]`);
    btn.addEventListener("click", () => {
      addAlert(product.id);
      deleteProduct(i);
    });
  });
  getPrice();
}
getProducts();

// delete product
function deleteProduct(i) {
  products = products.filter((product) => product !== products[i]);
  localStorage.setItem("c-product", JSON.stringify(products));
  getProducts();
}

// total price

function getPrice() {
  const priceContainer = document.getElementById("total-price");
  if (Array.isArray(products) && products.length > 0) {
    let totalPrice = products.reduce((pre, cur) => {
      return pre + cur.price;
    }, 0);
    priceContainer.innerHTML = `${totalPrice.toFixed(2)} $`;
  } else {
    priceContainer.innerHTML = "No products available";
  }
}
// add alert
function addAlert(id) {
  const alertContainer = document.getElementById("alert");
  let alertId = Math.random(id);
  alertContainer.insertAdjacentHTML(
    "beforeend",
    `<div class="alert alert-danger w-50 alert-dismissible fade show" id="alert-${alertId}" role="alert">
              <strong>Deleted</strong>
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`
  );
  let alert = document.getElementById(`alert-${alertId}`);
  let remove = setTimeout(() => {
    alert.classList.add("d-none");
    clearTimeout(remove);
  }, 2000);
}
