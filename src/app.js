import tmi from 'tmi.js'
import {CHANNEL_NAME, BLOCKED_WORDS, OATH_TOKEN, BOT_USERNAME} from './constants'

// console.log(CHANNEL_NAME)
const options = {
    options: {
        debug: true,
    },
    connection: {
        cluster: 'aws',
        reconnect: true
    },
    identity: {
        username: BOT_USERNAME,
        //consider limiting scope
        password: OATH_TOKEN
    },
    channels: [CHANNEL_NAME]
};

//CHANNEL_NAME.replace(/[^\w\s]/gi, '')


const client = tmi.client(options);


//// CONNECTION
client.connect()

client.on('connected', (address, port) => {
    client.color('HotPink'); //europabot is pink
    client.action('jupiterliketheplanet', 'Europa has arrived')
    //chat bot adds me as mod
    client.mod("europachatbot", "jupiterliketheplanet")
    .then((data) => {
        console.log(data)
    }).catch((err) => {
        //
        console.log(err)
    });
})



//onDisconnection
client.on("disconnected", (reason) => {
    client.action('jupiterliketheplanet', 'has disconnected')
    console.log(`Disconnected: ${reason}`)
});


/// 
client.on('chat', (channel, user, message, self) => {
    if(message === '!sup'){
        client.action('jupiterliketheplanet', 'not much')
    }
    console.log('self :' + self)
    console.log('user: ' + (user.username === 'jupiterliketheplanet'))
    console.log('message: ' + (message === '!clearChat'))
    console.log('channel : ' + channel)
    //use some or includes to check channels list, maybe check if its the channel we're connecting to
    if((self || user.username === 'jupiterliketheplanet') && message === '!clearChat'){
        client.clear(channel)
        .then((data) => {
            console.log(data)
        }).catch((err) => {
            console.log(err)
        });
    }
})

//// MODERATION: Delete a message

client.on('message', (channel, userstate, message, self) =>{
    if(self) return;

    if(userstate.username === BOT_USERNAME) return;

    if(message.toLocaleLowerCase() === '!hello'){
        client.say(channel, `@${userstate.username}, wassup nerd`);
    }
    checkTwitchChat(userstate, message, channel)
});

function checkTwitchChat(userstate, message, channel){
    message = message.toLowerCase();
    let shouldSendMessage = false;
    shouldSendMessage = BLOCKED_WORDS.some(blockedWord => message.includes(blockedWord.toLowerCase()))

    if(shouldSendMessage){
        client.say(channel, `@${userstate.username} , sorry! Your message was deleted`)
        client.deletemessage(channel, userstate.id)
    }

}


//user joins a channel
client.on("join", (channel, username, self) => {
    // use some or includes for multiple channel names
    
    if(username === self) return;
    if(username === BOT_USERNAME) return;
    if(username === "jupiterliketheplanet") return;

    client.say(channel, `@${username}, welcome to the channel, ya nerd`)
});

/// functions && event 

  



