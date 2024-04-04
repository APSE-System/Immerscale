class Command{
    _creator;
    _model;
    _previous;
    _next;

    constructor(creator, model) {
        this._creator = creator;
        this._model = model;
    }


    execute();

    unExecute();

    setNext(next){
        this._next = next;
    }


    set previous(previous) {
        this._previous = previous;
    }
}