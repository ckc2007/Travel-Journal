const newCommentHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name').value.trim();
  const text = document.querySelector('#comment-text').value.trim();

  if (commentText) {
    try {
      const response = await fetch(`/api/stories/${storyId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, text }),
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

document.querySelector('.comment-submit').addEventListener('click', newCommentHandler);
