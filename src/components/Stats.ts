import { animate_presence, text_transform } from "../services/animations";
import Storage from "../services/local_storage";

class Stats {
    private score: number = 0;
    private last_score: number = 0;
    private best_score: number = 0;
    private root: HTMLElement | null = null;
    private el: HTMLElement | null = document.createElement("div");
    private score_text: HTMLElement|null = null;
    private last_score_text: HTMLElement|null = null;
    private best_score_text: HTMLElement|null = null;
    private progress_counter : number = 1;
    private total_questions : number  = 20 
    private chars = "01234567899";
    print_progress_bars(){
        return Array.from({length:this.total_questions}).map((_,idx)=>{
            if(idx+1 <= this.progress_counter){
            return `<div class="bar"></div>`
            }else{
                return `<div class="bar remaining"></div>`
            }
        }).join("\n")}
    html = () => `
    <div class="progress-counter">
        <p>
            Answered
        </p>
        <div class="bars">
            ${this.print_progress_bars()}
        </div>
    </div>
    <div class="current-bl">
        <p>current baseline : </p>
        <p id="current-score-text">
        ${this.get("current_score") ?? 0}
        </p>
    </div>
    <div class="last-bl">
        <p>last baseline : </p>
        <p id="last-score-text">
        ${this.get("last_score") ?? 0}
        </p>
    </div>
    <div class="best-bl">
      <p>
        best baseline :
      </p>
      <p id="best-score-text">
        ${this.get("best_score") ?? 0}
      </p>
    </div>
    `;
    constructor(root: HTMLElement) {
        this.root = root;
        this.el?.classList.add("game-stats");
        this.render();
    }
    render(): void {
        if (this.el && this.root) {
            this.best_score = Storage.get("best_score");
            this.last_score = Storage.get("last_score");
            this.el.innerHTML = this.html();
            this.best_score_text = this.el.querySelector("#best-score-text")!;
            this.last_score_text = this.el.querySelector("#last-score-text")!;
            this.score_text = this.el.querySelector("#current-score-text")!;
            this.root.appendChild(this.el);
            animate_presence(this.el, 1);
        }
        return;
    }

    update(what: "current_score" | "last_score" | "best_score", value: number) {
        switch (what) {
            case "current_score":
                this.score = value;
                text_transform(this.score_text!, 1, value, this.chars);
                break;
            case "last_score":
                this.last_score = value;
                text_transform(this.last_score_text!, 1, value, this.chars);
                Storage.set("last_score", value);
                break;
            case "best_score":
                this.best_score = value;
                text_transform(this.best_score_text!, 2, value, this.chars);
                Storage.set("best_score", value);
                break;
        }
    }
    get(what: "current_score" | "last_score" | "best_score") {
        switch (what) {
            case "current_score":
                return this.score;
            case "last_score":
                return this.last_score;
            case "best_score":
                return this.best_score;
        }
    }
}

export default Stats;
