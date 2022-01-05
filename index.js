const Discord = require("discord.js")

// In externe Datei auslagern
require("dotenv").config()

const generateImage = require("./generateImage")

const client = new Discord.Client({
	intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
})

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}`)
})

client.on("messageCreate", (message) => {
	if (message.content == "hi") {
		message.reply("Hello World!")
	}
})

const hichannelid = "928238335279919104"

client.on("guildMemberAdd", async (member) => {
	const img = await generateImage(member)

	member.guild.channels.cache.get(hichannelid).send({
		content: `<@${member.id}> fick dich!`,
		files: [img],
	})
})

client.login(process.env.TOKEN)
