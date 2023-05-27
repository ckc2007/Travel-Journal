const newCommentHandler = async (event) => {
  event.preventDefault();

  const text = document.querySelector('#comment-textarea').value.trim();

  if (text) {
    try {
      const response = await fetch(`/api/comments/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comments: text }),
      });

      if (response.ok) {
        const commentData = await response.json();
        // Handle the successful creation of the comment
        console.log('Comment created:', commentData);
      } else {
        // Handle the error case
        console.error('Failed to create comment:', response.status);
      }
    } catch (error) {
      // Handle any network or other errors
      console.error('Error creating comment:', error);
    }
  }
};

const testing = (event) => {
  event.preventDefault();

  if (event) {
    console.log('It is finally working!')
} else {
  console.error(error)
  }
};

document
  .querySelector('#comment-submit')
  .addEventListener('submit', testing);
