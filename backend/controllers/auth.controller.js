const HealthWorker = require('../models/HealthWorker');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, phone, password, woreda, kebele } = req.body;
  try {
    let worker = await HealthWorker.findOne({ phone });
    if (worker) return res.status(400).json({ message: 'Worker already exists' });

    worker = new HealthWorker({ name, phone, woreda, kebele });
    const salt = await bcrypt.genSalt(10);
    worker.password = await bcrypt.hash(password, salt);
    await worker.save();

    const payload = { id: worker.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { phone, password } = req.body;
  try {
    const worker = await HealthWorker.findOne({ phone });
    if (!worker) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, worker.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const payload = { id: worker.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login };