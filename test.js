const myArray = [1, 2, 2, 3, 4];

function squareSum(numbers) {
  return numbers.map((sum) => sum * sum).reduce((sum, current) => sum + current, 0);
}

function arrayPlusArray(arr1, arr2) {
  return arr1.concat(arr2).reduce((sum, current) => sum + current, 0);
}

const arr = ['sheep', 'sheep', 'sheep', 'wolf', 'sheep'];

function warnTheSheep(queue) {
  const eating = queue.length - 1 - queue.indexOf('wolf');
  return eating
    ? `Oi! Sheep number ${eating}! You are about to be eaten by a wolf!`
    : 'Pls go away and stop eating my sheep';
}

console.log(warnTheSheep(arr));

// We want an array, but not just any old array, an array with contents!

// Write a function that produces an array with the numbers 0 to N-1 in it.

// For example, the following code will result in an array containing the numbers 0 to 4:
const arr = (...arguments) => {};

console.log(arr(myArray));
console.log(arrayPlusArray(myArray, myArray));

console.log(squareSum(myArray));
