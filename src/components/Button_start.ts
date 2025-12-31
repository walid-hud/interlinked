import { text_transform } from "../services/animations";
import { $ } from "../utils";

const btn = $<HTMLButtonElement>(".start-btn > button")
btn.addEventListener("mouseover"  , ()=>{
    text_transform(btn,0.5, "start")
})

export default btn