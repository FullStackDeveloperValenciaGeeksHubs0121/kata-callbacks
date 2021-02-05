class Application {



    
    _initialState = {
        num1: 0,
        num2: null,
        operation: null
    }

    _state = null;




    settings = {
        buttons: [
            {name: 1, action: this.setNumerAction},
            {name: 2, action: this.setNumerAction},
            {name: 3, action: this.setNumerAction},
            {name: 4, action: this.setNumerAction},
            {name: 5, action: this.setNumerAction},
            {name: 6, action: this.setNumerAction},
            {name: '+', action: this.setOperationAction},
            {name: 'C', action: this.resetAction.bind(this)},
            {name: 'AC', action: () => this.resetAction()}


        ]
    }

    buttons = [];

    _element = null;

    constructor(element) {
        this.init(element);
        this.render();
    }

    init = (element) => {
        this.reset();
        this._element = document.getElementById(element);
    }

    reset() {
        this._state = this._initialState;
    }

    render() {
        this.buttons = this.settings.buttons.map((bs)=> new Button(bs.name,bs.action));
        this.buttons.map(b => this._element.appendChild(b.get()));
    }


    resetAction(resetType, e) {
        if(resetType === 'C') {
            this.reset();
        }
    }

    setNumerAction(number, e) {
        console.log(number,e);
    }

    setOperationAction(operation, e) {
        console.log(operation,e);
    }
    
}



class Button {

    _element = null;
    name = '';
    action = () => {};


    constructor(name, action) {
        this.name = name;
        this.action = action;
        this.init();
    }

    init() {
        this._element = this.render();
        this._element.addEventListener('click', (e) =>this.action(this.name,e))
    }

    get() {
        return this._element;
    }

    render() {
        let element = document.createElement('button');
        element.setAttribute('class','button');
        element.innerHTML = this.name;
        return element;
    }

}

class Screen {

    _prompt = 0;

    constructor() {

    }

    render() {
        return document.createElement('div',{
            'class': 'screen'
        });
    }

}





