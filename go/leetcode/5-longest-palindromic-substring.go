package main

import "fmt"

// Brute force
// O(n3)
func longestPalindrome(s string) string {
	for i := len(s); i > 0; i-- {
		for j := 0; j <= len(s)-i; j++ {
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
func longestPalindrome2(s string) string {
	length := 0
	str := ""
	for i := range s {
		j, k := i, i
		for j >= 0 && k < len(s) && s[j] == s[k] {
			if k-j+1 > length {
				length = k - j + 1
				str = s[j : k+1]
			}
			j--
			k++
		}

		j, k = i, i+1
		for j >= 0 && k < len(s) && s[j] == s[k] {
			if k-j+1 > length {
				length = k - j + 1
				str = s[j : k+1]
			}
			j--
			k++
		}
	}

	return str
}

// Dynamic Programming
// O(n2)
func longestPalindrome3(s string) string {
	table := make([][]bool, len(s))
	str := ""
	for row := range table {
		table[row] = make([]bool, len(s))
	}

	for i := range len(s) {
		table[i][i] = true
		str = s[i : i+1]
	}

	for i := range len(s) - 1 {
		if s[i+1] == s[i] {
			table[i][i+1] = true
			str = s[i : i+2]
		}
	}

	// for _, row := range table {
	// 	for _, col := range row {
	// 		fmt.Printf("%t,", col)
	// 	}
	// 	fmt.Println()
	// }

	for l := 2; l < len(s); l++ {
		for i := 0; i < len(s)-l; i += l {
			j := i + l
			if s[i] == s[j] && table[i+1][j-1] {
				table[i][j] = true
				str = s[i : j+1]
			}
		}
	}

	return str
}
