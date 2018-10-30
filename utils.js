const fs = require('fs');
const parse = require('csv-parse')

function readPlayersFromFile(file, callback){
  let parser = parse({
    delimiter: ',',columns: true
  }, function(err, data){
    if(err){
      return(callback(err));
    }
    else if(data == false){
      return callback('No data found in: ' + file);
    }
    else{
      // put all names in lower case
      for(let i=0; i <data.length; i++){
        for(let j=0; j < data[i].length; j++){
          data[i][j] = data[i][j].toLowerCase().trim();
        }
      }
      return callback(false, data);
    }
  });

  fs.createReadStream(__dirname+'/'+file).pipe(parser);
}

function writeCsvDataTofile(file, data, fields, callback){
  var getDirName = require('path').dirname;

  mkdirp(getDirName(file), function(err){
    if(err){
      return callback(err);
    }

    var csv = json2csv({ data: data, fields: fields });

    fs.writeFile(file, csv, function(err) {
      if(err){
        console.log(err);
      }
      callback(err);
    });
  });
}

module.exports = {
  readPlayersFromFile: readPlayersFromFile,
  writeCsvDataTofile: writeCsvDataTofile
}
