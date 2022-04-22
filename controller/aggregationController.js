const Tour = require("../model/tourMoel");

// AGGREGATION PAIPELINE {matching and grouping}
exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      { $match: { since: { $gte: 2003 } } },

      {
        $group: {                  // GROUPING DATA
          _id: "$since",
          data: { $push: "$$ROOT" }, // SHOW DATA from ROOT
        },
      },

      {
        $addFields: {
          sum: { $sum: "$data.since" },  //  ADD Fields in DATA
        },
      },
      {
        $project: { _id: 0} //  REMOVE somthing from Outpit DATA
      },
    ]);
    res.status(200).json({
      message: "I am from getTourStats",
      status: "active",
      data: {
        stats: stats,
      },
    });
  } catch (e) {
    console.log(`I am from getTourStats: ${e}`);
  }
};
