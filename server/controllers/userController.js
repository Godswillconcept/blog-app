const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { username, email, gender, phone, role, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const userCount = await prisma.user.count();

    const user = await prisma.user.create({
      data: {
        username,
        email,
        role: userCount === 0 ? "Admin" : "Reader",
        gender,
        password: hashedPassword,
        phone,
      },
    });
    req.session.userId = user.id;
    req.session.role = user.role;
    console.log("user", user);
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  // req.session.userId = user.id;
  // req.session.role = user.role;

  res.json({ token });
}

async function userDetail(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, username: true, role: true },
    });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function logoutUser(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Could not log out, please try again.");
    }
    res.send("User logged out.");
  });
}

module.exports = {
  registerUser,
  loginUser,
  userDetail,
  logoutUser
};
