package main

// Brute force
// O(n3)
func longestPalindrome(s string) string {
	for i := len(s); i > 0; i-- {
		for j := 0; j < len(s)-i; j++ {
			if palindrome(s[j : j+i]) {
				return s[j : j+i]
			}
		}
	}
	return s
}

func palindrome(s string) bool {
	i := 0
	j := len(s) - 1
	for i < j {
		if s[i] != s[j] {
			return false
		}
		i++
		j--
	}
	return true
}

// Check palindrome for each character as if it's the center
// O(n2)
