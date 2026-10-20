const readline = require("readline");
const userIO = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let text = "";
userIO.question("text Message to be sent?", (answer) => {
    text = text + answer;
     console.log("text", text);
    userIO.close();
});