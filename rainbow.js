const five = require("johnny-five")
const colorMatrix = require("./colors")
const twit = require("node-tweet-stream")
var jsonValue = require('json-value')
const board = new five.Board()
var lastColor = "off"


board.on("ready", function () {
  var led = new five.Led.RGB({
    pins: {
      red:9,
      green: 10,
      blue: 11
    },
    isAnode: true
  })
  led.color(colorMatrix[lastColor])


  // Twitter OAuth
  tw = new twit({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET,
    token: process.env.TWITTER_TOKEN,
    token_secret: process.env.TWITTER_TOKEN_SECRET
  })
  tw.track("@zeke_glz")
  tw.track("#UATaGeeks")
  tw.on("tweet", colorChange)
  tw.on("error", errorHandler)


  function colorChange(tweet) {
    // Populates color keys
    Object.keys(colorMatrix).some(function colorHandler(color) {
      if (tweet.text.indexOf(color) >= 0) {
        if (color != lastColor) {
          lastColor = color;
          led.color(colorMatrix[color])
          console.log("Changing to: " + color + ", by: " + jsonValue(tweet, "user.name") + "@"
          + jsonValue(tweet, "user.screen_name") + "\n--> Text: "+ jsonValue(tweet, "text") + "\n\n")
        }
      }
    })
  }

  function errorHandler(err) {
    console.log("Oh no, error occurred with Twitter stream: ", err)
  }
  // REPL implementation
  this.repl.inject({
    led: led
  })
})
