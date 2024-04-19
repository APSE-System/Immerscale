class Tool {

  _model;

  _name;
  _icon;

  _tooltip;
  _class;


  constructor(model, name, icon, tooltip="", c="") {
    this._model = model;
    this._name = name;
    this._icon = icon;
    this._tooltip = tooltip;
    this._class = c;
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