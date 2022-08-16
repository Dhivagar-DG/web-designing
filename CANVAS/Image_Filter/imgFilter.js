let img = new Image();


// DRAW FUNCTION
function draw() {

    const CANVAS = document.getElementById('canvasId');
    if(CANVAS.getContext){

        // CANVAS OBJECT
        const CTX = CANVAS.getContext('2d');

        // UPLOAD INPUT BUTTON
        const uploadBtn = document.getElementById('imgFileInput');

        // RENDER IMAGE
        uploadBtn.addEventListener('change', eve=>{
            let file = eve.target.files[0];
            if(!file) return;

            // READ THE FILE
            let reader = new FileReader();
            reader.readAsDataURL(file);

            // DRAW THE IMAGE
            reader.addEventListener('load', ()=>{
                img = new Image();
                console.log(img);
                img.src = "";
                img.src = reader.result;
                img.onload = ()=>{
                    CTX.drawImage(img,0,0, CANVAS.width, CANVAS.height);
                }
            });
        });
    }
}


// HANDLE CLICK
document.addEventListener('click', event=>{
    if(event.target.classList.contains('clearBtn')) {
        Caman('#canvasId', img, function(){
            this.revert();
        });
        return;
    };
    if(event.target.classList.contains('increaseBright')){
        Caman('#canvasId', img, function(){
            this.brightness(4).render();
        });
    }else if(event.target.classList.contains('decreaseBright')){
        Caman('#canvasId', img, function(){
            this.brightness(-4).render();
        });
    }else if(event.target.classList.contains('increaseCont')){
        Caman('#canvasId', img, function(){
            this.contrast(-4).render();
        });
    }else if(event.target.classList.contains('decreaseCont')){
        Caman('#canvasId', img, function(){
            this.contrast(-4).render();
        });
    }else if(event.target.classList.contains('increaseSat')){
        Caman('#canvasId', img, function(){
            this.saturation(-4).render();
        });
    }else if(event.target.classList.contains('decreaseSat')){
        Caman('#canvasId', img, function(){
            this.saturation(-4).render();
        });
    }else if(event.target.classList.contains('vintage')){
        Caman('#canvasId', img, function(){
            this.vintage().render();
        });
    }else if(event.target.classList.contains('lomo')){
        Caman('#canvasId', img, function(){
            this.lomo().render();
        });
    }else if(event.target.classList.contains('clarity')){
        Caman('#canvasId', img, function(){
            this.clarity().render();
        });
    }
});    
