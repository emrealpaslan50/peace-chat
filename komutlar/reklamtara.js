const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')

exports.run = (client, message, args) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR")) {
      const embed = new Discord.RichEmbed()
      .setAuthor(message.member.displayName, message.author.avatarURL)
      .setColor('RED')
      .setFooter(ayarlar.footer)
      .setTimestamp()
      .setDescription('Bu komutu kullanmak için `YÖNETİCİ` iznine sahip olmalısın.')
      return message.channel.send(embed)
  }

    const members = message.guild.members.filter(member => member.user.presence.game && /(discord|http|.com|.net|.org|invite|İnstagram|Facebook|watch|Youtube|youtube|facebook|instagram)/g.test(member.user.presence.game.name));
    const memberss = message.guild.members.filter(member => member.user.username && /(discord|http|.com|.net|.org|invite|İnstagram|Facebook|watch|Youtube|youtube|facebook|instagram)/g.test(member.user.username));
    const emb = new Discord.RichEmbed()
        .addField('Oynuyor Mesajı Reklam İçeren Kullanıcılar', members.map(member => `${member} = ${member.user.presence.game.name}`).join("\n") || "Kimsenin oynuyor mesajı reklam içermiyor :white_check_mark:")
        .addField('Kullanıcı Adı Reklam İçeren Kullanıcılar', memberss.map(member => `${member} = ${member.user.username}`).join("\n") || "Kimsenin kullanıcı adı reklam içermiyor :white_check_mark:")
        .setColor("RANDOM")
        .setFooter(ayarlar.footer)
    message.channel.send({emb})
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['reklam-ara', 'reklamara', 'reklamtaraması', 'reklam-tara'],
    permLevel: 0
}

exports.help = {
    name: 'reklamtara',
    description: 'Kullanıcıların Oynuyor mesajındaki ve Kullanıcı adlarındaki reklamları tarar.',
    usage: 'reklamtara'
} 
