# BaseballStats api
This is a practice exercise for me in creating a REST api with MongoDB, Express<br>
& Node.js, eventually planning to extend with a React.js front-end. Below I have <br>
instructions for building the database, running the Node server, and the different<br>
requests you can make.

## Request Options
Use **/api** before all of these endpoints to request JSON from the database. Anything<br>
in the paths below contained in curly brackets {} is meant for you to replace with your<br>
own query.

### Teams
**/teams** - view all teams' data with an entry per-team per-season<br>
**/teams/{teamID}** - view one teams' data with an entry per-season<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*EX* - "/teams/SDN" -> see all Padres data<br>
**/teams/byYear/{yearID}** - view all teams' data in a specific season<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*EX* - "/teams/byyear/2020" -> see data for all teams in 2020<br>
**/teams/byName/{nameContains}** - view all teams' data that contain your name query<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*EX1* - "/teams/byname/Boston" -> data for 'Boston Red Stockings', 'Boston Red Caps',<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'Boston Beaneaters', etc all the way through 'Boston Red Sox' because they all contain 'Boston'<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*EX2* - "/teams/byname/Red Sox" -> data only begins from 1908 because that's when the <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'Boston Red Sox' were started<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*NOTE* - the nameContains field is case sensitive so /teams/byname/red sox -> null, but <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/teams/byname/Red Sox -> data 1908-2020 *(this is a little wonky so it's on my list of fixes)*

### Player Bios
**/players** - view all players' biographical data with one entry for each player<br>
**/players/{playerID}** - view a singular players' biographical data *(see bottom for help with playerIDs)*<br>
**/players/firstname/{firstName}** - see all players with a specific first name<br>
**/players/lastname/{lastName}** - see all players with a specific last name<br>
**/players/name/{firstName}/{lastName}** - see all players with a specific first & last name<br>

### Batting Stats
**/batters** - view all players' batting stats with one entry for each player per year<br>
**/batters/byplayer/{playerID}** - view a singular player's batting stats with one entry per season,<br>
&nbsp;&nbsp;&nbsp;&nbsp;2 entries if traded *(see bottom for help with playerIDs)*<br>
**/batters/byplayer/{playerID}/{year}** - view a singular player's batting stats for a specific season,<br>
&nbsp;&nbsp;&nbsp;&nbsp;2 entries if traded *(see bottom for help with playerIDs)*<br>
**/batters/byteam/{teamID}** - view a singular team's batting stats with one entry per player per season<br>
**/batters/byteam/{teamID}/{year}** - view a singular team's batting stats for a specific season<br>
**/batters/{ObjectID}** - view a specific batter entry by mongoDB's hexidecimal ObjectID<br>

### Fielding Stats
**/fielders** - view all players' fielding stats with one entry for each player per year<br>
**/fielders/byplayer/{playerID}** - view a singular player's fielding stats with one entry per season,<br>
&nbsp;&nbsp;&nbsp;&nbsp;2 entries if traded *(see bottom for help with playerIDs)*<br>
**/fielders/byplayer/{playerID}/{year}** - view a singular player's fielding stats for a specific season,<br>
&nbsp;&nbsp;&nbsp;&nbsp;2 entries if traded *(see bottom for help with playerIDs)*<br>
**/fielders/byteam/{teamID}** - view a singular team's fielding stats with one entry per player per season<br>
**/fielders/byteam/{teamID}/{year}** - view a singular team's fielding stats for a specific season<br>
**/fielders/{ObjectID}** - view a specific fielder entry by mongoDB's hexidecimal ObjectID<br>

### Pitching Stats
**/pitchers** - view all players' pitching stats with one entry for each player per year<br>
**/pitchers/byplayer/{playerID}** - view a singular player's pitching stats with one entry per season,<br>
&nbsp;&nbsp;&nbsp;&nbsp;2 entries if traded *(see bottom for help with playerIDs)*<br>
**/pitchers/byplayer/{playerID}/{year}** - view a singular player's pitching stats for a specific season,<br>
&nbsp;&nbsp;&nbsp;&nbsp;2 entries if traded *(see bottom for help with playerIDs)*<br>
**/pitchers/byteam/{teamID}** - view a singular team's pitching stats with one entry per player per season<br>
**/pitchers/byteam/{teamID}/{year}** - view a singular team's pitching stats for a specific season<br>
**/pitchers/{ObjectID}** - view a specific pitcher entry by mongoDB's hexidecimal ObjectID<br>

### Help With playerIDs
playerIDs are made up of:<br>
- first 5 chars of the player's last name
- first 2 chars of the player's first name
- 2-digit number to separate duplicates

#### *EX*
**tatisfe02** - playerID for Fernando Tatis Jr<br>**tatisfe01** - playerID of Fernando Tatis Sr<br>
&nbsp;&nbsp;&nbsp;&nbsp;*The difference between junior & senior is the 2-digit number at the end*<br>
&nbsp;&nbsp;&nbsp;&nbsp;**_NOTE_** - all chars in a playerID are lowercase *(looking to fix this amongst other case-sensitivity issues)*

## Building the App on Your Machine
### Database

#### Source
The databank I used for this project is provided for free by the [Chadwick Baseball Bureau](http://www.chadwick-bureau.com/),<br>
whose professional clients include baseball-reference, one of the main inspirations of this<br>
project. You can find the public/free version hosted on their GitHub [here](https://github.com/chadwickbureau/baseballdatabank). For my purposes <br>
I used only the Teams, People, Batting, Fielding, & Pitching CSV files & have included this<br>
more consolidated version of CBB's databank for your convenience. The data contained in<br>
the databank includes the 1871-2020 MLB seasons.

#### Recreating the db on Your Machine Using Mongoimport
You will need to make sure you have both MongoDB and the MongoDB database Tools<br>
in order to recreate this database. Here are the links to download these:
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
In case you aren't familiar with `mongoimport`, `--type csv` is specifying file-type,<br>
`-d baseballStats` is specifying to use the db 'baseballStats', `-c {colleciton}` is specifying<br>
the collection for mongo to create, `--headerline` tells mongoimport the first line of the csv<br>
are the fields, and `--file {filename.csv}` specifies which file to load in.


### Node Server
In order to start the Node server you will need to verify you have `node` & `npm` installed. <br>
Verify this with these commands:
```
node -v
npm -v
```
If these don't return a version number, you can install them [here](https://nodejs.org/en/download/). After you install these, you<br>
should be able to start the server by running `node index` in the repo directory. If it starts, you<br>
should see this printed in the console:
```
Db connected successfully
Running baseballStats on port 8080
```
If you receive `Error connecting db`, verify your MongoDB is running properly. If not, you should<br> now be able to send requests to `localhost:8080` and receive a `Hello World with Express` response.
