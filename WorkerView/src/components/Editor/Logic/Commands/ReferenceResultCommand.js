class MeasurementResultCommand extends Command{

    _title;
    _result;


    constructor(creator, model, title, result) {
        super(creator, model);
        this._title = title;
        this._result = result;
    }

    execute() {
        super.execute();

        this._model.addResult(this._title, this._result);
    }

    unExecute() {
        super.unExecute();

        this._model.removeResult(this._title, this._result);
    }


}