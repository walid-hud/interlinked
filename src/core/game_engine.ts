import { create_store } from "./state_manger";
import Storage from "../services/local_storage";
import type { Game_state, Question } from "../types";
import { Questions } from "../data";
import { $ } from "../utils";
import { animate_presence } from "../services/animations";
import { configure_options } from "../components/Options";
import Stats from "../components/Stats";
import { update_question } from "../components/Question";
import { start_timer, reset_timer, clear_timer } from "../components/Timer";
import { play_sound } from "../services/sounds";
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
        stats.update("best_score", score);
    });
    store.subscribe("last_score", (score) => {
        stats.update("last_score", score);
    });
    store.subscribe("current_score", (score) => {
        stats.update("current_score", score);
    });
    store.subscribe("is_game_complete", end_game);

    for (let question of store.questions) {
        await display_question(question, store);
    }
}
function restart_game() {}
function end_game() {}
async function display_question(
    { correct_idx, options, question }: Question,
    store: ReturnType<typeof create_store<Game_state>>
): Promise<void> {
    return new Promise((resolve) => {
        let isResolved = false; // prevent multiple resolves

        update_question(question);

        // Set up timer callback
        start_timer(20, () => {
            if (!isResolved) {
                isResolved = true;
                clear_timer();
                resolve();
            }
        });

        // set up option handlers
        configure_options(options, async (idx) => {
            if (isResolved) return; // already resolved, ignore
            isResolved = true;
            clear_timer(); // clear the timer
            console.info(`index : ${idx} and correct : ${correct_idx}`);
            play_sound("/sfx/click.wav")
            await validate_option(idx, correct_idx, store);
            resolve();
        });
    });
}

async function validate_option(
    idx: number,
    correct_idx: number,
    store: ReturnType<typeof create_store> // some typescript wizardry 💀
) {
    if (idx === correct_idx) {
        store.current_score += 100;
    }
    return;
}

export { start_game, restart_game };
