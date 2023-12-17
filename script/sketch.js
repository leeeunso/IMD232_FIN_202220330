let originalWidth = 900; // 가로 길이를 3의 배수로 설정
let originalHeight = 600; // 세로 길이를 2의 배수로 설정
let aspectRatio = originalWidth / originalHeight;
let eyes = [];
let eyeShapes = ['circle', 'rectangle', 'triangle'];
let particles = [];
const particlesPerClick = 10;

class Eye {
  constructor(x, y) {
    this.eyeX = x;
    this.eyeY = y;
    this.eyeColor = color(0);
    this.eyeShape = 'circle';
  }

  drawEye() {
    fill(255);
    ellipse(this.eyeX, this.eyeY, 100);
  }

  drawPupil() {
    let dx = mouseX - this.eyeX;
    let dy = mouseY - this.eyeY;
    let angle = atan2(dy, dx);

    let eyeRadius = 25;
    let eyePosX = this.eyeX + cos(angle) * eyeRadius;
    let eyePosY = this.eyeY + sin(angle) * eyeRadius;

    fill(this.eyeColor);
    if (this.eyeShape === 'circle') {
      ellipse(eyePosX, eyePosY, 30);
    } else if (this.eyeShape === 'rectangle') {
      rectMode(CENTER);
      rect(eyePosX, eyePosY, 30, 30);
    } else if (this.eyeShape === 'triangle') {
      triangle(
        eyePosX,
        eyePosY - 15,
        eyePosX + 15,
        eyePosY + 15,
        eyePosX - 15,
        eyePosY + 15
      );
    }
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.diameter = random(10, 20);
    this.speed = random(1, 5);
    this.color = color(random(255), random(255), random(255));
  }

  update() {
    this.y += this.speed;
  }

  display() {
    fill(this.color);
    beginShape();
    const numPoints = 5;
    const angle = TWO_PI / numPoints;
    const halfAngle = angle / 2.0;
    for (let i = 0; i < TWO_PI; i += angle) {
      let x = this.x + cos(i) * this.diameter;
      let y = this.y + sin(i) * this.diameter;
      vertex(x, y);
      x = this.x + cos(i + halfAngle) * (this.diameter / 2);
      y = this.y + sin(i + halfAngle) * (this.diameter / 2);
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}

function setup() {
  let canvasDimensions = getCanvasDimensions(
    windowWidth,
    windowHeight,
    aspectRatio
  );
  // createCanvas(canvasDimensions.w, canvasDimensions.h);
  setCanvasContainer('canvas', 1, 1, true);
  background('#F0F0EA');

  let eye1 = new Eye(width / 2 - 100, height / 2);
  let eye2 = new Eye(width / 2 + 100, height / 2);

  eyes.push(eye1, eye2);

  canvas.addEventListener('click', changeEyeProperties);
}

function draw() {
  background('#462E89');

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].y > height) {
      particles.splice(i, 1);
    }
  }

  for (let i = 0; i < eyes.length; i++) {
    eyes[i].drawEye();
    eyes[i].drawPupil();
  }
}

function windowResized() {
  let canvasDimensions = getCanvasDimensions(
    windowWidth,
    windowHeight,
    aspectRatio
  );
  resizeCanvas(canvasDimensions.w, canvasDimensions.h);

  for (let i = 0; i < eyes.length; i++) {
    eyes[i].eyeX = canvasDimensions.w / 2 - 100 + i * 200;
    eyes[i].eyeY = canvasDimensions.h / 2;
  }
}

function getCanvasDimensions(w, h, ratio) {
  if (w / h > ratio) {
    return {
      w: h * ratio,
      h: h,
    };
  } else {
    return {
      w: w,
      h: w / ratio,
    };
  }
}

function changeEyeProperties() {
  for (let i = 0; i < eyes.length; i++) {
    eyes[i].eyeColor = color(random(255), random(255), random(255));
  }

  for (let i = 0; i < eyes.length; i++) {
    eyes[i].eyeShape = random(eyeShapes);
  }
}

function mouseDragged() {
  for (let i = 0; i < particlesPerClick; i++) {
    let newParticle = new Particle(
      mouseX + random(-10, 10),
      mouseY + random(-10, 10)
    );
    particles.push(newParticle);
  }
}

//위는 미간 넓음 아래는 좁음

// let originalWidth = 1000;
// let originalHeight = 667;
// let aspectRatio = originalWidth / originalHeight;
// let eyes = []; // 눈 객체를 담을 배열

// class Eye {
//   constructor(x, y) {
//     this.eyeX = x;
//     this.eyeY = y;
//   }

//   drawEye() {
//     fill(255);
//     ellipse(this.eyeX, this.eyeY, 100);
//   }

//   drawPupil() {
//     let dx = mouseX - this.eyeX;
//     let dy = mouseY - this.eyeY;
//     let angle = atan2(dy, dx);

//     let eyeRadius = 25;
//     let eyePosX = this.eyeX + cos(angle) * eyeRadius;
//     let eyePosY = this.eyeY + sin(angle) * eyeRadius;

//     fill(0);
//     ellipse(eyePosX, eyePosY, 20);
//   }
// }

// function setup() {
//   let canvasDimensions = getCanvasDimensions(
//     windowWidth,
//     windowHeight,
//     aspectRatio
//   );
//   createCanvas(canvasDimensions.w, canvasDimensions.h);
//   background('#F0F0EA');

//   // 눈 객체 생성 (두 개만 생성)
//   let eye1 = new Eye(width / 2 - 50, height / 2); // 첫 번째 눈
//   let eye2 = new Eye(width / 2 + 50, height / 2); // 두 번째 눈

//   eyes.push(eye1, eye2);
// }

// function draw() {
//   background('#f9c215');

//   // 모든 눈 객체 그리기
//   for (let i = 0; i < eyes.length; i++) {
//     eyes[i].drawEye();
//     eyes[i].drawPupil();
//   }
// }

// function windowResized() {
//   let canvasDimensions = getCanvasDimensions(
//     windowWidth,
//     windowHeight,
//     aspectRatio
//   );
//   resizeCanvas(canvasDimensions.w, canvasDimensions.h);
// }

// function getCanvasDimensions(w, h, ratio) {
//   if (w / h > ratio) {
//     return {
//       w: h * ratio,
//       h: h,
//     };
//   } else {
//     return {
//       w: w,
//       h: w / ratio,
//     };
//   }
// }
