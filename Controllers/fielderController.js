// fielderController.js

// Import fielder model
Fielder = require('../Models/fielderModel');

// Handle index actions
exports.index = function (req, res) {
    Fielder.get(function (err, fielders) {
        if(err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Fielders retrieved successfully",
            data: fielders
        });
    });
};

// Handle view fielder info
exports.view = function(req, res) {
    Fielder.findById(req.params.fielder_id, function (err, fielder) {
        if (err)
            res.send(err);

        res.json({
            message: 'Fielder details loading...',
            data: fielder
        });
    });
};

// Handle view fielder by player info
exports.byPlayer = function(req, res) {
    Fielder.find({playerID: req.params.playerID}, function(err, fielder) {
        if (err)
            res.send(err);

        res.json({
            message: 'Fielder details loading...',
            data: fielder
        });
    });
};

// Handle view fielders by player plus year info
exports.byPlayerandYear = function(req, res) {
    Fielder.find({playerID: req.params.playerID, yearID: parseInt(req.params.yearID)}, function(err, fielders) {
        if (err)
            res.send(err);

        res.json({
            message: 'Fielders details loading...',
            data: fielders
        });
    });
};

// Handle view fielders by team info
exports.byTeam = function(req, res) {
    Fielder.find({teamID: req.params.teamID.toUpperCase()}, function(err, fielders) {
        if (err)
            res.send(err);

        res.json({
            message: 'Fielders details loading...',
            data: fielders
        });
    });
};

// Handle view fielders by team plus year info
exports.byTeamandYear = function(req, res) {
    Fielder.find({teamID: req.params.teamID.toUpperCase(), yearID: parseInt(req.params.yearID)}, function(err, fielders) {
        if (err)
            res.send(err);

        res.json({
            message: 'Fielders details loading...',
            data: fielders
        });
    });
};
