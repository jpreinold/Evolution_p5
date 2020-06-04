let numOrganisms = 3;
let numHealthyFood = 100;
let numPoisonousFood = 0;
let numFood = numHealthyFood + numPoisonousFood;
let food = [];
let organisms = [];
let healthy = 0;
let gameSpeed = 1;
let maxOrganismDiameter = 50;
let minOrganismDiameter = 3;
let gameWidth = 500;
let gameHeight = 500;
let colors = ["#ff3333", "#ff6633", "#ffff33", "#33ff33", "#3399ff", "#9933ff"];
let team = 0;
let numberOfTeams = colors.length;
let teamSizes = new Map();
for(let i = 0; i < numberOfTeams; i++){
  teamSizes.set(colors[i], 0);
}
let font;



function getRandInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function showScore(){
  push();
  strokeWeight(1);
  stroke(0)
  for(let i = 0; i < numberOfTeams; i++){
    fill(colors[i]);
    text(teamSizes.get(colors[i]), gameWidth - 20, 30 * (i + 1));
  }
  pop();
}

function getDistance(x1, y1, x2, y2){
  return Math.sqrt(Math.pow((y2-y1), 2) + Math.pow((x2-x1), 2));
}

function collisionDetected(x1, y1, d1, x2, y2, d2){
  let a = d1 / 2 + d2 / 2;
  let x = x2 - x1;
  let y = y2 - y1;

  //console.log(a + ", " + x*x + ", " + y*y);
  return a > Math.sqrt((x*x) + (y*y));
}

function preload(){
  font = loadFont('Neufreit-ExtraBold.otf');
}

function setup(){
  let cnv = createCanvas(gameWidth, gameHeight);
  textFont(font);
  textSize(15);

  for(let i = 0; i < numFood; i++){

    food.push(new Food(getRandInt(0, gameWidth), getRandInt(0, gameHeight), 0));

  }

  for(let i = 0; i < numOrganisms; i++){
    colorIndex = team % numberOfTeams;
    organisms.push(new Organism(getRandInt(0, gameWidth), getRandInt(0, gameHeight), colors[colorIndex]));

    //console.log(colors[colorIndex]);
    //console.log(teamSizes[colors[colorIndex]]);
    //console.log(teamSizes.get(colorIndex));
    teamSizes.set(colors[colorIndex], teamSizes.get(colors[colorIndex]) + 1);
    team++;
  }
  //console.log(teamSizes);
  radio = createRadio();
  radio.option('Food');
  radio.option('Organism');
  radio.option('Stats');
  radio.addClass('radioBtn');
  radio.position(10, 10);

}

function mouseClicked(){

  if(mouseX >= 0 && mouseX < gameWidth && mouseY >= 0 && mouseY < gameHeight) {
    if(radio.value() == "Organism"){
      let randomTeamIndex = getRandInt(0, numberOfTeams);
      //console.log(randomTeamIndex);
      organisms.push(new Organism(mouseX, mouseY, colors[randomTeamIndex]));
      teamSizes.set(colors[randomTeamIndex], teamSizes.get(colors[randomTeamIndex]) + 1);
      numOrganisms++;
    } else if(radio.value() == "Food"){
      food.push(new Food(mouseX, mouseY, 0));
      numFood++;
    }

  }
}

function draw(){
  background(0);
  for(let i = numOrganisms - 1; i >= 0; i--){
    if(organisms[i].diameter > 0){
      organisms[i].render();
      if(organisms[i].lifeSpan % (500 / gameSpeed) == 0){
        if(organisms[i].diameter > (maxOrganismDiameter + minOrganismDiameter) / 2){
          organisms.push(new Organism(organisms[i].x, organisms[i].y, organisms[i].color));
          organisms.push(new Organism(organisms[i].x, organisms[i].y, organisms[i].color));
          numOrganisms += 2;
          teamSizes.set(organisms[i].color, teamSizes.get(organisms[i].color) + 2);
          //console.log(teamSizes);
        }
      }
    } else {
      teamSizes.set(organisms[i].color, teamSizes.get(organisms[i].color) - 1);
      organisms.splice(i, 1);
      //console.log(teamSizes);
      numOrganisms--;
    }

    //console.log(organisms[i].eating);
  }
  for(let i = 0; i < numFood; i++){
    food[i].render();
  }

  for(let i = 0; i < numOrganisms; i++){
    if(organisms[i].brain.eating == true){
      organisms[i].diameter += 20;
      if( organisms[i].diameter > maxOrganismDiameter ) organisms[i].diameter = maxOrganismDiameter;
    } else {
      organisms[i].diameter -= .2;
    }
  }

  showScore();
}
