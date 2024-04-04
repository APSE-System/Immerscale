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


    get previous() {
        return this._previous;
    }

    set previous(previous) {
        this._previous = previous;
    }


    get next() {
        return this._next;
    }

    set next(next) {
        this._next = next;
    }
}