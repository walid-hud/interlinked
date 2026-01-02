interface Game_state{
    current_question:string
    best_score:number
    last_score:number
    current_score:number
    total_questions:number
    is_game_active:boolean
    is_game_complete:boolean
    remaining_questions:number
    questions:Question[]
}

type Question = {
    question:string,
    options:string[],
    correct_idx:number
}

export type {Game_state , Question}