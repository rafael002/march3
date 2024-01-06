export class Pallete {
    colors = [
        {id: 0, status: "ON", value: '#FFF'},
        {id: 1, status: "OFF", value: '#9c9c9c'},
        {id: 2, status: "MATCH", value: '#FF0000'}
    ];

    getColorById(colorId) {
        let result = this.colors.filter(current => {
            return current.id == colorId;
        });
        // TODO por enquanto em caso de erro vou exibir a cor vermelha 
        return result.length > 0 ? result.shift().value: '#FF0000';
    }
}