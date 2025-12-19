const defaultUser = {
  name: "TestUser",
  email: "FullMarks@please.com",
  password: "comeOnThisGottaBeWorthAlot"
};

// Only create if it doesn't already exist
if (!localStorage.getItem(defaultUser.email)) {
  localStorage.setItem(defaultUser.email, JSON.stringify(defaultUser));
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginform");
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const email = document.getElementById("InputEmail").value.trim();
      const password = document.getElementById("InputPassword").value;

      const storedUser = localStorage.getItem(email);

      if (!storedUser) {
        alert("No account found with this email");
        return;
      }

      const user = JSON.parse(storedUser);

      if (user.password === password) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "/";
      } else {
        alert("Incorrect password");
      }
    });
  }
  const signupForm = document.getElementById("signinform");
  if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("InputName").value.trim();
      const email = document.getElementById("InputEmail").value.trim();
      const password = document.getElementById("InputPassword").value;

      if (localStorage.getItem(email)) {
        alert("Account already exists");
        return;
      }

      const newUser = {
        name,
        email,
        password
      };

      localStorage.setItem(email, JSON.stringify(newUser));
      localStorage.setItem("currentUser", JSON.stringify(newUser));

      alert("Account created successfully");
      window.location.href = "/";
    });
  }
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.href = "/";
    });
  }
  const loginNav = document.getElementById("loginNav");
  const logoutNav = document.getElementById("logoutNav");
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    if (loginNav) loginNav.style.display = "none";
    if (logoutNav) logoutNav.style.display = "block";
  } else {
    if (loginNav) loginNav.style.display = "block";
    if (logoutNav) logoutNav.style.display = "none";
  }

});
