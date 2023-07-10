class Sensors{
    constructor(car){
        this.car = car;
        this.raycount = 8;
        this.raylength =150   ;
        this.rayspread =Math.PI/2;
        // all rays within this spread;
        this.rays =[];

        this.readings=[];
    }

    update(roadBorders, traffic){
       this.#castRays();
       this.readings =[];

       for(let i=0; i<this.rays.length; i++){
            this.readings.push(
                this.#getReading(this.rays[i], roadBorders, traffic)
            );
       }   
    }

    #getReading(ray , roadBorders, traffic){
             let touches=[];

             for(let i=0; i< roadBorders.length; i++){
                const touch = getIntersection(
                    ray[0],
                    ray[1],
                    roadBorders[i][0], 
                    roadBorders[i][1]
                );

                if(touch){
                    touches.push(touch);
                }
             }
             for(let i=0; i<traffic.length; i++){
                 const poly = traffic[i].polygon;
                 for(let j=0; j<poly.length; j++){
                    const val = getIntersection(
                        ray[0],
                        ray[1],
                        poly[j],
                        poly[(j+1)%poly.length]
                    );
                    if(val){
                    touches.push(val);
                    }
                 }
             }

             if(touches.length==0){
                return null;
             }
             else{
                const offsets = touches.map(e=>e.offset);
                const minOffset= Math.min(...offsets);
                return touches.find(e=>e.offset==minOffset);

             
             }
    }
    
    #castRays(){
        this.rays=[];

        for(let i=0; i<this.raycount; i++){
            const rayangle  = lerp(
                this.rayspread/2,
                -this.rayspread/2,
                i/(this.raycount-1)
            )+this.car.angle;

             const start ={x: this.car.x , y:this.car.y};
             const end = {
                x:this.car.x-
                            Math.sin(rayangle)*this.raylength,
                y:this.car.y-
                            Math.cos(rayangle)*this.raylength      

             };

             this.rays.push([start , end]);
        }
    }

    draw(ctx){
        for(let i=0; i<this.raycount; i++){
                   
            let end= this.rays[i][1];
            if(this.readings[i]){
                end= this.readings[i];
            }
          
            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle= "yellow";
            ctx.moveTo(
                this.rays[i][0].x ,
                this.rays[i][0].y
              );
              ctx.lineTo(
                end.x ,
                end.y 
              );
           ctx.stroke();
         

            
            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle= "black";
            ctx.moveTo(
                this.rays[i][1].x ,
                this.rays[i][1].y
              );
              ctx.lineTo(
                end.x ,
                end.y 
              );
            ctx.stroke();
        }
    }
}