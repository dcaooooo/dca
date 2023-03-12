const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'search',
    description: 'หาเพลง',
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'เพลงที่ค้องการหา',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ client, inter }) {
        const song = inter.options.getString('song');

        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return inter.reply({ content: `ไม่พบผลลัพธ์ ${inter.member}... ลองใหม่อีกครั้ง ? ❌`, ephemeral: true });

        const queue = await player.createQueue(inter.guild, {
            metadata: inter.channel,
            leaveOnEnd: client.config.opt.leaveOnEnd,
        });
        const maxTracks = res.tracks.slice(0, 10);

        const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setAuthor({ name: `ผลลัพธ์สำหรับ ${song}`, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
        .setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\nเลือกตัวเลือกระหว่าง **1** และ **${maxTracks.length}** หรือ **ยกเลิก** ⬇️`)
        .setTimestamp()
        .setFooter({ text: 'DCA', iconURL: inter.member.avatarURL({ dynamic: true })})

        inter.reply({ embeds: [embed] });

        const collector = inter.channel.createMessageCollector({
            time: 15000,
            max: 1,
            errors: ['time'],
            filter: m => m.author.id === inter.member.id
        });

        collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'cancel') return inter.followUp({ content: `ยกเลิกการค้นหาแล้ว ✅`, ephemeral: true }), collector.stop();

            const value = parseInt(query);
            if (!value || value <= 0 || value > maxTracks.length) return inter.followUp({ content: `การตอบกลับไม่ถูกต้อง ลองป้อนค่าระหว่าง **1** และ **${maxTracks.length}** or **cancel**... ลองใหม่อีกครั้ง ? ❌`, ephemeral: true });

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(inter.member.voice.channel);
            } catch {
                await player.deleteQueue(inter.guildId);
                return inter.followUp({ content: `I can't join the voice channel ${inter.member}... ลองใหม่อีกครั้ง ? ❌`, ephemeral: true });
            }

            await inter.followUp(`กำลังโหลดการค้นหาของคุณ... 🎧`);

            queue.addTrack(res.tracks[query.content - 1]);

            if (!queue.playing) await queue.play();
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') return inter.followUp({ content:`หมดเวลาการค้นหา ${inter.member}... ลองใหม่อีกครั้ง ? ❌`, ephemeral: true })
        });
    },
};