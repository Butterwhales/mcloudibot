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
function onMessageHandler(target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim().toLowerCase();

  // If the command is known, let's execute it
  switch (commandName) {
    case '!dicksize': // Sizes up Chris'! Magnum Dong (Or not)
      let num = dickRand();
      client.say(target, `Mcloudi has a ${num}in cock`);
      console.log(`* Executed ${commandName} command`);
      break;
    case '!dab': // Dabs the specified amount of times
      let num1 = randomNum(10);
      var dabs = (``);
      var i;
      for (i = 0; i < num1; i++) {
        dabs += 'mcloud2Dab ';
      }
      client.say(target, dabs);
      console.log(`* Executed ${commandName} command`);
      break;
    case '!prime'://Automatically sends you to the command below 
    case '!twitchprime'://Automatically sends you to the command below 
    case '!tp': // Asks if any Twitch Primers are chillin'
      client.say(target, `Any Primers in the chat?`);
      console.log(`* Executed ${commandName} command`);
      break;
    case '!help'://Automatically sends you to the !commands output
    case '!commands': // Informs the issuer of *most* possible commands with the bot
      /*
      List of all possible commands with the bot
      dicksize, dab, prime, discord, wap, sub, activate, f, about, 
      */
      client.say(target, `List of current commands: !dicksize, !dab, !prime, !discord, !wap, !sub, !about`);
      console.log(`* Executed ${commandName} command`);
      break;
    case '!discord': // Sends a link to the public stream discord
      client.say(target, `https://discord.gg/mTwYJYV`);
      console.log(`* Executed ${commandName} command`);
      break;
    case '!wap': // Grabs a bucket and a mop! What'd you think it'd do?
      switch (randomNum(6)) {
        case 1:
          client.say(target, `Get a bucket and a mop!`);
          break;
        case 2:
          client.say(target, `Put on your life jacket because we're going swimming!`);
          break;
        case 3:
          client.say(target, `Warning: slippery when wet!`);
          break;
        case 4:
          client.say(target, `Don't forget your snorkel!`);
          break;
        case 5:
          client.say(target, `This pool is always open!`);
          break;
        case 6:
          client.say(target, `moist`);
          break;
        default:
          console.log(`* Executed default ${commandName} command`);
          break;
      }

      console.log(`* Executed ${commandName} command`);
      break;
    case '!subscribe'://Automatically sends you to the !sub output
    case '!sub': // Generates a link to the subscribe button
      client.say(target, `https://subs.twitch.tv/mcloudi`);
      console.log(`* Executed ${commandName} command`);
      break;
    case '!f': // The bot pays it's repsects
      client.say(target, `f`);
      console.log(`* Executed ${commandName} command`);
      break;
    case '!window':  //Automatically sends you to the !windows output
    case '!activate': //Automatically sends you to the !windows output
    case '!windows': // Reminds Chris he needs to activate windows
      client.say(target, `Activate Windows`);
      console.log(`* Executed ${commandName} command`);
      break
    case '!about': // Gives information about the bot and thanks the creators
      client.say(target, 'Coded by: @gabethunder3 , @NubsiePie , and @Butterwhales. Thanks to @Mcloudi for humoring our B.S.!')
      console.log('* Exectued ${commandName} command');
    default:
      console.log(`* Unknown command ${commandName}`);
      break;
  }
}

function dickRand() {
  const max = 40;
  const min = 1;

  return Math.floor(Math.abs(Math.random() - Math.random()) * (1 + max - min) + min);
}

function randomNum(outOf) {

  return Math.floor(Math.random() * outOf) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
  //client.say(target, `McloudiBot is here`);
}