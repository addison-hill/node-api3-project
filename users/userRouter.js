const express = require("express");
const db = require("./userDb");
const postDb = require("../posts/postDb");

const router = express.Router();

router.post("/", (req, res) => {
  db.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error adding the user" });
    });
});

router.post("/:id/posts", (req, res) => {
  const postInfo = { ...req.body, user_id: req.params.id };
  postDb
    .insert(postInfo)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error adding post" });
    });
});

router.get("/", (req, res) => {
  db.get(req.query)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving the user" });
    });
});

router.get("/:id", (req, res) => {
  db.getById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ errorMessage: "User not found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error retrieving the user" });
    });
});

router.get("/:id/posts", (req, res) => {
  db.getUserPosts(req.params.id)
    .then(posts => {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ message: "No posts found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ messae: "Error getting the posts" });
    });
});

router.delete("/:id", (req, res) => {
  db.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The threat has been elimated sir" });
      } else {
        res.status(404).json({ message: "The user could not be found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error removing the user" });
    });
});

router.put("/:id", (req, res) => {
  db.update(req.params.id, req.body)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User could not be found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error updating the user" });
    });
});

//custom middleware

function validateUserId(id) {
  return function(req, res, next) {
    if (id === req.headers.id) {
      res.send(req.body);
      next();
    } else {
      res.status(400).json({ message: "invalid user id" });
    }
  };
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
