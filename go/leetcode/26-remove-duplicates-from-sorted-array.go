package main

func removeDuplicates(nums []int) int {
	len := len(nums)
	for i := 1; i < len; i++ {
		if nums[i] == nums[i-1] {
			for j := i; j < len-1; j++ {
				nums[j] = nums[j+1]
			}
			i--
			len--
		}
	}
	return len
}
