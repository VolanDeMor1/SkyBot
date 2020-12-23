const Discord = require("discord.js");

module.exports = {
	name: 'гадалка',
	description: 'Ответит да/нет на ваш вопрос)',
    aliases: ["шар"],
	cooldown: 5,
	execute(message) {
		var randomix = Math.round(Math.random() * 5) + 1;
        if(randomix == 1){
            let embed = new Discord.MessageEmbed()
            .setTitle("**Гадалка 228_336**")
            .setColor("RANDOM")
            .setTimestamp()
            .setDescription("Я считаю что да!")
            .setThumbnail("https://i.gifer.com/origin/e9/e95f329a87d1e9431c7c2603a1ae6952_w200.gif")
            .setFooter(message.guild.name, message.guild.iconURL())
        
            message.reply(embed);
        }
        if(randomix == 2){
            let embed = new Discord.MessageEmbed()
            .setTitle("**Гадалка 228_336**")
            .setColor("RANDOM")
            .setTimestamp()
            .setDescription("Возможно нет")
            .setThumbnail("https://i.gifer.com/origin/e9/e95f329a87d1e9431c7c2603a1ae6952_w200.gif")
            .setFooter(message.guild.name, message.guild.iconURL())
        
            message.reply(embed);
        }
        if(randomix == 3){
            let embed = new Discord.MessageEmbed()
            .setTitle("**Гадалка 228_336**")
            .setColor("RANDOM")
            .setTimestamp()
            .setDescription("На такой вопрос, не каждая гадалка ответит...\nЗадай вопрос ещё раз")
            .setThumbnail("https://i.gifer.com/origin/e9/e95f329a87d1e9431c7c2603a1ae6952_w200.gif")
            .setFooter(message.guild.name, message.guild.iconURL())
        
            message.reply(embed);
        }
        if(randomix == 4){
            let embed = new Discord.MessageEmbed()
            .setTitle("**Гадалка 228_336**")
            .setColor("RANDOM")
            .setTimestamp()
            .setDescription("Вы что-то сказали?\nНу да ладно\nЯ считаю что нет")
            .setThumbnail("https://i.gifer.com/origin/e9/e95f329a87d1e9431c7c2603a1ae6952_w200.gif")
            .setFooter(message.guild.name, message.guild.iconURL())

            message.reply(embed);
        }
        if(randomix == 5){
            let embed = new Discord.MessageEmbed()
            .setTitle("**Гадалка 228_336**")
            .setColor("RANDOM")
            .setTimestamp()
            .setDescription("Точно нет")
            .setThumbnail("https://i.gifer.com/origin/e9/e95f329a87d1e9431c7c2603a1ae6952_w200.gif")
            .setFooter(message.guild.name, message.guild.iconURL())

            message.reply(embed);
        }
        if(randomix == 6){
            let embed = new Discord.MessageEmbed()
            .setTitle("**Гадалка 228_336**")
            .setColor("RANDOM")
            .setTimestamp()
            .setDescription("Я уверена что да!")
            .setThumbnail("https://i.gifer.com/origin/e9/e95f329a87d1e9431c7c2603a1ae6952_w200.gif")
            .setFooter(message.guild.name, message.guild.iconURL())

            message.reply(embed);
        }
	}
};
