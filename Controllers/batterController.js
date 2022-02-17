// batterController.js

// Import batter model
Batter = require('../Models/batterModel');

// Handle index actions
exports.index = function (req, res) {
    Batter.get(function (err, batters) {
        if(err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Batters retrieved successfully",
            data: batters
        });
    });
};

// Handle view batter info
exports.view = function(req, res) {
    Batter.findById(req.params.batter_id, function (err, batter) {
        if (err)
            res.send(err);

        res.json({
            message: 'Batter details loading...',
            data: batter
        });
    });
};

// Handle view batter by player info
exports.byPlayer = function(req, res) {
    Batter.find({playerID: req.params.playerID.toLowerCase()}, function(err, batter) {
        if (err)
            res.send(err);

        res.json({
            message: 'Batter details loading...',
            data: batter
        });
    });
};

// Handle view batters by player plus year info
exports.byPlayerandYear = function(req, res) {
    Batter.find({playerID: req.params.playerID.toLowerCase(), yearID: parseInt(req.params.yearID)}, function(err, batters) {
        if (err)
            res.send(err);

        res.json({
            message: 'Batter details loading...',
            data: batters
        });
    });
};

// Handle view batters by team info
exports.byTeam = function(req, res) {
    Batter.find({teamID: req.params.teamID.toUpperCase()}, function(err, batters) {
        if (err)
            res.send(err);

        res.json({
            message: 'Batter details loading...',
            data: batters
        });
    });
};

// Handle view batters by team plus year info
exports.byTeamandYear = function(req, res) {
    Batter.find({teamID: req.params.teamID.toUpperCase(), yearID: parseInt(req.params.yearID)}, function(err, batters) {
        if (err)
            res.send(err);

        res.json({
            message: 'Batter details loading...',
            data: batters
        });
    });
};
