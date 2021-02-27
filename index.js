const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');
const bot = new TelegramBot(config.TOKEN, {polling: true});
const {find,getMessage,capitalize} = require('./helpers');

bot.on('message', async (message) => {
    const chatId = message.chat.id;
    const msg = message.text.toLowerCase()
    if (['bye', 'hello'].includes(msg)) {
        bot.sendPhoto(chatId, msg == 'bye' ? config.bye_image : config.hello_image)
        bot.sendMessage(chatId, `${capitalize(msg)}, ${message.from.first_name}`)
        return
    }
    try {
        const {data: response} = await find(message.text)
        bot.sendPhoto(chatId, `${config.IMAGE_URl}${response.weather[0].icon}.png`)
        setTimeout(() => bot.sendMessage(chatId, getMessage(response,message)), 200)
    } catch (err) {
        bot.sendMessage(chatId, config.ERROR)
        return
    }
})
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, config.START);
});

