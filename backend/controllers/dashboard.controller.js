const Child = require('../models/Child');

const getStats = async (req, res) => {
  try {
    const stats = await Child.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const result = { normal: 0, mam: 0, sam: 0 };
    stats.forEach(s => {
      if (s._id === 'Normal') result.normal = s.count;
      if (s._id === 'MAM') result.mam = s.count;
      if (s._id === 'SAM') result.sam = s.count;
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getStats };