const request = require('request');
const fs = require('fs');
const readline = require("readline");

let args = process.argv.slice(2);
let url = args[0];
let path = args[1];

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

request(url, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //console.log('body:', body); // Print the HTML for the Google homepage.

  // Checks if URL entered is valid
  if (`${response}.statusCode` !== 200) {
    console.log("The URL specified is invalid!");
    rl.close();
  } else {
    // Checks if file already exists and asks if user wants to overwrite
    fs.access(path, fs.F_OK, (err) => {
      if (!err) {
        rl.question('File exists, type (y) and hit (enter) to overwrite the file: ', (confirm) => {
          if (confirm === "y") {
            writeToFile(body);
            console.log('The file has been overwritten');
            console.log("Downloaded and saved " + body.length + " bytes to " + path + ".");
            rl.close();
          } else {
            rl.close();
          }
        });
      } else {
        writeToFile(body);
        console.log("Downloaded and saved " + body.length + " bytes to " + path + ".");
        rl.close();
      }
    });
  }
});

const writeToFile = (body) => {
  fs.writeFile(path, body, err => {
    if (err) {
      console.error(err);
      return;
    }
    //file written successfully
  });
};
