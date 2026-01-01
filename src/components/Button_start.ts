import { text_transform } from "../services/animations";
import { $ } from "../utils";
const chars = "abcdefghijklmnopqrstuvwxyz"
const btn = $<HTMLButtonElement>(".start-btn > button")
btn.addEventListener("mouseover"  , ()=>{
    text_transform(btn,0.5, "are you sure ?" , chars )
})

btn.addEventListener("mouseout"  , ()=>{
    text_transform(btn,0.5, "start" ,chars)
})

function on_game_start(cb:(ev:Event)=>void){
    btn.addEventListener("click" , cb)
}
function hide_btn(){
    btn.style.display="none"
}
export {btn , on_game_start,hide_btn }