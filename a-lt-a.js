var a = new Number(5);

let i = 0;

Number.prototype.valueOf = function() {
    return i++;
};

console.log(a == a); // true
console.log(a < a); // true