import { text_transform } from "../services/animations";
import { $all } from "../utils";

const options = $all<HTMLButtonElement>(".option");
function configure_options(
    options_text: string[],
    on_option_selected: (idx:number) => Promise<void>
) {
    options.forEach((e, idx) => {
        text_transform(e, 1, options_text[idx]);
        e.addEventListener("click" , function handler(){
            on_option_selected(idx).then(()=>{
                e.removeEventListener("click" , handler )
            })
            return
        } , {once:true})
    });
}
function highlight_options(correct_idx:number, clicked_idx:number){
    
}

export { configure_options };
