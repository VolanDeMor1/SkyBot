const Discord = module.require('discord.js');
const fs = require('fs');
const beautify = require('beautify');
module.exports = {
	name: 'евал',
	description: 'Команда для разработчиков.',
    aliases: ["е", "eval", "e"],
	cooldown: 5,
	async execute(message, args, bot) {
		if (message.author.id !== '575981243011956749') {
			const embed = new Discord.MessageEmbed()
				.setTitle('**ОШИБКА**')
				.setColor('#ff1100')
				.setTimestamp()
				.setDescription('У вас нет прав')
				.setImage('https://media1.tenor.com/images/36deb2e981bfafc250bd680609ecb107/tenor.gif?itemid=10611246');

			message.channel.send(embed);
			return '';
		}
		if (!args[0]) {
			const embed = new Discord.MessageEmbed()
				.setTitle('**ОШИБКА**')
				.setColor('#ff1100')
				.setTimestamp()
				.setDescription('Вы не указали что мне евальнуть(')
				.setImage('https://media1.tenor.com/images/36deb2e981bfafc250bd680609ecb107/tenor.gif?itemid=10611246')
				.setFooter(message.guild.name, message.guild.iconURL());

			message.channel.send(embed);
			return '';
		}

		try {
			if (args.join(' ').toLowerCase().includes('token')) {
				const embed = new Discord.MessageEmbed()
					.setTitle('**ОШИБКА**')
					.setColor('#ff1100')
					.setTimestamp()
					.setDescription('Не пытайся меня сломать, у меня продуман каждый шаг)')
					.setImage('https://media1.tenor.com/images/36deb2e981bfafc250bd680609ecb107/tenor.gif?itemid=10611246')
					.setFooter(message.guild.name, message.guild.iconURL());

				message.channel.send(embed);
				return '';
			}

				let argss = args.join(' ')
				let evaled = await eval(argss);
      			let eevaled = typeof evaled;
      			const tyype = eevaled[0].toUpperCase() + eevaled.slice(1);
      			if(typeof evaled!== 'string') evaled = require('util').inspect(evaled, {depth: 0});
      			evaled == (undefined || null) ? evaled = 'Empty response: ' + evaled : evaled;
				const ping = new Date().getTime() - message.createdTimestamp;
				const embed = new Discord.MessageEmbed()
					.setTitle('**Евал**')
					.setColor('#03fc03')
					.addField('Запрос:', `\`\`\`js\n${beautify(args.join(' '), { format: 'js' })}\n\`\`\``)
					.addField('Ответ:', `\`\`\`js\n${evaled}\n\`\`\``)
					.addField('Тип:', typeof evaled)
					.addField('Выполнено за:', `${ping}ms`)
					.setTimestamp()
					.setFooter(`${message.author.username} | ${message.guild.name}`, message.guild.iconURL());
	
				message.channel.send(embed);
		} catch (e) {
			const embed = new Discord.MessageEmbed()
				.setTitle('**ОШИБКА**')
				.setColor('#ff1100')
				.setTimestamp()
				.setDescription(`\`\`\`${e}\`\`\``)
				.setFooter(`${message.author.username} | ${message.guild.name}`, message.guild.iconURL());

			message.channel.send(embed);
		}
	}
};
