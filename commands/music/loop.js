const { QueueRepeatMode } = require('discord-player');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'loop',
    description: 'เปิดหรือปิดการวนซ้ำของเพลงหรือทั้งคิว',
    voiceChannel: true,
    options: [
        {
        name: 'action' ,
        description: 'what action you want to preform on the loop',
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
            { name: 'Queue', value: 'enable_loop_queue' },
            { name: 'Disable', value: 'disable_loop'},
            { name: 'Song', value: 'enable_loop_song' },
        ],
    }
    ],
    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `ไม่มีเพลงที่กำลังเล่นอยู่ ${inter.member}... ลองใหม่อีกครั้ง ? ❌`, ephemeral: true });
        switch (inter.options._hoistedOptions.map(x => x.value).toString()) {
            case 'enable_loop_queue': {
                if (queue.repeatMode === 1) return inter.reply({ content:`ก่อนอื่นคุณต้องปิดการใช้งานเพลงปัจจุบันในโหมดวนซ้ำ (/loop Disable) ${inter.member}... ลองใหม่อีกครั้ง ? ❌`, ephemeral: true });

                const success = queue.setRepeatMode( QueueRepeatMode.QUEUE);

                return inter.reply({ content:success ? `โหมดเล่นซ้ำ **เปิดใช้งาน** คิวทั้งหมดจะถูกเล่นซ้ำ 🔁` : `มีบางอย่างผิดปกติ ${inter.member}... ลองใหม่อีกครั้ง ? ❌` });
                break
            }
            case 'disable_loop': {
                const success = queue.setRepeatMode(QueueRepeatMode.OFF);

                return inter.reply({ content:success ? `โหมดเล่นซ้ำ **ปิดใช้งาน**` : `มีบางอย่างผิดปกติ ${inter.member}... ลองใหม่อีกครั้ง ? ❌` });
                break
            }
            case 'enable_loop_song': {
                if (queue.repeatMode === 2) return inter.reply({ content:`ก่อนอื่นคุณต้องปิดการใช้งานเพลงปัจจุบันในโหมดวนซ้ำ (/loop Disable) ${inter.member}... ลองใหม่อีกครั้ง ? ❌`, ephemeral: true });

                const success = queue.setRepeatMode( QueueRepeatMode.TRACK);
                
                return inter.reply({ content:success ? `โหมดเล่นซ้ำ **เปิดใช้งาน** เพลงปัจจุบันจะเล่นซ้ำ (คุณสามารถหยุดการวนซ้ำด้วย /loop disable)` : `มีบางอย่างผิดปกติ ${inter.member}... ลองใหม่อีกครั้ง ? ❌` });
                break
            }
        }
       
    },
};