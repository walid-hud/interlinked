import { on_game_start, hide_btn } from "./components/Button_start";
import { animate_presence, text_transform } from "./services/animations";
import { start_game } from "./core/game_engine";
animate_presence(".game-name > p", 1);
text_transform(".game-name > p", 1, "INTERLINKED" , "1234567890");

on_game_start(() => {
    hide_btn();
    start_game()
    // animate()
});
