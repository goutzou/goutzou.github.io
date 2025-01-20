let previousMinute = -1;

function setup() {
  // Create canvas with dynamic size
  let canvas = createCanvas(800, 600);
  canvas.parent(document.body); // Attach canvas to the body
  angleMode(DEGREES); // Use degrees for rotation
  noStroke(); // Remove outlines for cleaner visuals
}

function draw() {
  background(30); // Dark background for contrast

  // Get current time
  let hr = hour();
  let mn = minute();
  let sc = second();

  // Log minute changes
  if (mn !== previousMinute) {
    console.log("Current Minute:", mn);
    previousMinute = mn;
  }

  // ----------------------
  // Hour Bar
  // ----------------------
  push();
  // Map hour (0-24) to bar width (0 to canvas width)
  let hourWidth = map(hr % 24, 0, 24, 0, width);
  fill(70, 130, 180); // Steel Blue color for hours
  rectMode(CORNER); // Draw from top-left corner
  rect(0, 20, hourWidth, 20); // Positioned at y = 20
  pop();

  // ----------------------
  // Minute Bar
  // ----------------------
  push();
  // Map minute (0-60) to bar width (0 to canvas width)
  let minuteWidth = map(mn, 0, 60, 0, width);
  fill(60, 179, 113); // Medium Sea Green color for minutes
  rectMode(CORNER); // Draw from top-left corner
  rect(0, 50, minuteWidth, 20); // Positioned at y = 50
  pop();

  // ----------------------
  // Second Representation - Rotating Line
  // ----------------------
  push();
  translate(width / 2, height / 2); // Center the rotating line
  let scAngle = map(sc, 0, 60, 0, 360); // Map seconds to rotation angle
  rotate(scAngle);
  stroke(220, 20, 60); // Crimson color for seconds
  strokeWeight(4);
  line(0, 0, 150, 0); // Rotating line for seconds
  pop();

  // ----------------------
  // Time Display
  // ----------------------
  updateTimeDisplay(hr, mn, sc);
}

// Function to update the time display text
function updateTimeDisplay(hr, mn, sc) {
  // Format hour to 12-hour format
  let displayHour = hr % 12 === 0 ? 12 : hr % 12;
  let ampm = hr >= 12 ? "PM" : "AM";
  let displayMinute = nf(mn, 2); // Ensure two digits
  let displaySecond = nf(sc, 2); // Ensure two digits

  // Construct time string
  let timeText = `Time: ${displayHour}:${displayMinute}:${displaySecond} ${ampm}`;

  // Update the HTML div
  let timeDisplayDiv = document.getElementById('timeDisplay');
  if (timeDisplayDiv) {
    timeDisplayDiv.innerText = timeText;
  }
}

// Handle window resizing for responsiveness
function windowResized() {
  resizeCanvas(800, 600); // Keep canvas size fixed or make dynamic if preferred
}


