const { Router } = require("express");
const {
  registerUser,
  loginUser,
  userDetail,
} = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");
const {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  publishPost,
} = require("../controllers/postController");

const router = Router();

const isAdmin = (req, res, next) => {
  if (req.role !== "Admin") {
    return res.status(403).json({ error: "Permission denied" });
  }

  next();
};

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user/detail", verifyToken, userDetail);
router.get("/posts", getAllPosts);
router.post("/posts", verifyToken, isAdmin, createPost);
router.put("/posts/:id/update", verifyToken, isAdmin, updatePost);
router.delete("/posts/:id/delete", verifyToken, isAdmin, deletePost);
router.put("/posts/:id/publish", verifyToken, isAdmin, publishPost);

module.exports = router;
