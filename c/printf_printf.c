#include <stdio.h>

int main(){

	// printf(printf("hello world")); not a valid statement
	// printf(array[i]); printf statements without format specifiers are not valid unless arguments are string literals


	// Don't know how this works but it evaluates the statements inside case n where n is lenght of the string literal inside printf statement
	switch(printf("Hello World!\n")){
		case 1:
		printf("this is case 1");
		break;
		case 2:
		printf("this is case 2");
		break;
		case 13:
		printf("this is case 13 which is lenght of the string\n");
		break;
		default:
		printf("this is default");
	}

	return 0;
}