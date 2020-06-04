class Brain {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.status = searching;
    this.searchRadius = 100;
    this.moveLocation = [-1, -1];
    this.foodCoord = [-1, -1];
    this.eating = false;
  }

  setMoveLocation(){
    this.moveLocation[0] = getRandInt(0,2) == 0 ? this.x + getRandInt(0, this.searchRadius / 2) : (this.x + -1 * getRandInt(0, this.searchRadius / 2));
    while((this.moveLocation[0] < 0 || this.moveLocation[0] >= gameWidth) ){
      this.moveLocation[0] = getRandInt(0,2) == 1 ? this.x + getRandInt(0, this.searchRadius / 2) : -1 * (this.x + getRandInt(0, this.searchRadius / 2));

    }
    this.moveLocation[1] = getRandInt(0,2) == 0 ? this.y + getRandInt(0, this.searchRadius / 2) : (this.y + -1 * getRandInt(0, this.searchRadius / 2));
    while((this.moveLocation[1] < 0 || this.moveLocation[1] >= gameHeight)){
      this.moveLocation[1] = getRandInt(0,2) == 1 ? this.y + getRandInt(0, this.searchRadius / 2) : -1 * (this.y + getRandInt(0, this.searchRadius / 2));
    }
    this.status = travel;

  }

  searchForFood(){
    for(let i = numFood - 1; i >= 0; i--){
      if(collisionDetected(this.x, this.y, this.searchRadius, food[i].x,  food[i].y, food[i].diameter)){
        this.moveLocation[0] = food[i].x;
        this.moveLocation[1] = food[i].y;
        this.status = hunting;
        this.foodCoord = [food[i].x, food[i].y];
        break;
      }
    }
    return -1;
  }

  eat(foodCoord){
    let x = this.foodCoord[0];
    let y = this.foodCoord[1];
    for(let i = numFood - 1; i >= 0; i--){
      if( food[i].x == x && food[i].y == y ){
        numFood--;
        if(food[i].type == healthy){

        }
        food.splice(i, 1);
        //this.status = searching;
        //this.moveLocation = [-1, -1];
        break;
      }
    }
  }

  alreadyEaten(){
    let eaten = true;
    let x = this.moveLocation[0];
    let y = this.moveLocation[1];
    for(let i = 0; i < numFood; i++){
      if(food[i].x != x && food[i].y != y){
        eaten = false;
        break;
      }
    }
    return eaten;
  }

  think(){
    this.eating = false;
    if(this.status == searching){

      if(this.moveLocation[0] == -1 && this.moveLocation[1] == -1){
        this.setMoveLocation();
        //console.log(this.moveLocation);
      }

    } else if(this.status == travel) {
      this.searchForFood();
      let dist = getDistance(this.x, this.y, this.moveLocation[0], this.moveLocation[1]);
      //console.log(dist);
      if(Math.floor(dist) > gameSpeed) {

        let deltaX = this.x - this.moveLocation[0];
        let deltaY = this.y - this.moveLocation[1];
        this.x -= deltaX * gameSpeed / dist;
        this.y -= deltaY * gameSpeed / dist;
      } else {

        this.setMoveLocation();
        //console.log(this.moveLocation);
      }

    } else if(this.status == hunting){
      let eaten = this.alreadyEaten();
      if(!eaten){
        let dist = getDistance(this.x, this.y, this.moveLocation[0], this.moveLocation[1]);
        //console.log(dist);
        if(Math.floor(dist) > gameSpeed) {

          let deltaX = this.x - this.moveLocation[0];
          let deltaY = this.y - this.moveLocation[1];
          this.x -= deltaX * gameSpeed / dist;
          this.y -= deltaY * gameSpeed / dist;

        } else {

          this.eating = true;
          this.eat();
          this.setMoveLocation();

          //console.log(this.moveLocation);
        }


      }
    }

    return [this.x, this.y];
  }

  displayMoveLocation(){
    if(this.moveLocation[0] != -1 && this.moveLocation[1] != -1){
      push();
      if(this.status == travel){
        stroke("#43fa68");
      } else {
        stroke("#ff0000");
      }


      line(this.x, this.y, this.moveLocation[0], this.moveLocation[1]);
      pop();
    }
  }

  displaySearchRadius(){
    push();
    noFill();
    stroke(255);
    ellipse(this.x, this.y, this.searchRadius, this.searchRadius);
    pop();
  }
}
