var express = require('express');

const app = express();
app.use(express.json());

const port = 8079;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

app.get("/fetchUbisoftGamePathes", (req, response) => {
  console.log("test");
  let regedit = require("regedit");
  let pathUbisoft = "HKLM\\SOFTWARE\\WOW6432Node\\Ubisoft\\Launcher\\Installs";
  regedit.list(pathUbisoft, async (err, res) => {
    let gamePathes = [];
    for(let key of res[pathUbisoft].keys){
      let pathGame = pathUbisoft + "\\" + key;
      await regedit.promisified.list(pathGame).then(res => {
        gamePathes.push(res[pathGame].values.InstallDir.value);
      });
    }
    response.send(gamePathes);
  });
});

app.post("/fetchUbisoftGameInfo", (req, res) => {
  let gameNames = req.body.gameNames;
  if(typeof gameNames === "undefined"){
    res.send("no gamenames");
    return;
  }
  let lineReader = require("line-reader");
  let currObject = {};
  let configArray = [];
  lineReader.eachLine("C:\\Program Files (x86)\\Ubisoft\\Ubisoft Game Launcher\\cache\\configuration\\configurations", (line, last) => {
    if(line === "root:"){
      configArray.push(currObject);
      currObject = {};
    }
    else if(line.split(": ").length > 1 && !line.match(/[^\x20-\x7E]+/g)){
      let tempSplit = line.split(": ");
      let key = tempSplit[0].replace(/ /g, "");
      tempSplit.shift();
      let value = tempSplit.join(": ");
      if(key in currObject){
        if(Array.isArray(currObject[key])){
          currObject[key].push(value);
        }
        else{
          let temp = currObject[key];
          currObject[key] = [temp];
          currObject[key].push(value);
        }
      }
      else{
        currObject[key] = value;
      }
    }
    if(last){
      let resArray = [];
      for(let elem of configArray){
        for(let gameName of gameNames){
          if(elem["game_identifier"] === gameName){
            resArray.push(elem);
          }
        }
      }
      res.send(resArray);
    }
  });
});

app.post("/getRecentlyPlayedSteam", (req, res) => {
  let steamapi = require("steam-webapi");
  steamapi.key = req.body.key;
  steamapi.ready(err => {
    if(err)
      return console.log(err);
    let steam = new steamapi();

    let datasteamid = req.body.steamid.split("\/")[4];

    steam.resolveVanityURL({vanityurl: datasteamid}, (err, data) => {
      data.count = 5;
      steam.getRecentlyPlayedGames(data, (err, recData) => {
        res.send(recData.games);
      });
    });
  });
});

module.exports = app;
