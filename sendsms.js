import twilio from "twilio";
// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure



// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);



const accountSid = "ACf20036f4dce93cb7ea9a7be2ee5ae48d";
const authToken = "d9ee755964a2e6a4f1bd1a7c83deafb3";
const client = new twilio (accountSid,authToken);



let smsbody={
    body:`How you doing ? Is your PR's Completed`,
    to: `+917730078806`
}
async function sendsms(smsbody){
    try {
  
    let message= await client.messages
        .create({
                 body: smsbody.body,
                 from: '+14255637021',
                 to: smsbody.to
                 })
            console.log(message.sid);

    } catch (error) {
        console.error(error)
    }
}

// sendsms(smsbody)


// client.messages
//   .create({
//      body: `How you doing ? Is your PR's Completed`,
//      from: '+14255637021',
//      to: '+919394804040'
//    })
//   .then(message => console.log(message.sid));
