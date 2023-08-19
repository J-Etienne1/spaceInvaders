const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

// Create a Player
class Player {
  constructor() {
    this.velocity = {
      x: 0,
      y: 0,
    };

    const image = new Image();
    image.src = "./images/ship.png";
    image.onload = () => {
      const scale = 0.15;
      this.image = image;
      this.width = image.width * scale;
      this.height = image.height * scale;
      this.position = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height - this.height - 100,
      };
    };
  }

  draw() {
    // test setting an image on the screen
    // c.fillStyle = 'red'
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)
    //if (this.position)
      c.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
  }
  update() {
    if (this.image) {
      this.draw();
      this.position.x += this.velocity.x;
    }
  }
}

const player = new Player();
//player.draw();
const keys = {
    ArrowLeft:{
        pressed: false
    },
    ArrowRight:{
        pressed: false
    },
    space:{
        pressed: false
    }
}

// image need to load to need animate to keep calling our images
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();

  if (keys.ArrowLeft.pressed && player.position.x >= 0){
    player.velocity.x = -5;
  } else if (keys.ArrowRight.pressed  && player.position.x + player.width <=  canvas.width) {
    player.velocity.x = 5;
  }  else {
    player.velocity.x = 0;
  }
}

animate();

addEventListener("keydown", ({ key }) => {
  // check what keys we need
  //console.log(key)
  switch (key) {
    case "ArrowLeft":
      //console.log("left");
      
      keys.ArrowLeft.pressed = true
      break;
    case "ArrowRight":
      //console.log("right");
      keys.ArrowRight.pressed = true
      break;
    case " ":
      //console.log("space");
      keys.space.pressed = true
      break;
  }
});



addEventListener("keyup", ({ key }) => {
    // check what keys we need
    //console.log(key)
    switch (key) {
      case "ArrowLeft":
        //console.log("left");
        
        keys.ArrowLeft.pressed = false
        break;
      case "ArrowRight":
        //console.log("right");
        keys.ArrowRight.pressed = false
        break;
      case " ":
        //console.log("space");
        keys.space.pressed = false
        break;
    }
  });
