// teamController.js

// Import team model
Team = require('../Models/teamModel');

// Handle index actions
exports.index = function (req, res) {
    Team.get(function (err, teams) {
        if(err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Teams retrieved successfully",
            data: teams
        });
    });
};

// Handle view team info
exports.view = function(req, res) {
    Team.find({teamID: req.params.teamID.toUpperCase()}, function(err, team) {
        if (err)
            res.send(err);

        res.json({
            message: 'Team details loading...',
            data: team
        });
    });
};

// Handle view teams by year info
exports.byYear = function(req, res) {
    Team.find({yearID: parseInt(req.params.yearID)}, function(err, teams) {
        if (err)
            res.send(err);

        res.json({
            message: 'Team details loading...',
            data: teams
        });
    });
};

// Handle view teams by name info
exports.byName = function(req, res) {
    Team.find({name: {$regex:req.params.nameContains}}, function(err, teams) {
        if (err)
            res.send(err);

        res.json({
            message: 'Team details loading...',
            data: teams
        });
    });
};
