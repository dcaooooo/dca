module.exports = {
    name: 'shuffle',
    description: 'สลับแทร็ก',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `ไม่มีเพลงที่กำลังเล่นอยู่ ${inter.member}... ลองใหม่อีกครั้ง ? ❌`, ephemeral: true });

        if (!queue.tracks[0]) return inter.reply({ content: `ไม่มีเพลงในคิวหลังจากเพลงปัจจุบัน ${inter.member}... ลองใหม่อีกครั้ง ? ❌`, ephemeral: true });

        await queue.shuffle();

        return inter.reply({ content:`สับคิว **${queue.tracks.length}** เพลง ! ✅`});
    },
};