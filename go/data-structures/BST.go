package main

import "fmt"


type Node struct{
  val int
  left *Node
  right *Node
}

type BST struct {
  root *Node
}


func newBST() *BST {
  return &BST{}
}

func (b *BST) insert(val int) {
  if b.root == nil {
    b.root = &Node{
      val, nil, nil,
    }
  }
}


func main() {
  bst := newBST()
  bst.insert(10)
  fmt.Println(bst.root.val)

}


