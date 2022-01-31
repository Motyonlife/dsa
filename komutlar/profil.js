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

let kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author

if(!db.fetch(`guvenli_${kullanıcı.id}`)) return message.channel.send(taha.setDescription(`${dikkat} **Bu Kullanıcı** **\`Kara Listeye\`** **Eklenmiş.** ${dikkat}`)).then(xx => xx.delete({ timeout: 15000 }))
  
if(db.fetch(`guvenli_${kullanıcı.id}`, 'evet')) return message.channel.send(taha.setDescription(`${tik} **Bu Kullanıcı** **\`Beyaz Listeye\`** **Eklenmiş.** ${tik}`)).then(xx => xx.delete({ timeout: 15000 }))

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["durum", 'profil', 'profile'],
  permLevel: 0
};
exports.help = {
  name: 'Deneme',
  description: 'MeifyBot',
  usage: 'MeifyBot'
}