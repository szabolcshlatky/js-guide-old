`use strict`;

const s9 = $$(`.s9`);
s9.addEventListener(`click`, () => {

  var output = [];

  function fizzBuzz() {
  
    for(var count = 1; count < 101; count++) {
     if (count % 3 === 0 && count % 5 === 0) {
      output.push(`FizzBuzz`);
     } else if (count % 3 === 0) {
       output.push(`Buzz`);
     } else if (count % 5 === 0) {
       output.push(`Fizz`);
     } else {
       output.push(count);
     }
    }
    
    console.log(output);
  }
  
  fizzBuzz();
  
});