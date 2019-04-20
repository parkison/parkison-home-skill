var alexaMeetups = require('./data/alexaMeetups');
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
    this.emit(':tell', 'Hi there!');
  },

  'AlexaMeetupNumbers': function() {
    var meetupNumbers = alexaMeetups.length;
    this.emit(':ask', `I currently know of ${meetupNumbers} alexa developer meetups. Check to see if your city is one of them!`, 'How can I help?')
  },

  'AlexaMeetupCityCheck': function() {
    // Get Slot values
    var USCitySlot = this.event.request.intent.slots.USCity.value;
    var EuropeanCitySlot = this.event.request.intent.slots.EuropeanCity.value;

    var city;
    if (USCitySlot) {
      city = USCitySlot;
    }
    else if (EuropeanCitySlot){
      city = EuropeanCitySlot;
    }
    else {
      this.emit(':ask','Sorry, I didn\'t recognize that city name','How can I help?');
    }

  var cityMatch = '';
  for (var i = 0; i < alexaMeetups.length; i++) {
    if(alexaMeetups[i].city.toLowerCase() === city.toLowerCase()) {
      cityMatch = alexaMeetups[i].city;
    }
  }

  if( cityMatch !== '') {
    this.emit(':ask',`Yes! ${city} has an event`,'How can I help?')
  }
  else {
    this.emit(':ask',`Sorry, looks like ${city} doesn't have an event`,'How can I help?')
  }

  }

};
