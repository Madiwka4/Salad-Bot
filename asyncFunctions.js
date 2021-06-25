function isNumeric(str) {
	if (typeof str != "string") return false // we only process strings!  
	return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
		!isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}
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
module.exports = {
	menu: function(MessageEmbed, Discord, args, account, ID, message, userLevel){
		if (args[0]){
			if (args[0] == "leaderboard"){
				
				var top = {};
				var sortable = [];
				for (var key in account) {
					console.log(key);
					console.log(account[key][0].Money);
					top[account[key][0].Name] = account[key][0].Money;
				}
				for (var vehicle in top) {
					console.log("\n Pushing " + vehicle);
					sortable.push([vehicle, top[vehicle]]);
				}
				sortable.sort(function(a, b) {
					return a[1] - b[1];
				});
				let str = "";
				for(var i = sortable.length-1; i >= 0; i--){
					console.log(i + " " + sortable[i][0] + " \n ");
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
				
				delete require.cache[require.resolve('./fruits.json')];
				
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
			.setDescription("\n 💸 **Leaderboard** (~menu leaderboard) \n \n 🛒 **Shop** (~menu shop)")
			// Send the embed to the same channel as the message
			message.channel.send(embed).then(function (msg) {
				msg.react("💸");
				msg.react("🛒");
				const filter = (reaction, user) => {
					return (reaction.emoji.name === '💸' || reaction.emoji.name === '🛒') && user.id === message.author.id;
				};
				
				const collector = msg.createReactionCollector(filter, { time: 15000 });
				
				collector.on('collect', (reaction, user) => {
					if (reaction.emoji.name === '💸'){
						
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
					}else if (reaction.emoji.name === '🛒'){
						
				delete require.cache[require.resolve('./fruits.json')];
				
				var fruits = require('./fruits.json');
				var top = {};
					var untop = {};
					var sortable = [];
					var unsortable = [];
					if (!account[ID][0].Fruits){
						account[ID][0].Fruits = [];
					}
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
					msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
					collector.stop()
				});
				
				collector.on('end', collected => {
					console.log(`Collected ${collected.size} items`);
				});
			  }).catch(function() {
				//Something
			   });;
			
		}
	},
	purge: function(Discord, message, command, args, account){
		if (message.member.roles.cache.some(role => role.name === 'strawberry') || message.author.id == '852819301416960050'){
			if (args[0]){
				if (args[0] == "purge"){
					 
				
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
						message.channel.send("Deleted " + amount + " messages by " + "<@" +user + ">").then(msg => {
							setTimeout(() => msg.delete(), 1000)
						  });
						}
						
						});
						if (!user){
								console.log("user not pinged");
								message.channel.bulkDelete(amount);
								message.channel.send("Deleted " + amount + " messages").then(msg => {
									setTimeout(() => msg.delete(), 1000)
								  });
						}
					
				}else if (args[0] == "bits")
				{
					if (!message.mentions.users.size) {
						return message.reply('giving bits requires a target!');
					}
					const taggedUser = message.mentions.users.first();
					var IDs = taggedUser.id;
					console.log(account[IDs]);
					if (account[IDs]) {
						if (args[1] === "list") {
							message.reply(taggedUser.username + ' has ' + account[IDs][0].Money + ' salad bits!');
						} else if (args[1] === "give") {
							if (isNumeric(args[2]) && decimalCount(args[2]) < 2) {
										account[IDs][0].Money = +account[IDs][0].Money + +args[2];
										fs.writeFileSync('./saladaccounts.json', JSON.stringify(account));
										message.reply(+args[2] + ' bits given to ' + taggedUser.username);
		
							}
			
			
						} else {
							message.reply("Please provide arguments!");
						}
					} else {
						message.reply("This person doesn't have their salad account yet! Ask them to do '~register'");
					}
					fs.writeFileSync('./saladaccounts.json', JSON.stringify(account));
				}else if(args[0] == "fruit"){
					
					
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
	},
    sendPicture: async function(account, Discord, Canvas, channel, message, taggedUser, userLevelText){
		const drawMultilineText = require('canvas-multiline-text');
		var userLevel = 0;
		if (account[taggedUser.id]) {
			var fruitlist = require('./fruits.json');
			var str = "";
			if (account[taggedUser.id][0].Fruits && account[taggedUser.id][0].Fruits.length > 0){
				for (var i = 0; i < account[taggedUser.id][0].Fruits.length; i++){
					if (i != 0){
						str += ", ";
					}
					str += account[taggedUser.id][0].Fruits[i];
					console.log(account[taggedUser.id][0].Fruits[i]);
					
				}
			}else{
				str += "no fruit :(";
			}
				const { registerFont, createCanvas } = require('canvas')
				registerFont('font.ttf', { family: 'GoodFont' })
				const canvas = Canvas.createCanvas(700, 250);

				const context = canvas.getContext('2d');
				const picX = canvas.width/1.23;
				const picY = canvas.height/9;
				const background = await Canvas.loadImage('./Salad_coupon_1.png');
				context.drawImage(background, 0, 0, canvas.width, canvas.height);

				context.font = '50px GoodFont';

				context.fillStyle = '#24212C';

				context.fillText(account[taggedUser.id][0].Name, canvas.width / 6, canvas.height / 3);
				
				context.font = '22px GoodFont';
				context.fillText(userLevelText, canvas.width / 6, canvas.height / 2.3);
				context.fillText(account[taggedUser.id][0].Money, canvas.width / 2.8, canvas.height / 1.45);
				drawMultilineText(
					context,
					str,
					{
						rect: {
							x: canvas.width / 3.6,
							y: canvas.height / 1.35,
							width: canvas.width / 2,
							height: canvas.height - 20
						},
						font: 'GoodFont',
						verbose: true,
						lineHeight: 0.7,
						minFontSize: 22,
						maxFontSize: 22
					}
				);
				
				context.beginPath();

				context.arc(picX+50, picY+50, 50, 0, Math.PI * 2, true);


				context.closePath();

				context.clip();
				const avatar = await Canvas.loadImage(message.author.avatarURL({ format: 'jpg' }));
				context.strokeStyle = 'black';
				context.lineWidth = "4";
				context.stroke();
				context.drawImage(avatar, picX, picY, 100, 100);
				const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
				channel.send(`Here is your coupon, ${message.author.username}`, attachment);
		} else {
			message.reply("User doesnt exist or is not registered!");
		}
		
    }
};