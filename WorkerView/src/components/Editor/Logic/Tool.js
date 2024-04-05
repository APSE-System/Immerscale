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

  deselect(){

  }

  onFinish(){
      
  }

  updateExecute(command){}
  updateUnExecute(command){}

}

export default Tool;