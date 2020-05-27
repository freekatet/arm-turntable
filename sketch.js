/**
 *  DEMO
 *  - change playback rate of a soundfile based on mouseX position
 *  - a negative playback rate will reverse the soundfile, but won't
 *  preserve current location of the playhead.
 */

// ====================

var soundFile;
var p,p2,p3;
var rotationRate, newRate, x , y, z, xlerp;

//create a synth and connect it to the master output (your speakers)
var synth = new Tone.Synth().toMaster();




function preload() {
  soundFormats('mp3', 'ogg');
  soundFile = loadSound('yoYea.mp3');
}

function setup() {
  soundFile.loop(0);
  createCanvas(640, 360);
  background(100,100,100);
  p = createP();
  p2 = createP();
  p3 = createP();

  p2.html( 'TURNTABLE IS OFF' )
  p3.html( '©FREEKATET' )



  // frameRate(20);

  // default values
  rotationRate = 1;
  newRate = 1;
  x = 0 ;
    y = 0 ;
      z = 0 ;

}

function draw() {

  // rotationRate = lerp (rotationRate,radians(x),0.5);
  rotationRate = radians(x);
  newRate = (((rotationRate - 0.024)* -1.) * 0.285);


  // // set background color to white
  // background(255);
  //
  // // display variables
  // fill(100);
  // noStroke();
  // text("x: " + rotationRate , 25, 25);
  //   text("Push to Play " , 25, 100);

  if (newRate < 0.1) {
    newRate = 0;
  }


  newRate = constrain(newRate, 0., 4.);
  soundFile.rate(newRate);

  p.html( 'TOUCH SCREEN TO START'+' '+'Rate: ' + newRate )

  //play a middle 'C' for the duration of an 8th note
  // synth.triggerAttackRelease("C4", "8n");

}


window.ondevicemotion = function(e) {
   x = e.rotationRate.gamma
   y = e.rotationRate.alpha

}


function mousePressed() {
  if ( soundFile.isPlaying() ) { // .isPlaying() returns a boolean
    soundFile.stop();
    background(100,100,100);
    p2.html( 'TURNTABLE IS OFF' )

  } else {
    soundFile.play();
    background(0,255,0);
    p2.html( 'TURNTABLE IS ON' )

  }
}


// window.addEventListener("devicemotion", function(e)
// {
//    x = e.rotationRate.x;
//    y = e.rotationRate.y;
//    z = e.rotationRate.z;
//   });




// function keyPressed() {
//   var key = keyCode;
//   // Spacebar: pause
//   if (key == 32) {
//     soundFile.pause();
//   }
// }


//  Data Euler Angle
// window.addEventListener('deviceorientation', function(e)
// {
//   alpha = e.alpha;
//   beta = e.beta;
//   gamma = e.gamma;
// });





// window.addEventListener("devicemotion", function(e)
// {
//    ax = e.acceleration.x;
//    ay = e.acceleration.y;
//    az = e.acceleration.z;
//   });



// window.addEventListener("onmozorientation", function(e)
// {
//    x = e.orientation.x;
//    y = e.orientation.y;
//    z = e.orientation.z;
//   });
