var servers = {};

module.exports = function(oM, nM) {
  if(nM.guild.id !== '510060453892980746') return;
  const config = {
    voice: "725648240132882433",
    parent: "718057876257636352"
    }
    //console.log(oM)
    //console.log(nM)
    if(!oM.guild.channels.cache.has(config.voice) || !oM.guild.channels.cache.has(config.voice)) throw console.log("Не указано либо айди канала, либо айди категории")
    if(oM.selfDeaf == nM.selfMute) return;
    if(oM.selfDeaf == nM.selfDeaf) return;
    if(nM.channelID === config.voice) {
      nM.guild.channels.create(`🌙`, {
        type: "VOICE",
        parent: config.parent,
        permissionOverwrites: [
          {
             id: nM.guild.id, //Права для роли @everyone
             allow: ["VIEW_CHANNEL"]
          },
          {
            id: nM.member.id, //Права для создателя канала
            allow: ["VIEW_CHANNEL", "MANAGE_CHANNELS"]
          }
        ]
      }).then(ch => nM.setChannel(ch))
    }
    if (!servers[nM.guild.id]) servers[nM.guild.id] = {};
    if (!servers[nM.guild.id].voiceMember)
      servers[nM.guild.id].voiceMember = {};
    if (!servers[nM.guild.id].voiceMember[nM.id])
      servers[nM.guild.id].voiceMember[nM.id] = {};
    if (!servers[nM.guild.id].voiceMember[nM.id].room)
      servers[nM.guild.id].voiceMember[nM.id].room = room.id;
    servers[nM.guild.id].voiceMember[nM.id].room = room.id;
    if (!servers[nM.guild.id].voiceMember[nM.id].interval)
      servers[nM.guild.id].voiceMember[nM.id].interval = {};
    servers[nM.guild.id].voiceMember[nM.id].interval = setInterval(() => {
      if (nM.voiceChannel) {
        if (
          servers[nM.guild.id].voiceMember[nM.id].room !=
          nM.voiceChannel.id
        ) {
          nM.voiceChannel.guild.channels
            .find(
              channel =>
                channel.id == servers[nM.guild.id].voiceMember[nM.id].room
            )
            .delete();
          clearInterval(servers[nM.guild.id].voiceMember[nM.id].interval);
        }
      } else if (!nM.voiceChannel) {
        oM.voiceChannel.guild.channels.find(channel=>channel.id == servers[nM.guild.id].voiceMember[nM.id].room).delete();
        clearInterval(servers[nM.guild.id].voiceMember[nM.id].interval);
      }
    }, 3000);
    if(oM.channel && !oM.channel.members.size && oM.channel.parentID == config.parent && oM.channelID !== config.voice) return oM.channel.delete();
    if (!servers[nM.guild.id]) servers[nM.guild.id] = {};
    if (!servers[nM.guild.id].voiceMember)
      servers[nM.guild.id].voiceMember = {};
    if (!servers[nM.guild.id].voiceMember[nM.id])
      servers[nM.guild.id].voiceMember[nM.id] = {};
    if (!servers[nM.guild.id].voiceMember[nM.id].room)
      servers[nM.guild.id].voiceMember[nM.id].room = 0;
    if (!oM.voiceChannel) return;
    if (servers[nM.guild.id].voiceMember[nM.id].room == oM.voiceChannel.id) {
      oM.voiceChannel.guild.channels
        .find(
          channel => channel.id == servers[nM.guild.id].voiceMember[nM.id].room
        )
        .delete();
    }
};