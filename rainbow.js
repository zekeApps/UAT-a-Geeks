const five = require("johnny-five")
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
  led.color("#00ff00")
  console.log("Arduino is Alive")

  this.repl.inject({
    led: led
  })
})
