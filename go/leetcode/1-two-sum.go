package main

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
