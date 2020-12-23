const Discord = require('discord.js');
const servers = require('./../servers.json');
const fs = require('fs');

module.exports = {
	name: 'уровень',
	description: 'Заблокируйте или разблокируйте функцию бота (уровень).',
    aliases: ["lvl", "level", "ур"],
	cooldown: 60,
	execute(message, args, bot) {
		if (message.author.id !== '575981243011956749' || !message.member.hasPermission('ADMINISTRATOR')) {
			const embed = new Discord.MessageEmbed()
				.setTitle("🚫 **Внимание!**")
				.setColor('#ff4f4f')
				.setTimestamp()
				.setDescription('У вас нет прав')
				.setImage('https://media1.tenor.com/images/36deb2e981bfafc250bd680609ecb107/tenor.gif?itemid=10611246')
				.setFooter(message.guild.name, message.guild.iconURL());

			message.channel.send(embed);
			return '';
		}
        if(servers[message.guild.id].lvl == false){
            servers[message.guild.id].lvl == true
            fs.writeFile('./../servers.json', JSON.stringify(servers), err => {
                if (err) console.log(err);
            });
			let embed = new Discord.MessageEmbed()
				.setTitle("✅ **Успешно!**")
				.setColor('#2fff00')
				.setDescription(`Вы включили систему уровней!`)
				.setTimestamp()
				.setFooter(message.guild.name, message.guild.iconURL());
			return message.channel.send(embed);
        }else if(servers[message.guild.id].lvl == true){
            servers[message.guild.id].lvl == false
            fs.writeFile('./../servers.json', JSON.stringify(servers), err => {
                if (err) console.log(err);
            });
			let embed = new Discord.MessageEmbed()
				.setTitle("✅ **Успешно!**")
				.setColor('#ff4f4f')
				.setDescription(`Вы отключили систему уровней(`)
				.setTimestamp()
				.setFooter(message.guild.name, message.guild.iconURL());
			return message.channel.send(embed);
        }
	}
};
