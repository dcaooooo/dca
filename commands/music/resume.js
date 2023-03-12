module.exports = {
    name: 'resume',
    description: 'เล่นต่อ',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `ไม่มีเพลงที่กำลังเล่นอยู่ ${inter.member}... ลองใหม่อีกครั้ง ? ❌`, ephemeral: true });
        

        if(!queue.connection.paused) return inter.reply({content: `เพลงกำลังเล่นอยู่, ${inter.member}... ลองใหม่อีกครั้ง ? ❌`, ephemeral: true})

        const success = queue.setPaused(false);
        
        return inter.reply({ content:success ? `เพลงปัจจุบัน ${queue.current.title} เล่นต่อ ✅` : `มีบางอย่างผิดปกติ ${inter.member}... ลองใหม่อีกครั้ง ? ❌`});
    },
};
