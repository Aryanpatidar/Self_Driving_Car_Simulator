class Road{
    constructor(x, width , lanecount=3){
         this.x = x;
         this.width = width;
         this.lanecount = lanecount;

         this.left = x-width/2;
         this.right = x+width/2;

         const infinity = 1e6;
         this.top     = -infinity;
         this.bottom = infinity ;

         const topLeft  ={x:this.left, y:this.top};
         const topRight  ={x:this.right, y:this.top};
         const bottomLeft  ={x:this.left, y:this.bottom};
         const bottomRight  ={x:this.right, y:this.bottom};

         this.borders = [
                 [topLeft, bottomLeft],
                 [topRight , bottomRight]
         ];

    }
  
    getLaneCentre(laneIndex) {
        const laneWidth = this.width / this.lanecount;
        return this.left + laneWidth * (laneIndex + 0.5);
    }


    draw(ctx){
        /// defining foothpath of road
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";
// ctx.beginPath() begins a new path, which is a sequence of lines or curves.
        ctx.beginPath();
//ctx.moveTo(this.left, this.top) moves the starting point of the path to the left boundary of the road at the top.        
        ctx.moveTo(this.left, this.top);
        // moveTo == starting point of line
        ctx.lineTo(this.left, this.bottom);
        //lineTo == ending point of line
        ctx.stroke();
       // ctx.stroke(), resulting in the visualization of the ray.

        ctx.beginPath();
        ctx.moveTo(this.right, this.top);
        ctx.lineTo(this.right, this.bottom);
        ctx.stroke();


        for(let i=0; i<=this.lanecount; i++){
            const x = lerp(

                this.left,
                this.right,
                i/this.lanecount
            );
   
            if(i>0 && i<this.lanecount){
                ctx.setLineDash([20, 20]);
            }else{
                ctx.setLineDash([]);
            }

             ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }
    }
    
}

