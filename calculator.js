class Calculator  {
    
    domElement;


    settings = {
        buttons: [
            {name: 1, action: () => {}},
            {name: 2, action: () => {}},
            // {name: 3, action: (n) => this.setNumberAction(n)},
            // {name: 4, action: (n) => this.setNumberAction(n)},
            // {name: 5, action: (n) => this.setNumberAction(n)},
            // {name: 6, action: (n) => this.setNumberAction(n)},
            // {name: 7, action: (n) => this.setNumberAction(n)},
            // {name: 8, action: (n) => this.setNumberAction(n)},
            // {name: 9, action: (n) => this.setNumberAction(n)},
            // {name: 0, action: (n) => this.setNumberAction(n)},
            // {name: '=', action: (o) => this.setOperationAction(o)},
            // {name: '+', action: (o) => this.setOperationAction(o)},
            // {name: '-', action: (o) => this.setOperationAction(o)},
            // {name: '/', action: (o) => this.setOperationAction(o)},
            // {name: '*', action: (o) => this.setOperationAction(o)},
            // {name: '^', action: (o) => this.setOperationAction(o)},
            // {name: '^2', action: (o) => {this.setOperationAction('^'),this.setNumberAction(2),this.setOperationAction('=')}},

            // {name: 'C', action: (r) => this.resetAction(r)},
            // {name: 'AC', action: (r) => this.resetAction(r)}
        ]
    }


    constructor(elementId) {
        this.domElement = document.getElementById(elementId);
        this.init();

    }

    init() {
        this.buildButtons();

    }

    render() {

    }


    buildButtons(){

        let colleccionDeInstanciasDeLaClaseBoton = this.settings.buttons.map(
            (element) => {return new Button(element.name,element.action)}
        )

        colleccionDeInstanciasDeLaClaseBoton.map((button) => button.appendTo(this.domElement));
            

    }


}


class Button {


    domElement = null;

    name;
    action;
    color;
    size;

    constructor(name, action, color = '#333', size="20px") {
        this.size = size;
        this.name = name;
        this.color = color;
        this.action = action;

        // crear un elemento del dom que sea el boton "fisico"

        this.init();
    }


    init() {
        this.domElement = this.render();
        this.domElement.addEventListener('click', (e) =>this.action());
    }


    render() {
        let element = document.createElement('button');
        element.setAttribute('class','button');
        element.innerHTML = this.name;
        return  element;
    }


    appendTo(domElement){  // elemento del dom

        domElement.appendChild(this.domElement);

    }


}



class State {

    constructor () {

    }

}