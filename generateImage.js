const Discord = require("discord.js")
const Canvas = require("canvas")
const av = {
	size: 256,
	x: 480,
	y: 170,
}

const dim = {
	height: 675,
	width: 1200,
	margin: 50,
}

const background = "https://i.imgur.com/Au5rs6g.jpeg"

const generateImage = async (member) => {
	let username = member.user.username
	let discrim = member.user.discriminator
	let avatarurl = member.user.displayAvatarURL({
		format: "png",
		dynamic: "false",
		size: av.size,
	})

	const canvas = Canvas.createCanvas(dim.width, dim.height)
	const ctx = canvas.getContext("2d")

	// background
	const backimg = await Canvas.loadImage(background)
	ctx.drawImage(backimg, 0, 0)

	// black box
	ctx.fillStyle = "rgba(0,0,0,0.8)"
	ctx.fillRect(
		dim.margin,
		dim.margin,
		dim.width - 2 * dim.margin,
		dim.height - 2 * dim.margin
	)

	const avimg = await Canvas.loadImage(avatarurl)
	ctx.save()

	ctx.beginPath()
	ctx.arc(
		av.x + av.size / 2,
		av.y + av.size / 2,
		av.size / 2,
		0,
		Math.PI * 2,
		true
	)
	ctx.closePath()
	ctx.clip()

	ctx.drawImage(avimg, av.x, av.y)
	ctx.restore()

	const attachment = new Discord.MessageAttachment(
		canvas.toBuffer(),
		"hallo.png"
	)
	return attachment
}

module.exports = generateImage
