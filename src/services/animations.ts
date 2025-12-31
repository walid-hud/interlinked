import gsap from "gsap";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
gsap.registerPlugin(ScrambleTextPlugin);

const text_transform = (
    el: HTMLElement|string,
    duration: number = 1,
    value: number | string,
    chars?:string,
) => {
    gsap.to(el , {duration , 
        scrambleText:{
            text:String(value),
            speed:0.1,
            chars:chars
        }
    })
};
const animate_presence = async (
  el: HTMLElement|string,
  duration: number,
  on_end?: () => void 
) => {
    gsap.from(el , {autoAlpha:0 , duration:duration , onComplete:on_end}  )
};

export {animate_presence,text_transform}