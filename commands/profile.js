const Discord = module.require("discord.js");
const fs = require("fs");
let profile = require("../profile.json");
const moment = require('moment');

module.exports = {
	name: 'профиль',
	description: 'Посмотреть свой профиль.',
    aliases: ["юзер", "ю"],
	cooldown: 5,
	execute(message, args, bot) {
		let user = message.guild.member(message.mentions.members.first()) || message.guild.member(message.guild.members.cache.get(args[0])) || message.member ;
        if (!message.mentions.users.size) {
        fs.writeFile('../profile.json',JSON.stringify(profile),(err)=>{
            if(err) console.log(err);
        });
        try{
            let xpmax = Number(profile[user.id].lvl) * 9
            let lvlxp = profile[user.id].lvl - 1
            let abc = lvlxp * 9
            let xpvsego = abc + profile[user.id].xp
            let embed = new Discord.MessageEmbed()
            .setDescription("Информация о пользователе:")
            .setFooter(message.guild.name, message.guild.iconURL())
            .setTimestamp()
            .setColor('#ffaa00')
            .addField("Имя",`<@${user.id}>`, true)
            .addField("Тэг",user.user.tag, true)
            .addField("ID",user.id, true)
            .addField(`Аккаунт создан:`, `${moment(user.user.createdAt).format('DD.MM.yyyy')}`, true)
            .addField(`Присоеденился:`, `${moment(user.joinedAt).format('DD.MM.yyyy')}`, true)
            .addField("Уровень",profile[user.id].lvl, true)
            .addField("Опыт",`${profile[user.id].xp}/${xpmax} (всего ${xpvsego})`, true)
            .addField("Баланс",`${profile[user.id].coins} <a:coins:718020004666277930>`, true)
            .addField("Предупреждений",`${profile[user.id].warns}/3`, true)
            .setThumbnail(user.user.avatarURL({dynamic: true}))
    
            message.channel.send(embed);
        }catch(e){
            let xpmax = Number(profile[user.id].lvl) * 9
            let lvlxp = profile[user.id].lvl - 1
            let abc = lvlxp * 9
            let xpvsego = abc + profile[user.id].xp
            let embed = new Discord.MessageEmbed()
            .setDescription("Информация о пользователе:")
            .setFooter(message.guild.name, message.guild.iconURL())
            .setTimestamp()
            .setColor('#ffaa00')
            .addField("Имя",`<@${user.id}>`, true)
            .addField("Тэг",user.tag, true)
            .addField("ID",user.id, true)
            .addField(`Аккаунт создан:`, `${moment(user.createdAt).format('DD.MM.yyyy')}`, true)
            .addField(`Присоеденился:`, `${moment(user.joinedAt).format('DD.MM.yyyy')}`, true)
            .addField("Уровень",profile[user.id].lvl, true)
            .addField("Опыт",`${profile[user.id].xp}/${xpmax} (всего ${xpvsego})`, true)
            .addField("Баланс",`${profile[user.id].coins} <a:coins:718020004666277930>`, true)
            .addField("Предупреждений",`${profile[user.id].warns}/3`, true)
            .setThumbnail(user.avatarURL({dynamic: true}))

            message.channel.send(embed);
        }
        return "";
        }
        const mentioned = message.mentions.users.map(user => {
            let a = message.author
            if(!user) return bot.send("Пользователь не найден");
            let xpmax = Number(profile[user.id].lvl) * 9
            let lvlxp = profile[user.id].lvl - 1
            let abc = lvlxp * 9
            let xpvsego = abc + profile[user.id].xp
            let embed = new Discord.MessageEmbed()
            .setDescription("Информация о пользователе:")
            .setFooter(message.guild.name, message.guild.iconURL())
            .setTimestamp()
            .setColor('#ffaa00')
            .addField("Имя",`<@${user.id}>`, true)
            .addField("Тэг",user.tag, true)
            .addField("ID",user.id, true)
            .addField(`Аккаунт создан:`, `${moment(user.createdAt).format('DD.MM.yyyy')}`, true)
            .addField(`Присоеденился:`, `${moment(message.member.joinedAt).format('DD.MM.yyyy')}`, true)
            .addField("Уровень",profile[user.id].lvl, true)
            .addField("Опыт",`${profile[user.id].xp}/${xpmax} (всего ${xpvsego})`, true)
            .addField("Баланс",`${profile[user.id].coins} <a:coins:718020004666277930>`, true)
            .addField("Предупреждений",`${profile[user.id].warns}/3`, true)
            .setThumbnail(user.avatarURL({dynamic: true}))

            message.channel.send(embed);
        });
	}
};
