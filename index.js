const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

// Create a Player
class Player {
  constructor() {
    this.position = {
      x: 200,
      y: 200,
    };

    this.velocity = {
      x: 0,
      y: 0,
    };

    const image = new Image();
    image.src = "./images/ship.png";
    image.onload = () => {
      this.image = image;
      this.width = image.width * .15;
      this.height = image.height * .15;
    };
  }

  draw() {
    // test setting an image on the screen
    // c.fillStyle = 'red'
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)
    if (this.image)
      c.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
  }
}

const player = new Player();
player.draw();

// image need to load to need animate to keep calling our images
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.draw();
}

animate();
