'use strict';

/**
 * Login
 */

document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault();
  
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Di sini Anda dapat menambahkan logika validasi login
  if (username === "ammar" && password === "asd") {
      // Redirect ke halaman dashboard atau lakukan sesuatu setelah login berhasil
      window.location.href = "/pembayaran/pembayaran.html";
  } else {
      document.getElementById("error-message").innerText = "Invalid username or password.";
  }
});
document.getElementById("login-form").addEventListener("submit", function(event) {
  // Mencegah form dari melakukan submit yang menyebabkan reload halaman
  event.preventDefault();
  
  // Mengambil nilai input untuk nama depan dan nama belakang
  const firstName = document.getElementById("username").value;
  const lastName = document.getElementById("password").value;
  
  // Menggabungkan nama depan dan nama belakang menjadi satu username
  const username = firstName + " " + lastName;
  
  // Menampilkan pesan selamat datang dengan nama yang dimasukkan
  document.getElementById("welcome-message").textContent = "Selamat Datang, " + firstName + " " + lastName + "!";
  document.getElementById("welcome-message").style.display = "block";
  
  // Mengalihkan ke halaman beranda setelah 2 detik
  setTimeout(function() {
      window.location.href = "index.html";
  }, 2000);
});

function Login(username, password) {
  // Implementasi logika pembelian masuk di sini
  alert("Selamat datang " + username + " di AmmarSport");
}

// Fungsi untuk mendapatkan nama pembeli dari local storage
function getUsername() {
  return localStorage.getItem("username");
}

// Fungsi untuk menampilkan nama pembeli
function displayUsername() {
  var username = getUsername();
  if (username) {
      document.getElementById("username").textContent = "Halo, " + username + "!";
  }
}

// Panggil fungsi untuk menampilkan nama pembeli
displayUsername();



/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");

const navElems = [overlay, navOpenBtn, navCloseBtn];

for (let i = 0; i < navElems.length; i++) {
  navElems[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  });
}



/**
 * header & go top btn active on page scroll
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 80) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }
});


// tomobol

document.addEventListener('DOMContentLoaded', function () {
  // Get all filter buttons
  const filterButtons = document.querySelectorAll('.filter-btn');

  // Add click event listener to each button
  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Remove 'active' class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add 'active' class to the clicked button
      this.classList.add('active');
    });
  });

  // Optionally, keep the button active based on the current URL
  const currentPage = window.location.pathname.split('/').pop();
  filterButtons.forEach(button => {
    if (button.getAttribute('href') === currentPage) {
      button.classList.add('active');
    }
  });
});


