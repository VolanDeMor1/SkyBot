const Discord = require("discord.js");

module.exports = {
	name: 'аватар',
    description: 'Посмотреть аватар пользователя.',
    aliases: ["а", "ава", "a"],
	cooldown: 5,
	execute(message, args, bot) {
		// let a = message.author;
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author ;
        if (!message.mentions.users.size) {
            try{
                let embed = new Discord.MessageEmbed()
                .setTitle(`Аватар ${user.user.username}`)
                .setFooter(message.guild.name, message.guild.iconURL())
                .setTimestamp()
                .setColor('#ffaa00')
                .setImage(user.user.avatarURL());
        
            message.channel.send(embed);
            return "";
            }catch(e){
                let embed = new Discord.MessageEmbed()
                .setTitle(`Аватар ${user.username}`)
                .setFooter(message.guild.name, message.guild.iconURL())
                .setTimestamp()
                .setColor('#ffaa00')
                .setImage(user.avatarURL());
        
            message.channel.send(embed);
            return "";
            }
        }
        const mentioned = message.mentions.users.map(user => {
            let a = message.author
            if(!user) return bot.send("Пользователь не найден");
            let embed = new Discord.MessageEmbed()
            .setTitle(`Аватар ${user.username}`)
            .setFooter(message.guild.name, message.guild.iconURL())
            .setTimestamp()
            .setColor('#ffaa00')
            .setImage(user.avatarURL());
    
        message.channel.send(embed);
        });
	}
};
