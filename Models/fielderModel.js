// fielderModel.js
// Import cmd:
// mongoimport --type csv -d baseballStats -c fielders --headerline --file Fielding.csv

var mongoose = require('mongoose');

// Setup db schema for Fielder
var fielderSchema = mongoose.Schema ({
    playerID: String,
    yearID: Number,
    stint: Number,
    teamID: String,
    lgID: String,
    POS: String,
    G: Number,
    GS: Number,
    InnOuts: Number,
    PO: Number,
    A: Number,
    E: Number,
    DP: Number,
    PB: Number,
    WP: Number,
    SB: Number,
    CS: Number,
    ZR: Number
});

// Export Fielder model
var Fielder = module.exports = mongoose.model('fielder',fielderSchema);

module.exports.get = function(callback, limit) {
    Fielder.find(callback).limit(limit);
}
