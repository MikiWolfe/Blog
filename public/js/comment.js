const commentForm = document.querySelector("#add-comment");

const commentFormHandler = async (event) => {
  event.preventDefault();
};

const post_id = document.querySelector("#post-title").getAttribute("data-id");
const comment = document.querySelector("#comment").value.trim();

console.log(comment);
if (comment) {
  const response = await fetch("/api/comment", {
    method: "POST",
    body: JSON.stringify({
      post_id,
      comment,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    document.location.replace("/login");
  }
}

commentForm.addEventListener("submit", commentFormHandler);
