class State {
    state = [];
    onChange;

    constructor(initial, onChange = ()=>{}) { 
        this.onChange = onChange;

        this.set(initial);        

    }

    set(newState){
        // newState = {... this.get(), newState};
        this.state.push(newState);
        this.onChange(this.get(),this.state.length,this.state);
    }

    reset() {
        const initial = this.state[0];
        this.set(initial);
    }

    hardReset() {
        const initial = this.state[0];
        this.state = [];
        this.set(initial);
    }

    get(){
        return this.state.slice(-1)[0];
    }


}


class Calculator  {
    
    domElement;
    name;
    buttons;
    screen;
    state;



    settings = {
        buttons: [
            {name: 1, action: () => {this.setNumberAction(1)}},
            {name: 2, action: () => {this.setNumberAction(2)}},
            {name: 3, action: () => this.setNumberAction(3)},
            {name: 4, action: () => this.setNumberAction(4)},
            {name: 5, action: () => this.setNumberAction(5)},
            {name: 6, action: () => this.setNumberAction(6)},
            {name: 7, action: () => this.setNumberAction(7)},
            {name: 8, action: () => this.setNumberAction(8)},
            {name: 9, action: () => this.setNumberAction(9)},
            {name: 0, action: () => this.setNumberAction(0)},
            {name: '=', action: () => this.setOperationAction('=')},
            {name: '+', action: () => this.setOperationAction('+')},
            {name: '-', action: () => this.setOperationAction('-')},
            {name: '^', action: () => this.setOperationAction('^')},

            {name: 'SIN', action: () => {
                this.setOperationAction('SIN');
                this.setOperationAction('=');
            }},

            // {name: '/', action: (o) => this.setOperationAction(o)},
            // {name: '*', action: (o) => this.setOperationAction(o)},
            // {name: '^', action: (o) => this.setOperationAction(o)},
            {name: '^2', action: () => {
                this.setOperationAction('^'),
                this.setNumberAction(2),
                this.setOperationAction('=')}
            },

            {name: 'C', action: () => this.resetAction('C')},
            {name: 'AC', action: () => this.resetAction('AC')}
        ]
    }


    constructor(elementId) {
        this.name = elementId;
        this.init();
    }

    init() {
        this.render();

        let initialState ={
                num1: 0,
                num2: null,
                operation: null
            };

        let stateCallbackOnChange = (state) => {
           this.handleScreen(state);
        }

        this.buildScreen();
        this.buildButtons();
        this.state = new State(initialState,stateCallbackOnChange);
    }


    handleScreen(state) {

        let {num1, num2, operation} = state;
        if(num2) {
            this.screen.set(num2);
        } else {
            this.screen.set(num1);
        }
        
    }

    render() {
        this.domElement = document.getElementById(this.name);
        this.domElement.setAttribute('class','calculator');
    }


    buildButtons(){

        this.buttons = this.settings.buttons.map(
            (element) => {return new Button(element.name,element.action)}
        )

        this.buttons.map((button) => button.appendTo(this.domElement));
            
    }

    buildScreen(){
        this.screen = new Screen();
        this.screen.appendTo(this.domElement);
    }


    // Actions
    

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

    resetAction(resetType) {
        if(resetType === 'C') {
            this.state.reset();
        }
    }


    calcule(){
        let {num1,num2,operation} = this.state.get();

        switch(operation) {
            case '+': return num1*1 + num2*1;
            case '-': return num1*1 - num2*1;
            case '/': return num1*1 / num2*1;
            case '*': return num1*1 * num2*1;
            case '^': return Math.pow(num1*1,num2*1);
            case 'SIN': return Math.sin(num1*1);


            break;
        }
    }

}


class Screen {
    
    prompt;
    domElement;
    onPrompt;

    constructor(onPrompt = () => {}) {
        this.onPrompt = onPrompt;
        this.init();
    }

    init() {
        this.domElement = this.render();
    }



    render() {
        let element = document.createElement('div');
        element.setAttribute('class','screen');
        return element;
    }


    set(value) {
        this.prompt = value;
        this.domElement.innerHTML = this.prompt;
        this.onPrompt(this.prompt);
   }
   


    appendTo(domElement) {
        domElement.appendChild(this.domElement);
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
        let element =  document.createElement('div').appendTo(document.createElement('button'));
        element.setAttribute('class','button');
        element.innerHTML = this.name;
        return  element;
    }


    appendTo(domElement){  // elemento del dom

        domElement.appendChild(this.domElement);

    }


}