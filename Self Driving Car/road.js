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
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(this.left, this.top);
        ctx.lineTo(this.left, this.bottom);
        ctx.stroke();

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

