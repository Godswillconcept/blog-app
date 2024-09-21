const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllPosts = async (req, res) => {
  const posts = await prisma.post.findMany({
    include: { author: { select: { id: true, username: true } } },
  });

  res.json({ posts });
};

const createPost = async (req, res) => {
  const { title, content, published } = req.body;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        published,
        author: { connect: { id: req.userId } },
      },
    });

    res.json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updatePost = async (req, res) => {
  const { title, content, published } = req.body;
  const { id } = req.params;

  try {
    const updatedPost = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        title,
        content,
        published,
        author: { connect: { id: req.userId } },
      },
    });

    res.json({ updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.post.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const publishPost = async (req, res) => {
  const { published } = req.body; // Assuming 'published' is a property in req.body
  const { id } = req.params;

  try {
    const updatedPost = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        published, // Assuming 'published' is a property in req.body
        author: { connect: { id: req.userId } },
      },
    });

    res.json({ updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  publishPost,
};
