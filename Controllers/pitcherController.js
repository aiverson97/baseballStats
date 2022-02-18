// pitcherController.js

// Import pitcher model
Pitcher = require('../Models/pitcherModel');

// Handle index actions
exports.index = function (req, res) {
    Pitcher.get(function (err, pitchers) {
        if(err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Pitchers retrieved successfully",
            data: pitchers
        });
    });
};

// Handle view pitcher info
exports.view = function(req, res) {
    if(!ObjectId.isValid(req.params.pitcher_id)) {
        res.send("Error: Please request with a valid Mongoose ObjectId or use the /pitchers/byplayer/{playerId} if you're trying to use the CBB playerID");
    } else {
        Pitcher.findById(req.params.pitcher_id, function (err, pitcher) {
            if (err)
                res.send(err);

            res.json({
                message: 'Pitcher details loading...',
                data: pitcher
            });
        });
    }
};

// Handle view pitcher by player info
exports.byPlayer = function(req, res) {
    Pitcher.find({playerID: req.params.playerID.toLowerCase()}, function(err, pitcher) {
        if (err)
            res.send(err);

        res.json({
            message: 'Pitcher details loading...',
            data: pitcher
        });
    });
};

// Handle view pitchers by player plus year info
exports.byPlayerandYear = function(req, res) {
    Pitcher.find({playerID: req.params.playerID.toLowerCase(), yearID: parseInt(req.params.yearID)}, function(err, pitchers) {
        if (err)
            res.send(err);

        res.json({
            message: 'Pitchers details loading...',
            data: pitchers
        });
    });
};

// Handle view pitchers by team info
exports.byTeam = function(req, res) {
    Pitcher.find({teamID: req.params.teamID.toUpperCase()}, function(err, pitchers) {
        if (err)
            res.send(err);

        res.json({
            message: 'Pitchers details loading...',
            data: pitchers
        });
    });
};

// Handle view pitchers by team plus year info
exports.byTeamandYear = function(req, res) {
    Pitcher.find({teamID: req.params.teamID.toUpperCase(), yearID: parseInt(req.params.yearID)}, function(err, pitchers) {
        if (err)
            res.send(err);

        res.json({
            message: 'Pitchers details loading...',
            data: pitchers
        });
    });
};
