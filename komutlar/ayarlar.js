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

let durumm = db.fetch(`guvenli_${message.author.id}`, 'evet') || 'hayir'

const kanal = db.fetch(`kanalk_${message.guild.id}`, 'acik') || 'kapali';
const rol = db.fetch(`rolk_${message.guild.id}`, 'acik') || 'kapali';
const bot = db.fetch(`botk_${message.guild.id}`, 'acik') || 'kapali';
const sw = db.fetch(`swk_${message.guild.id}`, 'acik') || 'kapali';
const emoji = db.fetch(`emojik_${message.guild.id}`, 'acik') || 'kapali';
const caps = db.fetch(`capsk_${message.guild.id}`, 'acik') || 'kapali';
const link = db.fetch(`reqak_${message.guild.id}`, 'acik') || 'kapali';
const kfr = db.fetch(`küfürk_${message.guild.id}`, 'acik') || 'kapali';
const ban = db.fetch(`bank_${message.guild.id}`, 'acik') || 'kapali';


message.channel.send(taha.setDescription(`
**╔════════════════════════════╗**
**║**${ok} **Kanal Koruma Sistemi :** **\`${kanal}\`**
**║**${ok} **Rol Koruma Sistemi :** **\`${rol}\`**
**║**${ok} **Emoji Koruma Sistemi :** **\`${emoji}\`**
**║**${ok} **Bot Koruma Sistemi :** **\`${bot}\`**
**║**${ok} **Sunucu Koruma Sistemi :** **\`${sw}\`**
**║**${ok} **Ban Koruma Sistemi :** **\`${ban}\`**
**║**
**║**${ok} **Reklam Engelleme Sistemi :** **\`${link}\`**
**║**${ok} **Küfür Engelleme Sistemi :** **\`${kfr}\`**
**║**${ok} **Capslock Engelleme Sistemi :** **\`${caps}\`**
**║**
**║**${ok} **Güvenli :** **\`${durumm}\`**
**╚════════════════════════════╝**`)).then(xx => xx.delete({ timeout: 120000 }))

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ayarlar", "options"],
  permLevel: 0
};
exports.help = {
  name: 'Ayarlar Sistemi',
  description: 'MeifyBot',
  usage: 'MeifyBot'
}