// This is a simple chatbot used for SuperSimpleDev
// coding tutorials

export const Chatbot = {
  defaultResponses: {

    // ---------- GREETINGS ----------

    'hello hi': `Hello! How can I help you?`,
    'hello': `Hello! 👋 How can I help you?`,
    'hi': `Hey! 👋 How are you doing?`,
    'hey': `Hey there! 😄 What's up?`,
    'hlo': `Hello! Nice to see you! 😊`,
    'good morning': `Good morning! ☀️ Hope you have a great day!`,
    'good afternoon': `Good afternoon! 😊 How is your day going?`,
    'good evening': `Good evening! 🌆 How can I help you?`,
    'good night': `Good night! 🌙 Sleep well!`,

    // ---------- GENERAL CONVERSATION ----------

    'how are you': `I'm doing great! How can I help you?`,

    'who are you': `I'm your mini chatbot! 🤖`,

    'what is your name': `You can call me Robo! 🤖`,

    'are you a robot': `Yes! 🤖 But I'm a friendly one.`,

    'do you like me': `Of course! You're the one keeping me busy. 😄`,

    'am i funny': `I don't know... but you're definitely making me work! 😂`,

    'thank': `No problem! Let me know if you need help with anything else!`,

    'thanks': `You're welcome! 😊`,

    // ---------- FUN ----------

    'joke': function () {
      const jokes = [
        `Why did the developer go broke? Because he used up all his cache! 😂`,
        `Why do programmers prefer dark mode? Because light attracts bugs! 🐛`,
        `Why did the computer go to the doctor? Because it had a virus! 😂`,
        `I told my computer I needed a break... now it keeps showing me KitKat ads. 😂`
      ];

      return jokes[Math.floor(Math.random() * jokes.length)];
    },

    'tell me a joke': function () {
      const jokes = [
        `Why do programmers hate nature? It has too many bugs! 🐛`,
        `There are only 10 types of people: those who understand binary and those who don't. 😄`,
        `Why was the JavaScript developer sad? Because he didn't know how to null his feelings. 😂`
      ];

      return jokes[Math.floor(Math.random() * jokes.length)];
    },

    'bored': `Let's play something! 🎮 Try saying "flip a coin" or "roll a dice".`,

    // ---------- GAMES ----------

    'flip a coin': function () {
      const randomNumber = Math.random();

      if (randomNumber < 0.5) {
        return 'Sure! 🪙 You got heads!';
      } else {
        return 'Sure! 🪙 You got tails!';
      }
    },

    'roll a dice': function () {
      const diceResult = Math.floor(Math.random() * 6) + 1;

      return `Sure! 🎲 You got ${diceResult}`;
    },

    // ---------- DATE ----------

    'what is the date today': function () {
      const now = new Date();

      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];

      const month = months[now.getMonth()];
      const day = now.getDate();

      return `Today is ${month} ${day}`;
    },

    // ---------- REACT / PROGRAMMING ----------

    'what is react': `React is a JavaScript library used to build user interfaces. ⚛️`,

    'what is javascript': `JavaScript is a programming language used to make websites and applications interactive.`,

    'what is node': `Node.js is a JavaScript runtime environment that lets you run JavaScript outside the browser. 🚀`,

    'what is node js': `Node.js is a JavaScript runtime environment that lets you run JavaScript outside the browser. 🚀`,

    'what is html': `HTML is used to structure the content of a webpage.`,

    'what is css': `CSS is used to style and design webpages. 🎨`,

    // ---------- RANDOM RESPONSES ----------

    'i am bored': `Don't be bored! 😄 Try asking me for a joke or roll a dice.`,

    'i am sad': `I'm sorry to hear that. 💙 Want to talk about it?`,

    'i am happy': `That's great to hear! 😄 Keep that energy going!`,

    'i love you': `Aww! 🤖❤️ I appreciate that!`,

    'bye': `Bye! 👋 Come back whenever you want to chat!`,

    'see you': `See you later! 👋`,

  },

  // Additional responses can be added here
  additionalResponses: {},

  unsuccessfulResponse:
    `Sorry, I didn't quite understand that. Try saying hello, tell me a joke, roll a dice, or flip a coin!`,

  emptyMessageResponse:
    `Sorry, it looks like your message is empty. Please send a message and I will give you a response.`,

  // Allows us to add more responses later
  addResponses: function (additionalResponses) {
    this.additionalResponses = {
      ...this.additionalResponses,
      ...additionalResponses
    };
  },

  // Gets the best response
  getResponse: function (message) {

    if (!message) {
      return this.emptyMessageResponse;
    }

    // Combine default and additional responses
    const responses = {
      ...this.defaultResponses,
      ...this.additionalResponses,
    };

    const {
      ratings,
      bestMatchIndex,
    } = this.stringSimilarity(message, Object.keys(responses));

    const bestResponseRating = ratings[bestMatchIndex].rating;

    if (bestResponseRating <= 0.3) {
      return this.unsuccessfulResponse;
    }

    const bestResponseKey = ratings[bestMatchIndex].target;

    const response = responses[bestResponseKey];

    // If response is a function, execute it
    if (typeof response === 'function') {
      return response();
    } else {
      return response;
    }
  },

  // Async version
  getResponseAsync: function (message) {
    return new Promise((resolve) => {

      setTimeout(() => {
        resolve(this.getResponse(message));
      }, 1000);

    });
  },

  // Compare two strings
  compareTwoStrings: function (first, second) {

    first = first.replace(/\s+/g, '');
    second = second.replace(/\s+/g, '');

    if (first === second) return 1;

    if (first.length < 2 || second.length < 2) return 0;

    let firstBigrams = new Map();

    for (let i = 0; i < first.length - 1; i++) {

      const bigram = first.substring(i, i + 2);

      const count = firstBigrams.has(bigram)
        ? firstBigrams.get(bigram) + 1
        : 1;

      firstBigrams.set(bigram, count);
    }

    let intersectionSize = 0;

    for (let i = 0; i < second.length - 1; i++) {

      const bigram = second.substring(i, i + 2);

      const count = firstBigrams.has(bigram)
        ? firstBigrams.get(bigram)
        : 0;

      if (count > 0) {

        firstBigrams.set(bigram, count - 1);

        intersectionSize++;
      }
    }

    return (
      2.0 * intersectionSize
    ) / (
      first.length + second.length - 2
    );
  },

  // Find the closest matching response
  stringSimilarity: function (mainString, targetStrings) {

    const ratings = [];

    let bestMatchIndex = 0;

    for (let i = 0; i < targetStrings.length; i++) {

      const currentTargetString = targetStrings[i];

      const currentRating =
        this.compareTwoStrings(
          mainString,
          currentTargetString
        );

      ratings.push({
        target: currentTargetString,
        rating: currentRating
      });

      if (
        currentRating >
        ratings[bestMatchIndex].rating
      ) {
        bestMatchIndex = i;
      }
    }

    const bestMatch = ratings[bestMatchIndex];

    return {
      ratings: ratings,
      bestMatch: bestMatch,
      bestMatchIndex: bestMatchIndex
    };
  },
};


// Define randomUUID if it doesn't exist
function uuidPolyfill() {

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (char) {

      const randomNumber =
        Math.random() * 16 | 0;

      const result =
        char === 'x'
          ? randomNumber
          : (randomNumber & 0x3 | 0x8);

      return result.toString(16);
    });
}


// Allows Chatbot to work in browser and Node.js
(function (root, factory) {

  if (
    typeof define === 'function' &&
    define.amd
  ) {

    define([], factory);

  } else if (
    typeof module === 'object' &&
    module.exports
  ) {

    module.exports = factory();

  } else {

    // Browser fallback
    if (
      typeof root.crypto === 'undefined'
    ) {

      try {
        root.crypto = {};
      } catch (e) {}
    }

    // randomUUID fallback
    if (
      root.crypto &&
      typeof root.crypto.randomUUID !== 'function'
    ) {

      try {
        root.crypto.randomUUID =
          uuidPolyfill;
      } catch (e) {}
    }

    // Browser global
    root.Chatbot = factory();
    root.chatbot = factory();
  }

}(
  typeof self !== 'undefined'
    ? self
    : this,

  function () {
    return Chatbot;
  }
));