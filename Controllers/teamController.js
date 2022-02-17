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

// Handle view team by franchise info
exports.byFranchise = function(req, res) {
    Team.find({franchID: req.params.franchiseID.toUpperCase()}, function(err, team) {
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
    //Fixing query to have capital first letters as the MongoDB would expect
    var fixedQuery = req.params.nameContains.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");

    Team.find({name: {$regex:fixedQuery}}, function(err, teams) {
        if (err)
            res.send(err);

        res.json({
            message: 'Team details loading...',
            data: teams
        });
    });
};
