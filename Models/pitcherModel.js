// pitcherModel.js
// Import cmd:
// mongoimport --type csv -d baseballStats -c pitchers --headerline --file Pitching.csv

var mongoose = require('mongoose');

// Setup db schema for Pitcher
var pitcherSchema = mongoose.Schema ({
    playerID: String,
    yearID: Number,
    stint: Number,
    teamID: String,
    lgID: String,
    W: Number,
    L: Number,
    G: Number,
    GS: Number,
    CG: Number,
    SHO: Number,
    SV: Number,
    IPouts: Number,
    H: Number,
    ER: Number,
    HR: Number,
    BB: Number,
    SO: Number,
    BAOpp: mongoose.Decimal128,
    ERA: mongoose.Decimal128,
    IBB: Number,
    WP: Number,
    HBP: Number,
    BK: Number,
    BFP: Number,
    GF: Number,
    R: Number,
    SH: Number,
    SF: Number,
    GIDP: Number
});

// Export Pitcher model
var Pitcher = module.exports = mongoose.model('pitcher',pitcherSchema);

module.exports.get = function(callback, limit) {
    Pitcher.find(callback).limit(limit);
}
