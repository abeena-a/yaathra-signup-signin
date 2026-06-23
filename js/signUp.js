const nameInput = document.getElementById("nameId");
const emailInput = document.getElementById("emailId");
const phoneInput = document.getElementById("phoneId");
const cityInput = document.getElementById("cityId");
const passwordInput = document.getElementById("passwordId");
const confirmPasswordInput = document.getElementById("confirmPasswordId");
const btnSignUp = document.getElementById("btnSignUpId");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const cityError = document.getElementById("cityError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

btnSignUp.addEventListener("click", (e) => {
  e.preventDefault();

  // Reset errors
  nameError.textContent = "";
  emailError.textContent = "";
  phoneError.textContent = "";
  cityError.textContent = "";
  passwordError.textContent = "";
  confirmPasswordError.textContent = "";

  let isValid = true; // flag

  // Name
  if (nameInput.value.trim() === "") {
    nameError.textContent = "Name is required";
    isValid = false;
  }

  // Email
  if (emailInput.value.trim() === "") {
    emailError.textContent = "Email is required";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
    emailError.textContent = "Invalid email format (e.g., example@mail.com)";
    isValid = false;
  }

  // Phone
  if (phoneInput.value.trim() === "") {
    phoneError.textContent = "Phone is required";
    isValid = false;
  } else if (!/^\d{10}$/.test(phoneInput.value)) {
    phoneError.textContent = "Phone must be exactly 10 digits";
    isValid = false;
  }

  // City
  if (cityInput.value.trim() === "") {
    cityError.textContent = "City is required";
    isValid = false;
  } else if (!/^[A-Za-z]+$/.test(cityInput.value)) {
    cityError.textContent = "City must contain only alphabets";
    isValid = false;
  }

  // Password
  if (passwordInput.value.trim() === "") {
    passwordError.textContent = "Password is required";
    isValid = false;
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(passwordInput.value)) {
    passwordError.textContent = "Password must be at least 8 characters with letters and numbers";
    isValid = false;
  }

  // Confirm Password
  if (confirmPasswordInput.value.trim() === "") {
    confirmPasswordError.textContent = "Confirm Password is required";
    isValid = false;
  } else if (confirmPasswordInput.value !== passwordInput.value) {
    confirmPasswordError.textContent = "Passwords do not match";
    isValid = false;
  }

  // If all validations passed
  if (isValid) {
    registerUser(
      nameInput.value,
      emailInput.value,
      phoneInput.value,
      cityInput.value,
      passwordInput.value
    );
  } else {
    alert("Please enter the details in the required format.");
  }
});


function registerUser(name, email, phone, city, password) {
  // Get existing users from LocalStorage
  let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

  // Check if email already exists
  let existingUser = users.find(user => user.email === email);
  if (existingUser) {
    alert("Email already registered. Please Sign In.");
    return;
  }

  // Add new user
  users.push({ name, email, phone, city, password });

  // Save back to LocalStorage
  localStorage.setItem("registeredUsers", JSON.stringify(users));

  alert("You are registered successfully!");
  window.location.href = "SignIn.html";
}

// Toggle password visibility
function togglePassword(inputId, iconElement) {
  const input = document.getElementById(inputId);
  if (input.type === "password") {
    input.type = "text";
    iconElement.classList.remove("bi-eye");
    iconElement.classList.add("bi-eye-slash");
  } else {
    input.type = "password";
    iconElement.classList.remove("bi-eye-slash");
    iconElement.classList.add("bi-eye");
  }
}
