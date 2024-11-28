#include <stdio.h>

int main(){
	int myInteger;
	float myFloat = 25.5;
	// Assigning float to integer type
	myInteger = myFloat; // No error, conversion is implicit
	printf("Value of myInteger: %d\n", myInteger); // 25
	return 0;
}
