import { Map } from "./Map.js";
import { Pallete } from "./Pallete.js"
import { Match } from "./Match.js";

export class Screen {
    constructor(element, hSize, vSize, pixelSize) {
        this.canvas = element.getContext('2d');
        this.pallete = new Pallete();
        this.map = new Map(hSize, vSize);

        this.width = element.offsetWidth;
        this.height = element.offsetHeight;
        this.hSize = hSize;
        this.vSize = vSize;
        this.pixelSize = pixelSize;
    }

    drawGrid() {
        for (let vertical = 0; vertical < this.vSize; vertical++) {
            for (let horizontal = 0; horizontal < this.hSize; horizontal++) {
                this.canvas.font = "10px Arial";
                this.canvas.fillStyle = this.map.getValue(vertical, horizontal) < 6 ? '#000000' : '#FFFFFF';
                // melhorar estes calculos de tamanho para ficar dinâmico
                this.canvas.fillText(this.map.getValue(horizontal, vertical), vertical * this.pixelSize + 7, (horizontal + 1) * this.pixelSize - 7);

                this.canvas.beginPath();
                this.canvas.strokeRect(horizontal * this.pixelSize, vertical * this.pixelSize, this.pixelSize, this.pixelSize);
                this.canvas.closePath();
            }
        }
    }

    drawBricks() {
        for (let vertical = 0; vertical < this.vSize; vertical++) { // y
            for (let horizontal = 0; horizontal < this.hSize; horizontal++) { // x
              this.canvas.font = "10px Arial";
              this.canvas.fillStyle = this.pallete.getColorById(this.map.getValue(vertical, horizontal));
              this.canvas.beginPath();
              this.canvas.fillRect(horizontal * this.pixelSize, vertical * this.pixelSize, this.pixelSize, this.pixelSize);
              this.canvas.closePath();
            }
          }
    }

    drawMatches() {
        let list = Match.match(this.map.grid);

        for (const current of list) {
          this.canvas.fillStyle = this.pallete.getColorById(2);
          this.canvas.beginPath();
          this.canvas.fillRect(current.x * this.pixelSize, current.y * this.pixelSize, this.pixelSize, this.pixelSize);
          this.canvas.closePath();
        }
      }

    debug() {

        let table = "<table>";

        for (let vertical = 0; vertical < this.vSize; vertical++) {
            table.concat('<tr>');
            for (let horizontal = 0; horizontal < this.hSize; horizontal++) {
                table = table.concat("<td>");
                table = table.concat(this.map.getValue(vertical, horizontal));
                table = table.concat("</td>");
            }
            table = table.concat("</tr>");
        }
        table = table.concat("</table>");

        document.getElementById("debug").innerHTML = table;
    }

    draw() {
        this.canvas.clearRect(0, 0, this.width, this.heigth);
        this.drawBricks();
        this.drawMatches();
        this.drawGrid();
        this.debug();
    }
}