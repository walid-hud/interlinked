const $ = <T extends Element>(selector: string) =>
    document.querySelector<T>(selector)!;
const $all = <T extends Element>(selector: string) =>
    Array.from<T>(document.querySelectorAll(selector)!);

export { $ , $all };
