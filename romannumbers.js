// Реализовать создание следующую запись ;]
// ...

const romanToInt = {
    I: 1,
    II: 2,
    III: 3,
    IV: 4,
    V: 5,
    VI: 6,
    VII: 7,
    VIII: 8,
    IX: 9,
    X: 10
};

for (const [roman, number] of Object.entries(romanToInt)) {
    Object.defineProperty(Number.prototype, roman, {
        get() {
            return Array.from({ length: number }, (_, i) => i);
        },
        configurable: true
    });
}

console.log(0..V);    // [0, 1, 2, 3, 4]
console.log(0..VII);  // [0, 1, 2, 3, 4, 5, 6]