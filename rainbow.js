const five = require("johnny-five")
const colorMatrix = require("./colors")
const twit = require("node-tweet-stream")
const board = new five.Board()

board.on("ready", function () {
  var led = new five.Led.RGB({
    pins: {
      red:9,
      green: 10,
      blue: 11
    },
    isAnode: true
  })
  led.color(colorMatrix["candy"])
  console.log("Arduino is Alive")



  // Twitter OAuth
  tw = new twit({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET,
    token: process.env.TWITTER_TOKEN,
    token_secret: process.env.TWITTER_TOKEN_SECRET
  })
  tw.track("@zeke_glz")
  tw.track("#UATaGeeks")
  tw.on('tweet', function (tweet) {
  console.log('tweet received', tweet)
  })

  tw.on('error', function (err) {
  console.log('Oh no, error Occureed with Twitter Stream: ', err)
  })

  this.repl.inject({
    led: led
  })
})
