package main

import (
  "fmt"
)

func main() {
  // 1 - Two Sum
  // nums := []int{2, 7, 11, 15}
  // target := 9
  // indices := twoSum(nums, target)
  // fmt.Printf("[%d %d]", indices[0], indices[1])


  // 2 - Add two numbers
  // ln1 := &ListNode{
  //   val: 2,
  //   Next: &ListNode{
  //     val: 4,
  //     Next: &ListNode{
  //       val: 3,
  //       Next: nil,
  //     },
  //   },
  // }

  // ln2 := &ListNode{
  //   val: 5,
  //   Next: &ListNode{
  //     val: 6,
  //     Next: &ListNode{
  //       val: 4,
  //       Next: nil,
  //     },
  //   },
  // }

  // ln3 := addTwoNumbers(ln1, ln2)

  // for ln3 != nil {
  //   fmt.Printf("%d", ln3.val)
  //   ln3 = ln3.Next
  // }

  fmt.Println(lenLongestSubstring("abcdabc"))
  // fmt.Println(lenLongestSubstring2("abcdabc"))
  // fmt.Println(lenLongestSubstring2(" "))
}
