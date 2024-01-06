export class Map {
    constructor(hSize, vSize) {
        this.#isSizeValid();
        this.hPosition = 0;
        this.vPosition = 0;
        this.hSize = hSize;
        this.vSize = vSize;
        this.grid = null;
        this.#create();
        this.reset(true); // reset random = true
    }

    getValue(vPosition, hPosition) {
        if (!this.isPositionValid(vPosition, hPosition)) {
            throw "Erro! - Posição inválida!";
        }
        return this.grid[vPosition][hPosition];
    }

    #create() {
        this.grid = [];
        for(let i = 0; i < this.vSize; i++)  {
            this.grid[i] = [];
        }
    }

    reset(random) {
        if (!this.#isGridValid()) {
            throw "Error! Grid is not set";
        }

        for (let vertical = 0; vertical < this.vSize; vertical++) {
            for (let horizontal = 0; horizontal < this.hSize; horizontal++) {
                this.grid[vertical][horizontal] = random ? Math.floor(Math.random() * 2) : 0;
            }
        }
    }

    #isGridValid() {
        return ![this.grid == undefined, this.grid == null].includes(true);
    }

    isPositionValid(vPosition, hPosition) {
        try {
            if (!this.#isGridValid()) 
                throw "Grid is invalid";

            const value = this.grid[vPosition];
            if ([value == undefined, value == null].includes(true))
                throw "Position is invalid";

            if ([value[hPosition] == undefined, value[hPosition] == null].includes(true))
                throw "Position is invalid";

            return true;
        } catch (error) {
            console.error(error.getValue);
            return false;
        };
    }

    #isSizeValid() {
        if (this.hSize < 1) {
            throw "hSize must be greater than 0";
        }

        if (this.vSize < 1) {
            throw "vSize must be greater than 0";
        }
    }
}