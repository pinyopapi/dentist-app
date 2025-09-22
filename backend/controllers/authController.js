import { OAuth2Client } from "google-auth-library";
import { AppDataSource } from "../db.js";
import User from "../models/User.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload?.email) return res.status(400).json({ message: "Invalid token" });

    const userRepo = AppDataSource.getRepository(User);
    let user = await userRepo.findOne({ where: { email: payload.email } });

    if (!user) {
      user = userRepo.create({
        name: payload.name,
        email: payload.email,
        googleId: payload.sub,
        role: "user",
      });
      await userRepo.save(user);
    }

    res.json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Authentication failed" });
  }
};
