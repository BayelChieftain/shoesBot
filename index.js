
var TelegramApi = require('node-telegram-bot-api');

const token = '6318464500:AAFLiH8yOKFI3MT7GEorUtA6Xu6XnEF2ZpA';

const bot = new TelegramApi(token, { polling: true });

// shoes photo
const CampusCreamLink = 'https://images.stockx.com/360/adidas-Campus-Bad-Bunny-Cream/Images/adidas-Campus-Bad-Bunny-Cream/Lv2/';
const CampusOliveLink = 'https://images.stockx.com/360/adidas-Campus-Light-Bad-Bunny-Olive/Images/adidas-Campus-Light-Bad-Bunny-Olive/Lv2/';
const forumsUrl = 'https://images.stockx.com/360/adidas-Forum-';

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
let forums = {
    Black01: `${forumsUrl}Low-Bad-Bunny-Triple-Black/Images/adidas-Forum-Low-Bad-Bunny-Triple-Black/Lv2/img01.jpg?fm=png&auto=compress&w=576&dpr=1&updated_at=1635605898&h=384&q=57`,
    Pink01: `${forumsUrl}Low-Bad-Bunny-Pink/Images/adidas-Forum-Low-Bad-Bunny-Pink/Lv2/img01.jpg?fm=png&auto=compress&w=576&dpr=1&updated_at=1635341309&h=384&q=57`,
    Grey01: `${forumsUrl}Buckle-Low-White/Images/adidas-Forum-Buckle-Low-White/Lv2/img01.jpg?fm=png&auto=compress&w=576&dpr=1&updated_at=1670926757&h=384&q=57`,
    Blue01: `${forumsUrl}Buckle-Low-Bad-Bunny-Blue-Tint/Images/adidas-Forum-Buckle-Low-Bad-Bunny-Blue-Tint/Lv2/img01.jpg?fm=png&auto=compress&w=576&dpr=1&updated_at=1672249662&h=384&q=57`,
    Brown01: `${forumsUrl}Low-Bad-Bunny/Images/adidas-Forum-Low-Bad-Bunny/Lv2/img01.jpg?fm=png&auto=compress&w=576&dpr=1&updated_at=1635276861&h=384&q=57`
}

//commands
bot.setMyCommands([
    {command: '/start', description: 'Запуск бота'},
    {command: '/catalog', description: 'Каталог'},
    {command: '/info', description: 'Больше информации'}
]);
// options 
const forumProduct = { // for Forum low model
    reply_markup: JSON.stringify( {
        inline_keyboard: [
            [{text: 'Forum Buckle Low Back to School', callback_data: 'forum-Black'}], [{text: 'Forum Buckle Low Pink Easter Egg', callback_data: 'forum-Pink'}],
            [{text: 'Forum Buckle Low Last Forum', callback_data: 'forum-Grey' }], [{text: 'Forum Buckle Low Blue Tint', callback_data: 'forum-Blue'}],
            [{text: 'Forum Buckle Low', callback_data: 'forum-Brown'}],  [{text: '⬅️НАЗАД', callback_data: 'back'}]
        ]
    })
};

const campusProduct = { // for Campus low model
    reply_markup: JSON.stringify( {
        inline_keyboard: [
            [{text: 'Campus Cream', callback_data: 'campus-White'}], [{text: 'Campus Wild Moss', callback_data: 'campus-Brown'}],
            [{text: '⬅️НАЗАД', callback_data: 'back'}]
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
const infoText = "Доставка осуществляется через CDEK, по всем странам СНГ";


bot.on('message', async msg => {
    //info
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === '/start') {
      await bot.sendMessage(chatId, startText)
      setTimeout( () => bot.sendMessage(chatId, 'Команда для просмотра каталога /catalog'), 1350)
    }

    if (text === '/catalog') {
    //   await bot.sendPhoto(chatId, 'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/01-fw23-bad-bunny-response-cl-exit-confirmed-clp-mhs-d_tcm221-1025437.jpg')
       bot.sendMessage(chatId, 'Выберите модель:', shoesModel)
    }

    if (text === '/info') {
        bot.sendMessage(chatId, infoText)
    }

     console.log(msg)
});

// data processing
bot.on('callback_query', async msg => {
    console.log(msg);
    
    const data = msg.data;
    const chatId = msg.message.chat.id;
    const messageId = msg.message.message_id;

    if (data === 'back') {
        bot.sendMessage(chatId, 'Выберите модель:', shoesModel);
        bot.deleteMessage(chatId, messageId)
    }

    // shoe model data 
    if (data === 'campus') {
        bot.sendMessage(chatId, 'Cопутствующие товары:', campusProduct);
        bot.deleteMessage(chatId, messageId);
    } else if (data === 'forum') {
        bot.sendMessage(chatId, 'Cопутствующие товары:', forumProduct);
        bot.deleteMessage(chatId, messageId);
    }
    
    // product model
    if (data === 'campus-White') {
        bot.sendPhoto(chatId, campus.White01)
    } else if (data === 'campus-Brown') {
        bot.sendPhoto(chatId, campus.Brown01)
    }
    // forums
    data === 'forum-Black' ? bot.sendPhoto(chatId, forums.Black01) //
     : data === 'forum-Pink' ? bot.sendPhoto(chatId, forums.Pink01)
     : data === 'forum-Grey' ? bot.sendPhoto(chatId, forums.Grey01)
     : data === 'forum-Blue' ? bot.sendPhoto(chatId, forums.Blue01)
     : data === 'forum-Brown' ? bot.sendPhoto(chatId, forums.Brown01)
     : console.log('stopped')
});