module.exports = {
    name: 'skip',
    description: 'เล่นเพลงต่อไป',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

         if (!queue || !queue.playing) return inter.reply({ content:`ไม่มีเพลงที่กำลังเล่นอยู่ ${inter.member}... ลองใหม่อีกครั้ง ? ❌`, ephemeral: true });

        const success = queue.skip();

        return inter.reply({ content: success ? `เพลงปัจจุบัน ${queue.current.title} ถูกข้าม ✅` : `มีบางอย่างผิดปกติ ${inter.member}... ลองใหม่อีกครั้ง ? ❌`});
    },
};