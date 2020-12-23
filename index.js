'use strict';
const { readdirSync } = require('fs');
const fs = require('fs');
const request = require('request');
// const argv = require('yargs');
const { join } = require('path');
const MusicClient = require('./struct/Client');
const { Collection, MessageEmbed } = require('discord.js');
const { Util } = require('discord.js');
const ytdl = require('ytdl-core');
const Discord = require("discord.js");
//   createPrivateRoom = require("./createPrivateRoom.js");
const bot = new MusicClient();
const moment = require('moment');
const os = require('os');
bot.mutes = require('./mutes.json');
const config = require('./botconfig.json');
const { token } = config;
const { prefix } = config;
const profile = require('./profile.json');
const servers = require('./servers.json');
const { format } = require('formatnumbers');
// const sqlite3 = require('sqlite3');
// var db = new sqlite3.Database("profile.db");

const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(join(__dirname, 'commands', `${file}`));
	bot.commands.set(command.name, command);
}
bot.on('ready', () => {
	let activities = [ `Бузова из май лайф`, `Хайп`, `5 профилей!`, `А ты умный`, `Люблю играть музыку` ], i = 0;
	setInterval(() => bot.user.setActivity(`${prefix}хелп | ${activities[i++ % activities.length]}`, { type: "LISTENING" }), 15000)
	console.log(`Запустился бот ${bot.user.username}`);
	bot.generateInvite(['ADMINISTRATOR']).then(link => {
		console.log(link);
	});
	bot.setInterval(() => {
		for (const i in bot.mutes) {
			const { time } = bot.mutes[i];
			const guildid = bot.mutes[i].guild;
			const guild = bot.guilds.get(guildid);
			const member = guild.members.get(i);
			const muteRole = member.guild.user.roles.find(r => r.name === 'Muted');
			if (!muteRole) continue;

			if (Date.now() >= time) {
				member.removeRole(muteRole);
				delete bot.mutes[i];
				fs.writeFile('./mutes.json', JSON.stringify(bot.mutes), err => {
					if (err) console.log(err);
				});
			}
		}
	}, 5000);
});
bot.once('ready', () => console.log('READY!'));
bot.on('ready', () => {
	async function updateTop(){
	const p = require('./profile.json');
	let arr = []
	Object.keys(p).forEach(u => {arr.push({id: u, coins: p[u].coins})})
	arr.sort(function(a, b) {
	  return b.coins - a.coins;
	});
	let topuser = arr.slice(0,30)
        let toplist = '';
        for (let u in topuser) {
			if(bot.guilds.cache.get('510060453892980746').members.cache.has(topuser[u].id)){
				toplist += `<@${topuser[u].id}> - ${format(topuser[u].coins)} <a:coins:718020004666277930>\n`
			}
        }
			let embed = new Discord.MessageEmbed()
				.setTitle("ТОП-ЛИСТ БОГАЧЕЙ")
				.setColor('#ffe342')
				.setDescription(toplist)
				.setTimestamp()
				.setFooter(`Данный список обновляется каждые 30 секунд`);
				// .setFooter(message.guild.name, message.guild.iconURL());
				editTop(embed);
	}
	async function editTop(embed){
		let channel = bot.channels.cache.get('722109586886361148');
		let message = await channel.messages.fetch('746390685925638225');
		await message.edit(embed);
		// bot.channels.cache.get('745942787824025611').messages.fetch('745966207613534278').edit(embed)
		// bot.channels.cache.get('745942787824025611').send(embed).then(msg => msg.delete({timeout: 5*990}));
	}
		updateTop();
		setInterval(updateTop,30*1000);
});
bot.on('ready', () => {
	async function updateTop(){
		let prosessor = os.cpus()[0].model;
		let gbmem = Number(os.totalmem() / 1073741824.2).toFixed(2);
		let gbmemo = Number(os.freemem() / 1073741824.2).toFixed(2);
		let b = Number(gbmem).toFixed(2) - Number(gbmemo).toFixed(2);
		let channel = bot.channels.cache.get('723265162022486116');
		let message = await channel.messages.fetch('747761589754527745');
		let a = os.uptime() * 1000;
		let embed = new Discord.MessageEmbed()
		.setAuthor("Информация", bot.user.avatarURL())
		.setColor('RANDOM')
		.setDescription(`Я могу, а вы?\n\n[Техническая поддержка](https://discord.gg/gZACqrX)\n[Пригласить бота](https://discord.com/oauth2/authorize?client_id=717811997059711006&permissions=8&scope=bot)\n`)
		.setTimestamp()
		.addField(`> **⚒️ Техническое:**`, `> **Версия DJS:** v12.2.0 stable\n> **Версия NodeJS:** v12.18.3\n> **Аптайм:** ${moment(a).format('HH:mm:ss')}\n> **Процессор:** ${prosessor}\n> **Платформа:** ${os.platform()} ${os.release()}\n> **ОЗУ:** ${Number(b).toFixed(2)}гб/${gbmem}гб`, true)
		.addField(`> **🕵️ Социальное:**`, `> **Гильдии:** ${format(bot.guilds.cache.size)}\n> **Пользователей:** ${format(bot.users.cache.size)}\n> **Каналов:** ${format(bot.channels.cache.size)}\n> **Эмодзи:** ${format(bot.emojis.cache.size)}\n> **Комманд:** ${format(bot.commands.size)}`, true)
		.setFooter(bot.guilds.cache.get('723256155815805028').name, bot.guilds.cache.get('723256155815805028').iconURL());
		editTop(embed)
	}
	async function editTop(embed){
		let channel = bot.channels.cache.get('723265162022486116');
		let message = await channel.messages.fetch('747765813871902795');
		await message.edit(embed);
		// bot.channels.cache.get('745942787824025611').messages.fetch('745966207613534278').edit(embed)
		// bot.channels.cache.get('745942787824025611').send(embed).then(msg => msg.delete({timeout: 5*990}));
	}
		updateTop();
		setInterval(updateTop,10*1000);
});
bot.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;
	if (command.guildOnly && message.channel.type !== 'text') return message.reply('Я не использую личные сообщения');
	if (command.args && !args.length) {
		let reply = `Вы неверно указали аргументы, ${message.author}!`;
		if (command.usage) reply += `\nКоманду нада использовать так: \`${prefix}${command.name} ${command.usage}\``;
		let embed = new Discord.MessageEmbed()
		.setTitle("🚫 **Внимание!**")
        .setColor('#ff4f4f')
		.setTimestamp()
		.setDescription(reply)
		.setFooter(message.guild.name, message.guild.iconURL())
		return message.channel.send(embed);
	}
	if (!bot.cooldowns.has(command.name)) {
		bot.cooldowns.set(command.name, new Collection());
	}
	const now = Date.now();
	const timestamps = bot.cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;
	if(message.author.id !== '575981243011956749'){
		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				let embed = new Discord.MessageEmbed()
				.setTitle("**Подождите!**")
				.setColor("RANDOM")
				.setTimestamp()
				.setDescription(`Пожалуста подождите ${timeLeft.toFixed(1)} секунд,\nПрежде чем использовать \`-${command.name}\``)
				.setFooter(message.guild.name, message.guild.iconURL())
				return message.reply(embed);
			}
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		let embed = new Discord.MessageEmbed()
		.setTitle("🚫 **Ошибка!**")
		.setColor('#ff4f4f')
		.setTimestamp()
		.setDescription(`При попытке выполнить эту команду произошла ошибка!\n\nЧтобы отправить отчёт об ошибке моему разработчику, нажми на реакцию (<a:smilecat:738121926668451921>)`)
		.setFooter(message.guild.name, message.guild.iconURL())
		message.reply(embed).then(msg =>{
			msg.react('<a:smilecat:738121926668451921>');
			let c = msg.createReactionCollector((r, u) => !u.bot, {max: 1, time:600000});
                    c.on("collect", (r, u) => {
						let embed = new Discord.MessageEmbed()
						.setTitle("🚫 **Ошибка!**")
						.setColor('#ff4f4f')
						.setTimestamp()
						.setDescription(`Отчёт об ошибке отправлен!\nСпасибо!`)
						.setFooter(message.guild.name, message.guild.iconURL())
						msg.edit(embed);
						bot.users.cache.get('575981243011956749').send(`\`\`\`${error}\`\`\``)
                    });
		});
	}
});

bot.on('guildMemberAdd', member => {
	if(member.guild.user.id == '510060453892980746'){
		const uid = member.id;
		if (!profile[uid]) {
			profile[uid] = {
				coins: 10,
				warns: 0,
				xp: 0,
				lvl: 1,
				income: 10,
				work: 'Рабочий на производстве',
				relaxe: 1440000
			};
		}
		if (profile[uid]) {
			const embed = new MessageEmbed()
				.setTitle('**Здравствуй!**')
				.setColor('#ffe342')
				.setDescription(`Я твой помошник, если будут какие-то вопросы пиши мне сюда, я их буду передавать администрации. Для начала прочитай <#510060600840290306>. Увидимся позже))`)
				.setTimestamp()
				.setFooter('SkyBuilding Corp.', member.guild.user.avatarURL());
			member.send(embed);
		}
		const randomizerx = Math.round(Math.random() * 8) + 1;
		const channelforconsolee = bot.channels.cache.get('510061359879290884');
		if (randomizerx == 1) {
			const embed = new MessageEmbed()
				.setAuthor(member.user.username, member.user.avatarURL())
				.setColor('#ffe342')
				.setDescription(`уже здесь.`)
				.setTimestamp()
				.setFooter('SkyBuilding Corp.', member.guild.user.avatarURL());
			channelforconsolee.send(embed);
			return '';
		}
		if (randomizerx == 2) {
			const embed = new MessageEmbed()
				.setAuthor(member.user.username, member.user.avatarURL())
				.setColor('#ff0000')
				.setDescription(`присоединяется к нашей пати.`)
				.setTimestamp()
				.setFooter('SkyBuilding Corp.', member.guild.user.avatarURL());
			channelforconsolee.send(embed);
			return '';
		}
		if (randomizerx == 3) {
			const embed = new MessageEmbed()
				.setAuthor(member.user.username, member.user.avatarURL())
				.setColor('#ffa600')
				.setDescription(`запрыгивает на сервер.`)
				.setTimestamp()
				.setFooter('SkyBuilding Corp.', member.guild.user.avatarURL());
			channelforconsolee.send(embed);
			return '';
		}
		if (randomizerx == 4) {
			const embed = new MessageEmbed()
				.setAuthor(member.user.username, member.user.avatarURL())
				.setColor('#37ff00')
				.setDescription(`Надеемся, ты к нам не без пиццы!`)
				.setTimestamp()
				.setFooter('SkyBuilding Corp.', member.guild.user.avatarURL());
			channelforconsolee.send(embed);
			return '';
		}
		if (randomizerx == 5) {
			const embed = new MessageEmbed()
				.setAuthor(member.user.username, member.user.avatarURL())
				.setColor('#00fff2')
				.setDescription(`рады тебя видеть!`)
				.setTimestamp()
				.setFooter('SkyBuilding Corp.', member.guild.user.avatarURL());
			channelforconsolee.send(embed);
			return '';
		}
		if (randomizerx == 6) {
			const embed = new MessageEmbed()
				.setAuthor(member.user.username, member.user.avatarURL())
				.setColor('#002aff')
				.setDescription(`появился.`)
				.setTimestamp()
				.setFooter('SkyBuilding Corp.', member.guild.user.avatarURL());
			channelforconsolee.send(embed);
			return '';
		}
		if (randomizerx == 7) {
			const embed = new MessageEmbed()
				.setAuthor(member.user.username, member.user.avatarURL())
				.setColor('#a600ff')
				.setDescription(`Поздоровайся со всеми!`)
				.setTimestamp()
				.setFooter('SkyBuilding Corp.', member.guild.user.avatarURL());
			channelforconsolee.send(embed);
			return '';
		}
		if (randomizerx == 8) {
			const embed = new MessageEmbed()
				.setAuthor(member.user.username, member.user.avatarURL())
				.setColor('#ff00fb')
				.setDescription(`теперь с нами!`)
				.setTimestamp()
				.setFooter('SkyBuilding Corp.', member.guild.user.avatarURL());
			channelforconsolee.send(embed);
			return '';
		}
		if (randomizerx == 9) {
			const embed = new MessageEmbed()
				.setAuthor(member.user.username, member.user.avatarURL())
				.setColor('#ff006a')
				.setDescription(`рады встрече!`)
				.setTimestamp()
				.setFooter('SkyBuilding Corp.', member.guild.user.avatarURL());
			channelforconsolee.send(embed);
			return '';
		}
		const embed = new MessageEmbed()
			.setAuthor(member.user.username, member.user.avatarURL())
			.setColor('#ff006a')
			.setDescription(`рады встрече!`)
			.setTimestamp()
			.setFooter('SkyBuilding Corp.', member.guild.user.avatarURL());
		channelforconsolee.send(embed);
		return '';
	}
});

bot.on('guildMemberRemove', member => {
	const uid = member.id;
	const channelforconsole = bot.channels.fetch('718025844374634507');
	const embed = new MessageEmbed()
		.setTitle('**Участник покинул сервер**')
		.setColor('#ff0000')
		.addField('Имя', `<@${member.id}>`)
		.addField('ID профиля', member.id)
		.setThumbnail(member.avatarURL)
		.setTimestamp()
		.setFooter('SkyBuilding Corp.', member.guild.user.avatarURL());
	channelforconsole.send(embed);
});

bot.on('message', async message => {

	bot.message = message;
	if (message.author.bot) return;
	if (message.channel.type == 'dm') {
		const channelforconsole = bot.channels.get('718025844374634507');
		const embed = new Discord.RichEmbed()
			.setTitle('**Участник написал боту:**')
			.setColor('#ffaa00')
			.setDescription(`**Автор: <@${message.author.id}>**\n\n> **Сообщение:**\n${message.content}`)
			.setTimestamp()
			.setFooter('SkyBuilding Corp.', 'https://images-ext-1.discordapp.net/external/3cefbjeTseqOoQADC8Hb6DLrUcPPS6nYn1yeI0dtIJA/https/cdn.discordapp.com/icons/510060453892980746/57bfc7ed79705113878fd5c51e9f9343.jpg');
		channelforconsole.send(embed);
	}
	if(message.guild.id !== '646285836500860929'){
		let uid = message.author.id;
		if (!profile[uid]) {
			profile[uid] = {
				coins: 10,
				warns: 0,
				xp: 0,
				lvl: 1,
				income: 10,
				work: 'Рабочий на производстве',
				relaxe: 1440000
			};
		}
		let u = profile[uid];
		u.xp++;
		if (u.xp >= (u.lvl * 9)) {
			u.xp = 0;
			u.lvl += 1;
			u.coins += u.lvl * 10;
		}
	
		fs.writeFile('./profile.json', JSON.stringify(profile), err => {
			if (err) console.log(err);
		});
		// db.each(`SELECT aid FROM users WHERE aid = ${message.author.id}`, function(err, row){
			// if(err){
			// 	db.run(`INSERT INTO users (aid, coins, lvl, xp) VALUES(${message.author.id}, ${10}, ${1}, ${1});`);
			// }
			// console.log(row)
			// if(row == message.author.id){
			// 	console.log(row);
			// 	db.run(`UPDATE users SET coins = ${1} WHERE aid = ${message.author.id};`).then(()=>{
			// 		db.run(`UPDATE users SET xp = ${1} WHERE aid = ${message.author.id};`);
			// 	});
			// }else{
			// 	db.run(`INSERT INTO users (aid, coins, lvl, xp) VALUES(${message.author.id}, ${10}, ${1}, ${1});`);
			// }
		// })
	}
	

	if(message.content.toLowerCase().includes('<@717811997059711006>') || message.content == "-бот" || message.content == "-скайбот" || message.content.toLowerCase().includes('@SkyBot') || message.content.toLowerCase().includes('@SkyBot#4610')){
		let prosessor = os.cpus()[0].model;
		let gbmem = Number(os.totalmem() / 1073741824.2).toFixed(2);
		let gbmemo = Number(os.freemem() / 1073741824.2).toFixed(2);
		let b = Number(gbmem).toFixed(2) - Number(gbmemo).toFixed(2);
		let a = os.uptime() * 1000;
		let embed = new Discord.MessageEmbed()
		.setAuthor("Информация", bot.user.avatarURL())
		.setColor('RANDOM')
		.setDescription(`Зато я круче чем вы\nГЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫ\n\n[Техническая поддержка](https://discord.gg/gZACqrX)\n`)
		.setTimestamp()
		.addField(`> **⚒️ Техническое:**`, `> **Версия DJS:** v12.2.0 stable\n> **Версия NodeJS:** v12.18.3\n> **Аптайм:** ${moment(a).format('HH:mm:ss')}\n> **Процессор:** ${prosessor}\n> **Платформа:** ${os.platform()} ${os.release()}\n> **ОЗУ:** ${Number(b).toFixed(2)}гб/${gbmem}гб\n> **Пинг:** ${new Date().getTime() - message.createdTimestamp}ms`, true)
		.addField(`> **🕵️ Социальное:**`, `> **Гильдии:** ${format(bot.guilds.cache.size)}\n> **Пользователей:** ${format(bot.users.cache.size)}\n> **Каналов:** ${format(bot.channels.cache.size)}\n> **Эмодзи:** ${format(bot.emojis.cache.size)}\n> **Комманд:** ${format(bot.commands.size)}`, true)
		.setFooter(message.guild.name, message.guild.iconURL());
		editTop(embed)
	}

});

// bot.on('message', async message => {
// 	const serverQueue = message.client.queue.get(message.guild.id);
// 	const songInfo = await ytdl.getInfo(serverQueue.songs[0].video_url);
// 		const song = {
// 			id: songInfo.video_id,
// 			title: Util.escapeMarkdown(songInfo.title),
// 			url: songInfo.video_url
// 		};
// 	while(serverQueue.songs[0]){
// 		bot.user.setStatus('idle');
// 		bot.user.setPresence({
// 			activity: {
// 				name: song.title,
// 				type: 'LISTENING'
// 			}
// 		});
// 	}
// 	bot.user.setStatus('idle');
// 	bot.user.setPresence({
// 		activity: {
// 			name: 'свои песни',
// 			type: 'LISTENING'
// 		}
// 	});
// });

// bot.on('voiceStateUpdate', (oldMember, newMember) => {
// 	createPrivateRoom(oldMember, newMember);
// });

bot.login(token);
