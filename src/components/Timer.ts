import gsap from "gsap";
import { $ } from "../utils";
const timer_line = $<HTMLElement>(".timer-line");
const timer = gsap.to(timer_line, { width: "100%", ease: "none" });
timer.pause()
const start_timer = (duration: number, callback: () => void) => {
    timer.duration(duration)
    timer.eventCallback("onComplete" , callback)
    timer.play()
};
const reset_timer = ()=>timer.restart() 


export {start_timer,reset_timer};
