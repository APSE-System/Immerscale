class Tool {

  _model;

  _name;
  _icon;

  constructor(model, name, icon) {
    this._model = model;
    this._name = name;
    this._icon = icon;
  }

  select(){

  }

  onFinish(){
      
  }

  updateExecute(command){}
  updateUnExecute(command){}

}

export default Tool;