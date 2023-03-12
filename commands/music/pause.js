module.exports = {
    name: 'pause',
    description: 'หยุดการเล่นเพลงชั่วคราว',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `ไม่มีเพลงที่กำลังเล่นอยู่ ${inter.member}... ลองใหม่อีกครั้ง ? ❌`, ephemeral: true });
        
        if(queue.connection.paused) return inter.reply({content: 'แทร็กถูกหยุดชั่วคราว!', ephemeral: true})

        if(queue.connection.paused) return inter.reply({content: `แทร็กถูกหยุดชั่วคราว, ${inter.member}... ลองใหม่อีกครั้ง ? ❌`, ephemeral: true})

        const success = queue.setPaused(true);
        
        return inter.reply({ content: success ? `เพลงปัจจุบัน ${queue.current.title} paused ✅` : `มีบางอย่างผิดปกติ ${inter.member}... ลองใหม่อีกครั้ง ? ❌` });
    },
};
