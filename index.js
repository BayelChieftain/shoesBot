
var TelegramApi = require('node-telegram-bot-api');

const token = '6318464500:AAFLiH8yOKFI3MT7GEorUtA6Xu6XnEF2ZpA';

const bot = new TelegramApi(token, { polling: true });

//commands
bot.setMyCommands( [
    {command: '/start', description: 'Запуск бота'},
    {command: '/catalog', description: 'Каталог'}
]);
// options 
const forumProduct = { // for Forum low model
    reply_markup: JSON.stringify( {
        inline_keyboard: [
            [{text: 'Forum Buckle Low Back to School', callback_data: 'forum-Black'}], [{text: 'Forum Buckle Low Pink Easter Egg', callback_data: 'forum-Pink'}],
            [{text: 'Forum Buckle Low Last Forum', callback_data: 'forum-White' }], [{text: 'Forum Buckle Low Blue Tint', callback_data: 'forum-Blue'}],
            [{text: 'Forum Buckle Low', callback_data: 'forum-Brown'}]
        ]
    })
};

const campusProduct = { // for Campus low model
    reply_markup: JSON.stringify( {
        inline_keyboard: [
            [{text: 'Campus Cream', callback_data: 'campus-White'}], [{text: 'Campus Wild Moss', callback_data: 'campus-Brown'}]
        ]
    })
};

const shoesModel = {
    reply_markup: JSON.stringify( {
        inline_keyboard: [
            [{text: 'Forum Buckle Low', callback_data: 'forum'}],
            [{text: 'Campus', callback_data: 'campus' }]
        ]
    })
};
// description cmd
const startText =
 `Привет! Я бот для покупки кроссовок. Пиши команды, выбирай модели и делай покупки. Добро пожаловать! \n 
 Hello! I am a sneaker buying bot. Write commands, choose models and shop. Welcome!`;


bot.on('message', async msg => {
    //info
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === '/start') {
      await bot.sendMessage(chatId, startText)
      setTimeout( () => bot.sendMessage(chatId, 'Команда для просмотра каталога /catalog'), 1410)
    }

    if (text === `/catalog`) {
       await bot.sendPhoto(chatId, 'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/01-fw23-bad-bunny-response-cl-exit-confirmed-clp-mhs-d_tcm221-1025437.jpg')
       bot.sendMessage(chatId, 'Выберите модель:', shoesModel);
    }

     console.log(msg)
});

// data processing
bot.on('callback_query', msg => {
    console.log(msg);
    
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if (data === 'campus') {
        bot.sendMessage(chatId, 'Cопутствующие товары:', campusProduct);
    } else if (data === 'forum') {
        bot.sendMessage(chatId, "Cопутствующие товары:", forumProduct);
    }
});