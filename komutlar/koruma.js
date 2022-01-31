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
  
if(!args[0]) return message.channel.send(taha.setDescription(`${dikkat} **${message.author} Lütfen Yapmak İstediğin İşlemi Seç.** ${dikkat}
**╔══════════════════════════════════════╗**
**║**${ok} **Kanal Koruma Sistemini Ayarlamak İçin** **\`${ayarlar.prefix}koruma kanal aç/kapat\`**
**║**${ok} **Rol Koruma Sistemini Ayarlamak İçin** **\`${ayarlar.prefix}koruma rol aç/kapat\`**
**║**${ok} **Emoji Koruma Sistemini Ayarlamak İçin** **\`${ayarlar.prefix}koruma emoji aç/kapat\`**
**║**${ok} **Bot Koruma Sistemini Ayarlamak İçin** **\`${ayarlar.prefix}koruma bot aç/kapat\`**
**║**${ok} **Sunucu Koruma Sistemini Ayarlamak İçin** **\`${ayarlar.prefix}koruma sunucu aç/kapat\`**
**║**${ok} **Ban Koruma Sistemini Ayarlamak İçin** **\`${ayarlar.prefix}koruma ban aç/kapat\`**
**║**
**║**${ok} **Reklam Engelleme Sistemini Ayarlamak İçin** **\`${ayarlar.prefix}koruma reklam aç/kapat\`**
**║**${ok} **Küfür Engelleme Sistemini Ayarlamak İçin** **\`${ayarlar.prefix}koruma küfür aç/kapat\`**
**║**${ok} **CapsLock Engelleme Sistemini Ayarlamak İçin** **\`${ayarlar.prefix}koruma capslock aç/kapat\`**
**╚══════════════════════════════════════╝**`)).then(xx => xx.delete({ timeout: 120000 }))

//-----------------------------------------------------------------------------------------------  
  
if (args[0] === 'kanal' || args[0] === "channel") {
 
if(!args[1]) return message.channel.send(taha.setDescription(`${dikkat} **${message.author} Lütfen Yapmak İstediğin İşlemi Seç.** ${dikkat}
**╔══════════════════════════════════════╗**
**║**${ok} **Kanal Koruma Sistemini Açmak İçin** **\`${ayarlar.prefix}koruma kanal aç\`**
**║**${ok} **Kanal Koruma Sistemini Kapatmak İçin** **\`${ayarlar.prefix}koruma kanal kapat\`**
**╚══════════════════════════════════════╝**`)).then(xx => xx.delete({ timeout: 15000 }))
  
if(args[1] === 'aç' || args[1] === "open") {
db.set(`kanalk_${message.guild.id}`, 'acik')
message.channel.send(taha.setDescription(`${tik} **Kanal Koruma Sistemi Başarıyla Aktif Edildi.**`)).then(xx => xx.delete({ timeout: 15000 }))
}
  
  
if(args[1] === 'kapat' || args[1] === "close") {
db.delete(`kanalk_${message.guild.id}`)
message.channel.send(taha.setDescription(`${tik} **Kanal Koruma Sistemi Başarıyla Kapatıldı.**`)).then(xx => xx.delete({ timeout: 15000 }))
}
}
  
//-----------------------------------------------------------------------------------------------
  
if (args[0] === 'rol' || args[0] === "role") {
 
if(!args[1]) return message.channel.send(taha.setDescription(`${dikkat} **${message.author} Lütfen Yapmak İstediğin İşlemi Seç.** ${dikkat}
**╔══════════════════════════════════════╗**
**║**${ok} **Rol Koruma Sistemini Açmak İçin** **\`${ayarlar.prefix}koruma rol aç\`**
**║**${ok} **Rol Koruma Sistemini Kapatmak İçin** **\`${ayarlar.prefix}koruma rol kapat\`**
**╚══════════════════════════════════════╝**`)).then(xx => xx.delete({ timeout: 15000 }))
  
if(args[1] === 'aç' || args[1] === "open") {
db.set(`rolk_${message.guild.id}`, 'acik')
message.channel.send(taha.setDescription(`${tik} **Rol Koruma Sistemi Başarıyla Aktif Edildi.**`)).then(xx => xx.delete({ timeout: 15000 }))
}
  
if(args[1] === 'kapat' || args[1] === "close") {
db.delete(`rolk_${message.guild.id}`)
message.channel.send(taha.setDescription(`${tik} **Rol Koruma Sistemi Başarıyla Kapatıldı.**`)).then(xx => xx.delete({ timeout: 15000 }))
}
}
  
//-----------------------------------------------------------------------------------------------
  
if (args[0] === 'emoji' || args[0] === "emojı") {
 
if(!args[1]) return message.channel.send(taha.setDescription(`${dikkat} **${message.author} Lütfen Yapmak İstediğin İşlemi Seç.** ${dikkat}
**╔══════════════════════════════════════╗**
**║**${ok} **Emoji Koruma Sistemini Açmak İçin** **\`${ayarlar.prefix}koruma emoji aç\`**
**║**${ok} **Emoji Koruma Sistemini Kapatmak İçin** **\`${ayarlar.prefix}koruma emoji kapat\`**
**╚══════════════════════════════════════╝**`)).then(xx => xx.delete({ timeout: 15000 }))
  
if(args[1] === 'aç' || args[1] === "open") {
db.set(`emojik_${message.guild.id}`, 'acik')
message.channel.send(taha.setDescription(`${tik} **Emoji Koruma Sistemi Başarıyla Aktif Edildi.**`)).then(xx => xx.delete({ timeout: 15000 }))
}
  
  
if(args[1] === 'kapat' || args[1] === "close") {
db.delete(`emojik_${message.guild.id}`)
message.channel.send(taha.setDescription(`${tik} **Emoji Koruma Sistemi Başarıyla Kapatıldı.**`)).then(xx => xx.delete({ timeout: 15000 }))
}
}
  
//-----------------------------------------------------------------------------------------------

if (args[0] === 'bot' || args[0] === "bots") {
 
if(!args[1]) return message.channel.send(taha.setDescription(`${dikkat} **${message.author} Lütfen Yapmak İstediğin İşlemi Seç.** ${dikkat}
**╔══════════════════════════════════════╗**
**║**${ok} **Bot Koruma Sistemini Açmak İçin** **\`${ayarlar.prefix}koruma bot aç\`**
**║**${ok} **Bot Koruma Sistemini Kapatmak İçin** **\`${ayarlar.prefix}koruma bot kapat\`**
**╚══════════════════════════════════════╝**`)).then(xx => xx.delete({ timeout: 15000 }))
  
if(args[1] === 'aç' || args[1] === "open") {
db.set(`botk_${message.guild.id}`, 'acik')
message.channel.send(taha.setDescription(`${tik} **Bot Koruma Sistemi Başarıyla Aktif Edildi.**`)).then(xx => xx.delete({ timeout: 15000 }))
}
  
  
if(args[1] === 'kapat' || args[1] === "close") {
db.delete(`botk_${message.guild.id}`)
message.channel.send(taha.setDescription(`${tik} **Bot Koruma Sistemi Başarıyla Kapatıldı.**`)).then(xx => xx.delete({ timeout: 15000 }))
}
}
  
//-----------------------------------------------------------------------------------------------
  
if (args[0] === 'sunucu' || args[0] === "guild") {
 
if(!args[1]) return message.channel.send(taha.setDescription(`${dikkat} **${message.author} Lütfen Yapmak İstediğin İşlemi Seç.** ${dikkat}
**╔══════════════════════════════════════╗**
**║**${ok} **Sunucu Koruma Sistemini Açmak İçin** **\`${ayarlar.prefix}koruma sunucu aç\`**
**║**${ok} **Sunucu Koruma Sistemini Kapatmak İçin** **\`${ayarlar.prefix}koruma sunucu kapat\`**
**╚══════════════════════════════════════╝**`)).then(xx => xx.delete({ timeout: 15000 }))
  
if(args[1] === 'aç' || args[1] === "open") {
db.set(`swk_${message.guild.id}`, 'acik')
message.channel.send(taha.setDescription(`${tik} **Sunucu Koruma Sistemi Başarıyla Aktif Edildi.**`)).then(xx => xx.delete({ timeout: 15000 }))
}
  
  
if(args[1] === 'kapat' || args[1] === "close") {
db.delete(`swk_${message.guild.id}`)
message.channel.send(taha.setDescription(`${tik} **Sunucu Koruma Sistemi Başarıyla Kapatıldı.**`)).then(xx => xx.delete({ timeout: 15000 }))
}
}
  
//-----------------------------------------------------------------------------------------------
  
if (args[0] === 'küfür' || args[0] === "kufur") {
 
if(!args[1]) return message.channel.send(taha.setDescription(`${dikkat} **${message.author} Lütfen Yapmak İstediğin İşlemi Seç.** ${dikkat}
**╔══════════════════════════════════════╗**
**║**${ok} **Küfür Engelleme Sistemini Açmak İçin** **\`${ayarlar.prefix}koruma küfür aç\`**
**║**${ok} **Küfür Engelleme Sistemini Kapatmak İçin** **\`${ayarlar.prefix}koruma küfür kapat\`**
**╚══════════════════════════════════════╝**`)).then(xx => xx.delete({ timeout: 15000 }))
  
if(args[1] === 'aç' || args[1] === "open") {
db.set(`küfürk_${message.guild.id}`, 'acik')
message.channel.send(taha.setDescription(`${tik} **Küfür Engelleme Sistemi Başarıyla Aktif Edildi.**`)).then(xx => xx.delete({ timeout: 15000 }))
}
  
  
if(args[1] === 'kapat' || args[1] === "close") {
db.delete(`küfürk_${message.guild.id}`)
message.channel.send(taha.setDescription(`${tik} **Küfür Engelleme Sistemi Başarıyla Kapatıldı.**`)).then(xx => xx.delete({ timeout: 15000 }))
}
}
  
//-----------------------------------------------------------------------------------------------
  
if (args[0] === 'reklam' || args[0] === "req") {
 
if(!args[1]) return message.channel.send(taha.setDescription(`${dikkat} **${message.author} Lütfen Yapmak İstediğin İşlemi Seç.** ${dikkat}
**╔══════════════════════════════════════╗**
**║**${ok} **Reklam Engelleme Sistemini Açmak İçin** **\`${ayarlar.prefix}koruma reklam aç\`**
**║**${ok} **Reklam Engelleme Sistemini Kapatmak İçin** **\`${ayarlar.prefix}koruma reklam kapat\`**
**╚══════════════════════════════════════╝**`)).then(xx => xx.delete({ timeout: 15000 }))
  
if(args[1] === 'aç' || args[1] === "open") {
db.set(`reqak_${message.guild.id}`, 'acik')
message.channel.send(taha.setDescription(`${tik} **Reklam Engelleme Sistemi Başarıyla Aktif Edildi.**`)).then(xx => xx.delete({ timeout: 15000 }))
}
  
  
if(args[1] === 'kapat' || args[1] === "close") {
db.delete(`reqak_${message.guild.id}`)
message.channel.send(taha.setDescription(`${tik} **Reklam Engelleme Sistemi Başarıyla Kapatıldı.**`)).then(xx => xx.delete({ timeout: 15000 }))
}
}
  
//-----------------------------------------------------------------------------------------------
  
if (args[0] === 'capslock' || args[0] === "caps") {
 
if(!args[1]) return message.channel.send(taha.setDescription(`${dikkat} **${message.author} Lütfen Yapmak İstediğin İşlemi Seç.** ${dikkat}
**╔══════════════════════════════════════╗**
**║**${ok} **CapsLock Engelleme Sistemini Açmak İçin** **\`${ayarlar.prefix}koruma capslock aç\`**
**║**${ok} **CapsLock Engelleme Sistemini Kapatmak İçin** **\`${ayarlar.prefix}koruma capslock kapat\`**
**╚══════════════════════════════════════╝**`)).then(xx => xx.delete({ timeout: 15000 }))
  
if(args[1] === 'aç' || args[1] === "open") {
db.set(`capsk_${message.guild.id}`, 'acik')
message.channel.send(taha.setDescription(`${tik} **CapsLock Engelleme Sistemi Başarıyla Aktif Edildi.**`)).then(xx => xx.delete({ timeout: 15000 }))
}
  
  
if(args[1] === 'kapat' || args[1] === "close") {
db.delete(`capsk_${message.guild.id}`)
message.channel.send(taha.setDescription(`${tik} **CapsLock Engelleme Sistemi Başarıyla Kapatıldı.**`)).then(xx => xx.delete({ timeout: 15000 }))
}
}
  
//-----------------------------------------------------------------------------------------------
  
if (args[0] === 'ban' || args[0] === "yasakla") {
 
if(!args[1]) return message.channel.send(taha.setDescription(`${dikkat} **${message.author} Lütfen Yapmak İstediğin İşlemi Seç.** ${dikkat}
**╔══════════════════════════════════════╗**
**║**${ok} **Ban Koruma Sistemini Açmak İçin** **\`${ayarlar.prefix}koruma ban aç\`**
**║**${ok} **Ban Koruma Sistemini Kapatmak İçin** **\`${ayarlar.prefix}koruma ban kapat\`**
**╚══════════════════════════════════════╝**`)).then(xx => xx.delete({ timeout: 15000 }))
  
if(args[1] === 'aç' || args[1] === "open") {
db.set(`bank_${message.guild.id}`, 'acik')
message.channel.send(taha.setDescription(`${tik} **Ban Koruma Sistemi Başarıyla Aktif Edildi.**`)).then(xx => xx.delete({ timeout: 15000 }))
}
  
  
if(args[1] === 'kapat' || args[1] === "close") {
db.delete(`bank_${message.guild.id}`)
message.channel.send(taha.setDescription(`${tik} **Ban Koruma Sistemi Başarıyla Kapatıldı.**`)).then(xx => xx.delete({ timeout: 15000 }))
}
}
  
//-----------------------------------------------------------------------------------------------

  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["koruma"],
  permLevel: 0
};
exports.help = {
  name: 'Koruma Sistemi',
  description: 'MeifyBot',
  usage: 'MeifyBot'
}