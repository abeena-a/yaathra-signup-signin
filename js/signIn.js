const emailInput = document.getElementById("emailId");
const passwordInput = document.getElementById("passwordId");
const btnSignIn = document.getElementById("btnSignInId");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

btnSignIn.addEventListener("click", (e) => {
  e.preventDefault();

  emailError.textContent = "";
  passwordError.textContent = "";

  if (emailInput.value.trim() === "") {
    emailError.textContent = "Email is required";
    return;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
    emailError.textContent = "Invalid email format";
    return;
  }

  if (passwordInput.value.trim() === "") {
    passwordError.textContent = "Password is required";
    return;
  }

  signInUser(emailInput.value, passwordInput.value);
});

function signInUser(email, password) {
  let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

  let foundUser = users.find(user => user.email === email && user.password === password);

  if (foundUser) {
    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
    alert("Login successful!");
    window.location.href = "home.html";
  } else {
    alert("Invalid email or password. Please try again.");
  }
}
