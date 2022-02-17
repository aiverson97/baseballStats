// playerController.js

// Import player model
Player = require('../Models/playerModel');

// Handle index actions
exports.index = function (req, res) {
    Player.get(function (err, players) {
        if(err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Players retrieved successfully",
            data: players
        });
    });
};

// Handle view player info
exports.view = function(req, res) {
    Player.find({playerID: req.params.playerID.toLowerCase()}, function(err, player) {
        if (err)
            res.send(err);

        res.json({
            message: 'Player details loading...',
            data: player
        });
    });
};

// Handle view players by lastName info
exports.lastName = function(req, res) {
    var lastName = req.params.lastName.charAt(0).toUpperCase() + req.params.lastName.slice(1).toLowerCase();
    Player.find({nameLast: lastName}, function(err, players) {
        if (err)
            res.send(err);

        res.json({
            message: 'Player details loading...',
            data: players
        });
    });
};

// Handle view players by firstName info
exports.firstName = function(req, res) {
    var firstName = req.params.firstName.charAt(0).toUpperCase() + req.params.firstName.slice(1).toLowerCase();
    Player.find({nameFirst: firstName}, function(err, players) {
        if (err)
            res.send(err);

        res.json({
            message: 'Player details loading...',
            data: players
        });
    });
};

// Handle view players by fullName info
exports.fullName = function(req, res) {
    var lastName = req.params.lastName.charAt(0).toUpperCase() + req.params.lastName.slice(1).toLowerCase();
    var firstName = req.params.firstName.charAt(0).toUpperCase() + req.params.firstName.slice(1).toLowerCase();
    Player.find({nameLast: lastName, nameFirst: firstName}, function(err, players) {
        if (err)
            res.send(err);

        res.json({
            message: 'Player details loading...',
            data: players
        });
    });
};
