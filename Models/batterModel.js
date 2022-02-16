// battingModel.js
// Import cmd:
// mongoimport --type csv -d baseballStats -c batters --headerline --file Batting.csv

var mongoose = require('mongoose');

// Setup db schema for Batter
var batterSchema = mongoose.Schema ({
    playerID: String,
    yearID: Number,
    stint: Number,
    teamID: String,
    lgID: String,
    G: Number,
    AB: Number,
    R: Number,
    H: Number,
    '2B': Number,
    '3B': Number,
    HR: Number,
    RBI: Number,
    SB: Number,
    CS: Number,
    BB: Number,
    SO: Number,
    IBB: Number,
    HBP: Number,
    SH: Number,
    SF: Number,
    GIDP: Number
});

// Export Batter model
var Batter = module.exports = mongoose.model('batter',batterSchema);

module.exports.get = function(callback, limit) {
    Batter.find(callback).limit(limit);
}
