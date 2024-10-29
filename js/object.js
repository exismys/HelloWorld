// function as a constructor
function Rabbit(name, type) {
    this.name = name;
    this.type = type;
}

let bunny = new Rabbit("bunny", "cute");
console.log(bunny);

// class notation
class Dog {
    constructor(type) {
        this.type = type;
    }
    speak(line) { // this is in Dog's prototype property
        console.log(`The ${this.type} dog says ${line}`)
    }
}

let cuteDog = new Dog("cute");
cuteDog.speak("woof");

// Object.create()

let simpleObject = {
    aFunction: function() {
        console.log("function inside simpleObject");
    }
}

let aNewObject = Object.create(simpleObject);
console.log(aNewObject.aFunction()); // function inside simpleObject
