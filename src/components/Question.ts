import { animate_presence, text_transform } from "../services/animations";
import { $ } from "../utils";
const question = $<HTMLElement>(".question")
const question_text =  $<HTMLElement>(".question > .text")
// const question_timer_text =  $<HTMLElement>(".question > .timer-text")
// const question_timer_line =  $<HTMLElement>(".question > .timer-line")

function show_question(){
    animate_presence(question,0.2)
}
function update_question(text:string){
    text_transform(question_text , 0.5,text)
}


export {show_question , update_question}
