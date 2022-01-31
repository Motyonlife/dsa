const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require('../ayarlar.json');

module.exports.run = async (client, message, args) => {
const dikkat = (ayarlar.dikkat)
const reddet = (ayarlar.reddet)
const ok = (ayarlar.ok)
const tik = (ayarlar.tik)
const tahaembed = new Discord.MessageEmbed()
.setColor('BLACK')
.setFooter(`${ayarlar.durum}`, message.author.avatarURL({ dynamic: true }))
.setTimestamp()

if(message.author.id != '893950890187300914' && message.author.id != '261852469628239873'  && message.author.id != '244835762577735680'  && message.author.id != '823511480858443816') return message.channel.send(tahaembed.setDescription(`${tik} **\`Sirius Guard\`** **Bota erişiminiz yok!** ${tik}`)).then(xx => xx.delete({ timeout: 150000 }))
 
  let user = (message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author);
  
let top = message.guild.members.cache.filter(user => db.get(`guvenli_${user.id}`, 'evet')).array().slice(0, 99).map((uye) =>  `${ok} **<@${uye.id}>**`).join('\n');
message.channel.send(tahaembed.setDescription(`${top}`)).then(xx => xx.delete({ timeout: 120000 }))
  
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['top','güvenliler', 'guvenliler', 'güvenliliste', 'güvenli-liste', 'guvenliliste', 'guvenli-liste'],
  permLevel: 0
}
exports.help = {
  name: 'Güvenli Listesi',
  description: "toplam teyit gösterir",
  usage: 'top'
}
