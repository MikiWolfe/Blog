const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector("#user-signup").value.trim();
    const password = document.querySelector("#pass-signup").value.trim();
  
    if (username && password) {
      const response = await fetch("/api/user/signup", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        document.location.replace("/");
      } else {
        alert("Failed to sign up. Please try again");
      }
    }
  };

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);


