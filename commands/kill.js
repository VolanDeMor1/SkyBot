const Discord = require('discord.js');

module.exports = {
	name: 'убить',
	description: 'Убейте любого пользователя).',
    aliases: ["у", "kill", "k"],
    usage: "[Пользователь]",
    args: true,
	cooldown: 5,
	execute(message, args) {
		let user1 = args[0];
        let embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Убийство")
            .setDescription(`**<@${message.author.id}> убил ${user1}**`)
            .setImage("https://i.gifer.com/3Sfq.gif")
            .setFooter(message.guild.name, message.guild.iconURL())
            .setTimestamp()
        message.channel.send(embed);
	}
};
