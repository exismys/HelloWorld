package main

func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {
	i, j, k := 0, 0, 0
	var merged []int = make([]int, len(nums1)+len(nums2))
	for i < len(nums1) && j < len(nums2) {
		if nums1[i] <= nums2[j] {
			merged[k] = nums1[i]
			k++
			i++
		} else {
			merged[k] = nums2[j]
			k++
			j++
		}
	}
	if i == len(nums1) {
		for j < len(nums2) {
			merged[k] = nums2[j]
			k++
			j++
		}
	} else {
		for i < len(nums1) {
			merged[k] = nums1[i]
			k++
			i++
		}
	}
	var median float64
	if len(merged)%2 == 0 {
		num1 := merged[len(merged)/2-1]
		num2 := merged[len(merged)/2]
		median = float64(num1+num2) / 2
	} else {
		median = float64(merged[len(merged)/2])
	}
	return median
}
