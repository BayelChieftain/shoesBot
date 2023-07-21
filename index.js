
var TelegramApi = require('node-telegram-bot-api');

const token = '6318464500:AAFLiH8yOKFI3MT7GEorUtA6Xu6XnEF2ZpA';

const bot = new TelegramApi(token, { polling: true });

// shoes photo
const CampusCreamLink = 'https://images.stockx.com/360/adidas-Campus-Bad-Bunny-Cream/Images/adidas-Campus-Bad-Bunny-Cream/Lv2/';
const CampusOliveLink = 'https://images.stockx.com/360/adidas-Campus-Light-Bad-Bunny-Olive/Images/adidas-Campus-Light-Bad-Bunny-Olive/Lv2/';
const forumsUrl = 'https://images.stockx.com/360/adidas-Forum-';

let campus = {
    White01: `${CampusCreamLink}img01.jpg?fm=png&auto=compress&w=576&dpr=1&updated_at=1677252256&h=384&q=57`,
    Brown01: `${CampusOliveLink}img01.jpg?fm=png&auto=compress&w=576&dpr=1&updated_at=1683246173&h=384&q=57`
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
            [{text: '⬅️НАЗАД', callback_data: 'back'}]
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
const allInfo = {
    Fblack: {
        reply_markup: JSON.stringify( {
            inline_keyboard: [
                [{text: ' 🔎 Больше информации', callback_data: 'blackInfo'}],
                [{text: 'Купить', callback_data: 'buy'}]    
            ]
        })
    },
    Fpink: {
        reply_markup: JSON.stringify( {
            inline_keyboard: [
                [{text: ' 🔎 Больше информации', callback_data: 'pinkInfo'}],
                [{text: 'Купить', callback_data: 'buy'}]    
            ]
        })
    },
    Flast: {
        reply_markup: JSON.stringify( {
            inline_keyboard: [
                [{text: ' 🔎 Больше информации', callback_data: 'lastInfo'}],
                [{text: 'Купить', callback_data: 'buy'}]    
            ]
        })
    },
    Fblue: {
        reply_markup: JSON.stringify( {
            inline_keyboard: [
                [{text: ' 🔎 Больше информации', callback_data: 'blueInfo'}],
                [{text: 'Купить', callback_data: 'buy'}]    
            ]
        })
    },
    Cwhite: {
        reply_markup: JSON.stringify( {
            inline_keyboard: [
                [{text: ' 🔎 Больше информации', callback_data: 'whiteInfo'}],
                [{text: 'Купить', callback_data: 'buy'}]    
            ]
        })
    },
    Cbrown: {
        reply_markup: JSON.stringify( {
            inline_keyboard: [
                [{text: ' 🔎 Больше информации', callback_data: 'brownInfo'}],
                [{text: 'Купить', callback_data: 'buy'}]    
            ]
        })
    }
}

// description cmd
const startText =
 `Привет! Я бот для покупки кроссовок. Пиши команды, выбирай модели и делай покупки. Добро пожаловать! \n 
 Hello! I am a sneaker buying bot. Write commands, choose models and shop. Welcome!`;
const infoText = `Доставка осуществляется через CDEK, по всем странам СНГ \n
📍Для заказа пишите ID товара - @qqQuestion 
\n ❗️ Прикладывать ЧЕК об оплате`;
const sizes = `Размер: 35, 36, 37, 38, 39, 40, 41, 42, 43, 44`
const N = 'Наименование: adidas Forum Low Bad Bunny';
const AN = 'Наименование: adidas Campus Light Bad Bunny'
const Pr = 'Цена: $100'
bot.on('message', async msg => {
    //info
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === '/start') {
      await bot.sendMessage(chatId, startText)
      setTimeout( () => bot.sendMessage(chatId, 'Команда для просмотра каталога /catalog'), 1350)
    }

    if (text === '/catalog') {
       bot.sendMessage(chatId, 'Выберите модель:', shoesModel)
    }

    if (text === '/info') {
        bot.sendMessage(chatId, infoText)
    }


});

// data processing
bot.on('callback_query', async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    const messageId = msg.message.message_id;
    const PastData = msg.data - 1;
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
        bot.sendPhoto(chatId, campus.White01, allInfo.Cwhite)
    } else if (data === 'campus-Brown') {
        bot.sendPhoto(chatId, campus.Brown01, allInfo.Cbrown)
    }
    data === 'buy' ? bot.sendMessage(chatId, `Для заказа оплатите товар - 4177 4901 6400 3065 VISA \n
    \n Больше информации  /info`) : console.log('p')
    // forums
    data === 'forum-Black' ? bot.sendPhoto(chatId, forums.Black01, allInfo.Fblack) //
     : data === 'forum-Pink' ? bot.sendPhoto(chatId, forums.Pink01, allInfo.Fpink)
     : data === 'forum-Grey' ? bot.sendPhoto(chatId, forums.Grey01, allInfo.Flast)
     : data === 'forum-Blue' ? bot.sendPhoto(chatId, forums.Blue01, allInfo.Fblue)
     : console.log('stopped')
     //
     data === 'blackInfo' ? bot.sendMessage(chatId, `${N} Back to School\n \n${sizes} \n ${Pr}`)
    : data === 'pinkInfo' ? bot.sendMessage(chatId, `${N} Pink Easter Egg \n \n❗️ Нет в наличии \n ${Pr}`)
    : data === 'lastInfo' ? bot.sendMessage(chatId, `${N} Last Forum\n \n${sizes} \n ${Pr}`)
    : data === 'blueInfo' ? bot.sendMessage(chatId, `${N} Tint\n \n ❗️ Нет в наличии \n ${Pr}`)
    : data === 'whiteInfo' ? bot.sendMessage(chatId, `${AN} Cream\n \n${sizes} \n ${Pr}`)
    : data === 'brownInfo' ? bot.sendMessage(chatId, `${AN} Wild Moss\n \n❗️ Нет в наличии \n ${Pr}`)
    :  console.log('stop')
});