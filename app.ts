import * as TelegramBot from "node-telegram-bot-api"
import {CatApiRetriever, IsMoving} from './catapi';
import * as request from 'request';

var catapi = new CatApiRetriever();
catapi.getCat(IsMoving.Static, function (b) {

});
var token = "255648552:AAGPLY09tq5P3ymtSqL4_IYky82bcXjk0Do";
var bot = new TelegramBot(token, { polling: true });

bot.onText(/\/cat(@DailyCatBot)?$/, function (msg) {
    console.log('start send photo');
    var chatId = msg.chat.id;
    var catapi = new CatApiRetriever();
    catapi.getCat(IsMoving.Static, function (image) {
        var download = request(image);
        bot.sendPhoto(chatId, download, { caption: 'It\'s a cat!!' })
        console.log('sent photo');
    });
});
bot.onText(/\/catgif(@DailyCatBot)?$/, function (msg) {
    console.log('start send gif');
    var chatId = msg.chat.id;
    var catapi = new CatApiRetriever();
    catapi.getCat(IsMoving.Moving, function (image) {
        var download = request(image);
        bot.sendDocument(chatId, download, { caption: 'It\'s a cat!!' })
        console.log('sent gif');
    });
});