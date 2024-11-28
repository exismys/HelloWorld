#include <stdio.h>

int returnSum(int x, int y){
	return x + y;
}

int returnDifference(int x, int y){
	return x - y;
}

int returnMultiplication(int x, int y){
	return x * y;
}

int returnDivision(int x, int y){
	if (y != 0){
		return x / y;
	} else {
		return -1;
	}
}

int main(){
	int (*pointerToFunction)(int, int) = returnDifference;
	printf("Difference of 5 and 6 is: %d\n", pointerToFunction(5, 6));
	pointerToFunction = returnSum;
	printf("Sum of 5 and 6 is: %d\n", pointerToFunction(5, 6));
	return 0;
}

