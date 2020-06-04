let searching = 0;
let found = 1;
let travel = 2;
let hunting = 3;
let eating = 4;
let searchColor = '#43fa68';
let huntColor = '#ff0000';

class Organism {
  constructor(x, y, color){
    this.x = x;
    this.y = y;
    this.diameter = 20;
    this.color = color;
    this.brain = new Brain(this.x, this.y);
    this.lifeSpan = 0;
    //console.log(this.x + ", " + this.y);
  }

  move(){
    let nextMove = this.brain.think();
    this.x = nextMove[0];
    this.y = nextMove[1];
    this.lifeSpan++;
  }

  render(){
    this.brain.displaySearchRadius();
    this.brain.displayMoveLocation();
    push();
    fill(this.color);
    ellipse(this.x, this.y, this.diameter, this.diameter);
    pop();
    this.move();
  }
}
