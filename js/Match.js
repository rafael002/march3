/*
  
            -1 | 0 | 1           0 | 0 | 0  
            _________            _________
     X ->   -1 | 0 | 1     Y ->  -1 | 0 | 1
            _________            _________
            -1 | 0 | 1           -1 | 0 | 1
    
  */
export class Match {
    static #isInsideMap(vertical, horizontal, map) {
        try {
            return ![
                horizontal >= 0, horizontal < map[vertical].length,
                vertical >= 0, vertical < map.length,
          ].includes(false);
        } catch (error) {
            return false;
        }
    }
   
    static #walk(vertical, horizontal, map) {
  
      // movimento em cruz, sem diagonais
      const axies = {
          vertical: [
            {x: 0, y: -1},
            {x: 0, y: 1}
          ],
          horizontal: [
            {x: -1, y: 0},
            {x: 1, y: 0}
          ]
      };
      
      let matches = [];
      if (this.#isInsideMap(vertical, horizontal, map)) {
        // antes de andar, pegar o valor atual
        const value = map[vertical][horizontal];

        if (value != 0) {
          let walkV = 0;
          let walkH = 0;
            
          for (const [key, object] of Object.entries(axies)) {
              for (const current of object) { // {x: 0, y: -1} exemplo

              // criando com o bloco inicial
              let currentMatch = [{x: horizontal, y: vertical}];

              // setanndo o ponto de partida
              walkV = vertical;
              walkH = horizontal;

              let continuar = true;
              
              do {
                  // adicionando a cada iteracao, fará com que a procure caminhe
                  walkH = walkH + current.x;
                  walkV = walkV + current.y;

                  if (this.#isInsideMap(walkV, walkH, map) &&
                      (value == map[walkV][walkH]) &&
                      map[walkV][walkH] != 0
                    ) { 
                    currentMatch.push({x: walkH, y: walkV});
                  } else {
                    continuar = false;
                  }

                  // logica aqui de match :D
              } while (continuar);
    
              if (currentMatch.length > 2) {
                  matches = matches.concat(currentMatch);
              }
              currentMatch = [];
            }
          }
        } 
      }
      return matches;
    }
    
    static match(map) {
        let matches = [];

        for (let vertical = 0; vertical < map.length; vertical++) {
            for (let horizontal = 0; horizontal < map[vertical].length; horizontal++) {
                //console.log(matches.concat(this.#walk(vertical, horizontal, map), vertical, horizontal));
                let m = this.#walk(vertical, horizontal, map);
                if (m.length > 0) {
                    matches.push(m);
                }
            }
        }

        return matches.flat();
    }
}