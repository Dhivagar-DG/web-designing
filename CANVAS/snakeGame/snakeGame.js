const canvas = document.getElementById('canvas').getContext('2d');
const canvasWidth = 200;
const canvasHeight = 200;
let speed = 800;
let changeSpeed = 800;
let food;
let points = 0;
// Snake Object
const snake = new Snake(0,0); 


// generate food
function generateFood(){
    x = Math.floor(Math.random() * canvasWidth) % snake.width * snake.width;
    y = Math.floor(Math.random() * canvasHeight) % snake.height * snake.height;
    food = {x, y};
}

// Snake Constructor
function Snake(x, y){
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
    this.xDir = 1;
    this.yDir = 0;
    this.tail = [];


    //Snake grow
    this.grow = function(){
        this.tail.push({x:this.x, y:this.y})
    }
    
    
    //Snake Dead or Not
    this.dead = function(){
        return this.tail.some((data)=>{return this.x == data.x && this.y == data.y});
    }


    // Update snake direction
    this.update = function(){
        if (this.x == canvasWidth) {
            this.x = 0;  
            return;
        }
        if (this.y == canvasHeight){
            this.y = 0;
            return;
        }
        if (this.x < 0) {
            this.x = canvasWidth;  
        }
        if (this.y < 0){
            this.y = canvasHeight;
        }
        
        for (let i=0; i<this.tail.length-1; i++){
            this.tail[i] = this.tail[i+1];
        }
        this.tail[this.tail.length - 1] = {x:this.x, y:this.y};

        this.x += (this.width * this.xDir);
        this.y += (this.height * this.yDir);

    }


    // Display snake
    this.display = function(canvas, canvasWidth, canvasHeight){
        canvas.fillStyle = "white";
        canvas.fillRect(this.x, this.y, this.width, this.height);

        // show Tail
        for(let i=0; i<this.tail.length; i++){
            canvas.fillStyle = "white";
            canvas.fillRect(this.tail[i].x+2, this.tail[i].y+2, this.width-4, this.height-4);
        }
    }
}


// Display
function display(){
    // Clear Canvas
    canvas.clearRect(0,0, canvasWidth, canvasHeight);
    
    // Display food
    canvas.fillStyle = "yellow";
    canvas.fillRect(food.x, food.y, snake.width, snake.height);
    
    // Display Snake
    snake.display(canvas, canvasWidth, canvasHeight);

}


// Update
function update(){
    snake.update();

    if(snake.dead()){
        clearInterval(interVal);
        alert(`Your points ${points}`);
    }
    // Check Eat food
    if (checkEat()){
        points+=10;
        // Increase speed eat each food
        if(changeSpeed>100) changeSpeed-=100;
        generateFood();
        snake.grow();
    }
}


// Check snake eat or not
let checkEat = ()=> {return snake.x == food.x && snake.y == food.y};


// Handle key up
function handleKeyUp(e){
    if(e.keyCode == 37 && snake.xDir != 1){// LEFT
        snake.xDir = -1;
        snake.yDir = 0;
    } else if(e.keyCode == 38 && snake.yDir != 1){//TOP
        snake.yDir = -1;
        snake.xDir = 0;
    } else if(e.keyCode == 39 && snake.xDir != -1){//RIGHT
        snake.xDir = 1;
        snake.yDir = 0;
    } else if(e.keyCode == 40 && snake.yDir != -1){//DOWN
        snake.yDir = 1;
        snake.xDir = 0;
    }
}


// EVENT FOR KEYUP
document.addEventListener('keyup', handleKeyUp);


generateFood();

function main(){
    if(speed != changeSpeed){
        speed = changeSpeed;
        clearInterval(interVal);
        interVal = setInterval(main, speed);
    }
    display();
    update()
}
let interVal = setInterval(main, speed);