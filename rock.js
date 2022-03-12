class Rock{
    constructor(x, y){
        var options = { 
            restitution:0.1,
           
          }
          this.body = Bodies.circle(x, y, 40, options);
          this.radius = 40;
          World.add(world, this.body);
          this.image = loadImage("images/rock.png")
    }
    update(){
        if(this.body.position.y > height){
          Matter.Body.setPosition(this.body,{x:random(0, 500), y: -40});
        }
    }
    display(){
        noStroke();
        fill(0,0,255);
        imageMode(CENTER);
        image(this.image,this.body.position.x, this.body.position.y, this.radius, this.radius);
    }
    score(){
        score += 1;
    }
    remove(){

    }
 }