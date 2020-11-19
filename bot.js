const tmi = require('tmi.js');
const prefix = '!';
const fs = require('fs');

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
let loopInterval = setInterval(function () {
  console.log('Discord Shoutout');
  shill();
}, 1200000); // 60000ms = 60s = 1min;

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, user, msg, self) {
  if (self || !msg.startsWith(prefix)) { return; } // Ignore messages from the bot and messages not starting with the prefix
  //console.log(user)
  const args = msg.slice(prefix.length).split(/ +/);
  // let argsClone = { ...args };
  const command = args.shift().toLowerCase();
  //const emoteArray = msg.slice(prefix.lenght).shift(/ +/);
  const emote = msg;

  let deathCount;
  // Remove whitespace from chat message
  //const command = msg.trim().toLowerCase();
  //console.log(args);

  // If the command is known, let's execute it
  switch (command) {
    case 'death':
      if (user['display-name'] == 'Mcloudi' || user['display-name'] == 'zillux' || user['display-name'] == 'Butterwhales' || user['display-name'] == 'gabethunder3') {
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
          fs.writeFile("./deaths.txt", deathCount, function (err) {
            if (err) return console.log(err);
          });
        });
      }
      break;
    case 'deaths':
    case 'deathcount':
      fs.readFile('./deaths.txt', function (err, data) {
        if (err) { throw err } //reads file
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
      if (loopInterval) { // Check if set
        console.log('stop loop');
        client.say(target, 'Loop Ended');
        clearInterval(loopInterval); // delete Timer
        loopInterval = false;
      } else {
        console.log('start loop');
        client.say(target, 'Loop Started');
        loopInterval = setInterval(function () {
          console.log('Discord Shoutout');
          shill();
        }, 1800000); // 60000ms = 60s = 1min
      }
      break;
    case 'size':
    case 'dicksize': // Sizes up Chris'! Magnum Dong (Or not)
      var num = dickRand();
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
          console.log(`* Executed default ${command
            } command num = ${num}`);
          break;
      }
      console.log(`* Executed ${command} command`);
      break;
    case 'mcloud2dab':
    case 'dab': // Dabs the specified amount of times
      let num1 = randomNum(10);
      var dabs = (``);
      var i;
      for (i = 0; i < num1; i++) {
        dabs += 'mcloud2Dab ';
      }
      client.say(target, dabs);
      console.log(`* Executed ${command
        } command`);
      break;
    case 'coggers':
    case 'hackermans':
    case 'mcloud2triggered':
    case 'catjam': case 'clap': case 'pepega': case 'sumsmash': case 'tridance': case 'cloudpet': case 'gachibass': case 'kissahomie5': case 'kkool': case 'modcheck': case 'peped':
    case 'pepejam': case 'pepepls': case 'ppoverheat': case 'ricardoflick':
    case '4head'://FFZ 
    case 'feelsdankman': case 'forsencd': case 'ayaya': case 'handsup': case 'hypers': case 'kkonaw': case 'lulw':
    case 'pausechamp': case 'peepopog': case 'pagchomp': case 'okaychamp': case 'monkaw': case 'pepega': case 'pog': case 'pogu': case 'sadge': case 'weirdchamp': case 'widehard': case 'widehardo': case 'peeposad': case 'peepopogyoupoo':
    case 'widepeepohappy'://:case ':tf:'
    case 'widepeeposad': case 'd:': case 'duckerz': case 'angelthump': case 'ariw': case 'baconeffect': case 'basedgod': case 'brobalt': case 'bttvnice': case 'burself': case 'buttersauce': case 'candianrage': case 'cigrip': case 'concerndoge': case 'cruw': case 'cvhazmat': case 'cvl': case 'cvmask': case 'cvr': case 'datsauce':
    case 'fcreep': case 'feelsamazingman': case 'feelsbadman': case 'feelsbirthdayman': case 'feelsgoodman': case 'feelspumpkinman': case 'firespeed': case 'fishmoley': case 'foreveralone': case 'gaben': case 'hahaa': case 'hailhelix': case 'herbperve': case 'hhhehehe': case 'hhydro': case 'iamsocal': case 'idog': case 'kappacool': case 'karappa': case 'kkona':
    case 'lul': case 'm&mjc': case 'minijulia': case 'monkas': case 'nam': case 'notsquishy': case 'pedobear': case 'poledoge': case 'rarepepe': case 'rebeccablack': case 'ronsmug': case 'rstrike': case 'saltycorn': case 'savagejerky': case 'shoopdawhoop': case 'sosgame': case 'sourpls': case 'sqshy': case 'suchfraud':
    case 'swedswag': case 'taxibro': case 'tehpolecat': case 'topham': case 'twat': case 'vapenation': case 'vislaud': case 'watchusay': case 'wowee': case 'wubtf': case 'yetiz': case 'zappa':
    case '<3':// Regular twitch
      let num2 = randomNum(10);
      var cogs = (``);
      var i;
      for (i = 0; i < num2; i++) {
        cogs += emote + ' ';
      }
      client.say(target, cogs);
      console.log(`* Executed ${command
        } command`);
      break;
    case 'prime'://Automatically sends you to the command below 
    case 'twitchprime':
    case 'tp': // Asks if any Twitch Primers are chillin'
      client.say(target, `Any Primers in the chat?`);
      console.log(`* Executed ${command
        } command`);
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
      /*
      List of all possible commands with the bot (Including those not shown with the !help command )
      dicksize, dab, prime, discord, wap, sub, activate, f, about, 
      */
      client.say(target, `List of current commands: !dicksize, !dab, !prime, !discord, !wap, !coggers, !sub, !about, !onlyfans, !activate, !bttvemotes, !ffzemotes, !magic`);
      console.log(`* Executed ${command
        } command`);
      break;
    case 'discord': // Sends a link to the public stream discord
      client.say(target, `https://discord.gg/mTwYJYV`);
      console.log(`* Executed ${command
        } command`);
      break;
    case 'website':
      client.say(target, `https://www.mcloudi.com`);
      console.log(`* Executed ${command
      } command`);
      break;
    case 'wap': // Grabs a bucket and a mop! What'd you think it'd do?
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
          console.log(`* Executed default ${command
            } command`);
          break;
      }

      console.log(`* Executed ${command
        } command`);
      break;
    case 'subscribe':
    case 'sub': // Generates a link to the subscribe button
      client.say(target, `https://subs.twitch.tv/mcloudi`);
      console.log(`* Executed ${command
        } command`);
      break;
    case 'f': // The bot pays it's respects
      client.say(target, `F`);
      console.log(`* Executed ${command
        } command`);
      break;
    case 'window':
    case 'activate':
    case 'windows': // Reminds Chris he needs to activate windows
      client.say(target, `Activate Windows`);
      console.log(`* Executed ${command
        } command`);
      break
    case 'about': // Gives information about the bot and thanks the creators
      client.say(target, 'Coded by: @gabethunder3 , @NubsiePie , and @Butterwhales. Thanks to @Mcloudi for humoring our B.S.!')
      console.log(`* Exectued ${command
        } command`);
      break;
    case 'bttv':
    case 'bttvemotes': // Lists all currently enabled Better Twitch TV emotes
      client.say(target, 'The current enabled bttv emotes are catJAM , Clap , cloudPet , COGGERS , gachiBASS , HACKERMANS , Kissahomie5 , KKool , modCheck , pepeD , pepeJAM , PepePls , ppOverHeat , ricardoFlick , sumSmash , TriDance .')
      console.log(`* Exectued ${command
        } command`);
      break;
    case 'ffz':
    case 'ffzemotes': // Lists all currently enabled FrankerZ emotes
      client.say(target, 'The current enabled FrankerZ emotes are 4HEad , AYAYA , FeelsDankMan , forsenCD , HandsUp , HYPERS , KKonaW , LULW , monkaW , OkayChamp , PagChomp , PauseChamp , peepoPog , peepoPogYouPoo , peepoSad , Pepega , Pog , PogU , Sadge , WeirdChamp , WideHard , WideHardo , widepeepoHappy , widepeepoSad .')
      console.log(`* Exectued ${command
        } command`);
      break;
    case 'thicc':
    case 'thiccc': // Gives information about the bot and thanks the creators
      client.say(target, 'Damn boy he thicc.');
      console.log(`* Exectued ${command
        } command`);
      break;
    case 'onlyfans':
      switch (randomNum(2)) {
        case 1:
          client.say(target, 'Doesn\'t exist yet but maybe some day. ;) ');
          console.log(`* Exectued ${command
            } command`);
          break;
        case 2:
          client.say(target, 'You wish. LUL');
          console.log(`* Exectued ${command
            } command`);
          break;
      }
      console.log(`* Exectued ${command
        } command`);
      break;
    case 'man': // Gives information about the bot and thanks the creators
      client.say(target, 'FeelsBadMan')
      console.log(`* Exectued ${command
        } command`);
      break;
    case 'magic': // lists all magic spells
      client.say(target, 'List of all magic spells: !lightningbolt, !firebolt, and !icebolt');
      console.log(`* Exectued ${command
        } command`);
      break;
    case 'icebolt':
    case 'firebolt':
    case 'lightningbolt':
      switch (randomNum(2)) {
        case 1:
          client.say(target, "It's super effective!");
          console.log(`* Exectued ${command
            } command`);
          break;
        case 2:
          client.say(target, "It's not very effective!");
          console.log(`* Exectued ${command
            } command`);
          break;
      }
      break;
    case 'server':
      client.say(target, "This server is a private paper spigot server on a minecraft earth map and Mcloudi is playing as the first lady of the USA.");
      console.log(`* Exectued ${command} command`);
      break;
    /*case '!gamble':
      switch(randomNum(6)){
        case 3:
          client.say(target, `mcloudibot struck ${context.username}`)
          client.timeout(target, context.username , 5, 'See you in 5s');
          console.log(`* Exectued ${command
          } command`);
          break;
        case 4:
          client.say(target, `mcloudibot headshot ${context.username}`)
          client.timeout(target, context.username , 30, 'See you in 30s');
          console.log(`* Exectued ${command
          } command`);
          break;
        default:
          client.say(target, `mcloudibot missed ${context.username}`)
          console.log(`* Exectued ${command
          } command`);
          break;
      }*/
    default:
      console.log(`* Unknown command ${command
        }`);
      break;
  }

  if (msg.includes('bigfollows*com') || msg.includes('https://clck.ru/R9gQV')) {
    //client.say(target, `mcloudibot headshot ${context.username}`)
    client.ban(target, user.username, 'Viewbot promotion  ');
    console.log(`* Removed viewbot promotion`);
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

function shill() {
  switch (randomNum(1)) {
    case 1:
      client.say(opts.channels[0], 'Here you can find Mcloudi\'s discord https://discord.gg/mTwYJYV');
      break;
    //case 2:
    //client.say(opts.channels[0], 'Don\'t forget about twitch prime. https://subs.twitch.tv/mcloudi ');
    //break;
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
  //client.say(opts.channels[0], `McloudiBot is here`);
}

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
