//Create New Comment
const newCommentHandler = async (event) => {
  event.preventDefault();
  
  const text = document.querySelector('#comment-textarea').value.trim();
  const storyId = document.location.pathname.split('/').pop();
  
  if (text && storyId) {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ text, storyId }),
        headers: {
          'Content-Type': 'application/json',
          },
       });
  
      if (response.ok) {
        const commentData = await response.json();
        console.log('Comment created:', commentData);
        document.location.reload();

      } else {
        console.error('Failed to create comment:', response.status);
        document.location.href = document.location.origin + '/login';
      }
    } catch (error) {
      console.error('Error creating comment:', error);
      document.location.href = document.location.origin + '/login';
      }
  }
};

//Delete Comment
const delCommentsHandler = async (event) => {
  if (event.target.getAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.reload()
    } else {
      alert("Failed to delete comment");
    }
  }
};

document
  .querySelector('#comment-submit')
  .addEventListener('click', newCommentHandler);

document
  .querySelector('#delcomment')
  .addEventListener('click', delCommentsHandler);