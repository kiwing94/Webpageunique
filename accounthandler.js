// Handle Registration
document.getElementById("registerForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  registerUser(email, password);
});

// Handle Login
document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  loginUser(email, password);
});
