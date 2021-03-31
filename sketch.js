// ====================
let permissionGranted = false;

var soundFile;
var p, p2, p3;
var rotationRate, newRate, x, y, z, xlerp;

function preload() {
  soundFormats("mp3", "ogg");
  soundFile = loadSound(
    "Avril14th.mp3"
  );
}

function setup() {
  createCanvas(20, 20);
  background(100, 100, 100);
  p = createP();
  p2 = createP();
  p3 = createP();

  p2.html("TURNTABLE IS OFF");
  p3.html("©FREEKATET");

  // default values
  rotationRate = 1;
  newRate = 1;
  x = 0;
  y = 0;
  z = 0;
  
  
    // DeviceOrientationEvent, DeviceMotionEvent
  if (typeof(DeviceOrientationEvent) !== 'undefined' && typeof(DeviceOrientationEvent.requestPermission) === 'function') {
    // ios 13 device
    
    DeviceOrientationEvent.requestPermission()
      .catch(() => {
        // show permission dialog only the first time
        let button = createButton("click to allow access to sensors");
        button.style("font-size", "24px");
        button.center();
        button.mousePressed( requestAccess );
        throw error;
      })
      .then(() => {
        // on any subsequent visits
        permissionGranted = true;
      })
  } else {
    // non ios 13 device
    textSize(48);
    // text("non ios 13 device", 100, 100);
    permissionGranted = true;
  }
  
  
  let button2 = createButton("TURNTABLE ON/OFF");
        button2.style("font-size", "24px");
        button2.center();
        button2.mousePressed( played );
  
}


function requestAccess() {
  DeviceOrientationEvent.requestPermission()
    .then(response => {
      if (response == 'granted') {
        permissionGranted = true;
      } else {
        permissionGranted = false;
      }
    })
  .catch(console.error);
  
  this.remove();
}

function draw() {
  
  if (!permissionGranted) return;

  // rotationRate = lerp (rotationRate,radians(x),0.5);
  rotationRate = radians(x);
  newRate = (rotationRate - 0.024) * -1 * 0.285;

  if (newRate < 0.1 && newRate > -0.1) {
    newRate = 0;
  }
  // newRate = constrain(newRate, 0., 4.);
  soundFile.rate(newRate);

  p.html("TOUCH SCREEN TO START" + " " + "Rate: " + newRate + "   " + x);
}

window.ondevicemotion = function(e) {
  x = e.rotationRate.gamma;
  y = e.rotationRate.alpha;
};

// function mousePressed() {
//   if (soundFile.isPlaying()) {
//     // .isPlaying() returns a boolean
//     soundFile.pause();
//     background(100, 100, 100);
//     p2.html("TURNTABLE IS OFF");
//   } else {
//     soundFile.loop();
//     background(0, 255, 0);
//     p2.html("TURNTABLE IS ON");
//   }
// }

function played() {
  
 if (soundFile.isPlaying()) {
    // .isPlaying() returns a boolean
    soundFile.pause();
    background(100, 100, 100);
    p2.html("TURNTABLE IS OFF");
   // button2.html('TURNTABLE ON');
  } else {
    soundFile.loop();
    background(0, 255, 0);
    p2.html("TURNTABLE IS ON");
    // button2.html('TURNTABLE OFF');
  }

  
}