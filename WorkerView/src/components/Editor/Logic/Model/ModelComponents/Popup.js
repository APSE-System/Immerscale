
// This class acts as a datastructure to store the information needed by the vue component to display a popup.
class Popup {
    visible;

    header;
    description;
    value;
    prevValue;

    callback;

    constructor(visible = false, header = "", description = "", value = "", callback = ()=>{}, prevValue=-1) {
        this.visible = visible;

        this.header = header;
        this.description = description;
        this.value = value;
        this.prevValue = prevValue;

        this.callback = callback;
    }

    // Sets visible to true to display the popup.
    show(header = "", description = "", value = "", callback = ()=>{}, prevValue=-1) {
        this.visible = true;

        this.header = header;
        this.description = description;
        this.value = value;
        this.prevValue = prevValue;

        this.callback = callback;
    }

    // Sets visible to false again to hide the popup.
    clear(){
        this.visible = false;

        this.header = "";
        this.description = "";
        this.value = "";
        this.prevValue = "";

        this.callback = ()=>{};
    }

}
export default Popup;