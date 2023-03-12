module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `ไม่มีเพลงที่กำลังเล่นอยู่... ลองใหม่อีกครั้ง ? ❌`, ephemeral: true });

    if (!queue.previousTracks[1]) return inter.reply({ content: `There was no music played before ${inter.member}... ลองใหม่อีกครั้ง ? ❌`, ephemeral: true });

    await queue.back();

    inter.reply({ content:`Playing the **previous** track ✅`, ephemeral: true});
}
