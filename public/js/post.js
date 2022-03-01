const newPost = async (event) => {
  event.preventDefault();
};

const newPostForm = document.querySelector(".new-post-form");
const title = document.querySelector("#new-post-title").value.trim();
const text = document.querySelector("#new-post-text").value.trim();
console.log(title, text);

if (title && text) {
  const response = await fetch("/api/post", {
    method: "POST",
    body: JSON.stringify({
      title,
      text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    response.redirect("/");
  } else {
    response.redirect("/404");
  }
}
document.querySelector(".new-post-form").addEventListener("submit", newPost);
