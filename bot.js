const tmi = require('tmi.js');
const prefix = '!';

// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [
    process.env.CHANNEL_NAME
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim().toLowerCase();

  // If the command is known, let's execute it
  switch (commandName) {
    case '!dicksize':
      let num = rollDice();
      client.say(target, `Mcloudi has a ${num}in cock`);
      console.log(`* Executed ${commandName} command`);
      break;
    case '!dab':
      num = randomNum();
      var dabs = (``);
      var i;
      for (i = 0; i < num; i++) {
      dabs += 'mcloud2Dab ';
      }
      client.say(target, dabs);
      console.log(`* Executed ${commandName} command`);
      break;
    case '!prime'://Automatically sends you to the command below 
    case '!twitchprime'://Automatically sends you to the command below 
    case '!tp':
      client.say(target, `Any Primers in the chat?`);
      console.log(`* Executed ${commandName} command`);
      break;
    case '!help'://Automatically sends you to the !commands output
    case '!commands':
      /*
      List of all possible commands with the bot
      dicksize, dab, prime, discord, wap, sub, activate, f, about, 
      */
      client.say(target, `List of current commands: !dicksize, !dab, !prime, !discord, !wap, !sub, !about`);
      console.log(`* Executed ${commandName} command`);
      break;
    case '!discord':
      client.say(target, `https://discord.gg/mTwYJYV`);
      console.log(`* Executed ${commandName} command`);
      break;
    case '!wap':
      client.say(target, `Get a bucket and a mop`);
      console.log(`* Executed ${commandName} command`);
      break;
    case '!subscribe'://Automatically sends you to the !sub output
    case '!sub':
      client.say(target, `https://subs.twitch.tv/mcloudi`);
      console.log(`* Executed ${commandName} command`);
      break;
    case '!f':
      client.say(target, `f`);
      console.log(`* Executed ${commandName} command`);
      break;
    case '!window':  
    case '!activate':  
    case '!windows':
      client.say(target, `Activate Windows`);
      console.log(`* Executed ${commandName} command`);
      break
    case '!about':
      client.say(target, 'Coded by: @gabethunder3 , @NubsiePie , and @Butterwhales. Thanks to @Mcloudi for making this happen!')
      console.log('* Exectued $(commandName)')
    default:
      console.log(`* Unknown command ${commandName}`);
      break;
  }
}

function rollDice () {
  const max = 40;
  const min = 1;
  
  return Math.floor(Math.abs(Math.random() - Math.random()) * (1 + max - min) + min);
}

function randomNum (){
  const outOf = 10;
  return Math.floor(Math.random() * outOf) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
  //client.say(target, `McloudiBot is here`);
}
