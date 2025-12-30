export class Store {
    last_baseline:number|null = 0;
    best_baseline:number|null = 0;
    get_last_baseline() :number {
        const lb = localStorage.getItem("last_baseline")
        if(!lb) return this.last_baseline? this.last_baseline : 0;
        return Number(lb)         
    }
    get_best_baseline():number{
        const bb = localStorage.getItem("best_baseline")
        if(!bb) return this.best_baseline? this.best_baseline : 0
        return Number(bb)
    }
    
    set_best_baseline(new_bb:number){
        const current_bb = this.get_best_baseline()
        if(current_bb <= new_bb) {
            localStorage.setItem("best_baseline" , String(new_bb))
        }
        return
        
    }
    set_last_baseline(new_lb:number){
        this.last_baseline = new_lb
        localStorage.setItem("last_baseline" , String(new_lb))
        return
    }
    constructor(){}
}