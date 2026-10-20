// Import the Supabase JavaScript client library.
const supabaseJs = require("@supabase/supabase-js");
const { error } = require("console");
// Define the Supabase URL for your project. 
const supabaseUrl = "https://hofafzkolyngkqeqfrxg.supabase.co";

// Define the Supabase public key for authentication.
const supabasePubKey = "sb_publishable_r0oNUsKsgzqbtca0RBcWTQ_ssgc9cVR";

// Create a Supabase client instance using the provided URL and public key.
const supabase = supabaseJs.createClient(supabaseUrl, supabasePubKey);

// Create a real-time channel named "messages" to subscribe to events and send messages.
const channel = supabase.channel("messages");

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


channel.subscribe((status, error) => {
    if (error) {
        process.exit(0)

    }
    if (status === "SUBSCRIBED") {
        channel.send({
            type: "broadcast",
            event: "restart",
            payload: { text }
        })

    }
})