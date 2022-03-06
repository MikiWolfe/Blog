const res = require("express/lib/response");

const newComment = document.querySelector("#comment");

const addComment = async (event) => {
  event.preventDefault();

  const post_id = document.querySelector("#post-id").getAttribute("data-id");
  const comment_text = document.querySelector("#comment").value.trim();

  if (comment_text) {
    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        post_id,
        comment_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    document.location.reload();
    console.log(response);
  }
};
newComment.addEventListener("submit", addComment);
