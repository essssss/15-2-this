/* *************************************************************************** */
// ************************ KEYWORD THIS ************************************* //
/* *************************************************************************** */

/*
//CODE SAMPLES

const cat = {
  name: "Blue",
  breed: "Scottish Fold",
  dance: function (dance) {
    console.log("THIS IS:", this);
    console.log(`Meow, I am ${this.name} and I like to ${dance}`);
  },
};

const bluesDance = cat.dance;

*/

// This is the exact same function ... BUT it won't work
// In one scenario we do not have access to the same "THIS"

// In bluesDance() the keyword "THIS" will refer to the WINDOW object. We are calling it from outside the "cat" object

// ******************************** //
// ***THIS AND THE WINDOW OBJECT*** //
// ******************************** //

// OK, so that was when we defined the function INSIDE an object and then we called it from an outside variable.
// What if we define the function FIRST and then store it in the object?
/*
function whatIsThis() {
  console.log("this =", this);
}

const myObj = {
  func: whatIsThis,
};
*/
// Calling myObj.func() will show "THIS" as the myOBJ object, but calling whatIsThis() straight up will show "THIS" as the WINDOW object

/* *************************************************************************** */
// Ok wtf is going on?
// In essence, JavaScript doesn't have real functions.
// EVERYTHING is called ON something, like a method.

// So, if you call a function on 'nothing' it is actually called on the "global object"
// In browser JS this is the "WINDOW" object.

// The value of "THIS" pretty much corresponds to what you have on the LEFT side of the dot '.'
// Without anything, that equates to window.whatIsThis()

//.
//.
//.
// STRICT MODE
/*
class Cat {
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }
  dance(danceType) {
    console.log("THIS IS:", this);
    console.log(`Meow, I am a ${this.breed} and I like to ${danceType}`);
  }
}

const rocket = new Cat("rocket", "tabby");
const rocketDance = rocket.dance;
*/
// When we use a CLASS "THIS" becomes undefined instead of the global object
// A class uses "Strict mode".
// the value of "THIS" in 'strict mode' is set to undefined
// You can call strict mode in any js file by putting 'use strict'; at the beginning

/* *************************************************************************** */
// CALL
// Call is a way to specify what "THIS" should be.

const cat = {
  name: "Blue",
  breed: "Scottish Fold",
  dance: function (dance) {
    console.log("THIS IS:", this);
    console.log(`Meow, I am a ${this.breed} and I like to ${dance}`);
  },
  play: function (...toys) {
    for (let toy of toys) {
      console.log(`${this.name} plays with ${toy}`);
    }
  },
};

const blueDance = cat.dance;

// The following will "call" blueDance with "THIS" set to the "cat" object.
// The next parameters are passed into the function.
blueDance.call(cat, "Jitterbug");

// We can call a whole different object as "THIS"!!
const dog = {
  breed: "black lab",
  name: "Polly",
};

blueDance.call(dog, "merengue");

/* *************************************************************************** */
// *************************** BIND ****************************************** //
/* *************************************************************************** */
