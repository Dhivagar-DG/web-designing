function draw(){
    const CANVAS = document.getElementById('canvas');
    if(CANVAS.getContext){
        const CTX = CANVAS.getContext('2d');

        CANVAS.width = window.innerWidth;
        CANVAS.height = window.innerHeight;


        // PLAYER CLASS
        class Player{
            constructor(x, y, radious, color){
                this.x = x; 
                this.y = y;
                this.radious = radious;
                this.color = color;
            }

            draw(){
                CTX.beginPath();
                CTX.arc(this.x, this.y, this.radious, 0, Math.PI * 2, false);
                CTX.fillStyle = this.color;
                CTX.fill();
            }
        }


        // PROJECTTILE
        class ProjectTile{
            constructor(x, y, radious, color, velocity){
                this.x = x;
                this.y = y;
                this.radious = radious;
                this.color = color;
                this.velocity = velocity;
            }

            // DRAW
            draw(){
                CTX.beginPath();
                CTX.arc(this.x, this.y, this.radious, 0, Math.PI*2, false);
                CTX.fillStyle = this.color;
                CTX.fill();
            }

            // UPDATE COORDINATES
            update(){
                this.draw();
                if(this.y == CANVAS.height){
                    this.x = CANVAS.width/2;
                    this.y = CANVAS.height/2;
                    CTX.restore();
                }
                this.x = this.x + this.velocity.x;
                this.y = this.y + this.velocity.y;   
            }
        }
        // PLAYER OBJECT
        const player = new Player(CANVAS.width/2, CANVAS.height/2, 30, 'blue');
        player.draw();

        const projecttile1 = new ProjectTile(CANVAS.width/2, CANVAS.height/2, 10, "orange", {x:-1, y:1});

        const projecttile2 = new ProjectTile(CANVAS.width/2, CANVAS.height/2, 10, "red", {x:1, y:-1});

        const projecttile3 = new ProjectTile(CANVAS.width/2, CANVAS.height/2, 10, "lightgreen", {x:1, y:1});

        const projecttile4 = new ProjectTile(CANVAS.width/2, CANVAS.height/2, 10, "lightblue", {x:-1, y:-1});




        // ANIMATE
        function animate(){
            requestAnimationFrame(animate);
            [projecttile1, projecttile2, projecttile3, projecttile4].forEach(data=>{
                data.update();
            });
        }
        // PROJECTILE OBJECT
        addEventListener('click', event=>{
            animate();
        });
    }
}