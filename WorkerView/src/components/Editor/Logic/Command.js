class Command{
    _creator;
    _model;
    _previous = null;
    _next = null;

    constructor(creator, model) {
        this._creator = creator;
        this._model = model;
    }


    execute(){
        if(this._creator != null)
            this._creator.updateExecute(this);
    }

    unExecute(){
        if(this._creator != null)
            this._creator.updateUnExecute(this);
    }

    setNext(next){
        this._next = next;
    }


    getPrevious() {
        return this._previous;
    }

    setPrevious(previous) {
        this._previous = previous;
    }


    getNext() {
        return this._next;
    }

    setNext(next) {
        this._next = next;
    }


}

export default Command;