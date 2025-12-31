import { create_store } from "./state_manger";
import Storage from "../services/local_storage";
import type {Game_state} from "../types"
import { Questions } from "../data";
const state : Game_state = 
    {
        best_score:Storage.get("best_score"),
        current_question:"",
        current_score:0,
        is_game_active:true,
        is_game_complete:false,
        last_score:Storage.get("last_score"),
        questions:Questions,
        total_questions:Questions.length
    }
const store = create_store(state)
    
function start_game(){}
function restart_game(){}

