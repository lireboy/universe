var fs = window.require("fs");
var lineReader = window.require("line-reader");
const path = require("path");

export function getGameManifests(){
  let games = [];
  let defaultPath = path.join("C:\\Program Files (x86)\\Steam");
  const librarycache = path.join(defaultPath, "\\appcache\\librarycache");
  const libraryFolders = path.join(defaultPath, "\\steamapps");

  let lineCount = 0;
  lineReader.eachLine(path.join(libraryFolders, "libraryfolders.vdf"), (line, last) => {
    if(lineCount > 3 && !last){
      let currPath = (line.split("\"")[3] + "\\steamapps").replace("\\\\", "\\");
      fs.readdir(currPath, (err, files) => {
        for(let i = 0; i < files.length; i++){
          let curr = files[i];
          if(curr.includes(".acf")){
            let game = {};
            let lineCount = 0;
            let requiredImage = false;
            lineReader.eachLine(path.join(currPath, files[i]), (line, last) => {
              if(lineCount === 2)
                game["appid"] = line.split("\"")[3];
              else if(lineCount === 5)
                game["title"] = line.split("\"")[3];
              else if(lineCount > 5){
                if(!requiredImage){
                  const bannerPath = path.join(librarycache, (game["appid"] + "_library_hero.jpg"));
                  fs.readFile(bannerPath, (err, data) => {
                    game["banner"] = Buffer.from(data).toString('base64');
                  });
    
                  const posterPath = path.join(librarycache, (game["appid"] + "_library_600x900.jpg"));
                  fs.readFile(posterPath, (err, data) => {
                    game["poster"] = Buffer.from(data).toString('base64');
                  });
                  requiredImage = true;
                }
              }
              lineCount++;
            });
    
            games.push(game)
          }
        };
      });
    }
    lineCount++;
  });

  return games;
};