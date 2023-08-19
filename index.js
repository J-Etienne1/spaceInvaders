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

    this.rotation = 0;

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

    c.save();
    c.translate(
      player.position.x + player.width / 2,
      player.position.y + player.height / 2
    );

    c.rotate(this.rotation);
    c.translate(
      -player.position.x - player.width / 2,
      -player.position.y - player.height / 2
    );

    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    c.restore();
  }
  update() {
    if (this.image) {
      this.draw();
      this.position.x += this.velocity.x;
    }
  }
}

class Projectile {
  constructor({ position, velocity }) {
    (this.postion = position), (this.velocity = velocity), (this.radius = 3);
  }
  draw() {
    c.beginPath();
    c.arc(this.postion.x, this.postion.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = "red";
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
    this.postion.x += this.velocity.x;
    this.postion.y += this.velocity.y;
  }
}

const player = new Player();
const projectiles = [];
//player.draw();
const keys = {
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  space: {
    pressed: false,
  },
};

// image need to load to need animate to keep calling our images
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  projectiles.forEach((Projectile) => {
    Projectile.update();
  });

  if (keys.ArrowLeft.pressed && player.position.x >= 0) {
    player.velocity.x = -5;
    player.rotation = -0.15;
  } else if (
    keys.ArrowRight.pressed &&
    player.position.x + player.width <= canvas.width
  ) {
    player.velocity.x = 5;
    player.rotation = 0.15;
  } else {
    player.velocity.x = 0;
    player.rotation = 0;
  }
}

animate();

addEventListener("keydown", ({ key }) => {
  // check what keys we need
  //console.log(key)
  switch (key) {
    case "ArrowLeft":
      //console.log("left");

      keys.ArrowLeft.pressed = true;
      break;
    case "ArrowRight":
      //console.log("right");
      keys.ArrowRight.pressed = true;
      break;
    case " ":
      //console.log("space");
      keys.space.pressed = true;
      projectiles.push(
        new Projectile({
          position: {
            x: player.position.x + player.width / 2 ,
            y: player.position.y,
          },
          velocity: {
            x: 0,
            y: -10,
          },
        })
      );
      console.log(projectiles)
      break;
  }
});


addEventListener("keyup", ({ key }) => {
  // check what keys we need
  //console.log(key)
  switch (key) {
    case "ArrowLeft":
      //console.log("left");

      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowRight":
      //console.log("right");
      keys.ArrowRight.pressed = false;
      break;
    case " ":
      //console.log("space");
      keys.space.pressed = false;
      break;
  }
});
