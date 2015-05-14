const five = require("johnny-five")
const colorMatrix = require("./colors")
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

  this.repl.inject({
    led: led
  })
})
