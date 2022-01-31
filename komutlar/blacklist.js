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

if(message.author.id != '893950890187300914' && message.author.id != '261852469628239873'  && message.author.id != '244835762577735680'  && message.author.id != '823511480858443816') return message.channel.send(taha.setDescription(`${tik} **\`Sirius Guard\`** **Bota erişiminiz yok!** ${tik}`)).then(xx => xx.delete({ timeout: 150000 }))

const kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0])
      
if(!kullanıcı) return message.channel.send(taha.setDescription(`${dikkat} **Lütfen Bir Kullanıcı Belirt.** ${dikkat}`)).then(xx => xx.delete({ timeout: 150000 }))
  
db.delete(`guvenli_${kullanıcı.id}`)
message.channel.send(taha.setDescription(`${tik} ${kullanıcı} **Başarıyla** **\`Kara Listeye\`** **Eklendi.**`)).then(xx => xx.delete({ timeout: 150000 }))
  

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["güvenlideğil", "guvenlideğil", "blacklist", "güvenli-degil", "guvenli-degil"],
  permLevel: 0
};
exports.help = {
  name: 'Güvenli Çıkar',
  description: 'MeifyBot',
  usage: 'MeifyBot'
}