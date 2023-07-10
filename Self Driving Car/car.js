
class Car{
    constructor(x,y,width,height, controlType , maxSpeed=3, color="blue"){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        

        this.speed=0;
        this.acceleration=0.2;
        this.maxSpeed=maxSpeed;
        this.friction=0.05;
        this.angle=0;
        this.damaged = false;

        this.useBrain = controlType==="AI";


        if(controlType != "DUMMY"){
        this.sensors= new Sensors(this);
        this.brain = new NeuralNetwork(
            [this.sensors.raycount , 6 ,4]
        );
        }
        this.controls=new Controls(controlType);

        this .img = new Image();
        this.img.src= "car.png"
         
         this.mask=document.createElement("canvas");
        this.mask.width=width;
        this.mask.height=height;

        const maskCtx=this.mask.getContext("2d");
        this.img.onload=()=>{
            maskCtx.fillStyle=color;
            maskCtx.rect(0,0,this.width,this.height);
            maskCtx.fill();

            maskCtx.globalCompositeOperation="destination-atop";
            maskCtx.drawImage(this.img,0,0,this.width,this.height);
        }
    }

    update(roadBorders  , traffic){
        if(!this.damaged){
             this.#move();
        this.polygon= this.#createPolygon();
        this.damaged = this.#accessDamaged(roadBorders, traffic);
        }
       
        if(this.sensors){
           this.sensors.update(roadBorders, traffic);
           const offsets = this.sensors.readings.map(
            s => (s === null ? 0 : 1 - s.offset)
          );
          const outputs = NeuralNetwork.feedForward(offsets, this.brain);
          
          if(this.useBrain){
            this.controls.forward= outputs[0];
            this.controls.left= outputs[1];
            this.controls.right= outputs[2];
            this.controls.reverse= outputs[3];
          }

        }
    }

    #accessDamaged(roadBorders, traffic) {
        for (let i = 0; i < roadBorders.length; i++) {
            if (polysIntersect(this.polygon, roadBorders[i])) {
                return true;
            }
        }
        for (let i = 0; i < traffic.length; i++) {
            if (polysIntersect(this.polygon, traffic[i].polygon)) {
                return true;
            }
        }
        return false;
    }


    #createPolygon(){
        const points = [];
        const rad = Math.hypot(this.width , this.height/2);
        const alpha = Math.atan2(this.width, this.height);
        points.push({
            x: this.x - Math.sin(this.angle - alpha) * rad,
            y: this.y - Math.cos(this.angle - alpha) * rad
        });
        points.push({
            x: this.x - Math.sin(this.angle + alpha) * rad,
            y: this.y - Math.cos(this.angle + alpha) * rad
        });
        points.push({
            x: this.x - Math.PI + Math.sin(this.angle - alpha) * rad,
            y: this.y - Math.PI + Math.cos(this.angle - alpha) * rad
        });
        points.push({
            x: this.x - Math.PI + Math.sin(this.angle + alpha) * rad,
            y: this.y - Math.PI + Math.cos(this.angle + alpha) * rad
        });

        return points;
    }

    #move(){
        if(this.controls.forward){
            this.speed+=this.acceleration;
        }
        if(this.controls.reverse){
            this.speed-=this.acceleration;
        }

        if(this.speed>this.maxSpeed){
            this.speed=this.maxSpeed;
        }
        if(this.speed<-this.maxSpeed/2){
            this.speed=-this.maxSpeed/2;
        }

        if(this.speed>0){
            this.speed-=this.friction;
        }
        if(this.speed<0){
            this.speed+=this.friction;
        }
        if(Math.abs(this.speed)<this.friction){
            this.speed=0;
        }

        if(this.speed!=0){
            const flip=this.speed>0?1:-1;
            if(this.controls.left){
                this.angle+=0.03*flip;
            }
            if(this.controls.right){
                this.angle-=0.03*flip;
            }
        }

        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle)*this.speed;
    }

    draw(ctx , drawSensor = false){
    //   if(this.damaged){
    //     ctx.fillStyle= "gray";

    //   }else{
    //     ctx.fillStyle= color;
    //   }

         ctx.save();
         ctx.translate(this.x,this.y);
         ctx.rotate(-this.angle);

        // ctx.beginPath();
        
         ctx.drawImage(this.mask,
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        );
        ctx.globalCompositeOperation="multiply";
        ctx.drawImage(this.img,
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        );
       ctx.fill();

         ctx.restore();

        // ctx.beginPath();
        // ctx.moveTo(this.polygon[0].x , this.polygon[0].y);
       
        // for(let i=1; i<this.polygon.length; i++){
        //     ctx.lineTo(this.polygon[i].x , this.polygon[i].y);
        // }
        // ctx.fill();

        if(this.sensors && drawSensor){
            this.sensors.draw(ctx);
        }
    }
}


// // The code ctx.beginPath() is used to begin a new path in the 2D rendering context. Let's understand what it does:

// // When working with the 2D rendering context of a canvas, you can draw shapes and paths using a series of drawing commands. A path is a collection of points, lines, curves, and other shapes that make up the desired graphical element.

// // The beginPath() method starts a new path by clearing any existing sub-paths or shapes. It allows you to define a fresh set of drawing commands without interference from any previously defined paths.
