class Command{
    _creator;
    _model;
    _previous;
    _next;

    constructor(creator, model) {
        this._creator = creator;
        this._model = model;
    }


    execute(){
        this._creator.updateExecute(this);
    }

    unExecute(){
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