// Import the Supabase JavaScript client library.
const supabaseJs = require("@supabase/supabase-js");

// Define the Supabase URL for your project. 
const supabaseUrl = "https://hofafzkolyngkqeqfrxg.supabase.co";

// Define the Supabase public key for authentication.
const supabasePubKey = "sb_publishable_r0oNUsKsgzqbtca0RBcWTQ_ssgc9cVR";

// Create a Supabase client instance using the provided URL and public key.
const supabase = supabaseJs.createClient(supabaseUrl, supabasePubKey);

// Create a real-time channel named "messages" to subscribe to events and send messages.
const messagesChannel = supabase.channel("messages");
/*
{
    "event": "message",
    "message": "Hello World"
}
*/
function printPayload(payload) {
    const textMessage = JSON.stringify(payload);
    console.log("Received: ", textMessage.toLocaleUpperCase());
}

/*
const person = {
    name: "Andrew",
    age: 33,
    address: {
        city: "Mysore"
    }
}
payload ={
        "EVENT": "UPPERCASE",
        "PAYLOAD":{
            "MESSAGE":"HELLO WORLD"
        },
        "TYPE":"BROADCAST"
    }
*/
function printUpperCase(payload){
    const textTouppercase = payload.payload.message;

    console.log("Received: ", textTouppercase.toLocaleUpperCase());
}
function printLowerCase(payload){
    const textToLowercase = payload.payload.message;

    console.log("Received: ", textToLowercase.toLocaleLowerCase());
}



// Every time we receive a message on the messagesChannel, printPayload will be invoked
// messagesChannel.on("broadcast", { event: "Test Message" }, printPayload)
// messagesChannel.on("broadcast", { event: "join" }, printPayload)
messagesChannel.on("broadcast", {event:"uppercase"}, printUpperCase);
messagesChannel.on("broadcast", {event:"lowercase"}, printLowerCase);

// Assignment:
// Listen "uppercase" event (Message Name = event name)
// Take payload.payload.message and print in it in uppercase

// Send Message Name: uppercase and { "message": "Hello"} from Supabase dashboard
// In the terminal, it should show HELLO

//Info: console.log(anyVariable.toUpperCase()); 

// Establish connection with supabase
messagesChannel.subscribe((status, error) => {
    if (error) {
        console.log(error);
        process.exit(0);
    }
    if (status === "SUBSCRIBED") {
        console.log("Listening on channel 'messages'... 👂");
    }
})