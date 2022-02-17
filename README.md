# Austin's BaseballStats api
This is a practice exercise for me in creating a REST api with MongoDB, Express
& Node.js, eventually planning to extend with a React.js front-end. Below I have
instructions for building the database, running the Node server, and the different
requests you can make. I also plan to publish this & make it accessible over the
internet once I decide on a good free/cheap hosting option but as of now it's for
local use *(which isn't very practical, I know, but this is just for my own practice)*
*((as of now you're probably better off using [baseball-reference](https://www.baseball-reference.com/)
anyways))*

## Request Options
Use **/api** before all of these endpoints to request JSON from the database. Anything
in the paths below contained in curly brackets {} is meant for you to replace with your
own query. Also since this is historical baseball data that should be immutable, I only allow
for GET requests as a full-CRUD model with PATCH/POST/DELETE routes wouldn't make much sense
in this application.

### Teams
**/teams** - view all teams' data with an entry per-team per-season

**/teams/{teamID}** - view one teams' data with an entry per-season<br>
*EX* - "/teams/SFN" -> see all SF Giants data (1958-2020)

**/teams/byfranchise/{franchiseID}** - view one franchise's data with an entry per-season<br>
*EX* - "/teams/byfranchise/SFG" -> see all Giants franchise data including New York Gothams
(1883-1884), New York Giants (1885-1957), & San Francisco Giants (1958-2020)
*NOTE* - frachiseID typically corresponds to the 3 letters you'll see on a sports broadcast
i.e. "OAK" -> Athletics, "SDP" -> Padres, "NYY" -> Yankees etc & this is a good way of finding
a specific iteration of that franchise's teamID

**/teams/byYear/{yearID}** - view all teams' data in a specific season<br>
*EX* - "/teams/byyear/2020" -> see data for all teams in 2020

**/teams/byName/{nameContains}** - view all teams' data that contain your name query<br>
*EX1* - "/teams/byname/Boston" -> data for 'Boston Red Stockings', 'Boston Red Caps', 'Boston Beaneaters', etc all the way through 'Boston Red Sox' because they all contain 'Boston'<br>
*EX2* - "/teams/byname/Red Sox" -> data only begins from 1908 because that's when the 'Boston Red Sox' were started<br>
*NOTE* - the nameContains field is no longer case sensitive so "/teams/byname/red sox", "/teams/byname/Red Sox", & "/teams/byname/ReD sOx" all return the same data

### Player Bios
**/players** - view all players' biographical data with one entry for each player

**/players/{playerID}** - view a singular players' biographical data *(see bottom for help with playerIDs)*

**/players/firstname/{firstName}** - see all players with a specific first name

**/players/lastname/{lastName}** - see all players with a specific last name

**/players/name/{firstName}/{lastName}** - see all players with a specific first & last name

### Batting Stats
**/batters** - view all players' batting stats with one entry for each player per year

**/batters/byplayer/{playerID}** - view a singular player's batting stats with one entry per season,
2 entries if traded *(see bottom for help with playerIDs)*

**/batters/byplayer/{playerID}/{year}** - view a singular player's batting stats for a specific season,
2 entries if traded *(see bottom for help with playerIDs)*

**/batters/byteam/{teamID}** - view a singular team's batting stats with one entry per player per season

**/batters/byteam/{teamID}/{year}** - view a singular team's batting stats for a specific season

**/batters/{ObjectID}** - view a specific batter entry by mongoDB's hexidecimal ObjectID

### Fielding Stats
**/fielders** - view all players' fielding stats with one entry for each player per year

**/fielders/byplayer/{playerID}** - view a singular player's fielding stats with one entry per season,
2 entries if traded *(see bottom for help with playerIDs)*

**/fielders/byplayer/{playerID}/{year}** - view a singular player's fielding stats for a specific season,
2 entries if traded *(see bottom for help with playerIDs)*

**/fielders/byteam/{teamID}** - view a singular team's fielding stats with one entry per player per season

**/fielders/byteam/{teamID}/{year}** - view a singular team's fielding stats for a specific season

**/fielders/{ObjectID}** - view a specific fielder entry by mongoDB's hexidecimal ObjectID

### Pitching Stats
**/pitchers** - view all players' pitching stats with one entry for each player per year

**/pitchers/byplayer/{playerID}** - view a singular player's pitching stats with one entry per season,
2 entries if traded *(see bottom for help with playerIDs)*

**/pitchers/byplayer/{playerID}/{year}** - view a singular player's pitching stats for a specific season,
2 entries if traded *(see bottom for help with playerIDs)*

**/pitchers/byteam/{teamID}** - view a singular team's pitching stats with one entry per player per season

**/pitchers/byteam/{teamID}/{year}** - view a singular team's pitching stats for a specific season

**/pitchers/{ObjectID}** - view a specific pitcher entry by mongoDB's hexidecimal ObjectID

### Help With playerIDs
playerIDs are made up of:<br>
- first 5 chars of the player's last name
- first 2 chars of the player's first name
- 2-digit number to separate duplicates

#### *EX*
**tatisfe02** - playerID for Fernando Tatis Jr<br>**tatisfe01** - playerID of Fernando Tatis Sr<br>
*The difference between junior & senior is the 2-digit number at the end*<br>

**_NOTE_** - playerID is no longer case sensitive so "tatisfe02", "TATISFE02", & "TaTiSfE02" all return the same data

## Building the App on Your Machine
### Database

#### Source
The databank I used for this project is provided for free by the [Chadwick Baseball Bureau](http://www.chadwick-bureau.com/), whose professional clients include [baseball-reference](https://www.baseball-reference.com/), one of the main inspirations of this project. You can find the public/free version hosted on their GitHub [here](https://github.com/chadwickbureau/baseballdatabank). For my purposes I used only the Teams, People, Batting, Fielding, & Pitching CSV files & have included this more consolidated version of CBB's databank for your convenience. The data contained in the databank includes the 1871-2020 MLB seasons.

#### Recreating the db on Your Machine Using Mongoimport
You will need to make sure you have both MongoDB and the MongoDB database Tools in order to recreate this database. Here are the links to download these:
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- [MongoDB Database Tools](https://www.mongodb.com/try/download/database-tools)

After installing these, follow these steps to build the baseballStats database on your MongoDB:<br>
1. Navigate to the root '\baseballStats' repo directory in your CLI
2. Enter the '\baseballdatabank-master' directiory
3. Ensure MongoDB is accessible as a service on your machine and run `mongod` to start it if it isn't
4. Run these commands to `mongoimport` the CSVs in the folder:
```
mongoimport --type csv -d baseballStats -c teams --headerline --file Teams.csv
mongoimport --type csv -d baseballStats -c players --headerline --file People.csv
mongoimport --type csv -d baseballStats -c batters --headerline --file Batting.csv
mongoimport --type csv -d baseballStats -c fielders --headerline --file Fielding.csv
mongoimport --type csv -d baseballStats -c pitchers --headerline --file Pitching.csv
```
In case you aren't familiar with `mongoimport`, `--type csv` is specifying file-type,
`-d baseballStats` is specifying to use the db 'baseballStats', `-c {colleciton}` is specifying
the collection for mongo to create, `--headerline` tells mongoimport the first line of the csv
are the fields, and `--file {filename.csv}` specifies which file to load in.


### Node Server
In order to start the Node server you will need to verify you have `node` & `npm` installed. <br>
Verify this with these commands:
```
node -v
npm -v
```
If these don't return a version number, you can install them [here](https://nodejs.org/en/download/). After you install these, you
should be able to start the server by running `node index` in the repo directory. If it starts, you
should see this printed in the console:
```
Db connected successfully
Running baseballStats on port 8080
```
If you receive `Error connecting db`, verify your MongoDB is running properly. If not, you should<br> now be able to send requests to `localhost:8080` and receive a `Hello World with Express` response.
