class Controls {
    constructor(type) {
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;
        
        switch(type){
            case "KEYS":
                 this.#addKeyboardListeners();
                 break;
             case "DUMMY":
                this.forward=true;
                break;
        }
       
        // # because it is a private method we can't access it outside the controls;
    }
// function(event) == (event)=> , but when we write function of events , this.  stops referring to constructor calls 
#addKeyboardListeners() {
    document.onkeydown = (event) => {
        switch (event.key) {
            case "ArrowUp":
                this.forward = true;
                break;
            case "ArrowDown":
                this.reverse = true;
                break;
            case "ArrowLeft":
                this.left = true;
                break;
            case "ArrowRight":
                this.right = true;
                break;
            }
        };

        document.onkeyup = (event) => {
            switch (event.key) {
                case "ArrowUp":
                    this.forward = false;
                    break;
                case "ArrowDown":
                    this.reverse = false;
                    break;
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
            }
        };
    }
}
