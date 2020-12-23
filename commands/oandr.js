const Discord = require('discord.js');

module.exports = {
	name: 'оир',
	description: 'Посмотреть текущую композицию.',
    aliases: ["орёлирешка", "орёл", "решка"],
	cooldown: 5,
	execute(message, args, bot) {
        let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`Орёл или решка 📿`)
        .setDescription('**Решка!**')
        .setFooter(message.guild.name, message.guild.iconURL());

        let embed2 = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`Орёл или решка 📿`)
        .setDescription('**Орёл!**')
        .setFooter(message.guild.name, message.guild.iconURL());

        if(Math.round(Math.random() * 2) == 1){
            message.channel.send(embed);
        }else{
            message.channel.send(embed2);
        }
        
	}
};
