const newCommentHandler = async (event) => {
  event.preventDefault();
  
  const text = document.querySelector('#comment-textarea').value.trim();
  const storyId = window.location.pathname.split('/').pop();
  
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

      } else {
        console.error('Failed to create comment:', response.status);
      }
    } catch (error) {
      console.error('Error creating comment:', error);
      }
  }
};

document
  .querySelector('#comment-submit')
  .addEventListener('click', newCommentHandler);