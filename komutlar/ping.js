const Discord = require('discord.js')
const db = require('quick.db')
const moment = require('moment')
const ms = require('ms')
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
const ok = (ayarlar.ok)
const dikkat = (ayarlar.dikkat)
const reddet = (ayarlar.reddet)
const tik = (ayarlar.tik)
  
const taha = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${ayarlar.durum}`, message.author.avatarURL({ dynamic: true })).setTimestamp()

const ping = `${Math.round(client.ws.ping)}`;
  
const ping1 = new Date().getTime() - message.createdTimestamp

message.channel.send(taha.setDescription(`
${ok} **Gecikme Sürem :** **\`${ping}MS\`**

${ok} **Mesaj Gecikme Süresi :** **\`${ping1}MS\`**`)).then(xx => xx.delete({ timeout: 120000 }))

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ping",'gecikme','gecikme-surem','gecikme-sürem'],
  permLevel: 0
};
exports.help = {
  name: 'Ping',
  description: 'MeifyBot',
  usage: 'MeifyBot'
}