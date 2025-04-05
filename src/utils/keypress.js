
var keys = "Pressed W to Start"; 

export function keyPressHandler(event) {
    keys = event;
}

export function retrive() {
    return keys;
}
