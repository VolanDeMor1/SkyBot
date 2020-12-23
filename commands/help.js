const Discord = module.require('discord.js');
const fs = require('fs');
module.exports = {
	name: 'помощь',
	description: 'Получить список команд.',
    aliases: ["help", "h", "хелп", "х"],
	usage: '[текст]',
	cooldown: 10,
	execute(message, args, bot) {
		const permissions = message.channel.permissionsFor(message.client.user);
			const embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('**Помощь по командам (1/2)**')
				.setTimestamp()
				.setDescription("Бот ещё на стадии разработки, в случае бага или ошибки пишите в лс <@575981243011956749>, спасибо.\n\n> **Музыкальные команды:**\n🔸 **-помощь** - Отображает список доступных команд.\n🔸 **-играй** - Начинает воспроизводить музыку в голосовом канале.\n🔸 **-стоп** - Отключает бота от голосового канала.\n🔸 **-очередь** - Отображает список треков.\n🔸 **-громкость** - Устанавливает громоксть воспроизведения.\n🔸 **-скип** - Пропускает текущий трек.\n🔸 **-пауза** - Ставит воспроизведение на паузу.\n🔸 **-продолжай** - Продолжает воспроизведение(после паузы).\n🔸 **-щачо** - Отображает текущий трек.")
				.setFooter(message.guild.name, message.guild.iconURL());

			message.channel.send(embed).then(msg=> {
                msg.react('◀️')
                msg.react('▶️')
                collector(msg);
                // let c = msg.createReactionCollector((r, u) => !u.bot, {max: 1, time:600000});
                // c.on("collect", (r, u) => {
                //     newlist(r, u);
                // });
                function newlist(r, u) {
                    if(r.emoji.name == '▶️'){
                        const embed = new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('**Помощь по командам (2/2)**')
                            .setTimestamp()
                            .setDescription("Бот ещё на стадии разработки, в случае бага или ошибки пишите в лс <@575981243011956749>, спасибо.\n\n> **Пользовательские команды:**\n🔸 **-аватар** - Отображает аватар пользователя.\n🔸 **-бюст** - Отображает бюст скина игрока майнкрафт (Лицензия).\n🔸 **-гадалка** - Она ответит да или нет.\n🔸 **-лицо** - Отображает лицо скина майнкрафт (Лицензия).\n🔸 **-погода** - Отображает текущую погоду в том или ином городе.\n🔸 **-евал** - Для разработчика бота.\n🔸 **-поиск** - Поиск изображений.\n🔸 **-шип** - Зашшиперите любых пользователей.\n🔸 **-убить** - Убейте любого пользователя.")
                            .setFooter(message.guild.name, message.guild.iconURL());
            
                        msg.edit(embed);
                        if(!permissions.has('MANAGE_MESSAGES')){
                            const embed = new Discord.MessageEmbed()
                                .setColor('#ff4f4f')
                                .setTitle('🚫 **Внимание!**')
                                .setTimestamp()
                                .setDescription("У меня недостаточно прав, удалять реакции (`MANAGE_MESSAGES`)")
                                .setFooter(message.guild.name, message.guild.iconURL());
                
                                msg.edit(embed)
                            return '';
                        }
                        collector(msg);
                        clearreact(msg, u.id);
                    }else if(r.emoji.name == '◀️'){
                        const embed = new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('**Помощь по командам (1/2)**')
                            .setTimestamp()
                            .setDescription("Бот ещё на стадии разработки, в случае бага или ошибки пишите в лс <@575981243011956749>, спасибо.\n\n> **Музыкальные команды:**\n🔸 **-помощь** - Отображает список доступных команд.\n🔸 **-играй** - Начинает воспроизводить музыку в голосовом канале.\n🔸 **-стоп** - Отключает бота от голосового канала.\n🔸 **-очередь** - Отображает список треков.\n🔸 **-громкость** - Устанавливает громоксть воспроизведения.\n🔸 **-скип** - Пропускает текущий трек.\n🔸 **-пауза** - Ставит воспроизведение на паузу.\n🔸 **-продолжай** - Продолжает воспроизведение(после паузы).\n🔸 **-щачо** - Отображает текущий трек.")
                            .setFooter(message.guild.name, message.guild.iconURL());

                        msg.edit(embed);
                        if(!permissions.has('MANAGE_MESSAGES')){
                            const embed = new Discord.MessageEmbed()
                                .setColor('#ff4f4f')
                                .setTitle('🚫 **Внимание!**')
                                .setTimestamp()
                                .setDescription("У меня недостаточно прав, удалять реакции (`MANAGE_MESSAGES`)")
                                .setFooter(message.guild.name, message.guild.iconURL());
                
                                msg.edit(embed)
                            return '';
                        }
                        collector(msg);
                        clearreact(msg, u.id);
                    }else{
                        if(!permissions.has('MANAGE_MESSAGES')){
                            const embed = new Discord.MessageEmbed()
                                .setColor('#ff4f4f')
                                .setTitle('🚫 **Внимание!**')
                                .setTimestamp()
                                .setDescription("У меня недостаточно прав, удалять реакции (`MANAGE_MESSAGES`)")
                                .setFooter(message.guild.name, message.guild.iconURL());
                
                                msg.edit(embed)
                            return '';
                        }
                        allreact(msg, u.id);
                        collector(msg);
                    }
                };

                function collector(msg) {
                    let c = msg.createReactionCollector((r, u) => !u.bot, {max: 1, time:600000});
                    c.on("collect", (r, u) => {
                        if(u.id !== message.author.id){
                            clearreact(msg, u.id);
                            collector(msg);
                            return "";
                        }else{
                            newlist(r, u);
                        }
                    });
                };

                async function clearreact(msg, uid){
                    const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(uid));
                    for (const reaction of userReactions.values()) {
                        await reaction.users.remove(uid).then(()=>{
                            msg.react('◀️')
                            msg.react('▶️')
                        });}
                }

                async function allreact(msg, uid){
                    const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(uid));
                    for (const reaction of userReactions.values()) {
                        await reaction.users.remove(uid);
                    }
                }
                    // msg.reaction.users.remove(uid)
            });
	}
};
