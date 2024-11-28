#include <stdio.h>

int main(){
	// Initializing a string
	// char str1[10] = {"S", "O", "L", "O", "L", "E", "A", "R", "N", "\0"}; // Not valid probably because compiler considers "S" and other enclosed by "" as a string literal instead of a character 
	char str1[10] = {'S', 'O', 'L', 'O', 'L', 'E', 'A', 'R', 'N', '\0'};
	printf("str1: %s\n", str1); // Prints "str1:SOLOLEARN"

	// Initializing string without null character at the end
	char str2[10] = {'S', 'O', 'L', 'O', 'L', 'E', 'A', 'R', 'N'};
	printf("str2: %s\n", str2); // Surprisingly it results in same output "str2: SOLOLEARN"

	// Initializing string with character exceeding in number specified
	// Exactly no of characters mentioned
	char str3[10] = {'S', 'O', 'L', 'O', 'L', 'E', 'A', 'R', 'N', '1'};
	printf("str3: %s\n", str3); // Prints "str3: SOLOLEARN1"
	// Characters exceeding the number specified
	// char str4[10] = {'S', 'O', 'L', 'O', 'L', 'E', 'A', 'R', 'N', '0', '1'};
	// printf("str4: %s\n", str4); Not valid, throws error message "excess elements in array initializer"

	// Initailizing str5
	char str5[10] = "SOLOLEARN1";
	printf("str5: %s\n", str5); // SOLOLEARN1

	// Initializing after declaring array of char
	char str6[10];
	// str6 = "SOLOLEARN"; Can't initialize after declaring

	// char str7[10] = "SOLOLEARN01"; Not valid, throws error message "initializer string for array of chars is too long"

	// Initializing string with pointer to char type
	char* str8 = "SOLOLEARN";
	printf("str8: %s\n", str8); // Prints "str8: SOLOLEARN", We can assign it a string much longer (variable sizes)
	// printf("str8: %c\n", str8); Not valid, %c expects argument of type of int where as str8 is of type char*
	printf("First character of str8: %c\n", *str8); // Works perfectly printing "First character of str8: S"
	// As str8 is a pointer, it stores the address of memory where "SOLOLEARN" is stored, String literal "SOLOLEARN" itself behaves as an address
	printf("First character of str8: %c\n", *"SOLOLEARN"); // S

	// Incrementing str8 twice
	str8++;
	str8++;
	printf("Third character of str8: %c\n", *str8); // Prints "L"
	printf("str8 after incrementing twice: %s\n", str8); // Prints "LOLEARN"

	// We can also initialize after declaring
	char* str9;
	str9 = "SOLOLEARN";
	printf("str9: %s\n", str9); // SOLOLEARN
	return 0;
}