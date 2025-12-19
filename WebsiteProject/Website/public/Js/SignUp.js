const defaultUser = {
  name: "Yes i did make that the email and password",
  email: "FullMarks@please.com",
  password: "comeOnThisGottaBeWorthAlot"
};

if (!localStorage.getItem(defaultUser.email)) {
  localStorage.setItem(defaultUser.email, JSON.stringify(defaultUser));
}
//This is the navbar button code.
//Why is it a javascript button and not hard coded html?
//Because i wanted it to change based on you being logged in or out. 
document.addEventListener("DOMContentLoaded", () => {

  const authBtn = document.getElementById("authBtn");
  const loginForm = document.getElementById("loginform");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (authBtn) {
    authBtn.textContent = currentUser ? "Logout" : "Login";

    authBtn.addEventListener("click", () => {
      if (currentUser) {
        //log out
        localStorage.removeItem("currentUser");
        alert("You have been logged out");
        window.location.href = "/";
      } else {
        window.location.href = "/login";
      }
    });
  }
//Below is all the code for the login code side
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("InputEmail").value.trim();
      const password = document.getElementById("InputPassword").value;

      const storedUser = localStorage.getItem(email);

      if (!storedUser) {
        alert("No account found");
        return;
      }

      const user = JSON.parse(storedUser);

      if (user.password === password) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert(`Welcome back, ${user.name}!`);
        window.location.href = "/";
      } else {
        alert("Incorrect password");
      }
    });
  }

});

//This is the code set up for the create account.
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("SignupName").value.trim();
    const email = document.getElementById("SignupEmail").value.trim();
    const password = document.getElementById("SignupPassword").value;

    if (localStorage.getItem(email)) {
      alert("An account with this email already exists");
      return;
    }

    const newUser = { name, email, password };

    localStorage.setItem(email, JSON.stringify(newUser));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    alert(`Account created! Welcome, ${name}`);
    window.location.href = "/";
  });
}