fn main() {
    let mut vec: Vec<String> = Vec::new();
    for i in 101..106 {
        vec.push(i.to_string());
    }

    // pop
    let fifth = vec.pop().expect("Empty vector!");
    assert_eq!(fifth, "105");
    println!("{:?}", vec);

    // swap_remove
    // swaps value at vec[1] with last value in vector
    let second = vec.swap_remove(1);
    assert_eq!(second, "102");
    println!("{:?}", vec);

    // std::mem::replace()
    let third = std::mem::replace(&mut vec[2], "substitute".to_string());
    assert_eq!(third, "103");
    println!("{:?}", vec);
}
