var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {

  'LaunchRequest': function () {
    this.emit(':ask', 'Welcome to Voice Devs!', 'Try saying hello!');
  },

  'Hello': function() {
    this.emit(':ask', 'Hi there!','What is your name?');
  },

  'nameCheck': function() {
    // Get Slot values
    var firstName = this.event.request.intent.slots.firstName.value;

    if(firstName) {
      this.emit(':tell',`Hello ${firstName}!`)
    }
    else {
      this.emit(':ask','Sorry, I didn\'t understand','How can I help?')
    }
  }
};
