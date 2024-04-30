import Tool from "./Tool.js";


class ReferenceTool extends Tool {
    select() {
        document.dispatchEvent(new CustomEvent("referenceToolSelected"));
    }
}

export default ReferenceTool;