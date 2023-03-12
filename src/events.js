const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');

player.on('error', (queue, error) => {
    console.log(`เกิดข้อผิดพลาดจากคิว ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    console.log(`เกิดข้อผิดพลาดจากการเชื่อมต่อ ${error.message}`);
});

player.on('trackStart', (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    const embed = new EmbedBuilder()
    .setAuthor({name: `เริ่มเล่น ${track.title} in ${queue.connection.channel.name} 🎧`, iconURL: track.requestedBy.avatarURL()})
    .setColor('#13f857')

    const back = new ButtonBuilder()
    .setLabel('Back')
    .setCustomId(JSON.stringify({ffb: 'back'}))
    .setStyle('Primary')

    const skip = new ButtonBuilder()
    .setLabel('Skip')
    .setCustomId(JSON.stringify({ffb: 'skip'}))
    .setStyle('Primary')

    const resumepause = new ButtonBuilder()
    .setLabel('Resume & Pause')
    .setCustomId(JSON.stringify({ffb: 'resume&pause'}))
    .setStyle('Danger')

    const loop = new ButtonBuilder()
    .setLabel('Loop')
    .setCustomId(JSON.stringify({ffb: 'loop'}))
    .setStyle('Secondary')
    
    const queuebutton = new ButtonBuilder()
    .setLabel('Queue')
    .setCustomId(JSON.stringify({ffb: 'queue'}))
    .setStyle('Secondary')

    const row1 = new ActionRowBuilder().addComponents(back, loop, resumepause, queuebutton, skip)
    queue.metadata.send({ embeds: [embed], components: [row1] })
});

player.on('trackAdd', (queue, track) => {
   
    queue.metadata.send(`Track ${track.title} เพิ่มในคิว ✅`);
});

player.on('botDisconnect', (queue) => {
    queue.metadata.send('ถูกตัดการเชื่อมต่อจากช่องเสียง กำลังเคลียร์คิว... ❌');
});

player.on('channelEmpty', (queue) => {
    queue.metadata.send('ไม่มีใครอยู่ในช่องเสียง, ออกจากช่องเสียง... ❌');
});

player.on('queueEnd', (queue) => {
    queue.metadata.send('อ่านคิวทั้งหมดเสร็จแล้ว ✅');
});

player.on('tracksAdd', (queue, tracks) => {
    queue.metadata.send(`เพิ่มเพลงทั้งหมดในเพลย์ลิสต์ลงในคิว ✅`);
});