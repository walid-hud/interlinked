import Storage from "./services/local_storage";
import { progress } from "./components/Progress";
import { btn, on_game_start, hide_btn } from "./components/Button_start";
import Stats from "./components/Stats";
import { animate_presence, text_transform } from "./services/animations";
import { $ } from "./utils";
const game_container = $<HTMLElement>(".game");
animate_presence(".game-name > p", 1);
text_transform(".game-name > p", 1, "INTERLINKED");

on_game_start(() => {
    hide_btn();
    const stats = new Stats(game_container);
});
