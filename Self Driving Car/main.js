const canvas = document.getElementById("mycanvas");
//canvas.height = window.innerHeight;
canvas.width = 200;

//canvas.height = window.innerHeight;



const ctx = canvas.getContext("2d");


const road = new Road(canvas.width/2, canvas.width*.9);
//const car = new Car(road.getLaneCentre(1), 100, 30, 50, "AI");
const N= 1;
const cars = generateCars(N);
let bestCar= cars[0];

if(localStorage.getItem("bestBrain")){
   for(let i=0; i<cars.length; i++){
    cars[i].brain = JSON.parse(
        localStorage.getItem("bestBrain")
    );
    if(i !=0){
           NeuralNetwork.mutate(cars[i].brain, 0.1);
    }

   }
}

const traffic =[
    new Car(road.getLaneCentre(1), -100, 30, 50, "DUMMY" , 2, getRandomColor()),
    new Car(road.getLaneCentre(0), -300, 30, 50, "DUMMY" , 2, getRandomColor()),
    new Car(road.getLaneCentre(2), -300, 30, 50, "DUMMY" , 2, getRandomColor()),
    new Car(road.getLaneCentre(0), -500, 30, 50, "DUMMY" , 2, getRandomColor()),
    new Car(road.getLaneCentre(1), -500, 30, 50, "DUMMY" , 2, getRandomColor()),
    new Car(road.getLaneCentre(1), -700, 30, 50, "DUMMY" , 2, getRandomColor()),
   new Car(road.getLaneCentre(2), -700, 30, 50, "DUMMY" , 2, getRandomColor() ),
   new Car(road.getLaneCentre(1), -900, 30, 50, "DUMMY" , 2, getRandomColor()),
    new Car(road.getLaneCentre(1), -900, 30, 50, "DUMMY" , 2, getRandomColor()),
    new Car(road.getLaneCentre(0), -1100, 30, 50, "DUMMY" , 2, getRandomColor()),
    new Car(road.getLaneCentre(1), -1100, 30, 50, "DUMMY" , 2, getRandomColor()),
    new Car(road.getLaneCentre(2), -1300, 30, 50, "DUMMY" , 2, getRandomColor()),
    new Car(road.getLaneCentre(0), -1300, 30, 50, "DUMMY" , 2, getRandomColor()),
    new Car(road.getLaneCentre(1), -1500, 30, 50, "DUMMY" , 2, getRandomColor()),
    new Car(road.getLaneCentre(0), -1700, 30, 50, "DUMMY" , 2, getRandomColor()),
    new Car(road.getLaneCentre(2), -1700, 30, 50, "DUMMY" , 2, getRandomColor())




];


animate();

function save(){
    localStorage.setItem("bestBrain",
      JSON.stringify(bestCar.brain)
    );
}

function discard(){
    localStorage.removeItem("bestBrain");
}


function generateCars(N){
    const cars =[];
    for(let i=1; i<=N ; i++){
        cars.push(new Car(road.getLaneCentre(1), 100, 30, 50, "AI"));
    }
   return cars;
}

function animate(){
    for(let i=0; i<traffic.length; i++){
        traffic[i].update(road.borders, []);
    }
    for(let i=0; i<cars.length; i++){
    cars[i].update(road.borders , traffic);
    }
  
     bestCar = cars.find(
        c=>c.y==Math.min(
            ...cars.map(c=>c.y)
            //... min fun do not work for array so we spread vales
            //we are creating a new array with y values of car
    ));
    

//    car.sensors.update();
   canvas.height = window.innerHeight;
   // without this car appers elongated
//ctx.save() saves the current state of the canvas context.
    ctx.save();

 //ctx.translate(0, -car.y + canvas.height * 0.8) translates the canvas vertically based on the car's position. The car.y represents the y-coordinate of the car, and canvas.height * 0.8 adjusts the translation to keep the car near the bottom of the canvas.
// When the car moves up, the car.y value increases, resulting in a negative translation. This moves the road and other elements in the opposite direction, creating an illusion of the road scrolling downwards.
// When the car moves down, the car.y value decreases, resulting in a positive translation. This moves the road and other elements upwards.   
    ctx.translate(0, -bestCar.y+canvas.height*0.8);
    road.draw(ctx);

    for(let i=0; i<traffic.length; i++){
        traffic[i].draw(ctx ,"red");
    }

    ctx.globalAlpha =0.1;

    for(let i=0; i<cars.length; i++){
    cars[i].draw(ctx, "blue");
    }
    ctx.globalAlpha =1;
    bestCar.draw(ctx, "blue", true);
    //ctx.restore() restores the previously saved canvas state, undoing the translation and reverting the canvas back to its original position.    
    ctx.restore();


    requestAnimationFrame (animate);
    // call animate function again and again evry second that gives us elution of motion
}

