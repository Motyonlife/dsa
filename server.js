const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const fs = require("fs");
const db = require("quick.db");
const moment = require("moment");
moment.locale("tr")
const chalk = require("chalk");
require("./util/eventLoader")(client);
const express = require("express");
const app = express();
const http = require("http");
const prefix = ayarlar.prefix
const ozeldurum = ayarlar.durum

const dikkat = (ayarlar.dikkat)
const tik = (ayarlar.tik)
const carpı = (ayarlar.reddet)
const ok = (ayarlar.ok)

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);};
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err); log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {let props = require(`./komutlar/${f}`);log(`Yüklenen komut: ${props.help.name}.`);client.commands.set(props.help.name, props);props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try { delete require.cache[require.resolve(`./komutlar/${command}`)];let cmd = require(`./komutlar/${command}`);client.commands.delete(command);client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);});
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {let cmd = require(`./komutlar/${command}`);client.commands.set(command, cmd);cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {delete require.cache[require.resolve(`./komutlar/${command}`)];let cmd = require(`./komutlar/${command}`);client.commands.delete(command);client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);}
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;}
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.on('ready', async () => {
   client.appInfo = await client.fetchApplication();
  setInterval( async () => {
    client.appInfo = await client.fetchApplication();
  }, 600);

 client.user.setPresence({ activity: { name: '⚝ Created by Nur', }, status: 'idle' });
  client.channels.cache.get('925083967504408604').join()
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Motyonlife: Bot Aktif`)
});
 
client.login(process.env.token)

client.on("roleUpdate", async (oldRole, newRole) => {
  
if(db.fetch(`rolk_${oldRole.guild.id}`, 'acik')) {
  
let guild = newRole.guild;
guild.fetchAuditLogs().then(async (logs) => {
if(logs.entries.first().action === `ROLE_UPDATE`) {
let id = logs.entries.first().executor.id;
const users = guild.members.cache.get(id);
      
if(users.id === newRole.guild.owner.id) return;
if(users.id === client.user.id) return;
if(db.fetch(`guvenli_${users.id}`, 'evet')) return;
      
      newRole.setPermissions(oldRole.permissions);
    newRole.edit({
      name: oldRole.name,
      color: oldRole.hexColor,
      hoist: oldRole.hoist,
      permissions: oldRole.permissions,
      mentionable: oldRole.mentionable
    });
      
users.ban()
      
const taha = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${ayarlar.durum}`).setTimestamp()
.setDescription(`**${users} Bir Rol Düzenledi, Ama Ben Rolü Eski Haline Getirdim.**
**${users} Kullanıcısının Bütün Rollerini Aldım Ve Cezalıya Attım.**
      
**\`Kullanıcı Bilgisi\`**
**Kullanıcı :** **${users}**
 **ID :** **\`${users.id}\`**
 **İsim :** **\`${users.user.username}\`**
 **Etiket :** **\`#${users.user.discriminator}\`**
      
**\`Düzenlenen Rol Bilgisi\`**
**Rol :** **<@&${newRole.id}>**
**İsim :** **\`${newRole.name}\`**
**ID :** **\`${newRole.id}\`** 
**Rol Rengi :** **\`${newRole.hexColor}\`**
     
**\`Eski Hale Getirilen Rol Bilgisi\`**
**Rol :** **<@&${oldRole.id}>**
**İsim :** **\`${oldRole.name}\`**
**ID :** **\`${oldRole.id}\`** 
**Rol Rengi :** **\`${oldRole.hexColor}\`** `)
      client.channels.cache.get(ayarlar.guardlog).send(taha)
    }})}})

client.on("roleCreate", async (role) => {
  
  if(db.fetch(`rolk_${role.guild.id}`, 'acik')) {
  
let guild = role.guild;
guild.fetchAuditLogs().then(async (logs) => {
if(logs.entries.first().action === `ROLE_CREATE`) {
let id = logs.entries.first().executor.id;
const users = guild.members.cache.get(id);
      
if(users.id === role.guild.owner.id) return;
if(users.id === client.user.id) return;
if(db.fetch(`guvenli_${users.id}`, 'evet')) return;
      
role.delete()
      
users.ban()
  
  const taha = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${ayarlar.durum}`).setTimestamp()
.setDescription(`**${users} Bir Rol Oluşturdu, Ama Ben Rolü Sildim.**
**${users} Kullanıcısının Bütün Rollerini Aldım Ve Cezalıya Attım.**
      
**\`Kullanıcı Bilgisi\`**
**Kullanıcı :** **${users}**
 **ID :** **\`${users.id}\`**
 **İsim :** **\`${users.user.username}\`**
 **Etiket :** **\`#${users.user.discriminator}\`**
      
**\`Oluşturulan Rol Bilgisi\`**
**Rol :** **<@&${role.id}>**
**İsim :** **\`${role.name}\`**
**ID :** **\`${role.id}\`** 
**Rol Rengi :** **\`${role.hexColor}\`**`)
      client.channels.cache.get(ayarlar.guardlog).send(taha)
  
}})}});

client.on("roleDelete", async (role) => {
  
  if(db.fetch(`rolk_${role.guild.id}`, 'acik')) {
  
let guild = role.guild;
guild.fetchAuditLogs().then(async (logs) => {
if(logs.entries.first().action === `ROLE_DELETE`) {
let id = logs.entries.first().executor.id;
const users = guild.members.cache.get(id);
      
if(users.id === role.guild.owner.id) return;
if(users.id === client.user.id) return;
if(db.fetch(`guvenli_${users.id}`, 'evet')) return;
      
let yeniRol = await role.guild.roles.create({
data: {
name: role.name,
color: role.hexColor,
hoist: role.hoist,
position: role.position,
permissions: role.permissions,
mentionable: role.mentionable
}});
      
users.ban()
  
  const taha = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${ayarlar.durum}`).setTimestamp()
.setDescription(`**${users} Bir Rol Sildi, Ama Ben Rolü Geri Açtım.**
**${users} Kullanıcısının Bütün Rollerini Aldım Ve Cezalıya Attım.**
      
**\`Kullanıcı Bilgisi\`**
**Kullanıcı :** **${users}**
 **ID :** **\`${users.id}\`**
 **İsim :** **\`${users.user.username}\`**
 **Etiket :** **\`#${users.user.discriminator}\`**
      
**\`Silinen Rol Bilgisi\`**
**Rol :** **<@&${role.id}>**
**İsim :** **\`${role.name}\`**
**ID :** **\`${role.id}\`** 
**Rol Rengi :** **\`${role.hexColor}\`**`)
      client.channels.cache.get(ayarlar.guardlog).send(taha)
  
}})}});

client.on("channelCreate", async (channel) => { 
  
  if(db.fetch(`kanalk_${channel.guild.id}`, 'acik')) {
  
let guild = channel.guild;
guild.fetchAuditLogs().then(async (logs) => {
if(logs.entries.first().action === `CHANNEL_CREATE`) {
let id = logs.entries.first().executor.id;
const users = guild.members.cache.get(id);
      
if(users.id === channel.guild.owner.id) return;
if(users.id === client.user.id) return;
if(db.fetch(`guvenli_${users.id}`, 'evet')) return;
      
channel.delete()
      
users.ban()
  
  const taha = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${ayarlar.durum}`).setTimestamp()
.setDescription(`**${users} Bir Kanal Oluşturdu, Ama Ben Kanalı Sildim.**
**${users} Kullanıcısının Bütün Rollerini Aldım Ve Cezalıya Attım.**
      
**\`Kullanıcı Bilgisi\`**
**Kullanıcı :** **${users}**
 **ID :** **\`${users.id}\`**
 **İsim :** **\`${users.user.username}\`**
 **Etiket :** **\`#${users.user.discriminator}\`**
      
**\`Oluşturulan Kanal Bilgisi\`**
**Kanal :** **<#${channel.id}>**
**İsim :** **\`${channel.name}\`**
**ID :** **\`${channel.id}\`** `)
client.channels.cache.get(ayarlar.guardlog).send(taha)
  
}})}});

client.on("channelDelete", async (channel) => { 
  
  if(db.fetch(`kanalk_${channel.guild.id}`, 'acik')) {
  
let guild = channel.guild;
guild.fetchAuditLogs().then(async (logs) => {
if(logs.entries.first().action === `CHANNEL_DELETE`) {
let id = logs.entries.first().executor.id;
const users = guild.members.cache.get(id);
      
if(users.id === channel.guild.owner.id) return;
if(users.id === client.user.id) return;
if(db.fetch(`guvenli_${users.id}`, 'evet')) return;
      
channel.clone().then(async kanal => {
if (channel.parentID != null) await kanal.setParent(channel.parentID);
await kanal.setPosition(channel.position);
if (channel.type == "category") await channel.guild.channels.cache.filter(k => k.parentID == channel.id).forEach(x => x.setParent(kanal.id));
});
      
users.ban()
  
  const taha = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${ayarlar.durum}`).setTimestamp()
.setDescription(`**${users} Bir Kanal Sildi, Ama Ben Kanalı Geri Oluşturdum.**
**${users} Kullanıcısının Bütün Rollerini Aldım Ve Cezalıya Attım.**
      
**\`Kullanıcı Bilgisi\`**
**Kullanıcı :** **${users}**
 **ID :** **\`${users.id}\`**
 **İsim :** **\`${users.user.username}\`**
 **Etiket :** **\`#${users.user.discriminator}\`**
      
**\`Silinen Kanal Bilgisi\`**
**Kanal :** **<#${channel.id}>**
**İsim :** **\`${channel.name}\`**
**ID :** **\`${channel.id}\`**`)
client.channels.cache.get(ayarlar.guardlog).send(taha)
  
}})}});

client.on("guildMemberAdd", async member => {
  
  if(db.fetch(`botk_${member.guild.id}`, 'acik')) {
  
if(member.user.bot) {  
if(ayarlar["botGüvenli"].includes(member.id)) return;
member.kick()

const taha = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${ayarlar.durum}`).setTimestamp()
.setDescription(`**<@${member.id}> Adlı Bot Sunucuya Eklendi, Ama Ben Botu Kickledim.**
    
**\`Bot Bilgisi\`**
**Bot :**  <@${member.id}>
**ID :** **\`${member.id}\`**
**İsim :** **\`${member.user.username}\`**
**Etiket :** **\`#${member.user.discriminator}\`**`)
  
  client.channels.cache.get(ayarlar.guardlog).send(taha)}}})


client.on("guildUpdate", async (oldGuild, newGuild) => {
  
  if(db.fetch(`swk_${oldGuild.id}`, 'acik')) {
  
let guild = newGuild
  
guild.fetchAuditLogs().then(async (logs) => {
if(logs.entries.first().action === `GUILD_UPDATE`) {
let id = logs.entries.first().executor.id;
const users = guild.members.cache.get(id);
      
if(users.id === newGuild.owner.id) return;
if(users.id === client.user.id) return;
if(db.fetch(`guvenli_${users.id}`, 'evet')) return;
  
  
          if (newGuild.name !== oldGuild.name) newGuild.setName(oldGuild.name);
          if (newGuild.iconURL({dynamic: true, size: 2048}) !== oldGuild.iconURL({dynamic: true, size: 2048})) newGuild.setIcon(oldGuild.iconURL({dynamic: true, size: 2048}));
  
users.ban()
  
  const taha = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${ayarlar.durum}`).setTimestamp()
.setDescription(`**${users} Sunucuyu Ayarlarını Güncelledi, Ama Ben Ayarları Geri Aldım.**
**${users} Kullanıcısının Bütün Rollerini Aldım Ve Cezalıya Attım.**
      
**\`Kullanıcı Bilgisi\`**
**Kullanıcı :** **${users}**
 **ID :** **\`${users.id}\`**
 **İsim :** **\`${users.user.username}\`**
 **Etiket :** **\`#${users.user.discriminator}\`**`)
client.channels.cache.get(ayarlar.guardlog).send(taha)
          
}})}})

client.on("emojiDelete", async emoji => {
  
  if(db.fetch(`emojik_${emoji.guild.id}`, 'acik')) {
  
let guild = emoji.guild;
guild.fetchAuditLogs().then(async (logs) => {
if(logs.entries.first().action === `EMOJI_DELETE`) {
let id = logs.entries.first().executor.id;
const users = guild.members.cache.get(id);
      
if(users.id === emoji.guild.owner.id) return;
if(users.id === client.user.id) return;
if(db.fetch(`guvenli_${users.id}`, 'evet')) return;
      
emoji.guild.emojis.create(`${emoji.url}`, `${emoji.name}`)
      
users.ban()
  
  const taha = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${ayarlar.durum}`).setTimestamp()
.setDescription(`**${users} Bir Emoji Sildi, Ama Ben Emojiyi Geri Açtım.**
**${users} Kullanıcısının Bütün Rollerini Aldım Ve Cezalıya Attım.**
      
**\`Kullanıcı Bilgisi\`**
**Kullanıcı :** **${users}**
 **ID :** **\`${users.id}\`**
 **İsim :** **\`${users.user.username}\`**
 **Etiket :** **\`#${users.user.discriminator}\`**
      
**\`Silinen Emoji Bilgisi\`**
**Rol :** **${emoji}**
**İsim :** **\`${emoji.name}\`**
**ID :** **\`${emoji.id}\`**`)
      client.channels.cache.get(ayarlar.guardlog).send(taha)
  
}})}});

client.on("emojiCreate", async emoji => {
  
  if(db.fetch(`emojik_${emoji.guild.id}`, 'acik')) {
  
let guild = emoji.guild;
guild.fetchAuditLogs().then(async (logs) => {
if(logs.entries.first().action === `EMOJI_CREATE`) {
let id = logs.entries.first().executor.id;
const users = guild.members.cache.get(id);
      
if(users.id === emoji.guild.owner.id) return;
if(users.id === client.user.id) return;
if(db.fetch(`guvenli_${users.id}`, 'evet')) return;
      
emoji.delete()
      
users.ban()
  
  const taha = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${ayarlar.durum}`).setTimestamp()
.setDescription(`**${users} Bir Emoji Oluşturdu, Ama Ben Emojiyi Sildim.**
**${users} Kullanıcısının Bütün Rollerini Aldım Ve Cezalıya Attım.**
      
**\`Kullanıcı Bilgisi\`**
**Kullanıcı :** **${users}**
 **ID :** **\`${users.id}\`**
 **İsim :** **\`${users.user.username}\`**
 **Etiket :** **\`#${users.user.discriminator}\`**
      
**\`Oluşturulan Emoji Bilgisi\`**
**Rol :** **${emoji}**
**İsim :** **\`${emoji.name}\`**
**ID :** **\`${emoji.id}\`**`)
      client.channels.cache.get(ayarlar.guardlog).send(taha)
  
}})}});

client.on("guildBanAdd", async (guild, user) => {
  if(db.fetch(`bank_${guild.id}`, 'acik')) {
const logs = await guild.fetchAuditLogs({ limit: 2, type: "MEMBER_BAN_ADD" });
const log = logs.entries.first();
if (!log) return;
const target = log.target;
const id = log.executor.id;
let users = guild.members.cache.get(id);
  
if(users.id === guild.owner.id) return;
if(users.id === client.user.id) return;
if(db.fetch(`guvenli_${users.id}`, 'evet')) return;
  
users.ban()
  
  const taha = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${ayarlar.durum}`).setTimestamp()
.setDescription(`**${users} Birisini Banladı, Ama Ben Banı Geri Açtım.**
**${users} Kullanıcısının Bütün Rollerini Aldım Ve Cezalıya Attım.**
      
**\`Kullanıcı Bilgisi\`**
**Kullanıcı :** **${users}**
 **ID :** **\`${users.id}\`**
 **İsim :** **\`${users.user.username}\`**
 **Etiket :** **\`#${users.user.discriminator}\`**
      
**\`Yasaklanan Kullanıcı Bilgisi\`**
**Kullanıcı :** **${target}**
**İsim :** **\`${target.username}\`**
**Etiket :** **\`#${target.discriminator}\`**
**ID :** **\`${target.id}\`**`)
      client.channels.cache.get(ayarlar.guardlog).send(taha)
}})

const tahaembed = new Discord.MessageEmbed()
.setColor('BLACK')
.setTimestamp()

client.on('message', async message => {
    const dikkat = (ayarlar.dikkat)
  
if(db.fetch(`reqak_${message.guild.id}`, 'acik')) {  

  /*if(message.member.client) return
  if(message.author.id === message.guild.owner.id) return;
  if(message.author.id === client.user.id) return;*/

let content = message.content.toLowerCase()
let reklamlar = ["discord.app", "discord.gg" ,"discordapp","discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az", ".cf", ".me", ".in"]

if (reklamlar.some(words => content.includes(words))) {
  
if (!message.member.hasPermission("ADMINISTRATOR")) {
message.delete()
message.member.roles.add('925083965122023479')
message.member.roles.add('925083965122023479')
message.channel.send(new Discord.MessageEmbed().setColor('BLACK').setFooter(`${ayarlar.durum}`, message.author.avatarURL({ dynamic: true})).setTimestamp().setDescription(`${dikkat} **${message.author} Bu Sunucuda** **\`Reklam Engelleme\`** **Sistemi Aktif.** ${dikkat}`))
  
}}}})

client.on("messageUpdate", async (oldMsg, newMsg) => {
    const dikkat = (ayarlar.dikkat)
    
if(db.fetch(`reqak_${newMsg.guild.id}`, 'acik')) {
  if(newMsg.member.bot) return
  if(newMsg.author.id === newMsg.guild.owner.id) return;
if(newMsg.author.id === client.user.id) return;
  
let reklamlar = ["discord.app", "discord.gg","discordapp","discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az", ".cf", ".me", ".in"]
  if (reklamlar.some(word => newMsg.content.toLowerCase().includes(word))) {
  
if (!newMsg.member.hasPermission("ADMINISTRATOR")) {
newMsg.delete()
newMsg.member.roles.add('925083965122023479')
newMsg.member.roles.add('925083965122023479')
newMsg.channel.send(new Discord.MessageEmbed().setColor('BLACK').setFooter(`${ayarlar.durum}`, newMsg.author.avatarURL({ dynamic: true})).setTimestamp().setDescription(`${dikkat} **${newMsg.author} Bu Sunucuda** **\`Reklam Engelleme\`** **Sistemi Aktif.** ${dikkat}`))

}}}})

client.on('message', async msg => {
  const dikkat = (ayarlar.dikkat)
  
if(db.fetch(`küfürk_${msg.guild.id}`, 'acik')) {
  
           const kufurler = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "sik", "yarrak", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "amq", 'oc'];
           let kelimeler = msg.content.split(' ');
           kelimeler.forEach(kelime=> {
            if(kufurler.some(küfür => küfür.toLowerCase() === kelime.toLowerCase()))  {
             try {   
               if (!msg.member.hasPermission("ADMINISTRATOR")) {
                     msg.delete();
                             
                         return msg.reply(new Discord.MessageEmbed().setColor('BLACK').setFooter(`${ayarlar.durum}`, msg.author.avatarURL({ dynamic: true})).setTimestamp().setDescription(`${dikkat} **${msg.author} Bu Sunucuda** **\`Küfür Engelleme\`** **Sistemi Aktif.** ${dikkat}`)).then(xx => xx.delete({ timeout: 5000 }))
             }              
             } catch(err) {
               console.log(err);
             }
           }
       })
      }
   });
   client.on("messageUpdate", (oldMessage, newMessage) => {
     const dikkat = (ayarlar.dikkat)
     
if(db.fetch(`küfürk_${newMessage.guild.id}`, 'acik')) {
  
           const kufurler = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "sik", "yarrak", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "amq", "taha", 'oc'];
           let kelimeler = newMessage.content.split(' ');
           kelimeler.forEach(kelime=> {
            if(kufurler.some(küfür => küfür.toLowerCase() === kelime.toLowerCase()))  {
             try {   
               if (!newMessage.member.hasPermission("ADMINISTRATOR")) {
                     newMessage.delete();
                             
                         return newMessage.reply(new Discord.MessageEmbed().setColor('BLACK').setFooter(`${ayarlar.durum}`, newMessage.author.avatarURL({ dynamic: true})).setTimestamp().setDescription(`${dikkat} **${newMessage.author} Bu Sunucuda** **\`Küfür Engelleme\`** **Sistemi Aktif.** ${dikkat}`)).then(xx => xx.delete({ timeout: 5000 }))
             }    
             } catch(err) {
               console.log(err);
             }
           }
       })
      }
   });
   
setInterval(() => {
const sunucu = client.guilds.cache.get("925083964811661323")
const uye = sunucu.members.cache.get(client.user.id)
if(uye.voice.channel) return;
client.channels.cache.get("925083967504408604").join().then(x => console.log("Bot Başarıyla Tekrar Sese Bağlandı.")).catch(err => console.log("Bot Sese Tekrar Bağlanamadı."))
}, 30000)