let registerForm = document.getElementById("register-form");
let error = document.getElementById("error-rej");
const fristName = document.getElementById("name");
const userName = document.getElementById("user-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const rePassword = document.getElementById("re-password");
let sendBtn = document.querySelector("#send");
const pattern = /.{6,}/;

sendBtn.addEventListener("click", () => {
  sendBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i>`;
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let inf = new FormData();
  inf.append("username", userName.value);
  inf.append("password", password.value);
  inf.append("name", fristName.value);
  inf.append("email", email.value);
  console.log(inf);
  axios
    .post("https://tarmeezacademy.com/api/v1/register", inf, {
      headers: {
        "Content-Type": "multipart/from-data",
      },
    })
    .then(
      (resp) => {
        if (password.value === rePassword.value) {
          pattern.test(`${password.value}`) === true
            ? (window.location = "index.html")
            : (error.innerHTML = `Password should be more than or equal 6 <i class="fa-solid fa-triangle-exclamation ms-3 fa-beat-fade" style="color: red;"></i>`);
        } else {
          error.innerHTML = `It's not the same password  <i class="fa-solid fa-triangle-exclamation ms-3 fa-beat-fade" style="color: red;"></i>`;
        }
      },
      (rej) => {
        sendBtn.innerHTML = `Register`;
        error.classList.remove("d-none");
        let message = rej.response.data.message;
        error.innerHTML = `${message} <i class="fa-solid fa-triangle-exclamation ms-3 fa-beat-fade" style="color: red;"></i>`;
      }
    );
});
