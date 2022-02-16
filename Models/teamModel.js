// teamModel.js
// Import cmd:
// mongoimport --type csv -d baseballStats -c teams --headerline --file Teams.csv

var mongoose = require('mongoose');

// Setup db schema for Team
var teamSchema = mongoose.Schema ({
    yearID: Number,
    lgID: String,
    teamID: String,
    franchID: String,
    divID: String,
    Rank: Number,
    G: Number,
    Ghome: Number,
    W: Number,
    L: Number,
    DivWin: String,
    WCWin: String,
    LgWin: String,
    WSWin: String,
    R: Number,
    AB: Number,
    H: Number,
    '2B': Number,
    '3B': Number,
    HR: Number,
    BB: Number,
    SO: Number,
    SB: Number,
    CS: Number,
    HBP: Number,
    SF: Number,
    RA: Number,
    ER: Number,
    ERA:{
        type: mongoose.Decimal128
    },
    CG: Number,
    SHO: Number,
    SV: Number,
    IPouts: Number,
    HA: Number,
    HRA: Number,
    BBA: Number,
    SOA: Number,
    E: Number,
    DP: Number,
    FP: {
        type: mongoose.Decimal128
    },
    name: String,
    park: String,
    attendance: Number,
    BPF: Number,
    PPF: Number,
    teamIDBR: String,
    teamIDlahman45: String,
    teamIDretro: String
});

// Export Team model
var Team = module.exports = mongoose.model('team',teamSchema);

module.exports.get = function(callback, limit) {
    Team.find(callback).limit(limit);
}
