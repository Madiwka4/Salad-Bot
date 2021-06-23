
module.exports = {
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