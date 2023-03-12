module.exports = {
    name: 'stop',
    description: 'หยุดเล่นเพลงทั้งหมด',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content:`ไม่มีเพลงที่กำลังเล่นอยู่ ${inter.member}... ลองใหม่อีกครั้ง ? ❌`, ephemeral: true });

        queue.destroy();

        inter.reply({ content: `หยุดเล่นเพลงทั้งหมด ✅`});
    },
};