package main

// Brute force
// O(n^2)
func lenLongestSubstring(str string) int {
	length := 0
outer:
	for i := 0; i < len(str); i++ {
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

// Todo: Let's improve upon it
