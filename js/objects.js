let man = {
  name: "Ron",
  city: "New York",
  // id: this.name    This does not work because we can not reuse the properties of the same object
}

console.log(man)
console.log(this) // This is refering to an empty object
