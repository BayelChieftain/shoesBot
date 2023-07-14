//import TelegramApi from 'node-telegram-bot-api';

var TelegramApi = require('node-telegram-bot-api');
const token = '6318464500:AAFLiH8yOKFI3MT7GEorUtA6Xu6XnEF2ZpA';

const bot = new TelegramApi(token, { polling: true });

//commands
bot.setMyCommands( [
    {command: '/start', description: 'Запуск бота'},
    {command: '/catalog', description: 'Каталог'}
]);
// options 
const gameOptions = {
    reply_markup: JSON.stringify( {
        inline_keyboard: [
            [{text: 'Forum Buckle Low', callback_data: 'forum'}],
            [{text: 'Campus', callback_data: 'campus' }]
        ]
    })
}
// description cmd
const startText =
 `Привет! Я бот для покупки кроссовок. Пиши команды, выбирай модели и делай покупки. Добро пожаловать! \n 
 Hello! I am a sneaker buying bot. Write commands, choose models and shop. Welcome!`

bot.on('message', async msg => {
    //info
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === '/start') {
      await bot.sendMessage(chatId, startText)
      setTimeout( () => bot.sendMessage(chatId, 'Команда для просмотра каталога /catalog'), 1450)
    }

    if (text === `/catalog`) {
       await bot.sendPhoto(chatId, 'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/01-fw23-bad-bunny-response-cl-exit-confirmed-clp-mhs-d_tcm221-1025437.jpg')
       bot.sendMessage(chatId, 'Выберите модель', gameOptions);
    }

    console.log(msg)
})