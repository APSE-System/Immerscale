
class Popup {
    visible;

    header;
    description;
    value;

    callback;

    constructor(visible = false, header = "", description = "", value = "", callback = ()=>{}) {
        this.visible = visible;

        this.header = header;
        this.description = description;
        this.value = value;

        this.callback = callback;
    }

    show(header = "", description = "", value = "", callback = ()=>{}) {
        this.visible = true;

        this.header = header;
        this.description = description;
        this.value = value;

        this.callback = callback;

        console.log("visible now")
    }

    clear(){
        this.visible = false;

        this.header = "";
        this.description = "";
        this.value = "";

        this.callback = ()=>{};
    }

}
export default Popup;