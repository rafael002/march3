import {Screen} from "./Screen.js";

window.onload = function() {
    let element = document.getElementById("screen");
    let screen = new Screen(element, 3, 3, 100);
    screen.draw();
}