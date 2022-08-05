import {fib} from "./fib";

describe('fib', () => {
    it('return 13 for 7 arguments', ()=>{
        expect(fib(7)).toBe(13)
    })
})