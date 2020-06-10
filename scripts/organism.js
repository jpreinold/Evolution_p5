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
    this.hunger = 0;
    this.hungerRate = 0.1;
    this.reproductionUrge = 0;
    this.reproductionUrgeRate = 0.05;
    this.age = 0;
    //console.log(this.x + ", " + this.y);
  }

  move(){
    let nextMove = this.brain.think();
    this.x = nextMove[0];
    this.y = nextMove[1];
    this.age++;
    this.hunger += this.hungerRate;
    this.reproductionUrge += this.reproductionUrgeRate;
  }

  displayStats(){
    push();
    stroke(hungerColor);
    strokeWeight(5);
    line(this.x - 50, this.y - 50, this.x - 50 + this.hunger, this.y - 50);
    stroke(reproductionColor);
    line(this.x - 50, this.y - 40, this.x - 50 + this.reproductionUrge, this.y - 40);
    pop();
  }

  render(){
    this.brain.displaySearchRadius();
    this.brain.displayMoveLocation();
    this.displayStats();
    push();
    fill(this.color);
    ellipse(this.x, this.y, this.diameter, this.diameter);
    pop();
    this.move();
  }
}
