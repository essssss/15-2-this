/* *************************************************************************** */
// *************************** BIND ****************************************** //
/* *************************************************************************** */

const blue = {
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

const bDance = blue.dance;
// bDance.call(blue, "waltz");

// If we want to avoid all the .call mumbo jumbo.
// We can "perma-bind" a function to a context

// This will return a new function. but will not run it. So we save it to a new variable
const boundDance = bDance.bind(blue);

// the initial function is unchanged, but the value of "THIS" in the boundDance function is always always set to "blue"

const rocket = {
  name: "Rocket",
  breed: "Himalayan",
};
// We can bind "THIS" to a different cat. Same function.
const rocketDance = blue.dance.bind(rocket);

const dog = {
  name: "Tyson",
  breed: "Mini Aussie",
  dance: rocketDance,
};

// dog.dance() will still be bound to ROCKET

//.

//.

// WE Can also "BIND" arguments

const blueDisco = blue.dance.bind(blue, "disco");
const playsWithSocks = blue.play.bind(blue, "left sock", "right sock");

function applySalesTax(taxRate, price) {
  return price + price * taxRate;
}
// "null" means it doesn't change "THIS"
const applyCASalesTax = applySalesTax.bind(null, 0.0725);
const applyMDSalesTax = applySalesTax.bind(null, 0.06);

const bobsMembership = {
  name: "Bob",
  total: 250,
};

const jillsMembership = {
  name: "Jill",
  total: 899,
};

function collectMonthlyFee(fee) {
  const remaining = this.total - fee;
  this.total = remaining;
  return this.name + " remaining balance: " + remaining;
}
const collectBobsFee = collectMonthlyFee.bind(bobsMembership, 5);
const collectJillsFee = collectMonthlyFee.bind(jillsMembership, 35);

// *************************************************************
// Use Cases for BIND
//
// When we want to have object method as a callback
// > myBtn.addEventListener("click", fluffy.dance);
// That will not work!

const blueBtn = {
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
  greet() {
    alert(`${this.name} SAYS MEOW`);
  },
};

document
  .querySelector("#btn-1")
  .addEventListener("click", blueBtn.greet.bind(blueBtn));
// Without a binding, the "THIS" will be the global object.

// Also use it to "pre-bake in" arguments
// We want three buttons that call popUp but with different args:

// LOOK AT THIS NIGHTMARE MESS
/*
function popUp(msg) {
    alert("Secret Message is " + msg);
};
function handleClick(evt){
    let id = evt.target.id;
    if(id==="a") popUp("Apple");
    else if(id === "b") popUp("Berry");
    else if (id === "c") popUp("Cherry");
}
const get = document.getElementById.bind(document);
get("a").addEventListener("click", handleClick);
get("b").addEventListener("click", handleClick);
get("c").addEventListener("click", handleClick);
*/

const btnA = document.querySelector("#a");
const btnB = document.querySelector("#b");
const btnC = document.querySelector("#c");

function popUp(msg) {
  alert("Secret Message is " + msg);
}

btnA.addEventListener("click", popUp.bind(null, "Button A says 'HI'"));
btnB.addEventListener("click", popUp.bind(null, "Button B says 'HI'"));
btnC.addEventListener("click", popUp.bind(null, "Button C says 'HI'"));

/* ARROW FUNCTIONS AND KEYWORD THIS */

const greeter = {
  msg: "I like chickenz",
  sayHi: () => {
    alert(this.msg);
  },
  //   waitAndGreet: function (delay) {
  //     setTimeout(
  //       function () {
  //         alert(this.msg);
  //       }.bind(this),
  //       delay
  //     );
  //   },

  // The above version deals with a lot of weird scoping issues for "THIS"
  // The following version uses arrow functions that DO NOT change the "THIS" keyword.

  waitAndGreet: function (delay) {
    setTimeout(() => {
      alert(this.msg);
    }, delay);
  },
};

// Arrow functions do not create their own "THIS" They use the WINDOW obj
// Main reason to not use arrow functions as Methods in Objects.
// But Sometimes there are reasons you do NOT want to create your own "THIS"
