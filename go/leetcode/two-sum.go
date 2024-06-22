package main

import (
  "fmt"
)

func main() {
  nums := []int{2, 7, 11, 15}
  target := 9
  indices := twoSum(nums, target)
  fmt.Printf("[%d %d]", indices[0], indices[1])
}

func twoSum(nums []int, target int) []int {
  m := make(map[int]int)

  for i := 0; i < len(nums); i++ {
    c := target - nums[i]
    _, exists := m[c]
    if exists {
      return []int{m[c], i}
    } else {
      m[nums[i]] = i
    }
  }
  return nil
}
