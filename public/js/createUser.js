const { response } = require("express");

const createUserFormHandler = async (event) => {
  event.preventDefault();
};

const username = document.querySelector("#user-name").value.trim();
const password = document.querySelector("#password").value.trim();

if (username && password) {
  const response = await fetch("/api/user/signup", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    console.log("Failed to create accout");
  }
}
document
  .querySelector("creat-user-form")
  .addEventListener("submit", createUserFormHandler);
