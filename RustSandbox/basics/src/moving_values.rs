fn main() {
    let a: i32 = 45;
    let b = a;
    println!("{}", a); // 45; i32 values are not moved.
    println!("{}", b); // 45

    let c: char = 'A';
    let d: char = c;
    println!("{}", c); // A
    println!("{}", d); // A

}
