import { on_game_start, hide_btn } from "./components/Button_start";
import { animate_presence, text_transform } from "./services/animations";
import { start_game } from "./core/game_engine";
import { play_sound } from "./services/sounds";
import { animate } from "./3D/scene";
import Stats from "./components/Stats";
import { $ } from "./utils";
animate_presence(".game-name > p", 1);
text_transform(".game-name > p", 1, "INTERLINKED" , "1234567890");

on_game_start(async () => {
    play_sound("/sfx/warp.wav")
    hide_btn();
    const game_container = $<HTMLElement>(".game");
    new Stats(game_container);
    animate()
    let exit = false
    while(!exit){
        await start_game()
    }

});
