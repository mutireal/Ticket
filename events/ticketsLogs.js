const { MessageEmbed } = require('discord.js');

module.exports = (client, type, guild, user) => {
    const logChannelId = '1191679194804011018'; // Logların gönderileceği kanalın ID'si

    const logChannel = guild.channels.cache.get(logChannelId);

    if (!logChannel) {
        console.error(`Log kanalı bulunamadı: ${logChannelId}`);
        return;
    }

    const getFormattedTime = () => {
        const now = new Date();
        const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return formattedTime;
    };

    const getFormattedDateTime = () => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const closeDate = new Date();

        if (closeDate >= today) {
            return `Bugün ${getFormattedTime()}`;
        } else {
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);

            if (closeDate >= yesterday) {
                return `Dün ${getFormattedTime()}`;
            } else {
                return 'Daha eski bir tarih';
            }
        }
    };

    switch (type) {
        case 'ticketaç': {
            const embed = new MessageEmbed()
                .setColor('#00ff00')
                .setTitle('Yeni Bilet Oluşturuldu')
                .setDescription(`${user.username} az önce sunucuda bir bilet oluşturdu ${guild.name}`);

            logChannel.send({ embeds: [embed] });
            break;
        }

        case 'ticketkapat2': {
            const closeTime = getFormattedDateTime();
            const embed = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Bilet Kapatıldı')
                .setDescription(`${user.username} az önce sunucuda bir bilet kapattı ${guild.name}`)
                .addField('Kapatma Zamanı', closeTime);

            logChannel.send({ embeds: [embed] });
            break;
        }

        case 'yenidenticket': {
            const embed = new MessageEmbed()
                .setColor('#ffff00')
                .setTitle('Bilet Yeniden Açıldı')
                .setDescription(`${user.username} az önce sunucuda bir bilet yeniden açıldı ${guild.name}`);

            logChannel.send({ embeds: [embed] });
            break;
        }

        case 'kapat': {
            const closeTime = getFormattedDateTime();
            const embed = new MessageEmbed()
                .setColor('#0000ff')
                .setTitle('Bilet Silindi')
                .setDescription(`${user.username} az önce sunucudaki bir bileti sildim ${guild.name}`)
                .addField('Silme Zamanı', closeTime);

            logChannel.send({ embeds: [embed] });
            break;
        }

        case 'kayıt': {
            const closeTime = getFormattedDateTime();
            const embed = new MessageEmbed()
                .setColor('#ff9900')
                .setTitle('Bilet Kaydedildi')
                .setDescription(`${user.username} az önce sunucuya bir bilet kaydetti ${guild.name}`)
                .addField(' Kaydetme Zamanı', closeTime);

            logChannel.send({ embeds: [embed] });
            break;
        }
    }
};
