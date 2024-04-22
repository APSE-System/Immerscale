class Tool {

  _model;

  _name;
  _icon;

  _tooltip;
  // this represents a css class with the prefix tool-
  _class;

  _toast;

  constructor(model, name, icon, tooltip="", c="", toast="") {
    this._model = model;
    this._name = name;
    this._icon = icon;
    this._tooltip = tooltip;
    this._class = c;
    this._toast = toast;
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