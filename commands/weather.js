const Discord = module.require("discord.js");
const fs = require("fs");
const request = require('request');
const moment = require('moment');
const argv = require('yargs').argv;

module.exports = {
	name: 'погода',
    description: 'Посмотреть погоду в даный момент.',
    aliases: ["weather", "w"],
    usage: "[город/страна]",
    args: true,
	cooldown: 5,
	execute(message, args) {
		if(!args[0]){
            let embed = new Discord.MessageEmbed()
            .setTitle("Ошибка")
            .setFooter(message.guild.name, message.guild.iconURL())
            .setTimestamp()
            .setColor('#e22216')
            .setDescription(`Вы не указали город\n\n\`Важно!\`\n Название города должно состоять только на английском языке`)
            message.channel.send(embed)
            return "";
          }
          if(args[0]){
              let apiKey = '11dfcddb404bcae2598c1989d989fae0';
              let city = encodeURI(args.slice(0, 100000).join(" - "));
              let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}&lang=ru`
      
              // pixabay
              let apikeypixabay = '17023142-a5d1ac5809a5eef01daf1cc8c';
              let citipng = encodeURI(args.slice(0, 100000).join(" - "));
              let urlimage = `https://pixabay.com/api/?key=${apikeypixabay}&q=${citipng}&image_type=photo`;
      
      
                request(url, function (err, response, body){
                  if(err){
                    let embed = new Discord.MessageEmbed()
                    .setTitle("Ошибка")
                    .setFooter(message.guild.name, message.guild.iconURL())
                    .setTimestamp()
                    .setColor('#e22216')
                    .setDescription(`Город не найден`)
                    message.channel.send(embed)
                    return "";
                  }
                  let weather = JSON.parse(body)
                  if(!weather.main){
                    let embed = new Discord.MessageEmbed()
                    .setTitle("Ошибка")
                    .setFooter(message.guild.name, message.guild.iconURL())
                    .setTimestamp()
                    .setColor('#e22216')
                    .setDescription(`Город не найден`)
                    message.channel.send(embed)
                    return "";
                  }
                  if(!weather.sys){
                    let embed = new Discord.MessageEmbed()
                    .setTitle("Ошибка")
                    .setFooter(message.guild.name, message.guild.iconURL())
                    .setTimestamp()
                    .setColor('#e22216')
                    .setDescription(`Город не найден`)
                    message.channel.send(embed)
                    return "";
                  }
                  request(urlimage, function (err, response, imagecity){
                    let image = JSON.parse(imagecity)
                    const rise = require('moment')((weather.sys.sunrise * 1000)+(weather.timezone/60/60*1000*60*60)-10800000).format('HH:mm:ss');
                    const set = require('moment')((weather.sys.sunset * 1000)+(weather.timezone/60/60*1000*60*60)-10800000).format('HH:mm:ss');
                    const vremia = require('moment')(Date.now()+(weather.timezone/60/60*1000*60*60)-10800000).format('HH:mm:ss');
                    const data = require('moment')(Date.now()+(weather.timezone/60/60*1000*60*60)-10800000).format('DD.MM.yyyy');
                    const dennedeli = require('moment')(Date.now()+(weather.timezone/60/60*1000*60*60)-10800000).format('dddd');
                    if(!image.hits[0]){
                          let celciy1 = weather.main.temp - 32;
                          let celciy2 = celciy1 / 1.8;
                          let tochno = Math.round(celciy2);
                          let celciy3 = weather.main.temp_min - 32;
                          let celciy4 = celciy3 / 1.8;
                          let tochno2 = Math.round(celciy4);
                          let celciy5 = weather.main.temp_max - 32;
                          let celciy6 = celciy5 / 1.8;
                          let tochno3 = Math.round(celciy6);
                          let celciy7 = weather.main.feels_like - 32;
                          let celciy8 = celciy7 / 1.8;
                          let tochno4 = Math.round(celciy8);
                          let embed = new Discord.MessageEmbed()
                          .setTitle(`Погода в ${weather.name}, ${weather.sys.country}`)
                          .setColor('#ffaa00')
                          .setTimestamp()
                          .setDescription(`**${weather.weather[0].main}**, **${weather.weather[0].description}**`, true)
                          // .addField(`Страна:`, `\`${weather.sys.country}\``, true)
                          // .addField(`Город:`, `\`${weather.name}\``, true)
                          // .addField(`\`${weather.weather[0].main}\``, `\`${weather.weather[0].description}\``, true)
                          .addField(`Температура`, `Температура: \`${tochno}℃\`\nПо ощущению: \`${tochno4}℃\`\nМакс. температура: \`${tochno3}℃\`\nМин. температура: \`${tochno2}℃\``, true)
                          // .addField(`По ощущению:`, `\`${tochno4}℃\``, true)
                          // .addField(`Мин. температура:`, `\`${tochno2}℃\``, true)
                          // .addField(`Макс. температура:`, `\`${tochno3}℃\``, true)
                          .addField(`Дата`, `Дата: \`${data}\`\nДень недели: \`${dennedeli}\``, true)
                          .addField(`Другое`, `Давление: \`${weather.main.pressure} мм рт. ст.\`\nВлажность: \`${weather.main.humidity}%\`\nСкорость ветра: \`${weather.wind.speed}м/с\`\nОблачность: \`${weather.clouds.all}%\``, true)
                          .addField(`Время`, `Время: \`${vremia}\`\nРассвет: \`${rise}\`\nЗакат: \`${set}\``, true)
                          // .addField(`Скорость ветра:`, `\`${weather.wind.speed}м/с\``, true)
                          // .addField(`Видимость:`, `\`${weather.visibility}\``, true)
                          // .addField(`Давление:`, `\`${weather.main.pressure} мм рт. ст.\``, true)
                          // .addField(`Влажность:`, `\`${weather.main.humidity}%\``, true)
                          .setFooter(message.guild.name, message.guild.iconURL())
                      
                          message.channel.send(embed);
                          return "";
                    }else{
                          let celciy1 = weather.main.temp - 32;
                          let celciy2 = celciy1 / 1.8;
                          let tochno = Math.round(celciy2);
                          let celciy3 = weather.main.temp_min - 32;
                          let celciy4 = celciy3 / 1.8;
                          let tochno2 = Math.round(celciy4);
                          let celciy5 = weather.main.temp_max - 32;
                          let celciy6 = celciy5 / 1.8;
                          let tochno3 = Math.round(celciy6);
                          let celciy7 = weather.main.feels_like - 32;
                          let celciy8 = celciy7 / 1.8;
                          let tochno4 = Math.round(celciy8);
                          let embed = new Discord.MessageEmbed()
                          .setTitle(`Погода в ${weather.name}, ${weather.sys.country}`)
                          .setColor('#ffaa00')
                          .setTimestamp()
                          .setImage(image.hits[0].largeImageURL)
                          .setDescription(`**${weather.weather[0].main}**, **${weather.weather[0].description}**`)
                          // .addField(`Страна:`, `\`${weather.sys.country}\``, true)
                          // .addField(`Город:`, `\`${weather.name}\``, true)
                          // .addField(`\`${weather.weather[0].main}\``, `\`${weather.weather[0].description}\``, true)
                          .addField(`Температура`, `Температура: \`${tochno}℃\`\nПо ощущению: \`${tochno4}℃\`\nМакс. температура: \`${tochno3}℃\`\nМин. температура: \`${tochno2}℃\``, true)
                          // .addField(`По ощущению:`, `\`${tochno4}℃\``, true)
                          // .addField(`Мин. температура:`, `\`${tochno2}℃\``, true)
                          // .addField(`Макс. температура:`, `\`${tochno3}℃\``, true)
                          .addField(`Дата`, `Дата: \`${data}\`\nДень недели: \`${dennedeli}\``, true)
                          .addField(`Другое`, `Давление: \`${weather.main.pressure} мм рт. ст.\`\nВлажность: \`${weather.main.humidity}%\`\nСкорость ветра: \`${weather.wind.speed}м/с\`\nОблачность: \`${weather.clouds.all}%\``, true)
                          .addField(`Время`, `Время: \`${vremia}\`\nРассвет: \`${rise}\`\nЗакат: \`${set}\``, true)
                          // .addField(`Скорость ветра:`, `\`${weather.wind.speed}м/с\``, true)
                          // .addField(`Видимость:`, `\`${weather.visibility}\``, true)
                          // .addField(`Давление:`, `\`${weather.main.pressure} мм рт. ст.\``, true)
                          // .addField(`Влажность:`, `\`${weather.main.humidity}%\``, true)
                          .setFooter(message.guild.name, message.guild.iconURL())
                      
                          message.channel.send(embed);
                    }
                    })
                  })
          }
	}
};
