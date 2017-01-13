var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

var address = null;

bot.dialog('/', function (session) {
    // session.send("Hello World");
});

bot.on('conversationUpdate', function (message) {
        if (message.membersAdded && message.membersAdded.length > 0) {
            membersAdded = message.membersAdded;
            //             .map((m) = > {
            //             var isSelf = m.id === message.address.bot.id;
            //     return (isSelf ? message.address.bot.name : m.name) || '' + ' (Id: ' + m.id + ')';
            // })
            // .
            // join(', ');

            console.log("num members: " + membersAdded.length);
        }

        address = message.address;

        // if (message.membersRemoved && message.membersRemoved.length > 0) {
        //     var membersRemoved = message.membersRemoved
        //             .map((m) = > {
        //             var isSelf = m.id === message.address.bot.id;
        //     return (isSelf ? message.address.bot.name : m.name) || '' + ' (Id: ' + m.id + ')';
        // })
        // .
        //     join(', ');
        //
        //     var reply = new builder.Message()
        //         .address(message.address)
        //         .text('The following members ' + membersRemoved + ' were removed or left the conversation :(');
        //     bot.send(reply);
    }
);

var send = function() {
    if (address != null) {
        var reply = new builder.Message()
            .address(address)
            .text("FLOTARI");
        // console.log("address: " + address);
        bot.send(reply);
    }
}

var CronJob = require('cron').CronJob;

var job = new CronJob('* * * * * *', send, null, false, "Europe/Bucharest");
job.start();
