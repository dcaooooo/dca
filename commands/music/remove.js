const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'remove',
    description: "ลบเพลงออกจากคิว",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'เพลง/url ของแทร็กที่คุณต้องการลบ',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'number',
            description: 'ตำแหน่งในคิวที่เพลงนั้นอยู่',
            type: ApplicationCommandOptionType.Number,
            required: false,
        }
    ],

    async execute({ inter }) { 
        const number =  inter.options.getNumber('number')
        const track = inter.options.getString('song');

        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `ไม่มีเพลงที่กำลังเล่นอยู่ ${inter.member}... ลองใหม่อีกครั้ง ? ❌`, ephemeral: true });
        if (!track && !number) inter.reply({ content: `คุณต้องใช้ตัวเลือกใดตัวเลือกหนึ่งเพื่อลบเพลง ${inter.member}... ลองใหม่อีกครั้ง ? ❌`, ephemeral: true });

        if (track) {

        for (let song of queue.tracks) {
            if (song.title === track || song.url === track ) {
                queue.remove(song)
                return inter.reply({ content: `removed ${track} จากคิว ✅` });
            }

        }

        return inter.reply({ content: `ไม่พบ ${track} ${inter.member}... ลองใช้ url หรือชื่อเต็มของเพลง ? ❌`, ephemeral: true });    
        }

        if (number) {

            const index = number - 1
            const trackname = queue.tracks[index].title

            if (!trackname) return inter.reply({ content: `ดูเหมือนจะไม่มีอยู่จริง ${inter.member}...  ลองใหม่อีกครั้ง ?❌`, ephemeral: true });   

            queue.remove(index);
            
            return inter.reply({ content: `ลบ ${trackname} จากคิว ✅` });
        }


         
    }
}