module.exports = {
    name: 'back',
    description: "เล่นเพลงก่อนหน้า",
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `ไม่มีเพลงที่กำลังเล่น ${inter.member}... ลองใหม่อีกครั้ง ? ❌`, ephemeral: true });

        if (!queue.previousTracks[1]) return inter.reply({ content: `ไม่มีเพลงก่อนหน้า ${inter.member}... ลองใหม่อีกครั้ง ? ❌`, ephemeral: true });

        await queue.back();

        inter.reply({ content:`กำลังเล่นแทร็ก **ก่อนหน้า** ✅`});
    },
};