class Food {
  constructor(x, y, type){
    this.x = x;
    this.y = y;
    this.diameter = 10;
    this.type = type;
  }

  render(){
    push();
    if(this.type == healthy){
      fill("#43fa68");
    } else {
      fill("#fa4343");
    }
    ellipse(this.x, this.y, this.diameter, this.diameter);
    pop();
  }
}
