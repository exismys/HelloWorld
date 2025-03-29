package main

// time complexity: O(n)
func removeElement(nums []int, val int) int {
	len := len(nums)
	for i := 0; i < len; i++ {
		if nums[i] == val {
			for j := i; j < len-1; j++ {
				nums[j] = nums[j+1]
			}
			i--
			len--
		}
	}
	return len
}
