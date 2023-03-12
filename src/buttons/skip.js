module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `ไม่มีเพลงที่กำลังเล่นอยู่... ลองใหม่อีกครั้ง ? ❌`, ephemeral: true });
    
    const success = queue.skip();

    return inter.reply({ content: success ? `Current music ${queue.current.title} skipped ✅` : `มีบางอย่างผิดปกติ ${inter.member}... ลองใหม่อีกครั้ง ? ❌`, ephemeral: true});
}