const tmi = require('tmi.js');

const options = {
    options: {
        debug: true,
    },
    connection: {
        cluster: 'aws',
        reconnect: true
    },
    identity: {
        username: 'europa',
        password: 'oauth:843kme70s8enap67lto2jktnlpbqoa'
    },
    channels: ['jupiterliketheplanet']
};

const BLOCKED_WORDS = ['barstool', 'hamster', 'sports'];


const client = tmi.client(options);

client.connect();

client.on('connected', (address, port) => {
    client.action('jupiterliketheplanet', 'Europa has arrived')
} )


client.on('chat', (channel, user, message, self) => {
    if(message === '!sup'){
        client.action('jupiterliketheplanet', 'not much')
    }

    // if(self){
    //     // return
    //     console.log("you're saying this dummy")
    // }  
    // if(userstate.username === 'europa'){
    //     // return 
    //     console.log("Europa go home, you're drunk")
    // }
    // if(message === '!hello'){
    //     console.log('user said something')
    //     client.say(channel, `@{userstate.username}, wassup nerd`);
    // }
    // checkTwitchChat(userstate, message, channel)
})

client.on('message', (channel, userstate, message, self) =>{
    if(self){
        // return
        console.log("you're saying this dummy")
    }  
    if(userstate.username === 'europa'){
        // return 
        console.log("Europa go home, you're drunk")
    }
    if(message.toLocaleLowerCase() === '!hello'){
        console.log('user said something')
        client.say(channel, `@${userstate.username}, wassup nerd`);
    }
    checkTwitchChat(userstate, message, channel)
});

function checkTwitchChat(userstate, message, channel){
    message = message.toLowerCase();
    let shouldSendMessage = false;
    console.log('user said something')
    shouldSendMessage = BLOCKED_WORDS.some(blockedWord => message.includes(blockedWord.toLowerCase()))

    if(shouldSendMessage){
        console.log('it is true')
        client.say(channel, `@${userstate.username} , sorry! Your message was deleted`)
        client.deletemessage(channel, userstate.id)
    }

}