class Tool {

  _model;

  _name;
  _icon;

  _tooltip;
  // this represents a css class with the prefix tool-
  _class;

  _toast;

  //true if the tool is currently selected.
  _selected;

  constructor(model, name, icon, tooltip="", c="", toast="") {
    this._model = model;
    this._name = name;
    this._icon = icon;
    this._tooltip = tooltip;
    this._class = c;
    this._toast = toast;
    this._selected = false;
  }

  select(){
    this._selected = true;
  }

  deselect(){
    this._selected = false;
  }

  onFinish(){
      
  }

  updateExecute(command){}
  updateUnExecute(command){}

  isSelected(){
    return this._selected;
  }

}

export default Tool;