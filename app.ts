import * as TelegramBot from "node-telegram-bot-api"

var token = "255648552:AAGPLY09tq5P3ymtSqL4_IYky82bcXjk0Do";
var bot = new TelegramBot(token, {polling: true});

// Matches /echo [whatever]
bot.onText(/\/echo (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  var resp = match[1];
  bot.sendMessage(fromId, resp);
});

// Any kind of message
bot.on('message', function (msg) {
  var chatId = msg.chat.id;
  // photo can be: a file path, a stream or a Telegram file_id
  var photo = 'cats.jpg';
  bot.sendPhoto(chatId, photo, {caption: 'Lovely kittens'});
});