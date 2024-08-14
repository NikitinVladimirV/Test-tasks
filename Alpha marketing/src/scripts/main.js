import "./_components";
import { sum } from "./_components";

// const Increment = function () {
//   this.int = 0;
// };

// Increment.prototype.toString = function () {
//   return ++this.int;
// };

const Increment = function () {
  this.int = 0;
};
Increment.prototype.toString = function () {
  return ++this.int;
};
const increment = new Increment();

// alert(increment);
// alert(increment);
// alert(increment + increment);

// console.log(increment);
// console.log(increment);
// console.log(increment + increment);
console.log(sum(2, 10));

console.log("dsafafasf");
