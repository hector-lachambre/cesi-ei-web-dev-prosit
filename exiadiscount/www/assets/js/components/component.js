export class Component {
    
    _element;

    _state = {};


    constructor(element, props) {
        this._element = element;
    }


    render() {
        throw new Error("Not implemented method render");
    }


    setState(newState) {

        console.debug("Component state changing");
        console.debug("    > Current state:", this._state);
        console.debug("    > Partial state:", newState);

        this._state = {...this._state, ...newState};
        this.render();
        
        console.debug("    > Updated state:", this._state);
    }
}