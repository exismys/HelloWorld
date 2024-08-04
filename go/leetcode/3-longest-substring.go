package main

// Brute force
func lenLongestSubstring(str string) int {
  length := 0
  outer:
  for i := 0; i < len(str); i++ {
    charPresent := make(map[byte]bool)
    counter := 0
    for j := i; j < len(str); j++ {
      if charPresent[str[j]] == true {
        length = max(counter, length)
        continue outer
      }
      charPresent[str[j]] = true
      counter++
    }
    length = max(counter, length)
  }
  return length
}

// Let's improve upon it
// Turns out I have written a very flawed logic
// func lenLongestSubstring2(str string) int {
//   length := 0
//   left := 0
//   charPresent := make(map[rune]bool)
//   var index int
//   var char rune
//   for index, char = range str {
//     if charPresent[char] == true {
//       length = max(length, index - left)
//       left++
//     } else {
//       charPresent[char] = true
//     }
//   }
//   length = max(length, index - left + 1)
//   return length
// 
// }
