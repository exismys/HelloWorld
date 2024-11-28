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
	 // Array of pointers to functions of size 4
	 int (*arrayOfFunctions[4])(int, int) = {returnSum, returnDifference, returnMultiplication, returnDivision};
	 int x = 10, y = 5;
	 for (int i = 0; i < 4; i++) {
		 printf("%d\n", arrayOfFunctions[i](x, y));
	 }

	 // Defining simpler name for type "functions" using typedef
	 typedef int funcT(int , int);
	 // Defining simpler name of type "pointers_to_functions" using typedef
	 typedef int (*pointerToFunction)(int, int);
	 // Alternative to declare array of pointers to functions
	 pointerToFunction arrayOfFunctions2[4] = {returnSum, returnDifference, returnMultiplication, returnDivision};
	 for (int i = 0; i < 4; i++){
		 printf("%d\n", arrayOfFunctions[i](x, y));
	 }
	 return 0;
 }
