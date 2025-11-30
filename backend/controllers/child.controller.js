const Child = require('../models/Child');
const { getZScore } = require('../utils/calculateZscore');

const registerChild = async (req, res) => {
  try {
    const { name, nameAmharic, sex, dateOfBirth, weight, height, muac, woreda, kebele } = req.body;

    const ageInMonths = Math.round(
      (new Date() - new Date(dateOfBirth)) / (1000 * 60 * 60 * 24 * 30.4375)
    );

    const zScore = getZScore(weight, ageInMonths, sex);

    let status = 'Normal';
    if (zScore < -2) status = 'MAM';
    if (zScore < -3) status = 'SAM';

    const child = await Child.create({
      name, nameAmharic, sex, dateOfBirth, weight, height, muac,
      ageInMonths, zScore, status, woreda, kebele,
      healthWorker: req.user.id
    });

    res.status(201).json(child);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getChildren = async (req, res) => {
  const children = await Child.find().populate('healthWorker', 'name');
  res.json(children);
};

module.exports = { registerChild, getChildren };