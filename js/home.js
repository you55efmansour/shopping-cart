// add Products
const row = document.getElementById("p-container");

// check cart product
let cartProducts = [];
let convertProductArray = localStorage.getItem("c-product");
convertProductArray
  ? (cartProducts = JSON.parse(convertProductArray))
  : (cartProducts = []);

// get products
function getProducts() {
  axios
    .get("https://fakestoreapi.com/products?limit=10")
    .then((res) => res.data)
    .then((products) => {
      row.innerHTML = "";
      products.forEach((product) => {
        const productCard = `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card h-75 shadow-lg">
                    <div class="h-50 overflow-hidden  p-2 d-flex align-items-center kustify-content-center">
                        <img src="${
                          product.image
                        }" alt='...' class="card-img-top h-75 img-fluid">
                    </div>
                    <div class="card-body p-4 bg-black text-light">
                        <div class="text-center d-flex flex-column justify-content-between h-75">
                            <h5 class="fw-bolder fs-6">${product.title}</h5>
                            <div class="fw-bold">${product.price.toFixed(
                              2
                            )} $</div>
                        </div>
                    </div>
                    <div class="card-footer p-4 pt-0 border-top-0 bg-black">
                        <div class="text-center">
                            <div class="btn btn-outline-info mt-auto w-100 cart-btn" data-id="${
                              product.id
                            }">
                                <i class="fa-solid fa-cart-plus"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        row.insertAdjacentHTML("beforeend", productCard);

        // btn actions
        const btn = document.querySelector(
          `.cart-btn[data-id="${product.id}"]`
        );
        btn.addEventListener("mouseenter", () => {
          btn.innerHTML = "Add To Cart";
        });
        btn.addEventListener("mouseout", () => {
          btn.innerHTML = `<i class="fa-solid fa-cart-plus"></i>`;
        });
        btn.addEventListener("click", () => {
          cartProducts.push(product) ? addAlert(product.id) : "";
          // Save updated cart to localStorage
          localStorage.setItem("c-product", JSON.stringify(cartProducts));
        });
      });
    });
}
getProducts();
// add alert
function addAlert(id) {
  const alertContainer = document.getElementById("alert");
  let alertId = Math.random(id);
  alertContainer.insertAdjacentHTML(
    "beforeend",
    `<div class="alert alert-success alert-dismissible fade show" id="alert-${alertId}" role="alert">
                <strong>Added To Cart</strong>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`
  );
  let alert = document.getElementById(`alert-${alertId}`);
  let remove = setTimeout(() => {
    alert.classList.add("d-none");
    clearTimeout(remove);
  }, 2000);
}

// logout
const logOut = document.querySelector(".logout");
logOut.addEventListener("click", () => {
  localStorage.removeItem("token");
});

// make sure from the user
const token = localStorage.getItem("token");

token ? "" : (window.location = "index.html");
