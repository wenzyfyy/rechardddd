module.exports = {
    slash: true, // Komutun slash komut olup olmadığını belirtiyor, prefixli ise false yazınız.
    name: 'ping',  // Komutun ismi
    description: 'Ping komutu.', // Komutun açıklaması
    options: [
        {   // 1. seçenek (option)
            name: 'test',  // Seçeneğin ismi
            description: 'Test seçeneği',  // Seçeneğin açıklaması
            type: 'NUMBER', // Seçeneğin türü (Discord API'de büyük harf kullanılmalı)
            required: true // Bu seçeneğin zorunlu olup olmadığını belirtir
        },
        {   // 2. seçenek (option)
            name: 'deneme',
            description: 'Deneme seçeneği',
            type: 'STRING', // Seçeneğin türü (String olarak tanımlandı)
            required: false // Bu seçeneğin isteğe bağlı olduğunu belirtir
        }
    ],
    async execute(client, interaction) {  // Slash komut çalıştırılırken kullanılacak fonksiyon
        // Komuta verilen yanıtta "await" kullanmak önemlidir.
        await interaction.reply({ 
            content: `> Ping: **${client.ws.ping} ms**`, 
            ephemeral: true // Yanıtın sadece komutu yazana gözükmesini sağlar
        });
    },
};
