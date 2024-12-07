package main

// time complexity: O(n^2)
// func removeDuplicates(nums []int) int {
// 	len := len(nums)
// 	for i := 1; i < len; i++ {
// 		if nums[i] == nums[i-1] {
// 			for j := i; j < len-1; j++ {
// 				nums[j] = nums[j+1]
// 			}
// 			i--
// 			len--
// 		}
// 	}
// 	return len
// }

func removeDuplicates(nums []int) int {
	len := len(nums)
	for i := 0; i < len-1; i++ {
		j := i + 1
		for j < len && nums[j] == nums[i] {
			j++
		}

		// j-i is the frequency of an unique element
		// so if j-i > 1, there are duplicates
		// so we need to remove j-i-1 elements
		// lenth will be shinked by the same
		if j-i > 1 {
			for k := i + 1; k < len-(j-i-1); k++ {
				nums[k] = nums[k+(j-i-1)]
			}
			len -= j - i - 1
		}
	}
	return len
}
