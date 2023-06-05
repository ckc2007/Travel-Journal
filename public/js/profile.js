const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#project-name").value.trim();
  const budget = document.querySelector("#project-funding").value.trim();
  const blog = document.querySelector("#project-desc").value.trim();

  // payload:
  if (name && budget && blog) {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("budget", budget);
    formData.append("blog", blog);

    const imageFiles = document.querySelector("#image").files;
    for (let i = 0; i < imageFiles.length; i++) {
      formData.append("images", imageFiles[i]);
    }

    try {
      const response = await fetch(`/api/stories`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        document.location.replace("/profile");
      } else {
        alert("Failed to create project");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while creating the project");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/stories/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete project");
    }
  }
};

document
  .querySelector(".new-project-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector(".project-list")
  .addEventListener("click", delButtonHandler);
