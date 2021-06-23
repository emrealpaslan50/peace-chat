const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const db = require('quick.db');
require("./util/eventLoader")(client);
const ms = require('parse-ms')

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  console.log(`${files.length} komut yüklenecek`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    console.log(`Yüklenen komut: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
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
    try {
      let cmd = require(`./komutlar/${command}`);
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

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

client.on('message', msg => {//dawn
  if (msg.author.bot || msg.channel.type == "dm") return;
         const kufurler = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "sik", "yarrak", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "amq",];
         if (kufurler.some(banned => msg.content.includes(banned))) {
           try {   
             if (!msg.member.hasPermission("ADMINISTRATOR")) {
                   msg.delete();
                   const embed = new Discord.MessageEmbed()
                   .setDescription('Lütfen sunucuda küfür etmemeye özen göster.')
                   .setAuthor(msg.member.displayName, msg.author.avatarURL({dynamic: true}))
                   .setColor('RED')
                   .setFooter(ayarlar.footer)
                   .setTimestamp()
                   msg.channel.send(embed).then(msg => msg.delete({timeout: 5000}));
           }              
           } catch(err) {
             console.log(err);
           }
           }
           });

 client.on("messageUpdate", (old, nev) => {
  if (old.content != nev.content) {
    if (nev.author.bot || nev.channel.type == "dm") return;
    const yasak = [
      "sg",
      "oç",
      "oçe",
      "anan",
      "ananı",
      "ananı sikim",
      "anneni sikim",
      "anneni sikeyim",
      "ananı sikeyim",
      "annen",
      "ağzına",
      "ağzına sıçim",
      "ağzına sıçayım",
      "ağzına s",
      "am",
      "ambiti",
      "amını",
      "amını s",
      "amcık",
      "amcik",
      "amcığını",
      "amciğini",
      "amcığını",
      "amcığını s",
      "amck",
      "amckskm",
      "amcuk",
      "amına",
      "amına k",
      "amınakoyim",
      "amına s",
      "amunu",
      "amını",
      "amın oğlu",
      "amın o",
      "amınoğlu",
      "amk",
      "aq",
      "amnskm",
      "anaskm",
      "ananskm",
      "amkafa",
      "amk çocuğu",
      "amk oç",
      "piç",
      "amk ç",
      "amlar",
      "amcıklar",
      "amq",
      "amındaki",
      "amnskm",
      "ananı",
      "anan",
      "ananın am",
      "ananızın",
      "aneni",
      "aneni s",
      "annen",
      "anen",
      "ananın dölü",
      "sperm",
      "döl",
      "anasının am",
      "anası orospu",
      "orospu",
      "orosp,",
      "kahpe",
      "kahbe",
      "kahße",
      "ayklarmalrmsikerim",
      "ananı avradını",
      "avrat",
      "avradını",
      "avradını s",
      "babanı",
      "babanı s",
      "babanın amk",
      "annenin amk",
      "ananın amk",
      "bacı",
      "bacını s",
      "babası pezevenk",
      "pezevenk",
      "pezeveng",
      "kaşar",
      "a.q",
      "a.q.",
      "bitch",
      "çük",
      "yarrak",
      "am",
      "cibiliyetini",
      "bokbok",
      "bombok",
      "dallama",
      "göt",
      "götünü s",
      "ebenin",
      "ebeni",
      "ecdadını",
      "gavat",
      "gavad",
      "ebeni",
      "ebe",
      "fahişe",
      "sürtük",
      "fuck",
      "gotten",
      "götten",
      "göt",
      "gtveren",
      "gttn",
      "gtnde",
      "gtn",
      "hassiktir",
      "hasiktir",
      "hsktr",
      "haysiyetsiz",
      "ibne",
      "ibine",
      "ipne",
      "kaltık",
      "kancık",
      "kevaşe",
      "kevase",
      "kodumun",
      "orosbu",
      "fucker",
      "penis",
      "pic",
      "porno",
      "sex",
      "sikiş",
      "s1kerim",
      "s1k",
      "puşt",
      "sakso",
      "sik",
      "skcm",
      "siktir",
      "sktr",
      "skecem",
      "skeym",
      "slaleni",
      "sokam",
      "sokuş",
      "sokarım",
      "sokarm",
      "sokaym",
      "şerefsiz",
      "şrfsz",
      "sürtük",
      "taşak",
      "taşşak",
      "tasak",
      "tipini s",
      "yarram",
      "yararmorospunun",
      "yarramın başı",
      "yarramınbaşı",
      "yarraminbasi",
      "yrrk",
      "zikeyim",
      "zikik",
      "zkym"
    ];
    if (yasak.some(banned => nev.content.includes(banned))) {
      if (!nev.member.hasPermission("ADMINISTRATOR")) {
        try {
          nev.delete();
          const embed = new Discord.MessageEmbed()
          .setDescription('Lütfen sunucuda küfür etmemeye özen göster.')
          .setAuthor(nev.member.displayName, nev.author.avatarURL({dynamic: true}))
          .setColor('RED')
          .setFooter(ayarlar.footer)
          .setTimestamp()
          nev.channel.send(embed).then(msg => msg.delete({timeout: 5000}))
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
});


//REKLAM
client.on("messageUpdate", (old, nev) => {
  
  if (old.content != nev.content) {
    if (nev.author.bot || nev.channel.type == "dm") return;
    let reklamk = nev.guild.channels.cache.get(ayarlar.reklamkanal)
    const yasak = [
      "discord.app",
      "discord.gg",
      "invite",
      "discordapp",
      "discordgg",
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".gg",
      ".org",
      ".com.tr",
      ".biz",
      ".party",
      ".rf.gd",
      ".az"
    ];
    if (yasak.some(banned => nev.content.includes(banned))) {
      if (!nev.member.hasPermission("ADMINISTRATOR")) {
        try {
          nev.delete();
          const embed = new Discord.MessageEmbed()
          .setDescription('Lütfen sunucuda reklam yapmamaya özen göster.')
          .setAuthor(nev.member.displayName, nev.author.avatarURL({dynamic: true}))
          .setColor('RED')
          .setFooter(ayarlar.footer)
          .setTimestamp()

          const embed2 = new Discord.MessageEmbed()
  .setDescription(`${nev.author} , ${nev.channel} kanalında reklam yapmaya çalıştı.`)
  .setAuthor(nev.member.displayName, nev.author.avatarURL({dynamic: true}))
  .setColor('RED')
  .setFooter(ayarlar.footer)
  .setTimestamp()
  reklamk.send(embed2)
          nev.channel.send(embed).then(msg => msg.delete({timeout: 5000}))
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
});

client.on("message", message => {
    if (message.author.bot || message.channel.type == "dm") return;
    let reklamk = message.guild.channels.cache.get(ayarlar.reklamkanal)
    const yasak = [
      "discord.app",
      "discord.gg",
      "invite",
      "discordapp",
      "discordgg",
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".gg",
      ".org",
      ".com.tr",
      ".biz",
      ".party",
      ".rf.gd",
      ".az"
    ];
    if (yasak.some(banned => message.content.includes(banned))) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        try {
          message.delete();
          const embed = new Discord.MessageEmbed()
          .setDescription('Lütfen sunucuda reklam yapmamaya özen göster.')
          .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
          .setColor('RED')
          .setFooter(ayarlar.footer)
          .setTimestamp()

          const embed2 = new Discord.MessageEmbed()
  .setDescription(`${message.author} , ${message.channel} kanalında reklam yapmaya çalıştı.`)
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setColor('RED')
  .setFooter(ayarlar.footer)
  .setTimestamp()
  reklamk.send(embed2)
          message.channel.send(embed).then(msg => msg.delete({timeout: 5000}))
        } catch (err) {
          console.log(err);
        }
      }
    }
});

client.on("messageUpdate", (old, nev) => {  
  if (old.content != nev.content) {
    if (nev.author.bot || nev.channel.type == "dm") return;
    let reklamk = nev.guild.channels.cache.get(ayarlar.reklamkanal)

      if (!nev.member.hasPermission("ADMINISTRATOR")) {
        try {
          let links = nev.content.match(/(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi);
          if (!links) return;
          nev.delete();
          const embed = new Discord.MessageEmbed()
          .setDescription('Lütfen sunucuda link paylaşmamaya özen göster.')
          .setAuthor(nev.member.displayName, nev.author.avatarURL({dynamic: true}))
          .setColor('RED')
          .setFooter(ayarlar.footer)
          .setTimestamp()

          const embed2 = new Discord.MessageEmbed()
  .setDescription(`${nev.author} , ${nev.channel} kanalında reklam yapmaya çalıştı.`)
  .setAuthor(nev.member.displayName, nev.author.avatarURL({dynamic: true}))
  .setColor('RED')
  .setFooter(ayarlar.footer)
  .setTimestamp()
  reklamk.send(embed2)
          nev.channel.send(embed).then(m => m.delete({timeout: 5000}))
        } catch (err) {
          console.log(err);
        }
      }
    }
});

client.on("messageUpdate", (old, nev) => {
  
  if (old.content != nev.content) {
    if (nev.author.bot || nev.channel.type == "dm") return;
    let reklamk = nev.guild.channels.cache.get(ayarlar.reklamkanal)


    if(nev.content.toLowerCase().includes('discord.gg/')) {
      if (!nev.member.hasPermission("ADMINISTRATOR")) {
        try {
            if (nev.deletable) nev.delete();
            const embed = new Discord.MessageEmbed()
            .setDescription('Lütfen sunucuda link paylaşmamaya özen göster.')
            .setAuthor(nev.member.displayName, nev.author.avatarURL({dynamic: true}))
            .setColor('RED')
            .setFooter(ayarlar.footer)
            .setTimestamp()

            nev.channel.send(embed).then(m => m.delete({timeout: 5000}))
        } catch (err) {
          console.log(err);
        }
      }
    }
}
});

 client.on("message", async message => {
  if (message.author.bot || message.channel.type == "dm") return;
  let kanal = message.guild.channels.cache.get(ayarlar.reklamkanal)
  if (message.member.hasPermission('ADMINISTRATOR')) return;
  let links = message.content.match(/(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi);
  if (!links) return;
   message.delete();
  const embed = new Discord.MessageEmbed()
  .setDescription('Lütfen sunucuda link paylaşmamaya özen göster.')
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setColor('RED')
  .setFooter(ayarlar.footer)
  .setTimestamp()

  const embed2 = new Discord.MessageEmbed()
  .setDescription(`${message.author} , ${message.channel} kanalında reklam yapmaya çalıştı.`)
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setColor('RED')
  .setFooter(ayarlar.footer)
  .setTimestamp()
  kanal.send(embed2)
  message.channel.send(embed).then(m => m.delete({timeout: 5000}))
})

 client.on("message", async message => {
  if (message.author.bot || message.channel.type == "dm") return;
  let kanal = message.guild.channels.cache.get(ayarlar.reklamkanal)
   if(message.content.toLowerCase().includes('discord.gg') || message.content.toLowerCase().includes('.gg')) {
  if (message.member.hasPermission('ADMINISTRATOR')) return;
  const embed = new Discord.MessageEmbed()
  .setDescription('Lütfen sunucuda link paylaşmamaya özen göster.')
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setColor('RED')
  .setFooter(ayarlar.footer)
  .setTimestamp()

  const embed2 = new Discord.MessageEmbed()
  .setDescription(`${message.author} , ${message.channel} kanalında reklam yapmaya çalıştı.`)
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setColor('RED')
  .setFooter(ayarlar.footer)
  .setTimestamp()
  kanal.send(embed2)
  message.delete()
  message.channel.send(embed).then(m => m.delete({timeout: 5000}))
   }
})

client.on("message", async msg => {
  const embed = new Discord.MessageEmbed()
  .setDescription('Lütfen büyük harf kullanmamaya özen göster.')
  .setAuthor(msg.member.displayName, msg.author.avatarURL({dynamic: true}))
  .setColor('RED')
  .setFooter(ayarlar.footer)
  .setTimestamp()
if (msg.channel.type === "dm") return;
if (msg.author.bot) return;
if (msg.content.length > 4) {
    let caps = msg.content.toUpperCase();
    if (msg.content == caps) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        if (!msg.mentions.users.first()) {
          if (!msg.mentions.channels.first()) {
            if(!msg.mentions.roles.first()) {
            if(isNaN(msg.content)) {
          msg.delete();
          return msg.channel.send(embed).then(m => m.delete({timeout: 5000}));
            }
      }
    }
  }
    }
  }
}
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
  if (newMessage.author.bot || newMessage.channel.type == "dm") return;
  let log = oldMessage.guild.channels.cache.get(ayarlar.mesajlog);
  if (!log) return;
  if (oldMessage.content == newMessage.content) return;
  const embed = new Discord.MessageEmbed()
    .setTitle(`Mesaj Düzenlendi.`)
    .addField("Kullanıcı: ", oldMessage.author)
    .addField("Kanal: ", newMessage.channel)
    .addField("Eski Mesaj: ", "`​" + oldMessage.content + "`​")
    .addField("Yeni Mesaj: ", "`​" + newMessage.content + "`​")
    .setTimestamp()
  log.send(embed)
})
client.on("messageDelete", async (message) => {
  if (message.author.bot || message.channel.type == "dm") return;
  let log = message.guild.channels.cache.get(ayarlar.mesajlog);
  if (!log) return;
  const embed = new Discord.MessageEmbed()
    .setTitle(`Mesaj Silindi.`)
    .addField("Kullanıcı: ", message.author)
    .addField("Kanal: ", message.channel)
    .addField("Mesaj: ", "`​" + message.content + "`​")
    .setTimestamp()
  log.send(embed)
})



client.login(ayarlar.token);