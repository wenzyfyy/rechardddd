const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = async (client, message, pages, timeout, queueLength, queueDuration) => {
    if (!message || !message.channel) throw new Error('Kanal erişilebilir değil.');
    if (!pages) throw new Error('Sayfalar belirtilmemiş.');

    // Daha anlamlı buton adları
    const geriButonu = new MessageButton()
        .setCustomId('back')
        .setLabel('⬅')
        .setStyle('SECONDARY');

    const ileriButonu = new MessageButton()
        .setCustomId('next')
        .setLabel('➡')
        .setStyle('SECONDARY');

    const butonSatırı = new MessageActionRow()
        .addComponents(geriButonu, ileriButonu);

    let sayfa = 0;
    
    // Kuyruk uzunluğu ve süresi için varsayılan değer kontrolü
    const curPage = await message.channel.send({
        embeds: [pages[sayfa].setFooter({
            text: `Sayfa • ${sayfa + 1}/${pages.length} | ${queueLength || '0'} • Şarkılar | ${queueDuration || '00:00'} • Toplam süre`
        })],
        components: [butonSatırı],
        allowedMentions: { repliedUser: false }
    });
    
    if (pages.length === 0) return;

    // Filtre basitleştirildi
    const filter = (interaction) => interaction.user.id === message.author.id;

    const collector = curPage.createMessageComponentCollector({
        filter,
        time: timeout || 60000 // Varsayılan 60 saniye zaman aşımı
    });

    collector.on('collect', async (interaction) => {
        await interaction.deferUpdate(); // Her etkileşimde güncelleme yapılır
        
        if (interaction.customId === 'back') {
            sayfa = sayfa > 0 ? --sayfa : pages.length - 1;
        } else if (interaction.customId === 'next') {
            sayfa = sayfa + 1 < pages.length ? ++sayfa : 0;
        }

        // Embed güncelleniyor
        curPage.edit({
            embeds: [pages[sayfa].setFooter({
                text: `Sayfa • ${sayfa + 1}/${pages.length} | ${queueLength || '0'} • Şarkılar | ${queueDuration || '00:00'} • Toplam süre`
            })],
            components: [butonSatırı]
        });
    });

    collector.on('end', () => {
        // Süre bitince butonlar devre dışı bırakılır
        const disabledButtons = new MessageActionRow()
            .addComponents(
                geriButonu.setDisabled(true),
                ileriButonu.setDisabled(true)
            );

        curPage.edit({
            embeds: [pages[sayfa].setFooter({
                text: `Sayfa • ${sayfa + 1}/${pages.length} | ${queueLength || '0'} • Şarkılar | ${queueDuration || '00:00'} • Toplam süre`
            })],
            components: [disabledButtons]
        });
    });

    return curPage;
};
