const tmi = require('tmi.js');
const prefix = '!';
const fs = require('fs');
require('dotenv').config();

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

// Setting up loop
var loopInterval = setInterval(function () {
  console.log('Discord Shoutout');
  shill();
}, 1200000); // 60000ms = 60s = 1min; Curently Set to 20 min.
//TODO Maybe increase to 1 hour? (3600000ms) Probably a better idea ↓
//TODO Also add ability to count messages so that it isn't a wall of bot spam

var timeout;
var timeoutStatus;
var pickMsgs = [];

// Connect to Twitch:
console.log(`Bot Username: ${process.env.BOT_USERNAME} Channel Name: ${process.env.CHANNEL_NAME}`)
// Does things after joining twitch
client.connect().then(async () => { await client.say(opts.channels[0], `I am a bot`) });

//-------------------------------------------------------------------------------------
//                                   GLOBAL VARS
//-------------------------------------------------------------------------------------
const botMods = ['Mcloudi', 'zillux', 'Butterwhales', 'gabethunder3', 'ArtisticCM']
var deathCount;
var logToggle = false;

//-------------------------------------------------------------------------------------
//                                      MAIN
//-------------------------------------------------------------------------------------
function onMessageHandler(target, user, msg, self) {
  if (timeoutStatus == true) {
    if (msg.includes('right') || msg.includes('mid') || msg.includes('left')){
      pickMsgs.push([user['display-name'], msg.toLowerCase()]);
    }
  }
  if (self || !msg.startsWith(prefix)) { return; } // Ignore messages from the bot and messages not starting with the prefix
  const args = msg.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  const emote = msg.slice(prefix.length);

  switch (command) {
    case 'setdeath':
      deathCountingCommand(args, target, user, botMods);
      break;
    case 'deaths':
    case 'deathcount':
      fs.readFile('./deaths.txt', function (err, data) {
        if (err) { throw err } 
        if (data.length != 0) deathCount = data;
        client.say(target, `Mcloudi has died ${deathCount} times`);
        fs.writeFile("./deaths.txt", deathCount, function (err) {
          if (err) return console.log(err);
        });
      });
      break;
    case 'ping':
      var a = Math.floor(Math.random() * 10) + 1;
      var b = Math.floor(Math.random() * 10) + 1;
      var op = ["*", "+", "/", "-"][Math.floor(Math.random() * 4)];
      client.say(target, `How much is ${a} ${op} ${b} ? ${user.username}`);
      break;
    case 'loop':
      if (botMods.includes(user['display-name'])) {
        if (loopInterval) { // Check if set
          console.log('* Stopped loop');
          client.say(target, 'Loop Ended');
          clearInterval(loopInterval); // delete Timer
          loopInterval = false;
        } else {
          console.log('* Started loop');
          client.say(target, 'Loop Started');
          loopInterval = setInterval(function () {
            console.log('Discord Shoutout');
            shill();
          }, 1800000); // 60000ms = 60s = 1min
        }
      }
      break;
    case 'size':
    case 'dicksize': // Sizes up Chris'! Magnum Dong (Or not)
      sizeCommand(target);
      break;
    case 'prime'://Automatically sends you to the command below 
    case 'twitchprime':
    case 'tp': // Asks if any Twitch Primers are chillin'
      client.say(target, `Any Primers in the chat?`);
      break;
    case 'twitter':
      client.say(target, `Here is mcloudi's twitter: https://twitter.com/McloudI_?s=20 `);
      break;
    case 'streamraider':
    case 'streamraiders':
      client.say(target, `Join us in battle! https://www.streamraiders.com/t/mcloudi `);
      break;
    case 'help'://Automatically sends you to the !commands output
    case 'commands': // Informs the issuer of *most* possible commands with the bot
      client.say(target, `List of current commands: !dicksize, !dab, !prime, !discord, !wap, !coggers, !sub, !about, !onlyfans, !activate, !bttvemotes, !ffzemotes, !magic`);
      break;
    case 'discord': // Sends a link to the public stream discord
      client.say(target, `https://discord.gg/mTwYJYV`);
      break;
    case 'website':
      client.say(target, `https://www.mcloudi.com`);
      break;
    case 'wap': // Grabs a bucket and a mop! What'd you think it'd do?
      wapCommand(target);
      break;
    case 'subscribe':
    case 'sub': // Generates a link to the subscribe button
      client.say(target, `https://subs.twitch.tv/mcloudi`);
      break;
    case 'window':
    case 'activate':
    case 'windows': // Reminds Chris he needs to activate windows
      client.say(target, `Activate Windows`);
      break
    case 'about': // Gives information about the bot and thanks the creators
      client.say(target, 'Coded by: @gabethunder3 , @NubsiePie , and @Butterwhales. Thanks to @Mcloudi for humoring our B.S.!')
      break;
      //TODO EDIT COMMAND
    case 'bttv':
    case 'bttvemotes': // Lists all currently enabled Better Twitch TV emotes
      client.say(target, 'The current enabled bttv emotes are catJAM , Clap , cloudPet , COGGERS , gachiBASS , HACKERMANS , KKool , modCheck , pepeD , pepeJAM , PepePls , ppOverHeat , ricardoFlick , sumSmash , TriDance .')
      break;
      //TODO EDIT COMMAND
    case 'ffz':
    case 'ffzemotes': // Lists all currently enabled FrankerZ emotes
      client.say(target, 'The current enabled FrankerZ emotes are 4HEad , AYAYA , FeelsDankMan , forsenCD , HandsUp , HYPERS , KKonaW , LULW , monkaW , OkayChamp , PagChomp , PauseChamp , peepoPog , peepoPogYouPoo , peepoSad , Pepega , Pog , PogU , Sadge , WeirdChamp , WideHard , WideHardo , widepeepoHappy , widepeepoSad .')
      break;

    case 'onlyfans':
      switch (randomNum(2)) {
        case 1:
          client.say(target, 'Doesn\'t exist yet but maybe some day. ;) ');
          break;
        case 2:
          client.say(target, 'You wish. LUL');
          break;
      }
      break;
      //TODO ADD  TOGGLE
    case 'server':
      client.say(target, "This server is a private paper spigot server on a minecraft earth map and Mcloudi is playing as the first lady of the USA.");
      break;
    case 'addimage':
      if (user.badges.broadcaster == 1) {// Add moderator too
        //Add image
        //image url args[1]
        client.say(target, "Added Image");
      }
      break;
    case 'ironmon':
      client.say(target, "The game is Fire Red with Kaizo IronMon Ruleset. http://ironmon.gg/\n");
      break;
    case 'pick':
      client.say(opts.channels[0], 'Pick Period Started');
      if (args[0] > 0){
        timeout = setTimeout(() => {
          pickFunction(args[0])
        },30000);
      } else {
        timeout = setTimeout(() => {
          pickFunction(2)
        },15000);
      }
      timeoutStatus = true;
      break;
    case 'roll':
      console.log(`Arg 0: ${args[0]} Arg 1: ${args[1]}`)
      if (args[1] > args[0]) {
        client.say(target, 'The second number must be higher!')
        break;
      }
      let roll = Math.floor(Math.random() * (parseInt(args[1],10) - parseInt(args[0],10) + 1)) + parseInt(args[0],10)
      client.say(target, `You rolled a ${roll}!`)
      break;
    // case 'gamble':
    //   switch(randomNum(6)){
    //     case 3:
    //       client.say(target, `mcloudibot struck ${user['display-name']}`)
    //       console.log(client.timeout(target, user['display-name'], 5, 'See you in 5s').catch());
    //       console.log(`* Exectued ${command} command`);
    //       break;
    //     case 4:
    //       client.say(target, `mcloudibot headshot ${user['display-name']}`)
    //       console.log(client.timeout(target, user['display-name'], 30, 'See you in 30s').catch(console.log()));
    //       console.log(`* Exectued ${command} command`);
    //       break;
    //     default:
    //       client.say(target, `mcloudibot missed ${user['display-name']}`)
    //       break;
    //   }
    //   break;
    default:
      logToggle = true;
      console.log(`* Unknown command ${command}`);
      break;
  }
  if (logToggle == false){
    console.log(`* Exectued ${command} command`);
  }
  logToggle = false;

  if (msg.includes('bigfollows*com') || msg.includes('https://clck.ru/R9gQV')) {
    //client.say(target, `mcloudibot headshot ${context.username}`)
    client.ban(target, user.username, 'Viewbot promotion  ');
    console.log(`* Removed viewbot promotion`);
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
  //client.say(opts.channels[0], `McloudiBot is here`);
}

//-------------------------------------------------------------------------------------
//                                 SUB TRIGGERS
//-------------------------------------------------------------------------------------

client.on("subscription", function (channel, username, method, message, userstate) {
  client.say(channel, `Thank you for subbing ${username} mcloud2Dab`);
});

client.on("resub", function (channel, username, months, message, userstate, methods) {
  if (months == 0) {
    client.say(channel, `Thank you for subbing ${username} again! mcloud2Dab`);
  } else {
    client.say(channel, `${username} Has subscribed for ${months} months. mcloud2Dab`);
  }
});

client.on("subgift", function (channel, username, streakMonths, recipient, methods, userstate) {
  client.say(channel, `Thank you ${username} for gifting to ${recipient} mcloud2Dab`);
});

client.on("submysterygift", function (channel, username, numbOfSubs, methods, userstate) {
  client.say(channel, `Thank you ${username} for gifting ${numbOfSubs} subs mcloud2Dab`);
});

//-------------------------------------------------------------------------------------
//                                   FUNCTIONS
//-------------------------------------------------------------------------------------
function randSize() {
  const max = 40;
  const min = 1;
  return Math.floor(Math.abs(Math.random() - Math.random()) * (1 + max - min) + min);
}

function randomNum(outOf) {
  return Math.floor(Math.random() * outOf) + 1;
}

function shill() {
  const cases = 1
  switch (randomNum(cases)) {
    case 1:
      client.say(opts.channels[0], 'Here you can find Mcloudi\'s discord https://discord.gg/mTwYJYV');
      break;
    //case 2:
    //client.say(opts.channels[0], 'Don\'t forget about twitch prime. https://subs.twitch.tv/mcloudi ');
    //break;
  }
}

function deathCountingCommand(args, target, user, botMods){
  if (botMods.includes(user['display-name'])) {
    fs.readFile('./deaths.txt', function (err, data) {
      if (err) { throw err } //reads file
      if (data.length != 0) deathCount = parseInt(data);
      if (isNaN(data)) deathCount = 0;
      switch (args[0]) {
        case '+':
          deathCount += parseInt(args[1]);
          client.say(target, `Added ${args[1]} to the death count`);
          break;
        case '-':
          deathCount -= parseInt(args[1]);
          client.say(target, `Subtracted ${args[1]} from the death count`);
          break;
        case 'set':
          deathCount = parseInt(args[1]);
          client.say(target, `Set the death count to ${args[1]}`);
          break;
        default:
          deathCount += parseInt(1);
          client.say(target, `Added 1 to the death count`);
          break
      }
      fs.writeFile("./deaths.txt", deathCount.toString(), function (err) {
        if (err) return console.log(err);
      });
    });
  }
}

function sizeCommand(target){
  let num = randSize();
  switch (true) {
    case num <= 1:
      client.say(target, `Mcloudi has a microscopic ${num} inch weiner`);
      break;
    case num <= 2:
      client.say(target, `Mcloudi has a tiny ${num} inch weiner`);
      break;
    case num <= 4:
      client.say(target, `Mcloudi has a small ${num} inch weiner`);
      break;
    case num <= 6:
      client.say(target, `Mcloudi has an average ${num} inch dick`);
      break;
    case num <= 8:
      client.say(target, `Mcloudi has a sizeable ${num} inch dick`);
      break;
    case num <= 10:
      client.say(target, `Mcloudi has a hefty ${num} inch cock`);
      break;
    case num <= 15:
      client.say(target, `Mcloudi has a giant ${num} inch cock`);
      break;
    case num <= 20:
      client.say(target, `Mcloudi has a huge ${num} inch cock`);
      break;
    case num <= 30:
      client.say(target, `Mcloudi has an enormous ${num} inch cock`);
      break;
    case num <= 38:
      client.say(target, `Mcloudi has a massive ${num} inch dong`);
      break;
    case num = 39:
      client.say(target, `Mcloudi has a colossal ${num} inch schlong`);
      break;
    case num = 40:
      client.say(target, `Mcloudi is packing a monstrous ${num} inch Schlong`);
      break;
    default:
      console.log(`* Executed default ${command} command. num = ${num} (Should be impossible)`);
      break;
  }
}

function wapCommand(target){
  let num = randomNum(6);
  switch (num) {
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
      console.log(`* Executed default ${command} command. num = ${num}(Should be impossible)`);
      break;
  }
}

function pickFunction(num){
  timeoutStatus = false;
  let pickUser = true;
  client.say(opts.channels[0], 'Pick Period Ended');
  let randNum = randomNum(num);
  let i = randNum;
  while (pickUser){
    if (randNum > pickMsgs.length) i = 0;
    if (pickMsgs.length == 0){
      client.say(opts.channels[0], `Nobody picked anything. I pick mid!`);
      break;
    }
    let userData = pickMsgs[i];
    if (userData[1].includes('right')){
      client.say(opts.channels[0], `${userData[0]}'s pick was right!`);
      console.log('   Right was picked')
      pickUser = false;
    }else if (userData[1].includes('mid')){
      client.say(opts.channels[0], `${userData[0]}'s pick was mid!`);
      console.log('   Mid was picked')
      pickUser = false;
    }else if (userData[1].includes('left')){
      client.say(opts.channels[0], `${userData[0]}'s pick was left!`);
      console.log('   Left was picked')
      pickUser = false;
    }
    i++;
  }
  pickMsgs = [];
}