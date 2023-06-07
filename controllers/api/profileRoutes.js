const router = require("express").Router();
const { Story } = require("../../models/Story");
const withAuth = require("../../utils/auth");
const upload = require("../../utils/upload");
const fs = require("fs");
const path = require("path");
const Trip = require("../../models/Trip");

//POST request to create new story
router.post("/", upload, withAuth, async (req, res) => {
  try {
    const filenames = req.files.map((file) => file.filename);
    const newStory = await Story.create({
      ...req.body,
      images: JSON.stringify(filenames),
      user_id: req.session.user_id,
    });
    // experimental feature: live-update
    const newTrip = await Trip.create({
      tripname: req.body.name,
      budget: req.body.budget,
      description: req.body.blog,
      user_id: req.session.user_id,
    });

    console.log("Associated images created:", filenames);

    res.status(200).json({ newStory, newTrip });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//DELETE request to delete story from user stories
// router.delete("/:id", withAuth, async (req, res) => {
//   try {
//     const storyData = await Story.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!storyData) {
//       res.status(404).json({ message: "No story found with this id!" });
//       return;
//     }

//     res.status(200).json(storyData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const storyData = await Story.findOne({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!storyData) {
      res.status(404).json({ message: "No story found with this id!" });
      return;
    }

    const imageFilename = storyData.image;

    await Story.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (imageFilename) {
      const filePath = path.join("public/images", imageFilename);
      // Check if the file exists
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.status(200).json({ message: "Story deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
