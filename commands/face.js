const Discord = require('discord.js');
const request = require('request');

module.exports = {
	name: 'лицо',
	description: 'Посмотреть лицо игрового скина майнкрафт (Только лицензия).',
    aliases: ["face", "f", "л"],
    usage: "[Ник]",
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
                        .setTitle("🚫 **Внимание!**")
                        .setFooter(message.guild.name, message.guild.iconURL())
                        .setTimestamp()
                        .setColor('#ff4f4f')
                        .setDescription(`Игрок не найден`)
                            message.channel.send(embed);
                        return "";
                    }
                    if(!suuid.data.player){
                        let embed = new Discord.MessageEmbed()
                        .setTitle("🚫 **Внимание!**")
                        .setFooter(message.guild.name, message.guild.iconURL())
                        .setTimestamp()
                        .setColor('#ff4f4f')
                        .setDescription(`Игрок не найден`)
                            message.channel.send(embed);
                        return "";
                    }
                    if(!suuid.data.player.id){
                        let embed = new Discord.MessageEmbed()
                        .setTitle("🚫 **Внимание!**")
                        .setFooter(message.guild.name, message.guild.iconURL())
                        .setTimestamp()
                        .setColor('#ff4f4f')
                        .setDescription(`Игрок не найден`)
                            message.channel.send(embed);
                        return "";
                    }
                    if (!message.mentions.users.size) {
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`Лицо ${user}`)
                    .setFooter(message.guild.name, message.guild.iconURL())
                    .setTimestamp()
                    .setColor('RANDOM')
                    .setImage(`https://visage.surgeplay.com/face/${suuid.data.player.id}`)
                
                        message.channel.send(embed)
                    return "";
                    }
                    const mentioned = message.mentions.users.map(user => {
                        if(!user) return bot.send("Пользователь не найден");
                        let embed = new Discord.MessageEmbed()
                        .setTitle(`Лицо ${user}`)
                        .setFooter(message.guild.name, message.guild.iconURL())
                        .setTimestamp()
                        .setColor('RANDOM')
                        .setImage(`https://visage.surgeplay.com/face/${suuid.data.player.id}`)
                    
                        message.channel.send(embed);
                    });
                }else{
                    let embed = new Discord.MessageEmbed()
                    .setTitle("🚫 **Внимание!**")
                    .setColor('#ff4f4f')
                    .setFooter(message.guild.name, message.guild.iconURL())
                    .setTimestamp()
                    .setDescription(`Игрок не найден`)
                        message.channel.send(embed);
                    return "";
                }
            })
	}
};
