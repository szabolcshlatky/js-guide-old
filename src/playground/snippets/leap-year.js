`use strict`;

const s14 = $$(`.s14`);
s14.addEventListener(`click`, () => {

  function isLeap(year) {
    
    /**************Don't change the code above****************/    
    
    var year = prompt(`Leap year?`);
      
        //Write your code here.    
    if (year % 4 === 0) {
        if (year % 100 === 0) {
            if (year % 400 === 0) {
                return `Leap year.`;
            } else {
                return `Not leap year.`;
            } 
        } else {
            return `Leap year.`;
        }
    } else {
        return `Not leap year.`;
    }
    
    /**************Don't change the code below****************/    
    
    }
    
    alert(isLeap());

});