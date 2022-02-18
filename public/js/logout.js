const logout = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "appliation/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to log out. Try again.");
  }
};

document.querySelector("#logout").addEventListener("click", logout);
