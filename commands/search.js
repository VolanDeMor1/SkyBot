const Discord = require('discord.js');
const request = require('request');

module.exports = {
	name: 'поиск',
	description: 'Команда поиска изображений.',
    aliases: ["search", "picture"],
    usage: "[изображение]",
    args: true,
	cooldown: 5,
	execute(message, args) {
		// if(!args[0]){
        //     let embed = new Discord.MessageEmbed()
        //     .setTitle("🚫 **Внимание!**")
        //     .setColor('#ff4f4f')
        //     .setFooter(message.guild.name, message.guild.iconURL())
        //     .setTimestamp()
        //     .setDescription(`Вы не указали что мне искать`)
        //         message.reply(embed)
        //     return "";
        //   }
        //   if(args[0]){
              // pixabay
              let apikeypixabay = '17023142-a5d1ac5809a5eef01daf1cc8c';
              let search = encodeURI(args.slice(0, 100000).join(" "));
              let urlimage = `https://pixabay.com/api/?key=${apikeypixabay}&q=${search}&image_type=photo&lang=ru`;
                  request(urlimage, function (err, response, imagecity){
                    let image = JSON.parse(imagecity)
                    if(!image.hits[0].largeImageURL){
                      let embed = new Discord.MessageEmbed()
                      .setTitle("Поиск изображений")
                      .setFooter(`${message.guild.name} | Pixaday`, message.guild.iconURL())
                      .setTimestamp()
                      .setColor('RANDOM')
                      .setDescription("По вашему запросу ничего не найдено(")
                        message.reply(embed)
                      return "";
                    }
                    try{
                      if(args.join(" ").toLowerCase().includes("секс") || args.join(" ").toLowerCase().includes("sex") || args.join(" ").toLowerCase().includes("член") || args.join(" ").toLowerCase().includes("penis") || args.join(" ").toLowerCase().includes("пенис") || args.join(" ").toLowerCase().includes("жопа") || args.join(" ").toLowerCase().includes("попа") || args.join(" ").toLowerCase().includes("18+") || args.join(" ").toLowerCase().includes("порно") || args.join(" ").toLowerCase().includes("porno") || args.join(" ").toLowerCase().includes("сиськи") || args.join(" ").toLowerCase().includes("пизда") || args.join(" ").toLowerCase().includes("siski")){
                          let embed = new Discord.MessageEmbed()
                          .setTitle("🚫 **Внимание!**")
                          .setColor('#ff4f4f')
                          .setTimestamp()
                          .setDescription("Я вам запрещаю искать 18+")
                          .setFooter(message.guild.name, message.guild.iconURL())
                      
                            message.reply(embed);
                          return "";
                      }
                      let embed = new Discord.MessageEmbed()
                      .setTitle("Поиск изображений")
                      .setFooter(`${message.guild.name} | Pixaday`, message.guild.iconURL())
                      .setTimestamp()
                      .setColor('RANDOM')
                      .setImage(image.hits[Math.round(Math.random() * 3)].largeImageURL)
                        message.reply(embed)
                    }catch(e){
                      let embed = new Discord.MessageEmbed()
                      .setTitle("🚫 **Ошибка!**")
                      .setColor('#ff4f4f')
                      .setFooter(message.guild.name, message.guild.iconURL())
                      .addField('Описание ошибки', `\`\`\`${e}\`\`\``)
                      .setTimestamp()
                        message.reply(embed)
                    }
                  })
        //   }
	}
};
