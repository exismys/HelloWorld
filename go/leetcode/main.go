package main

import (
	"fmt"
)

func main() {
	// 1 - two Sum
	// nums := []int{2, 7, 11, 15}
	// target := 9
	// indices := twoSum(nums, target)
	// fmt.Printf("[%d %d]", indices[0], indices[1])

	// 2 - add two numbers
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

	// 3 - longest substring
	// fmt.Println(lenLongestSubstring("aaa"))

	// 27 - remove element
	nums := []int{5, 4, 10, 11, 9, 24, 6, 10, 10, 4}
	fmt.Println(removeElement(nums, 10))
	fmt.Println(nums)
}
