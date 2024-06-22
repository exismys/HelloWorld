package main

import "fmt"


type ListNode struct {
  val int
  Next *ListNode
}


func addTwoNumbers(ln1 *ListNode, ln2 *ListNode) *ListNode {
  carry := 0
  ln3 := &ListNode{
    val: 0,
    Next: nil,
  }
  result := ln3
  for ln1 != nil || ln2 != nil || carry != 0 {
    sum := carry
    if ln1 != nil {
      sum += ln1.val
      ln1 = ln1.Next
    }
    if ln2 != nil {
      sum += ln2.val
      ln2 = ln2.Next
    }
    ln3.Next = &ListNode {
      val: sum % 10,
      Next: nil,
    }
    carry = sum / 10
    ln3 = ln3.Next
  }
  return result.Next
}


func main() {

  ln1 := &ListNode{
    val: 2,
    Next: &ListNode{
      val: 4,
      Next: &ListNode{
        val: 3,
        Next: nil,
      },
    },
  }

  ln2 := &ListNode{
    val: 5,
    Next: &ListNode{
      val: 6,
      Next: &ListNode{
        val: 4,
        Next: nil,
      },
    },
  }

  ln3 := addTwoNumbers(ln1, ln2)

  for ln3 != nil {
    fmt.Printf("%d", ln3.val)
    ln3 = ln3.Next
  }

}
