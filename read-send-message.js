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
const channel2 = supabase.channel("messages");

const readline = require("readline");
const userIO = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
userIO.question("text Message to be sent?", (message) => {
    userIO.question(("from : please enter your name"), (name) => {
        const textMessage = {
            message: message,
            name: name
        }
        userIO.close();
        channel2.subscribe(async (status, error) => {
            if (error) {
                process.exit(0)
            }
            if (status === "SUBSCRIBED") {
                await channel2.send({
                    type: "broadcast",
                    event: "restart",
                    payload: { message: textMessage.message, name: textMessage.name }
                })
                
                process.exit(0)
            }
        })
    })
}
)

