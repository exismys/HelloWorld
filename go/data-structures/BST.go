package main

import (
	"fmt"
)

type Node struct {
	data  int
	left  *Node
	right *Node
}

type BST struct {
	root *Node
}

func newBST() *BST {
	return &BST{}
}

func (bst *BST) insert(num int) {
	if bst.root == nil {
		bst.root = &Node{
			data: num,
		}
		return
	}

	current := bst.root
	prev := current
	for current != nil {
		prev = current
		if num > current.data {
			current = current.right
		} else {
			current = current.left
		}
	}

	if num > prev.data {
		prev.right = &Node{
			data: num,
		}
	} else {
		prev.left = &Node{
			data: num,
		}
	}
}

// Recursive traversals
func (bst *BST) inorder(head *Node) {
	if head != nil {
		bst.inorder(head.left)
		fmt.Println(head.data)
		bst.inorder(head.right)
	}
}

// Iterative traversals
func (bst *BST) inorderIterative() {
	stack := []*Node{}
	current := bst.root

	for current != nil || len(stack) > 0 {

		for current != nil {
			stack = append(stack, current)
			current = current.left
		}

		current = stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		fmt.Println(current.data)

		current = current.right
	}

}

func main() {
	var bst = newBST()
	bst.insert(10)
	bst.insert(5)
	bst.insert(20)
	bst.insert(15)
	//  bst.inorder(bst.root)
	bst.inorderIterative()
}
