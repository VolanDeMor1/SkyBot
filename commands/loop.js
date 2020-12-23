const Discord = require('discord.js');
const servers = require('../servers.json');
const fs = require('fs');

module.exports = {
	name: 'покругу',
	description: 'Сделать воспроизведение песен БЕСКОНЕЧНЫМ.',
    aliases: ["loop", "l"],
	cooldown: 5,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('В очереди ничего нет.');
		fs.writeFile('./servers.json', JSON.stringify(servers), err => {
			if (err) console.log(err);
		});
		if(servers[message.guild.id].loop == true){
			servers[message.guild.id].loop == false;
			let embed = new Discord.MessageEmbed()
				.setTitle("🔂 **Покругу**")
				.setColor('RANDOM')
				.setDescription(`Воспроизведение по кругу выключено`)
				.setTimestamp()
				.setFooter(message.guild.name, message.guild.iconURL());
			return message.channel.send(embed);
		}else{
			servers[message.guild.id].loop == true;
			let embed = new Discord.MessageEmbed()
				.setTitle("🔂 **Покругу**")
				.setColor('RANDOM')
				.setDescription(`Воспроизведение по кругу включено`)
				.setTimestamp()
				.setFooter(message.guild.name, message.guild.iconURL());
			return message.channel.send(embed);
		}
	}
};
