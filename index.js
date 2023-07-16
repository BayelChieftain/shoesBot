
var TelegramApi = require('node-telegram-bot-api');

const token = '6318464500:AAFLiH8yOKFI3MT7GEorUtA6Xu6XnEF2ZpA';

const bot = new TelegramApi(token, { polling: true });

// shoes photo
const CampusCreamLink = 'https://images.stockx.com/360/adidas-Campus-Bad-Bunny-Cream/Images/adidas-Campus-Bad-Bunny-Cream/Lv2/';
const CampusOliveLink = 'https://images.stockx.com/360/adidas-Campus-Light-Bad-Bunny-Olive/Images/adidas-Campus-Light-Bad-Bunny-Olive/Lv2/';

let campus = {
    White01: `${CampusCreamLink}img01.jpg?fm=png&auto=compress&w=576&dpr=1&updated_at=1677252256&h=384&q=57`,
    White10: `${CampusCreamLink}img10.jpg?fm=png&auto=compress&w=576&dpr=1&updated_at=1677252256&h=384&q=57`,
    White19: `${CampusCreamLink}img19.jpg?fm=png&auto=compress&w=576&dpr=1&updated_at=1677252256&h=384&q=57`,
    White28: `${CampusCreamLink}img28.jpg?fm=png&auto=compress&w=576&dpr=1&updated_at=1677252256&h=384&q=57`,
    gallery: [this.White01, this.White10, this.White19, this.White28],
    Brown01: `${CampusOliveLink}img01.jpg?fm=png&auto=compress&w=576&dpr=1&updated_at=1683246173&h=384&q=57`,
    Brown10: `${CampusOliveLink}img10.jpg?fm=png&auto=compress&w=576&dpr=1&updated_at=1683246173&h=384&q=57`,
    Brown19: `${CampusOliveLink}img19.jpg?fm=png&auto=compress&w=576&dpr=1&updated_at=1683246173&h=384&q=57`,
    Brown28: `${CampusOliveLink}img28.jpg?fm=png&auto=compress&w=576&dpr=1&updated_at=1683246173&h=384&q=57`
}

//commands
bot.setMyCommands([
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
      setTimeout( () => bot.sendMessage(chatId, 'Команда для просмотра каталога /catalog'), 1350)
    }

    if (text === '/catalog') {
       await bot.sendPhoto(chatId, 'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/01-fw23-bad-bunny-response-cl-exit-confirmed-clp-mhs-d_tcm221-1025437.jpg')
       bot.sendMessage(chatId, 'Выберите модель:', shoesModel)
    }

     console.log(msg)
});

// data processing
bot.on('callback_query', msg => {
    console.log(msg);
    
    const data = msg.data;
    const chatId = msg.message.chat.id;

    // shoe model data 
    if (data === 'campus') {
        bot.sendMessage(chatId, 'Cопутствующие товары:', campusProduct);
    } else if (data === 'forum') {
        bot.sendMessage(chatId, "Cопутствующие товары:", forumProduct);
    }
    
    // product model
    if (data === 'campus-White') {
        bot.sendPhoto(chatId, campus.White01)
       //bot.sendMediaGroup(chatId, )
    } else if (data === 'campus-Brown') {
        bot.sendPhoto(chatId, campus.Brown01)
    }
});