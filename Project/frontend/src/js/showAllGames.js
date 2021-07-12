var fs = window.require("fs");
var lineReader = window.require("line-reader");
const path = require("path");
const axios = require("axios");

export function getGameManifests(steampath="C:\\Program Files (x86)\\Steam") {
  let games = [];
  let defaultPath = path.join(steampath);
  const librarycache = path.join(defaultPath, "\\appcache\\librarycache");
  const libraryFolders = path.join(defaultPath, "\\steamapps");
  let sameDir = true;

  let lineCount = 0;
  lineReader.eachLine(path.join(libraryFolders, "libraryfolders.vdf"), (line, last) => {
    if ((lineCount > 3 && !last) || sameDir) {
      let currPath = (line.split("\"")[3] + "\\steamapps").replace("\\\\", "\\");
      if(sameDir){
        currPath = steampath + "\\steamapps";
        sameDir = false;
      }
      fs.readdir(currPath, (err, files) => {
        for (let i = 0; i < files.length; i++) {
          let curr = files[i];
          if (curr.includes(".acf")) {
            let game = {};
            let lineCount = 0;
            let requiredImage = false;
            lineReader.eachLine(path.join(currPath, files[i]), (line, last) => {
              if (lineCount === 2)
                game["appid"] = line.split("\"")[3];
              else if (lineCount === 5)
                game["title"] = line.split("\"")[3];
              else if (lineCount > 5) {
                if (!requiredImage) {
                  const bannerPath = path.join(librarycache, (game["appid"] + "_library_hero.jpg"));
                  fs.readFile(bannerPath, (err, data) => {
                    if (data)
                      game["banner"] = data.toString('base64');
                  });
                  const posterPath = path.join(librarycache, (game["appid"] + "_library_600x900.jpg"));
                  fs.readFile(posterPath, (err, data) => {
                    if (data)
                      game["poster"] = data.toString('base64');
                  });
                  const iconPath = path.join(librarycache, (game["appid"] + "_icon.jpg"));
                  fs.readFile(iconPath, (err, data) => {
                    if (data)
                      game["icon"] = data.toString('base64');
                  });
                  requiredImage = true;
                }
              }
              lineCount++;
            });
            games.push(game);
          }
        };
      });
    }
    lineCount++;
  });
  return games;
};


export function getUbisoftGames(ubisoftpath="C:\\Program Files (x86)\\Ubisoft"){
  let games = [];
  axios.get("http://localhost:8079/fetchUbisoftGamePathes", {
  })
  .then(res => {
    let gameNames = [];
    for(let elem of res.data){
      let tempSplit = elem.split("/");
      gameNames.push(tempSplit[tempSplit.length-2]);
    }

    axios.post("http://localhost:8079/fetchUbisoftGameInfo", {
      headers: {
        'content-type': 'application/json',
      },   
      gameNames: gameNames
    })
    .then(res => {
      for(let elem of res.data){
        const {game_identifier, background_image, logo_image, icon_image, thumb_image, publisher} = elem;
        let game = {};
        fs.readFile(ubisoftpath + "\\Ubisoft Game Launcher\\cache\\assets\\" + thumb_image, (err, data) => {
          if(data)
            game["thumb_image"] = data.toString("base64");
        })
        game["title"] = game_identifier;
        game["publisher"] = publisher;
        games.push(game)
      }
    })
    .catch(err => {
      console.log(err);
    })
  })

  .catch(err => {
      console.log(err);
  })

  return games;
}

export function getRecentlyPlayedSteam(steamid){
  if(steamid === null || typeof steamid === "undefined" || steamid === ""){
    return [];
  }
  let recPlayed = [];
  axios.post("http://localhost:8079/getRecentlyPlayedSteam", {
    headers:{
      "Content-Type": "application/json"
    },
    steamid: steamid,
    key: "BFDEDB9F8EE644344D9CDCD8E8F28CD4"
  })
  .then(res => {
    for(let rec of res.data){
      recPlayed.push(rec);
    }
  });
  return recPlayed;
}