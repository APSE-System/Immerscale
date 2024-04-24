import Tool from "./Tool.js";

class MeasurementTool extends Tool{
select(){
    document.dispatchEvent(new CustomEvent("measurementToolSelected"));
}
}
export default MeasurementTool