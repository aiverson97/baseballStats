// playerModel.js
// Import cmd:
// mongoimport --type csv -d baseballStats -c players --headerline --file People.csv

var mongoose = require('mongoose');

// Setup db schema for Player
var playerSchema = mongoose.Schema ({
    playerID: String,
    birthYear: Number,
    birthMonth: Number,
    birthDay: Number,
    birthCountry: String,
    birthState: String,
    birthCity: String,
    deathYear: Number,
    deathMonth: Number,
    deathDay: Number,
    deathCountry: String,
    deathState: String,
    deathCity: String,
    nameFirst: String,
    nameLast: String,
    nameGiven: String,
    weight: Number,
    height: Number,
    bats: String,
    throws: String,
    debut: String,
    finalGame: String,
    retroID: String,
    bbrefID: String
});

// Export Player model
var Player = module.exports = mongoose.model('player',playerSchema);

module.exports.get = function(callback, limit) {
    Player.find(callback).limit(limit);
}
