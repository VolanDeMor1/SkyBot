const Discord = require("discord.js");
const fs = require("fs");
const request = require('request');

module.exports = {
	name: 'бюст',
    description: 'Найти бюст скина игрока майнкрафт (только лицензия).',
    aliases: ["bust", "b", "б"],
    usage: "[ник]",
    args: true,
	cooldown: 5,
	execute(message, args) {
        let user = args[0];
        let searchuuid = `https://playerdb.co/api/player/minecraft/${user}`;
            request(searchuuid, function (err, response, body){
                if(!err){
                    let suuid = JSON.parse(body)
                    if(!suuid.data){
                        let embed = new Discord.MessageEmbed()
                        .setTitle("Ошибка")
                        .setFooter(message.guild.name, message.guild.iconURL())
                        .setTimestamp()
                        .setColor('#e22216')
                        .setDescription(`Игрок не найден`)
                        message.channel.send(embed);
                        return "";
                    }
                    if(!suuid.data.player){
                        let embed = new Discord.MessageEmbed()
                        .setTitle("Ошибка")
                        .setFooter(message.guild.name, message.guild.iconURL())
                        .setTimestamp()
                        .setColor('#e22216')
                        .setDescription(`Игрок не найден`)
                        message.channel.send(embed);
                        return "";
                    }
                    if(!suuid.data.player.id){
                        let embed = new Discord.MessageEmbed()
                        .setTitle("Ошибка")
                        .setFooter(message.guild.name, message.guild.iconURL())
                        .setTimestamp()
                        .setColor('#e22216')
                        .setDescription(`Игрок не найден`)
                        message.channel.send(embed);
                        return "";
                    }
                    if (!message.mentions.users.size) {
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`Бюст ${user}`)
                    .setFooter(message.guild.name, message.guild.iconURL())
                    .setTimestamp()
                    .setColor('#ffaa00')
                    .setImage(`https://visage.surgeplay.com/bust/${suuid.data.player.id}`)
                
                    message.channel.send(embed)
                    return "";
                    }
                    const mentioned = message.mentions.users.map(user => {
                        let a = message.author
                        let embed = new Discord.MessageEmbed()
                        .setTitle(`Бюст ${user}`)
                        .setFooter(message.guild.name, message.guild.iconURL())
                        .setTimestamp()
                        .setColor('#ffaa00')
                        .setImage(`https://visage.surgeplay.com/bust/${suuid.data.player.id}`)
                    
                    message.channel.send(embed);
                    });
                }else{
                    let embed = new Discord.MessageEmbed()
                    .setTitle("Ошибка")
                    .setFooter(message.guild.name, message.guild.iconURL())
                    .setTimestamp()
                    .setColor('#e22216')
                    .setDescription(`Игрок не найден`)
                    message.channel.send(embed);
                    return "";
                }
            })
	}
};
