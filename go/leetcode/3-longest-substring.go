package main

// Brute force
// O(n^2)
func lenLongestSubstring(str string) int {
	length := 0
outer:
	for i := range len(str) {
		charPresent := make(map[byte]bool)
		counter := 0
		for j := i; j < len(str); j++ {
			if charPresent[str[j]] {
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

// Sliding window with map
// O(n)
func lenLongestSubstring2(str string) int {
	length := 0
	m := make(map[byte]bool)
	i := 0
	for j := range len(str) {
		for m[str[j]] {
			m[str[i]] = false
			i++
		}
		m[str[j]] = true
		length = max(length, j - i + 1)
	}
	return length
}
