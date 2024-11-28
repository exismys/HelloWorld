#include <stdio.h>

int main(){
	int array[5] = {1, 2, 3, 4, 5};
	printf("Content of \"array\" variable: %p\n", array);
	printf("Address of first element of array: %p\n", &array[0]);
	int (*pointerToArray)[5] = &array;
	printf("Address of \"array\" variable: %p\n", pointerToArray);

	// pointerToArray = array; // Not OK: The reason is that an array name, such as array, is implicitly\
	converted into a pointer to the array's first element, not a pointer to the whole array.
	
	// Explicit type casting required
	// pointerToArray = (int (*)[10])array; // Not OK: array sizes are different
	pointerToArray = (int (*)[5])array; // OK

	// Incrementing array
	// array++; // Error: lvalue required as increment operand.
	// array represents a constant address
	// Incrementing pointer to array: pointerToArray
	pointerToArray++; // OK

	return 0;
}
	
