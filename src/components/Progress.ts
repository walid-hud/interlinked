import { animate_presence } from "../services/animations";
import { $ } from "../utils"
const progress = $<HTMLDivElement>(".progress")
let x= 0
setInterval(() => {
    progress.style.width = x+"%"
    x+=10 

}, 1000);

export {progress}