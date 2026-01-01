import { text_transform } from "../services/animations";
import { $all } from "../utils";

const options = $all<HTMLButtonElement>(".option");
function configure_options(
    options_text: string[],
    on_option_selected: (idx:number) => void
) {
    options.forEach((e, idx) => {
        text_transform(e, 1, options_text[idx]);
        e.addEventListener("click" , ()=>on_option_selected(idx) , {once:true})
    });
}
function highlight_options(correct_idx:number, clicked_idx:number){
    
}

export { configure_options };
