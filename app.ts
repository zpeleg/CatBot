import * as TelegramBot from "node-telegram-bot-api"
import {CatApiRetriever, IsMoving} from './catapi';
import * as request from 'request';
import {Configuration} from './configuration'

async function main() {
    var config = new Configuration();
    await config.init();
    var catapi = new CatApiRetriever(config.getKey('catapi'));
    
    var bot = new TelegramBot(config.getKey('telegram'), { polling: true });

    bot.onText(/\/cat(@DailyCatBot)?$/, function (msg) {
        console.log('start send photo');
        var chatId = msg.chat.id;
        catapi.getCat(IsMoving.Static, function (image) {
            var download = request(image);
            bot.sendPhoto(chatId, download, { caption: 'It\'s a cat!!' })
            console.log('sent photo');
        });
    });
    bot.onText(/\/catgif(@DailyCatBot)?$/, function (msg) {
        console.log('start send gif');
        var chatId = msg.chat.id;
        catapi.getCat(IsMoving.Moving, function (image) {
            var download = request(image);
            bot.sendDocument(chatId, download, { caption: 'It\'s a cat!!' })
            console.log('sent gif');
        });
    });
}

main();