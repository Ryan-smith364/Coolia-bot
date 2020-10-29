const Discord = require("discord.js")
const client = new Discord.Client()
const fetch = require("node-fetch");
const fs = require('fs')
require('dotenv-flow').config()

const config = {
    token: process.env.token,
    prefix: process.env.prefix,
    owner: process.env.owner
}

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
client.commands = new Discord.Collection()

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

for(const file of commandFiles){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

client.on("message", (message) => {
    if(message.content.toLowerCase() === "dink"){
        message.channel.send("Donk")
    }

    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if(!client.commands.has(command)) return;
    try{
        client.commands.get(command).execute(message, args)
    }catch(error){
        console.error(error)
        message.reply("there was an issue finding your command")
    }
})

client.login(config.token)