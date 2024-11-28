#include <stdio.h>
#include <stdlib.h>

struct FourInts{
	int num1, num2, num3, num4;
};

struct DataNext{
	int data;
	struct DataNext* next;
};

int main(){
	
	int num1 = 25, num2 = 50, num3 = 75, num4 = 100;

	// Pointers to ints
	int *pnum1 = &num1, *pnum2 = &num2, *pnum3 = &num3, *pnum4 = &num4;

	// Printing the addresses and values of variables
	printf("Address: %p\tValue: %d\n", (void*)pnum1, *pnum1);
	printf("Address: %p\tValue: %d\n", (void*)pnum2, *pnum2);
	printf("Address: %p\tValue: %d\n", (void*)pnum3, *pnum3);
	printf("Address: %p\tValue: %d\n", (void*)pnum4, *pnum4);
	printf("\n");


	// Storing these pointers in an array of fixed size
	int* array[4] = {pnum1, pnum2, pnum3, pnum4};
	for (int i = 0; i < 4; i++){
		printf("Address: %p\tValue: %d\n", (void*)(array[i]), *(array[i])); // [] have higher precedence than * (all postfix operators have higher precedence than infix operators)
	}
	printf("%p %d %d\n", array[3], *(array[3]), (*array)[3]); // In this case *(array[3]) and (*array)[3] are equivalent both resulting in 100
	// address[3] = *(address + sizeof(addresstotype)*3)
	printf("\n");


	// Creating an array dynamically to store the pointers to integers
	int** array1 = (int**)malloc(sizeof(int*)*4);
	for (int i = 0; i < 4; i++){
		*(array1 + i) = array[i];
	}
	for (int i = 0; i < 4; i++){
		printf("%d ", **(array1 + i));
	} // Working perfectly fine, 25, 50, 75, 100
	printf("\n\n");


	// Creating an array of pointers to structures of size three
	// Two pointers to structure types
	struct FourInts* var1 = (struct FourInts*)malloc(sizeof(struct FourInts));
	var1->num1 = 20;
	var1->num2 = 40;
	var1->num3 = 60;
	var1->num4 = 80;
	struct FourInts* var2 = (struct FourInts*)malloc(sizeof(struct FourInts));
	var2->num1 = 30;
	var2->num2 = 60;
	var2->num3 = 90;
	var2->num4 = 120;

	//Dynamically allocated array of above pointers to struct
	struct FourInts** array2 = (struct FourInts**)malloc(sizeof(struct FourInts*)*2);
	*(array2 + 0) = var1;
	*(array2 + 1) = var2;

	// Both results are same (address of struct var1 pointing to)
	printf("%p\n", *(array2 + 0));
	printf("%p\n", var1);

	printf("%d\n", (*(array2 + 0))->num1); // 20
	printf("%d\n", (*(array2 + 1))->num1); // 30, all working as expected, now time for the ultimate test
	printf("\n");


	// To immitate as nodes of a linked list
	struct DataNext* var3 = (struct DataNext*)malloc(sizeof(struct DataNext));
	var3->data = 100;
	var3->next = NULL;
	struct DataNext* var4 = (struct DataNext*)malloc(sizeof(struct DataNext));
	var4->data = 200;
	var4->next = var3;
	printf("%d\n", var3->data);
	printf("%p\n", var3->next);
	printf("%d\n", var4->data);
	printf("%d\n", var4->next->data);
	printf("\n");

	// Wrapping up var3 and var4 in an dynamically created array
	struct DataNext** array3 = (struct DataNext**)malloc(sizeof(struct DataNext*)*2);
	*(array3 + 0) = var3;
	*(array3 + 1) = var4;

	// Both results are same (address of struct var3 is pointing to)
	printf("%p\n", *(array3 + 0));
	printf("%p\n", var3);

	printf("%d\n", (*(array3 + 0))->data); // 100
	printf("%d\n", (*(array3 + 1))->data); // 200, working as expected
	printf("%ld\n", sizeof(struct DataNext)); // 16, sizeof(struct DataNext*) + sizeof(int) + 4 padding characters


	return 0;
}