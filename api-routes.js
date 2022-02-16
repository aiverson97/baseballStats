// api-routes.js

// Initialize express router
let router = require('express').Router();

// Set default API response with documentation
router.get('/', function (req, res) {
    res.json({
        status: 'API Is Working',
        message: 'Welcome to my baseballStats api created with MongoDB, Express & Node.js. Here you can request for info from the baseball databank from 1871-2020',
        docs: 'REQUEST OPTIONS:',
        teams: {
            allTeams: "use /teams to view all teams' data with an entry per-team per-year",
            specificTeam: "use /teams/{teamID} to view one teams' data with an entry per-team per-year",
            specificYear: "use /teams/byYear/{yearID} to view all teams' data in a specific year",
            examples: "/teams/SDN -> see data for the Padres or /teams/2020 -> see data for all teams in 2020",
            byName: "use /teams/byName/{nameContains} to view all teams' data that contain your name query",
            nameExample: "/teams/byname/Boston -> data for 'Boston Red Stockings', 'Boston Red Caps', 'Boston Beaneaters', etc all the way through 'Boston Red Sox' because they all contain 'Boston'",
            exContinued: "/teams/byname/Red Sox -> data only begins from 1908 because that's when the 'Boston Red Sox' were started",
            byNameNote: "Note the nameContains field is case sensitive so /teams/byname/red sox -> null, but /teams/byname/Red Sox -> data 1908-2020"
        },
        playersBios: {
            allPlayers: "use /players to view all players' biographical data with one entry for each player",
            specificPlayer: "use /players/{playerID} to view a singular players' biographical data (see bottom for help with playerIDs)",
            firstName: "use /players/firstname/{firstName} to see all players with a specific first name",
            lastName: "use /players/lastname/{lastName} to see all players with a specific last name",
            fullName: "use /players/name/{firstName}/{lastName} to see all players with a specific first & last name"
        },
        battingStats: {
            allBatters: "use /batters to view all players' batting stats with one entry for each player per year",
            specificPlayer: "use /batters/byplayer/{playerID} to view a singular player's batting stats with one entry per season,  2 entries if traded (see bottom for help with playerIDs)",
            playerAndYear: "use /batters/byplayer/{playerID}/{year} to view a singular player's batting stats for a specific season, 2 entries if traded (see bottom for help with playerIDs)",
            specificTeam: "use /batters/byteam/{teamID} to view a singular team's batting stats with one entry per player per season",
            teamAndYear: "use /batters/byteam/{teamID}/{year} to view a singular team's batting stats for a specific season",
            byObjectID: "use /batters/{ObjectID} to view a specific batter entry by mongoDB's hexidecimal ObjectID"
        },
        fieldingStats: {
            allFielders: "use /fielders to view all players' fielding stats with one entry for each player per year",
            specificPlayer: "use /fielders/byplayer/{playerID} to view a singular player's fielding stats with one entry per season, 2 entries if traded (see bottom for help with playerIDs)",
            playerAndYear: "use /fielders/byplayer/{playerID}/{year} to view a singular player's fielding stats for a specific season, 2 entries if traded (see bottom for help with playerIDs)",
            specificTeam: "use /fielders/byteam/{teamID} to view a singular team's fielding stats with one entry per player per season",
            teamAndYear: "use /fielders/byteam/{teamID}/{year} to view a singular team's fielding stats for a specific season",
            byObjectID: "use /fielders/{ObjectID} to view a specific fielder entry by mongoDB's hexidecimal ObjectID"
        },
        pitchingStats: {
            allPitchers: "use /pitchers to view all players' pitching stats with one entry for each player per year",
            specificPlayer: "use /pitchers/byplayer/{playerID} to view a singular player's pitching stats with one entry per season, 2 entries if traded (see bottom for help with playerIDs)",
            playerAndYear: "use /pitchers/byplayer/{playerID}/{year} to view a singular player's pitching stats for a specific season, 2 entries if traded (see bottom for help with playerIDs)",
            specificTeam: "use /pitchers/byteam/{teamID} to view a singular team's pitching stats with one entry per player per season",
            teamAndYear: "use /pitchers/byteam/{teamID}/{year} to view a singular team's pitching stats for a specific season",
            byObjectID: "use /pitchers/{ObjectID} to view a specific pitcher entry by mongoDB's hexidecimal ObjectID"
        },
        playerIDhelp: {
            tip: "playerIDs are made up of the first 5 chars of the last name + first 2 chars of the first name + a 2-digit number to separate duplicates",
            ex: "tatisfe02 -> playerID for Fernando Tatis Jr and tatisfe01 -> playerID for Fernando Tatis Sr",
            note: "all chars in a playerID are lowercase"
        }
    });
});

// Import controllers
var teamController = require('./Controllers/teamController');
var playerController = require('./Controllers/playerController');
var batterController = require('./Controllers/batterController');
var fielderController = require('./Controllers/fielderController');
var pitcherController = require('./Controllers/pitcherController');

// Team routes
router.route('/teams')
    .get(teamController.index);

router.route('/teams/:teamID')
    .get(teamController.view);

router.route('/teams/byyear/:yearID')
    .get(teamController.byYear);

router.route('/teams/byname/:nameContains')
    .get(teamController.byName);

// Player routes
router.route('/players')
    .get(playerController.index);

router.route('/players/:playerID')
    .get(playerController.view);

router.route('/players/lastname/:lastName')
    .get(playerController.lastName);

router.route('/players/firstname/:firstName')
    .get(playerController.firstName);

router.route('/players/name/:firstName/:lastName')
    .get(playerController.fullName);

// Batter routes
router.route('/batters')
    .get(batterController.index);

router.route('/batters/:batter_id')
    .get(batterController.view);

router.route('/batters/byplayer/:playerID')
    .get(batterController.byPlayer);

router.route('/batters/byplayer/:playerID/:yearID')
    .get(batterController.byPlayerandYear);

router.route('/batters/byteam/:teamID')
    .get(batterController.byTeam);

router.route('/batters/byteam/:teamID/:yearID')
    .get(batterController.byTeamandYear);

// Fielder routes
router.route('/fielders')
    .get(fielderController.index);

router.route('/fielders/:fielder_id')
    .get(fielderController.view);

router.route('/fielders/byplayer/:playerID')
    .get(fielderController.byPlayer);

router.route('/fielders/byplayer/:playerID/:yearID')
    .get(fielderController.byPlayerandYear);

router.route('/fielders/byteam/:teamID')
    .get(fielderController.byTeam);

router.route('/fielders/byteam/:teamID/:yearID')
    .get(fielderController.byTeamandYear);

// Pitcher routes
router.route('/pitchers')
    .get(pitcherController.index);

router.route('/pitchers/:pitcher_id')
    .get(pitcherController.view);

router.route('/pitchers/byplayer/:playerID')
    .get(pitcherController.byPlayer);

router.route('/pitchers/byplayer/:playerID/:yearID')
    .get(pitcherController.byPlayerandYear);

router.route('/pitchers/byteam/:teamID')
    .get(pitcherController.byTeam);

router.route('/pitchers/byteam/:teamID/:yearID')
    .get(pitcherController.byTeamandYear);

// Export API routes
module.exports = router;
