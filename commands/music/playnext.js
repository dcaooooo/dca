const { ApplicationCommandOptionType } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'playnext',
    description: "เล่นเพลงต่อไป",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'เล่นเพลงต่อไป',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ inter }) {
	await inter.deferReply();
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.editReply({ content: `ไม่มีเพลงที่กำลังเล่นอยู่ ${inter.member}... ลองใหม่อีกครั้ง ? ❌`, ephemeral: true });

        const song = inter.options.getString('song');

        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return inter.editReply({ content: `ไม่พบผลลัพธ์ ${inter.member}... ลองใหม่อีกครั้ง ? ❌`, ephemeral: true });

       if (res.playlist) return inter.editReply({ content: `คำสั่งนี้ไม่รองรับเพลย์ลิสต์ ${inter.member}... ลองใหม่อีกครั้ง ? ❌`, ephemeral: true });

        queue.insert(res.tracks[0], 0)

        await inter.editReply({ content:`แทร็กถูกแทรกลงในคิวแล้ว... จะเล่นต่อไป 🎧`});

    }
}
