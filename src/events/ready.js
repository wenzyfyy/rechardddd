const figlet = require('figlet');
const chalk = require('chalk');
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		  figlet(client.user.tag, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(chalk.red.bold(data));
  });
  
    const { AutoPoster } = require('topgg-autoposter')

AutoPoster(process.env.topgg, client)
  .on('posted', () => {
    console.log('Posted stats to Top.gg!')
  })
    
    let channels = client.channels.cache.size;
  let guilds = client.guilds.cache.size;
  let users = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()
    const activities1 = [
      "BAKIM YAPILIYOR !"
    ]
    const activities = [
    `Reklam ve İşbirliği için wenzy.fy#4769`,
    `r!yardım, r!çal, r!davet`,
    `/ Komutları eklendi!`,
    `${guilds} Sunucu, ${users} Kullanıcı`,
  ]

  setInterval(() => {
      client.user.setActivity(`${activities1[Math.floor(Math.random() * activities.length)]}`);
  }, 15000)
    client.user.setPresence({ status: 'idle' })
  
  }
}
  