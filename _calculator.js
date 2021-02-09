class State {
    state = [];
    onChange = () => {};

    constructor(initial, onChange) {
        this.set(initial);
        this.onChange = onChange;
    }

    set(newState){
        // newState = {... this.get(), newState};
        this.state.push(newState);
        this.onChange(this.get(),this.state.length,this.state);
    }

    reset() {
        const initial = this.state[0];
        this.state = [];
        this.set(initial);
    }

    get(){
        return this.state.slice(-1)[0];
    }

}

class Application {

    settings = {
        buttons: [
            {name: 1, action: (n) => this.setNumberAction(n)},
            {name: 2, action: (n) => this.setNumberAction(n)},
            {name: 3, action: (n) => this.setNumberAction(n)},
            {name: 4, action: (n) => this.setNumberAction(n)},
            {name: 5, action: (n) => this.setNumberAction(n)},
            {name: 6, action: (n) => this.setNumberAction(n)},
            {name: 7, action: (n) => this.setNumberAction(n)},
            {name: 8, action: (n) => this.setNumberAction(n)},
            {name: 9, action: (n) => this.setNumberAction(n)},
            {name: 0, action: (n) => this.setNumberAction(n)},
            {name: '=', action: (o) => this.setOperationAction(o)},
            {name: '+', action: (o) => this.setOperationAction(o)},
            {name: '-', action: (o) => this.setOperationAction(o)},
            {name: '/', action: (o) => this.setOperationAction(o)},
            {name: '*', action: (o) => this.setOperationAction(o)},
            {name: '^', action: (o) => this.setOperationAction(o)},
            {name: '^2', action: (o) => {this.setOperationAction('^'),this.setNumberAction(2),this.setOperationAction('=')}},

            {name: 'C', action: (r) => this.resetAction(r)},
            {name: 'AC', action: (r) => this.resetAction(r)}
        ]
    }

    buttons = [];

    screen = null;

    _element = null;

    constructor(element) {  // PASAR OPTIONS CON CALLBACKS
        this.init(element);
        this.render();
    }

    init = (element) => {
        this.buildButtons();
        this.buildScreen();

        this.state = new State({
            num1: 0,
            num2: null,
            operation: null
        },(lastState,numberOfStates,stateCollection) => this.handleScreen(lastState));

        this._element = document.getElementById(element);
    }

    handleScreen(state){
        let {num1, num2, operation} = state;
        if(num2) {
            this.screen.set(num2);
        } else {
            this.screen.set(num1);
        }
        
    }

    buildButtons(){
        this.buttons = this.settings.buttons.map((bs)=> new Button(bs.name,bs.action));
    }

    buildScreen() {
        this.screen = new Screen();
    }

    render() {
        this._element.appendChild(this.screen.get());
        this.buttons.map(b => this._element.appendChild(b.get()));
    }

    resetAction(resetType, e) {
        if(resetType === 'C') {
            this.state.reset();
        }
    }

    setNumberAction(number) {
        let {num1,num2,operation} = this.state.get();
        if(operation == null) {
            num1 = num1 * 10 + number;
        } else {
            num2 = num2 * 10 + number;
        }
        this.state.set({num1,num2,operation});
    }



    setOperationAction(newOperation) {
        let {num1,num2,operation} = this.state.get();
        if(num2 != null && operation!= null) {
            num1 = this.calcule();    
        }
        if(newOperation == '=') {
            operation = null;
            num2 = null;
        } else {
            operation = newOperation;
            num2 = 0;
        };
        this.state.set({num1,num2,operation});
    }

    calcule(){
        let {num1,num2,operation} = this.state.get();

        switch(operation) {
            case '+': return num1*1 + num2*1;
            case '-': return num1*1 - num2*1;
            case '/': return num1*1 / num2*1;
            case '*': return num1*1 * num2*1;
            case '^': return Math.pow(num1*1,num2*1);


            break;
        }
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
        element.setAttribute('class','calc-button');
        element.innerHTML = this.name;
        return element;
    }

}

class Screen {

    _prompt = null;
    _element = null;
    onPrompt = () => {};

    constructor(onPrompt = null) {
        this.onPrompt = onPrompt || this.onPrompt;
        this.init();
    }

    init() {
        this._element = this.render();
        this.set(0);
    }

    get() {
        return this._element;
    }

    set(value) {
         this._prompt = value;
         this._element.innerHTML = this._prompt;
         this.onPrompt(this._prompt);
    }

    render() {
        let element = document.createElement('div');
        element.setAttribute('class','screen');
        return element;
    }

}

