import gsap from "gsap";
import { $ } from "../utils";
const timer_line = $<HTMLElement>(".timer-line");
const timer = gsap.to(timer_line, { width: "100%", ease: "none" });
timer.pause()
const start_timer = (duration: number, callback: () => void) => {
    // Clear any existing callback first
    timer.eventCallback("onComplete", null);
    timer.duration(duration);
    timer.eventCallback("onComplete", callback);
    timer.restart();
    timer.play();
};
const reset_timer = () => {
    // Clear callback and restart
    timer.eventCallback("onComplete", null);
    timer.restart();
    timer.pause();
};
const clear_timer = () => {
    timer.eventCallback("onComplete", null);
    timer.pause();
};


export {start_timer, reset_timer, clear_timer};
