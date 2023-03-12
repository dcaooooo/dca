const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'project',
    description: "DCA PROJECTS",
    showHelp: true,

    execute({ client, inter }) {
        const commands = client.commands.filter(x => x.showHelp !== false);

        const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle('DCA PROJECTS')
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
        .addFields(
            { name: 'QR GEN', value: '[CLICK](https://spk-qr-generator.web.app)' },
            { name: 'KMITL Portfolio', value: '[CLICK](https://dcaportfolio-08.web.app)'},
            { name: 'KU Portfolio', value: '[CLICK](https://dcaportfolioku.web.app)'},
            { name: 'CRU Map', value: '[CLICK](https://crumap-967ed.web.app)'},)
        .setTimestamp()
        .setFooter({ text: 'DCA', iconURL: inter.member.avatarURL({ dynamic: true })});

        inter.reply({ embeds: [embed] });
    },
};