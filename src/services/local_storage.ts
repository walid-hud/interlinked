enum game_stats {
    best="bs",
    last="ls"
}
class Storage{
    get(what:"best_score"|"last_score"):number{
        if(localStorage.length===0) return 0
        const n = localStorage.getItem(
                what === "best_score" ? 
                game_stats.best:
                game_stats.last
        )
        if(!n || isNaN(Number(n))) return 0
        return Number(n)
    }

    set(what:"best_score"|"last_score" , value:number){
        what === "best_score" ?
        localStorage.setItem(game_stats.best , String(value)):
        localStorage.setItem(game_stats.last , String(value)) 
    }
    clear = ()=>localStorage.clear()

}

export default new Storage()