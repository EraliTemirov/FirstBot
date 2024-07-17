const TelegramBot = require('node-telegram-bot-api')
const express = require('express')
const bodyParser = require('body-parser')

const token = '7270013254:AAGtReZDN9qGya_9lCKeKE2uZa3vSJgY43Y'
const bot = new TelegramBot(token, {polling: true})

const app = express()
app.use(bodyParser.json())
app.use(express.static('public'))

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id
  bot.sendMessage(chatId, 'Yoshingizni aniqlash uchun quyidagi tugmani bosing:', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Yoshni hisoblash',
            web_app: {url: 'https://sizning-domeningiz.com/index.html'},
          },
        ],
      ],
    },
  })
})

app.post('/calculate-age', (req, res) => {
  const {chatId, birthYear} = req.body
  const currentYear = new Date().getFullYear()
  const age = currentYear - birthYear

  bot.sendMessage(chatId, `Sizning yoshingiz: ${age}`)
  res.sendStatus(200)
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
