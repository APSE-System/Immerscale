import Tool from "./Tool.js";

class MeasurementTool extends Tool{
select(){
    document.dispatchEvent(new CustomEvent("measurementToolSelected"));
}
measurementCompleted(){
    document.dispatchEvent(new CustomEvent("measurementCompleted"));
}
}
export default MeasurementTool