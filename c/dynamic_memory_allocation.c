#include <stdio.h>
#include <stdlib.h>

// Allocating contiguous memory of 10 ints

//int* n = (int*)malloc(sizeof(int)*10); // unable to do so: initializer element is not constant

// we can't write code outside of functions. The only things we can have outside of functions are declarations such as global variable declaration (usually a bad idea), function declarations etc.

// Wraping the same contiguous memory allocation of 10 ints inside a function

int* n = NULL;
void allocateMemory(){
	n = (int*)malloc(sizeof(int)*10);
}

// Can't run for the same reason stated at line 7
/*
for (int i = 0; i < 10; i++){
	printf("%d ", n[i]);
}
*/

int main(){
	allocateMemory();
	for (int i = 0; i < 10; i++){
		printf("%d ", n[i]);
	} // runs perfectly fine, all the elements are assigned to 0
	return 0;
}