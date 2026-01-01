import gsap from "gsap";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
gsap.registerPlugin(ScrambleTextPlugin);
const local_chars = "abcdefghijklmnopqrstuvwxyz"
const text_transform = (
    el: HTMLElement|string,
    duration: number = 1,
    value: number | string,
    chars?:string,
) => {
    gsap.to(el , {duration ,ease:"none" , 
        scrambleText:{
            text:String(value),
            speed:0.2,
            chars:chars??local_chars
        }
    })
};
const animate_presence = async (
  el: HTMLElement|string,
  duration: number,
  on_end?: () => void 
) => {
    gsap
    .to(el , {autoAlpha:1 , duration:duration , onComplete:on_end})

};

export {animate_presence,text_transform}