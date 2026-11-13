// ------------------------------------------------------------
// Portfolio of Krushnadev Chauhan - script.js
// Features: 1) dark mode button  2) mobile menu  3) contact form check
// ------------------------------------------------------------

// ---------- Feature 1: Dark mode ----------
const themeButton = document.getElementById("theme-toggle");
const root = document.documentElement;

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  if (theme === "dark") {
    themeButton.textContent = "Light";
    themeButton.setAttribute("aria-label", "Switch to light mode");
  } else {
    themeButton.textContent = "Dark";
    themeButton.setAttribute("aria-label", "Switch to dark mode");
  }
}

// Use the theme saved from the last visit, if there is one
let savedTheme = null;
try {
  savedTheme = localStorage.getItem("theme");
} catch (error) {
  savedTheme = null;
}
if (savedTheme === "dark") {
  setTheme("dark");
}

themeButton.addEventListener("click", function () {
  const newTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  setTheme(newTheme);
  try {
    localStorage.setItem("theme", newTheme);
  } catch (error) {
    // Saving is optional, so the page still works without it
  }
});

// ---------- Feature 2: Menu that opens and closes on small screens ----------
const menuButton = document.getElementById("menu-toggle");
const nav = document.getElementById("main-nav");

menuButton.addEventListener("click", function () {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", isOpen);
  menuButton.textContent = isOpen ? "Close" : "Menu";
});

// Close the menu after a link is chosen
nav.addEventListener("click", function (event) {
  if (event.target.tagName === "A") {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "Menu";
  }
});

// ---------- Feature 3: Check the contact form before it is submitted ----------
const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const successText = document.getElementById("form-success");

function showError(input, message) {
  document.getElementById(input.id + "-error").textContent = message;
  input.classList.add("invalid");
}

function clearError(input) {
  document.getElementById(input.id + "-error").textContent = "";
  input.classList.remove("invalid");
}

form.addEventListener("submit", function (event) {
  event.preventDefault();          // stop the page from reloading
  successText.textContent = "";

  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const messageValue = messageInput.value.trim();
  let formIsValid = true;

  clearError(nameInput);
  clearError(emailInput);
  clearError(messageInput);

  if (nameValue.length < 2) {
    showError(nameInput, "Please enter your name (at least 2 characters).");
    formIsValid = false;
  }

  // A simple email check: something@something.something
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailPattern.test(emailValue) === false) {
    showError(emailInput, "Please enter a valid email, like name@example.com.");
    formIsValid = false;
  }

  if (messageValue.length < 10) {
    showError(messageInput, "Your message needs at least 10 characters.");
    formIsValid = false;
  }

  if (formIsValid) {
    successText.textContent = "Thank you, " + nameValue + "! Your message passed all the checks.";
    form.reset();
  }
});

// Remove an error as soon as the visitor starts typing again
[nameInput, emailInput, messageInput].forEach(function (input) {
  input.addEventListener("input", function () {
    clearError(input);
  });
});

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();
