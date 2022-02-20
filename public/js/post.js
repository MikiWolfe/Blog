const newPostForm = document.querySelector("#new-post");

const newPost = async (event) => {
  event.preventDefault();
};

const title = document.querySelector("#new-post-title").value.trim();
const text = document.querySelector("#new-post-text").value.trim();
console.log(title, text)
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
    document.location.replace("/dashboard");
  } else {
    console.log("Unable to create post. Please try again");
  }
}

newPostForm.addEventListener("click", newPost);
