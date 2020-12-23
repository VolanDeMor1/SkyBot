const Discord = require('discord.js');

module.exports = {
	name: 'шип',
	description: 'Зашшиперите любого пользователя).',
    aliases: ["ш", "ship"],
    usage: "[Пользователь 1] [Пользователь 2]",
    args: true,
	cooldown: 5,
	execute(message, args) {
		let user1 = args[0];
        let user2 = args[1];
        var ship = Math.floor(Math.random() * 100) + 1;
        let embed = new Discord.MessageEmbed()
            .setTitle("Любовь...")
            .setDescription(`**${user1} и ${user2} влюблены в друг друга на ${ship}%**`)
            .setImage("https://data.whicdn.com/images/301563051/original.gif")
            .setColor('#ffffff')
            .setFooter(message.guild.name, message.guild.iconURL())
            .setTimestamp()
        message.channel.send(embed);
	}
};
