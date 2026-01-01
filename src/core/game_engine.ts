import { create_store } from "./state_manger";
import Storage from "../services/local_storage";
import type { Game_state, Question } from "../types";
import { Questions } from "../data";
import { $ } from "../utils";
import { animate_presence } from "../services/animations";
import { configure_options } from "../components/Options";
import Stats from "../components/Stats";
import { update_question } from "../components/Question";
import { start_timer ,reset_timer} from "../components/Timer";
const game_container = $<HTMLElement>(".game");

const state: Game_state = {
    best_score: Storage.get("best_score"),
    current_question: "",
    current_score: 0,
    is_game_active: true,
    is_game_complete: false,
    last_score: Storage.get("last_score"),
    questions: Questions,
    total_questions: Questions.length,
};

const questions_container = $<HTMLElement>(".questions-container");
async function start_game() {
    const store = create_store(state);
    animate_presence(questions_container, 0.3);
    const stats = new Stats(game_container);
    store.subscribe("best_score", (score) => {
        stats.update("best_score", score)
    })
    store.subscribe("last_score", (score) => {
        stats.update("last_score", score);
    });
    store.subscribe("current_score" , (score)=>{
        stats.update("current_score" , score)
    })
    store.subscribe("is_game_complete" , end_game)
    
    for(let question of store.questions){
        await display_question(question)
    }
}
function restart_game() {}
function end_game(){}
async function display_question({correct_idx ,options, question}:Question):Promise<void>{
    return new Promise((next)=>{
        update_question(question)
        start_timer(10 ,()=>{reset_timer(); next()})
        configure_options(options  , (idx)=>{
            reset_timer()
            next()
        })
        
    }
)} 



export { start_game, restart_game };
