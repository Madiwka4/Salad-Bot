//Hello
const Discord = require('discord.js');
const {
	prefix,
	token,
	user,
	password,
	host,
	database
} = require('./config.json');
const client = new Discord.Client();
const {
	MessageEmbed
} = require('discord.js');

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

function isNumeric(str) {
	if (typeof str != "string") return false // we only process strings!  
	return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
		!isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if ( message.author.bot ) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	const ID = message.author.id;
	let userLevel = 0;
	if (message.member.roles.cache.some(role => role.id = 848576547945447434)){
		userLevel = 1;
	}
	if (message.member.roles.cache.some(role => role.id = 848576648068202597)){
		userLevel = 2;
	}	
	if (!message.content.startsWith(prefix) && message.channel.id != 847429914805927956 && message.channel.id != 848050973893066802){
		const wordCount = args.length + 1;
		delete require.cache[require.resolve('./saladaccounts.json')]
		const account = require('./saladaccounts.json');
		if (account[message.author.id]){
			account[message.author.id][0].Money = +account[message.author.id][0].Money + wordCount * 0.1; 
			account[message.author.id][0].Money = account[message.author.id][0].Money.toFixed(2);
			fs.writeFileSync('./saladaccounts.json', JSON.stringify(account));
		}
	}
    else if (message.channel.id != 847429914805927956){
        if (message.channel.id == 853212434691915777){
            if (command === 'translate') {
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
                                .setFooter('Puffys Dictionary', 'https://madi-wka.club/img/puffy.webp');
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
        }
    }
	else {
		console.log(args);
		console.log("Channel ID:" + message.channel.id);
		if (command === 'ping') {
			message.channel.send('Pong.');
		} else if (command === 'beep') {
			message.channel.send('Boop.');
		} else if (command === 'hello') {
			message.channel.send(`Hello, ${message.author.username}, whats up?`);
		} else if (command === 'repeat') {
			if (!args.length) {
				return message.channel.send('What do I even have to repeat, you idiot!');
			} else {
				message.channel.send(args.join(' '));
			}
		} else if (command === 'delrepeat') {
			if (!args.length) {
				return message.channel.send('What do I even have to repeat, you idiot!');
			} else {
				message.channel.send(args.join(' '));
				message.delete({
					timeout: 1
				});
			}
		} else if (command === 'poke') {
			if (!message.mentions.users.size) {
				return message.reply('poking requires a target!');
			}
	
			const taggedUser = message.mentions.users.first();
			message.channel.send(`Poking <@${taggedUser.id}>`);
		} else if (command === 'bit') {
			delete require.cache[require.resolve('./saladaccounts.json')]
			var account = require('./saladaccounts.json');
			if (!message.mentions.users.size) {
				return message.reply('giving bits requires a target!');
			}
			const taggedUser = message.mentions.users.first();
			var IDs = taggedUser.id;
			if (account[IDs]) {
				if (args[0] === "list") {
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
	
		} else if (command === 'register') {
			delete require.cache[require.resolve('./saladaccounts.json')]
			var account = require('./saladaccounts.json');
			if (account[ID]) {
				if (args[0]){
					account[ID][0].Name = args[0];
					message.reply("You renamed your card to: " + account[ID][0].Name);
					fs.writeFileSync('./saladaccounts.json', JSON.stringify(account));
				} else {
					console.log(account);
					message.reply("You already have an account!");
				}
				
			} else {
				if (args[0]) {
					account[ID] = [];
					account[ID].push({
						Money: 0,
						Name: args[0]
					});
					fs.writeFileSync('./saladaccounts.json', JSON.stringify(account));
					message.reply(message.author.username + ' has been registered as ' + args[0]);
				} else {
					message.reply("Please use '~register [Your Salad Name]'");
				}
			}
			fs.writeFileSync('./saladaccounts.json', JSON.stringify(account));
		} else if (command === 'info') {
			delete require.cache[require.resolve('./saladaccounts.json')]
			var account = require('./saladaccounts.json');
			if (!message.mentions.users.size) {
				return message.reply('Checking info requires a target!');
			}
			const taggedUser = message.mentions.users.first();
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
					// Set the main content of the embed
					.setDescription(str)
					.setFooter(taggedUser.username, taggedUser.avatarURL());
				// Send the embed to the same channel as the message
				message.channel.send(embed);
			} else {
				message.reply("User doesnt exist or is not registered!");
			}
	
			fs.writeFileSync('./saladaccounts.json', JSON.stringify(account));
		}  else if (command === 'menu'){
			if (args[0]){
				if (args[0] == "leaderboard"){
					delete require.cache[require.resolve('./saladaccounts.json')]
					var account = require('./saladaccounts.json');
					var top = {};
					var sortable = [];
					for (var key in account) {
						console.log(key);
						console.log(account[key][0].Money);
						top[account[key][0].Name] = account[key][0].Money;
					}
					for (var vehicle in top) {
						sortable.push([vehicle, top[vehicle]]);
					}
					sortable.sort(function(a, b) {
						return a[1] - b[1];
					});
					let str = "";
					for(var i = sortable.length-1; i >= 0; i--){
						str += "\n**" + sortable[i][0] + "**: " + sortable[i][1] + " Salad Bits!\n";
					}
					const embed = new MessageEmbed()
						// Set the title of the field
						.setTitle("Salad Leaderboards")
						// Set the color of the embed
						.setColor(0x6ED590)
						// Set the main content of the embed
						.setDescription(str)
					// Send the embed to the same channel as the message
					message.channel.send(embed);
				} else if (args[0] == "shop"){
					delete require.cache[require.resolve('./saladaccounts.json')];
					delete require.cache[require.resolve('./fruits.json')];
					var account = require('./saladaccounts.json');
					var fruits = require('./fruits.json');
					if (args[1]){
						if (args[2]){
							if (fruits[args[2]]){
								if (!account[ID][0].Fruits){
									account[ID][0].Fruits = [];
								}
								if (account[ID][0].Fruits.includes(args[2])){
									message.reply("You already have that fruit!");
								}else{
									if (+account[ID][0].Money >= +fruits[args[2]][0].Price){
										account[ID][0].Money = +account[ID][0].Money - +fruits[args[2]][0].Price;
										message.channel.send(message.author.username + ", thanks for buying a/an " + args[2]);
										account[ID][0].Fruits.push(args[2]);
									}else{
										message.reply("You do not have enough funds");
										console.log("Moneh" + account[ID][0].Money + " " + fruits[args[2]][0].Price);
									}
									
								}
							}
						}
						
					}else{

						var top = {};
						var untop = {};
						var sortable = [];
						var unsortable = [];
						for (var key in fruits) {
							console.log(key);
							console.log(fruits[key][0].Price);
							if(fruits[key][0].Requirement <= userLevel && !account[ID][0].Fruits.includes(key)){
								top[":" + fruits[key][0].Emote + ":" + key] = fruits[key][0].Price;
							}
						}
						for (var vehicle in top) {
							sortable.push([vehicle, top[vehicle]]);
						}
						sortable.sort(function(a, b) {
							return a[1] - b[1];
						});
						console.log(sortable);
						let str = "";
						for(var i = 0; i < sortable.length; i++){
							str += "\n**" + sortable[i][0] + "**: " + sortable[i][1] + " Salad Bits!\n";
						}
						
						
						const embed = new MessageEmbed()
							// Set the title of the field
							.setTitle("Salad Shop")
							// Set the color of the embed
							.setColor(0x6ED590)
							// Set the main content of the embed
							.setDescription(str)

							.setFooter("use '~menu shop buy [Fruit Name]' to get more fruits!")
						// Send the embed to the same channel as the message
						message.channel.send(embed);
					}
					fs.writeFileSync('./saladaccounts.json', JSON.stringify(account));
				}
			}else{
				const embed = new MessageEmbed()
				// Set the title of the field
				.setTitle("Salad Menu")
				// Set the color of the embed
				.setColor(0x6ED590)
				// Set the main content of the embed
				.setDescription("\n **Leaderboard** (~menu leaderboard) \n \n **Shop** (~menu shop)")
				// Send the embed to the same channel as the message
				message.channel.send(embed);
			}
			
			  
		}
		else if (command === 'admin'){
			if (args[0]){
				if (args[0] == "purge"){
					if (message.member.roles.cache.some(role => role.name === 'strawberry') || message.author.id == '852819301416960050') {
				
						const user = message.mentions.users.first();
						// Parse Amount
						const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
						if (!amount) return message.reply('Must specify an amount to delete!');
						if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
						// Fetch 100 messages (will be filtered and lowered up to max amount requested)
						message.channel.messages.fetch({
						limit: 100,
						}).then((messages) => {
						if (user) {
							console.log("user pinged");
						const filterBy = user ? user.id : Client.user.id;
						messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
						message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
						message.channel.send("Deleted " + amount + " messages by " + "<@" +user + ">");
						}
						
						});
						if (!user){
								console.log("user not pinged");
								message.channel.bulkDelete(amount);
								message.channel.send("Deleted " + amount + " messages");
						}
					}
				}else if(args[0] == "fruit"){
					delete require.cache[require.resolve('./saladaccounts.json')]
					var account = require('./saladaccounts.json');
					var fruitlist = require('./fruits.json');
					var taggedUser = message.author;
					if (!message.mentions.users.size) {
						
						var IDs = taggedUser.id;
					}else{
                        console.log("Has the ping");
						taggedUser = message.mentions.users.first();
						var IDs = taggedUser.id;
					}
					if (account[IDs]){
						if (args[1]){
							if (args[1] == "add"){
								if (args[2]){
									if (fruitlist[args[2]]){
                                        if (!account[IDs][0].Fruits){
                                            account[IDs][0].Fruits = [];
                                        }
										if (account[IDs][0].Fruits.includes(args[2])){
											message.reply(taggedUser.username + " already has that fruit!");
										}else{
											message.reply("Added " + args[2] + " to " + taggedUser.username);
											account[IDs][0].Fruits.push(args[2]);
										}
									}else{
										message.reply("This fruit does not exist!");
									}
								}else{
									message.reply("Pleace specify a fruit to be added!");
								}
							}else if (args[1] == "clear"){
								account[IDs][0].Fruits = [];
								message.reply("Cleared " + taggedUser.username + "'s fruits!");
							}else{
								message.reply("Please specify a correct action! (add/clear)");
							}
						}else{
							message.reply("Please specify an action! (add/clear)");
						}
					}else{
						message.reply("This user does not exist!");
					}
					fs.writeFileSync('./saladaccounts.json', JSON.stringify(account));
				}
			}else{
				message.reply("Specify admin command! Admin commands:\n~admin purge\n~admin bit\n~admin fruit");
			}
		} 
	}
	

});

client.login(token);
