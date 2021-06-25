//Hello


const chatIDs = require('./channels.json');
const Discord = require('discord.js');
const {
	prefix,
	token,
	user,
	password,
	host,
	database
} = require('./config.json');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });;
const Canvas = require('canvas');
var userLevelTexts = [
	"Fruit", "FRUIT SALAD 🥗", "FRESH FRUIT SALAD 🥗", "HONEY FRUIT SALAD 🥗", "TROPICAL FRUIT SALAD 🥗", "PUDDING FRUIT SALAD 🥗", "MARSHMALLOW FRUIT SALAD 🥗", "RAINBOW FRUIT SALAD 🥗", "OVERNIGHT FRUIT SALAD 🥗"
]
const {
	MessageEmbed
} = require('discord.js');
const asyncFunctions = require('./asyncFunctions.js');
fs = require('fs');
var mysql = require('mysql');

var con = mysql.createConnection({
	host: host,
	user: user,
	password: password,
	database: database
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});


function decimalCount (number) {
	// Convert to String
	const numberAsString = number.toString();
	// String Contains Decimal
	if (numberAsString.includes('.')) {
	  return numberAsString.split('.')[1].length;
	}
	// String Does Not Contain Decimal
	return 0;
  }
function getRandomArbitrary(min, max) {
return Math.random() * (max - min) + min;
}
function isNumeric(str) {
	if (typeof str != "string") return false // we only process strings!  
	return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
		!isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}
function originalusername(name, account){
	var result = name;
	for (var key in account) {
		if (account[key][0]){
		if (account[key][0].Name == name){
			result = name + getRandomArbitrary(111, 999).toFixed(0);
			for (var key1 in account) {
				console.log(account[key1] + " " + key1);
				if (account[key1][0]){
					if (account[key1][0].Name == result){
						return originalusername(name, account);
					}
				}
			}
			return result;
		}
		}
	}
	return result;
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	//CONSTANTS
	if ( message.author.bot ) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	const fullComm = message.content.trim().split(/ +/);
	const ID = message.author.id;
	delete require.cache[require.resolve('./saladaccounts.json')]
	const account = require('./saladaccounts.json');
	let userLevel = 0;
	//AUTOREGISTER
	if (!account[ID]) {
		account[ID] = [];
		const assignedName = originalusername(message.author.username, account);
			account[ID].push({
				Money: 0,
				Name: assignedName,
				Fruits: []
			});
			fs.writeFileSync('./saladaccounts.json', JSON.stringify(account));
			console.log(message.author.username + ' has been registered as ' + assignedName);
			client.channels.cache.get(chatIDs['log']).send(message.author.username + ' has been registered as ' + assignedName);
	} 
	//USERLEVEL GENERATION
	if (message.member){
		if (message.member.roles.cache.some(role => role.id == 848577599214321714)){
			userLevel = 8;
		}	
		else if (message.member.roles.cache.some(role => role.id == 848577456508370955)){
			userLevel = 7;
		}
		else if (message.member.roles.cache.some(role => role.id == 848577246511366194)){
			userLevel = 6;
		}
		else if (message.member.roles.cache.some(role => role.id == 848577028353556511)){
			userLevel = 5;
		}
		else if (message.member.roles.cache.some(role => role.id == 848576905187033098)){
			userLevel = 4;
		}
		else if (message.member.roles.cache.some(role => role.id == 848576758780657674)){
			userLevel = 3;
		}
		else if (message.member.roles.cache.some(role => role.id == 848576648068202597)){
			userLevel = 2;
		}
		else if (message.member.roles.cache.some(role => role.id == 848576547945447434)){
			userLevel = 1;
		}
	}
	
	
	
	// NORMAL MESSAGES, NO PREFIX, NO SPAM AND NOT MAIN ROOM
	

	if(command == "help" && (message.channel.id == chatIDs["salad-bot"] || message.channel.id == chatIDs["bot-set-ups"])){
		const embed = new MessageEmbed()
		// Set the title of the field
		.setTitle("Salad Bot Commands")
		// Set the color of the embed
		.setColor(0xF89117)
		// Set the main content of the embed
		.setDescription("\n ***~coupon***: See your FRUITSALADS coupon! \n ***~menu***: See the bot menu\n ***~register***: Change your coupon name")

		.setFooter("FRUITSALADS", message.guild.iconURL());
	// Send the embed to the same channel as the message
	message.channel.send(embed);
	}
	else if (command === 'menu' && (message.channel.id == chatIDs["salad-bot"] || message.channel.id == chatIDs["bot-set-ups"])){
		asyncFunctions.menu(MessageEmbed, Discord, args, account, ID, message, userLevel);  
	}
	else if (command === 'repeat' && message.member.roles.cache.some(role => role.id == 847355865052741652)) {
		if (!args.length) {
			return message.channel.send('What do I even have to repeat, you idiot!');
		} else {
			message.channel.send(args.join(' '));
		}
	}
	else if (command === 'info' && message.channel.id == chatIDs["bot-set-ups"]) {
			
		var taggedUser = message.author;
		if (message.mentions.users.size) {
			taggedUser = message.mentions.users.first();
		}
			
		
		
		if (account[taggedUser.id]) {
			var fruitlist = require('./fruits.json');
			var str = '\n**Name**: ' + account[taggedUser.id][0].Name + '\n**Salad Bits**: ' + account[taggedUser.id][0].Money + "\n**fruit**: ";
			if (account[taggedUser.id][0].Fruits && account[taggedUser.id][0].Fruits.length > 0){
				for (var i = 0; i < account[taggedUser.id][0].Fruits.length; i++){
					if (i != 0){
						str += ", ";
					}
					str += account[taggedUser.id][0].Fruits[i];
					console.log(account[taggedUser.id][0].Fruits[i]);
					str += ":"+fruitlist[account[taggedUser.id][0].Fruits[i]][0].Emote+":";
				}
			}else{
				str += "no fruit :(";
			}
			
			const embed = new MessageEmbed()
				// Set the title of the field
				.setTitle('Salad Coupon')
				// Set the color of the embed
				.setColor(0xff0000)
				.setThumbnail(taggedUser.avatarURL())
				// Set the main content of the embed
				.setDescription(str)
				.setFooter("FRUITSALADS", message.guild.iconURL());
			// Send the embed to the same channel as the message
			message.channel.send(embed);
		} else {
			message.reply("User doesnt exist or is not registered!");
		}

		fs.writeFileSync('./saladaccounts.json', JSON.stringify(account));
	}
	else if (command === 'register') {
		if (message.channel.id == chatIDs["salad-bot"] || message.channel.id == chatIDs["bot-set-ups"]){
		if (account[ID]) {
			if (args[0]){
				const assignedName = originalusername(args[0], account);
				account[ID][0].Name = assignedName;
				message.reply("You renamed your card to: " + account[ID][0].Name);
				fs.writeFileSync('./saladaccounts.json', JSON.stringify(account));
			} else {
				console.log(account);
				message.reply("You already have an account!");
			}
			
		} else {
			if (args[0]) {
				const assignedName = originalusername(args[0], account);
				account[ID] = [];
				account[ID].push({
					Money: 0,
					Name: assignedName,
					Fruits: []
				});
				fs.writeFileSync('./saladaccounts.json', JSON.stringify(account));
				message.reply(message.author.username + ' has been registered as ' + assignedName);
				client.channels.cache.get(chatIDs['log']).send(message.author.username + ' has been registered as ' + assignedName);
			} else {
				message.reply("Please use '~register [Your Salad Name]'");
			}
		}
		fs.writeFileSync('./saladaccounts.json', JSON.stringify(account));
	}
	}
	else if (command === 'ping') {
		if (message.member.roles.cache.some(role => role.id == 847355865052741652)){
		message.channel.send('Pong.');
		}
	}
	//PREFIXLESS MESSAGES
	else if (!message.content.startsWith(prefix) && message.channel.id != chatIDs["spam"]){
		console.log("Clause 3");
		if (message.channel.id == chatIDs["puffys-dictionary"]){
			var query = fullComm.join(' ');
			console.log("Query is " + query + " because " + fullComm);
			const sql = "SELECT * FROM Posts WHERE postName LIKE '" + query + "' AND NOT postName='ignore' AND postChannel='puffy'";
			con.query(sql, function(err, result) {
				if (err) throw err;
				if (result[0]) {
					const embed = new MessageEmbed()
						// Set the title of the field
						.setTitle(result[0]['postName'])
						// Set the color of the embed
						.setColor(0xF3C6C1)
						.setURL('https://madi-wka.club/word/' + result[0]['slugID'])
						// Set the main content of the embed
						.setDescription(result[0]['postdesc'].replace(/(<([^>]+)>)/gi, ""))
						.addFields({
							name: 'Detailed definition:',
							value: result[0]['postContent'].replace(/(<([^>]+)>)/gi, "")
						}, )
						.setFooter('Puffys Dictionary', 'https://madi-wka.club/img/puffy1.webp');
					// Send the embed to the same channel as the message
					message.channel.send(embed);
				}
			});
		}
		console.log(args +  " " + command);
			
		
		if (command == "ui"){
			console.log("Yes");
			if (args[0]){
				if (args[0] == "purge"){
					console.log("Yessss");
					setTimeout(function(){ 
						message.channel.send(":eyes: :eyes::eyes::eyes::eyes::eyes::eyes::eyes::eyes::eyes::eyes::eyes:"); 
					}, 2000);
				}
			}
		}
		const wordCount = args.length + 1;
		//ASSIGN POINTS
		if (account[message.author.id]){
			account[message.author.id][0].Money = +account[message.author.id][0].Money + wordCount * 0.1; 
			account[message.author.id][0].Money = +account[message.author.id][0].Money.toFixed(2);
			fs.writeFileSync('./saladaccounts.json', JSON.stringify(account));
		}
		//DELETE ALL MESSAGES IN CHAT
		if (message.channel.id == 856881279048220713 || message.channel.id == chatIDs["welcome"]){
			message.delete({
				timeout: 1
			});
		}
		
	}
	// WORKS IN ALL CHATS
	else if (command === 'bit') {
		console.log(chatIDs["gen-channels"] + " " + message.channel.id)
		if (chatIDs["gen-channels"].includes(message.channel.id) || message.channel.id == chatIDs["bot-set-ups"]){
		if (!message.mentions.users.size) {
			return message.reply('giving bits requires a target!');
		}
		const taggedUser = message.mentions.users.first();
		var IDs = taggedUser.id;
		if (account[IDs]) {
			if (args[0] === "list") {
				console.log(account[IDs])
				message.reply(taggedUser.username + ' has ' + account[IDs][0].Money + ' salad bits!');
			} else if (args[0] === "give") {
				if (isNumeric(args[1]) && decimalCount(args[1]) < 2) {
					if (account[ID]) {
						if (account[ID][0].Money >= args[1]) {
							account[ID][0].Money = +account[ID][0].Money - +args[1];
							account[IDs][0].Money = +account[IDs][0].Money + +args[1];
							account[message.author.id][0].Money = account[message.author.id][0].Money.toFixed(2);
							fs.writeFileSync('./saladaccounts.json', JSON.stringify(account));
							message.reply(+args[1] + ' bits given to ' + taggedUser.username);
						} else {
							message.reply("You don't have enough salad bits for this operation!");
						}
					} else {
						message.reply("You don't have an account! Use ~register");
					}



				} else {
					var tempmoney = account[IDs][0].Money;
					if (account[ID]) {
						if (account[ID][0].Money >= 1) {
							account[ID][0].Money = +account[ID][0].Money - 1;
							account[IDs][0].Money += 1;
							account[message.author.id][0].Money = account[message.author.id][0].Money.toFixed(2);
							fs.writeFileSync('./saladaccounts.json', JSON.stringify(account));
							message.reply('1 bits given to ' + taggedUser.username);
						} else {
							message.reply("You don't have enough salad bits for this operation!");
						}
					} else {
						message.reply("You don't have an account! Use ~register");
					}


				}


			} else {
				message.reply("Please provide arguments!");
			}
		} else {
			message.reply("This person doesn't have their salad account yet! Ask them to do '~register'");
		}
		fs.writeFileSync('./saladaccounts.json', JSON.stringify(account));
	}
	else{
		message.reply("I don't listen to this channel. How did I read this? Shhhh....");
	}
	}
	else if (command === 'translate') {
		if (args[0]) {
			const sql = "SELECT * FROM Posts WHERE postName LIKE '" + args.join(' ') + "' AND NOT postName='ignore' AND postChannel='puffy'";
			con.query(sql, function(err, result) {
				if (err) throw err;
				if (result[0]) {
					const embed = new MessageEmbed()
						// Set the title of the field
						.setTitle(result[0]['postName'])
						// Set the color of the embed
						.setColor(0xF3C6C1)
						.setURL('https://madi-wka.club/word/' + result[0]['slugID'])
						// Set the main content of the embed
						.setDescription(result[0]['postdesc'].replace(/(<([^>]+)>)/gi, ""))
						.addFields({
							name: 'Detailed definition:',
							value: result[0]['postContent'].replace(/(<([^>]+)>)/gi, "")
						}, )
						.setFooter('Puffys Dictionary', 'https://madi-wka.club/img/puffy1.webp');
					// Send the embed to the same channel as the message
					message.channel.send(embed);
				} else {
					message.reply("No word found!");
				}

			});
		} else {
			message.reply("Please provide a valid word!");
		}
	
    }
	else if (command === 'delrepeat') {
		if (message.member.roles.cache.some(role => role.id == 847355865052741652)){
			if (!args.length) {
				return message.channel.send('What do I even have to repeat, you idiot!');
			} else {
				message.channel.send(args.join(' '));
				message.delete({
					timeout: 1
				});
			}
		}
	} 
	else if (command === 'admin'){
		asyncFunctions.purge(Discord, message, command, args);
	}
	else if (command == "coupon"){
		console.log(chatIDs["gen-channels"] + " " + message.channel.id)
		if (chatIDs["gen-channels"].includes(message.channel.id)){
			var taggedUser = message.author;
			if (!message.mentions.users.size) {
						
				var X = taggedUser.id;
			}else{
				console.log("Has the ping");
				taggedUser = message.mentions.users.first();
				var X = taggedUser.id;
			}
			asyncFunctions.sendPicture(account, Discord, Canvas, message.channel, message, message.author, userLevelTexts[userLevel]);
		}else{
			message.reply("I don't listen to this channel. How did I read this? Shhhh....");
		}
		
	}
	// END 
	

});
client.on('messageReactionAdd', async (reaction, user) => {
	console.log("AAAA");
	// When a reaction is received, check if the structure is partial
	if (reaction.partial) {
		// If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message: ', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}
	if (reaction.message.id == chatIDs["verify-message"]){
		delete require.cache[require.resolve('./saladaccounts.json')]
		const account = require('./saladaccounts.json');
		if (account[user.id]){
			user.send("You have been successfully re-verified on the FRUITSALADS server! Welcome back to the Fruits!");
			client.channels.cache.get(chatIDs['log']).send(user.username + ' re-verified themselves!');
		}else{
			user.send("You have been successfully verified on the FRUITSALADS server! Congratulations");
			client.channels.cache.get(chatIDs['log']).send(user.username + ' verified themselves on the server!');
		}
		
	}
	// Now the message has been cached and is fully available
	console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
	// The reaction is now also fully available and the properties will be reflected accurately:
	console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
});
client.on('guildMemberAdd', (member) => {
	member.send("Welcome to the FRUITSALADS server! Please verify yourself in the #✅get-verified channel and read the #✔-rules. Feel free to get your roles in #👉get-your-roles👈 and introduce yourself in #🤙introduce-yourself🤙 :smile: Thanks for joining our server! :strawberry:");
   });
client.login(token);
