// Led pulse example, developd by eZ
// Pulse needs a valid PWM output to operate

const five = require("johnny-five")
const board = new five.Board()

board.on("ready", function(){
  var p10 = new five.Led(10)
  var p11 = new five.Led(11)
  var p12 = new five.Led(12)
  var p13 = new five.Led(13)



p11.fade({
  easing: "linear",
  duration: 5000,
  cuePoints: [0, 0.2, 0.4, 0.6, 0.8, 1],
  keyFrames: [0, 250, 25, 150, 100, 125],
  onstop: function() {
    console.log("Animation stopped");
  }
});

})
