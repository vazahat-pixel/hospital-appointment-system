import User from '../models/User.js';

export const getUsers = async (req, res) => {
  try {
    const { role } = req.query; // optional filter
    const filter = role ? { role } : {};
    const users = await User.find(filter).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};