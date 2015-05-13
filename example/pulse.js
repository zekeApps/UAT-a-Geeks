// Led pulse example, developd by eZ
// Pulse needs a valid PWM output to operate

const five = require("johnny-five")
const board = new five.Board()

board.on("ready", function(){
  var led = new five.Led(9)
  led.pulse(1000)
})
