package main

import (
	"fmt"
	"strconv"
)

type ListNode struct {
	val  int
	next *ListNode
}

func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
	result := &ListNode{0, nil}
	current := result
	carry := 0
	for l1 != nil || l2 != nil || carry > 0 {
		sum := carry
		if l1 != nil {
			sum += l1.val
			l1 = l1.next
		}
		if l2 != nil {
			sum += l2.val
			l2 = l2.next
		}
		current.next = &ListNode{sum % 10, nil}
		current = current.next
		carry = sum / 10
	}
	return result.next
}

func main() {
	l1 := &ListNode{2, &ListNode{4, &ListNode{3, nil}}}
	l2 := &ListNode{5, &ListNode{6, &ListNode{4, nil}}}
	result := addTwoNumbers(l1, l2)
	for result != nil {
		fmt.Print(strconv.Itoa(result.val) + " ")
		result = result.next
	}
}
