console.log("1");
/**
 * Import the Supabase JavaScript client library with require().
 * This library allows you to interact with Supabase services,
 *  such as authentication, database, and real-time features.
 * "@supabase/supabase-js" is the name of the Supabase JavaScript client package.
 * The require function is used to import the library into the current file.
 * The imported library is assigned to the variable supabaseJs for later use.
 */
const supabaseJs = require("@supabase/supabase-js");
// Define the Supabase URL and public key for authentication and connection to the Supabase project.
const supabaseUrl = "https://hofafzkolyngkqeqfrxg.supabase.co";
// The public key is used for client-side authentication and should be kept secure.
const supabasePubKey = "sb_publishable_r0oNUsKsgzqbtca0RBcWTQ_ssgc9cVR";
console.log("2");
// Create a Supabase client instance using the provided URL and public key.
const supabase = supabaseJs.createClient(supabaseUrl, supabasePubKey);
// Create a real-time channel named "messages" to subscribe to events and send messages.
const channel = supabase.channel("messages");
console.log("3");

// Subscribe to the channel and handle subscription status and errors.
channel.subscribe((status, error) => {
    console.log({ status })
    // Check if there was an error during subscription.
    if (error) {
        console.error(error);
        // Exit the process with a non-zero status code to indicate an error occurred.
        process.exit(0);
    }
    // Check if the subscription was successful.
    if (status === "SUBSCRIBED") {
        console.log("subscription succeeded")
        // Send a broadcast message to the channel with a specific event and payload.
        channel.send({
            // The type of message being sent is a broadcast, 
            // meaning it will be sent to all subscribers of the channel.
            type: "broadcast",
            // The event name is "restart", which can be used by subscribers to identify the type of message.
            event: "restart",
            // The payload contains the data being sent with the message.
            payload: { name: "Andrew", message: "Hello?" }
            // payload: {row: 0, col: 0, marker: "X"}
        })
    }
})

// Assignment 1: use the readline module to read a message and send that through the channel
// Assignment 2: Read more than one answer, create an object from the answers and send that object to the Supabase channel