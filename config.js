module.exports = {
    app: {
        token: 'OTgyODI1Mjg5Nzc4MzM5ODgw.GY6SMm.eu5E9FSCooL-g3cxc9V2B7JDwo2t3g5tog2L3Q',
        playing: 'by DCA',
        global: true,
        guild: 'XXX'
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: '',
            commands: []
        },
        maxVol: 100,
        leaveOnEnd: true,
        loopMessage: false,
        spotifyBridge: true,
        defaultvolume: 75,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};
