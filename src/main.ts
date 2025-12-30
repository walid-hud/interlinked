import gsap from "gsap";
import { shuffle } from "gsap/all";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";
import { $ } from "./utils";
import { Store } from "./localstorage";
import { data, type Question } from "./data";
gsap.registerPlugin(ScrambleTextPlugin, SplitText);
const sleep = async (n: number) => new Promise((r) => setTimeout(r, n));
const start_btn = $<HTMLButtonElement>(".start-btn > button");
const store = new Store();
const game_stats = $<HTMLDivElement>(".game-stats");
const last_baseline_val = $<HTMLParagraphElement>("[data-last-baseline]");
const best_baseline_val = $<HTMLParagraphElement>("[data-best-baseline]");
const questions_container = $<HTMLElement>(".questions-container");
const question_markup = {
  text: $<HTMLSpanElement>(".question > .text"),
  timer_text: $<HTMLSpanElement>(".question > .timer-text"),
  timer_line: $<HTMLDivElement>(".question > .timer-line"),
};
const options = Array.from(
  document.querySelectorAll<HTMLButtonElement>(".option")!
);

const tl = gsap.timeline();
async function start_game() {
  tl.to(questions_container, { opacity: 1, duration: 1 })

    .to(game_stats, {
      autoAlpha: 1,
      duration: 0.5,
      ease: "circ.inOut",
    })
    .to(last_baseline_val, {
      duration: 1,
      scrambleText: {
        text: String(store.get_last_baseline()),
        chars: "1234567890!@#$%^&*()_+",
        speed: 0.3,
      },
    })
    .to(
      best_baseline_val,
      {
        duration: 1,
        scrambleText: {
          text: String(store.get_best_baseline()),
          chars: "1234567890!@#$%^&*()_+",
          speed: 0.3,
        },
      },
      "<"
    );
  const shuffled = shuffle(data);
  for (let idx = 0; idx < shuffled.length; idx++) {
    await show_question(shuffled[idx]);
  }
}
const on_page_load = async () => {
  tl.to(".game-name > p", {
    duration: 1,
    ease: "power3.out",
    scrambleText: {
      text: "INTERLINKED",
      chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      speed: 0.3,
    },
  }).from(start_btn, {
    color: "#fff0",
    repeat: -1,
    duration: 1,
    ease: "none",
    yoyo: true,
  });
  start_btn.addEventListener("click", (ev) => {
    const button = ev.target as HTMLButtonElement;
    button.remove();
    start_game();
  });
};

window.addEventListener("DOMContentLoaded", on_page_load);

function start_timer(time: number, cb?: () => void) {
  gsap.fromTo(
    ".timer-line",
    { width: "0%" },
    { width: "100%", duration: time, ease: "power1.inOut", onComplete: cb }
  );
}
function show_timer_text(time: number , on_timer_end:()=>void) {
  gsap.fromTo(
    ".timer-text",
    { innerText: 10 },
    {
      innerText: 0 + "s",
      duration: time,
      delay: 0.1,
      ease: "none",
      snap: { innerText: 1 },
      onComplete:on_timer_end
    }
  );
}

async function show_question(question: Question): Promise<void> {
  const { text } = question_markup;
  return new Promise((res) => {
    gsap.to(text, {
      duration: 1,
      scrambleText: { text: question.question, rightToLeft: false },
    });
    show_options(question);
    show_timer_text(10, async ()=>{
      const correct = options.find(b=>Number(b.getAttribute("data-option-index"))===question.correct_idx)
      if(correct){
          correct.classList.add("option-correct")
        }
        await sleep(1000)
        options.forEach(e=>e.style.pointerEvents="auto")
        res()
    });
    start_timer(10, );
  });
}

function show_options(
  question:Question,
) {
  options.forEach((opt, idx) => {
    opt.classList.remove("option-correct"  , "option-wrong")
    gsap.to(opt, {
      duration: 1,
      scrambleText: {
        text: question.options[idx],
        rightToLeft: false,
      },
    });

    
    opt.removeEventListener("click",validate_option );
    opt.addEventListener("click", (e)=>validate_option(e, question))
  });
}

function validate_option(ev:PointerEvent , question?:Question){
  options.forEach(e=>e.style.pointerEvents="none")
  const btn = ev.target as HTMLButtonElement
      const btn_index =btn.getAttribute("data-option-index") 
      if(Number(btn_index) === question?.correct_idx){
        btn.classList.add("option-correct")
        
        
      }else{
        btn.classList.add("option-wrong")
      }
}