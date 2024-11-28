#include <stdio.h>
#include <stdlib.h> // For malloc

int main(){
	// Declaring an array of size 10 of int type
	int array[10];

	// Printing values in array without initializing
	// Prints random values
	printf("printing the values in array with initializing...\n");
	for (int i = 0; i < 10; i++){
		printf("%d\n", array[i]);
	}

	// Creating array dynamically of size 10
	int* array2 = (int*)malloc(sizeof(int)*10);

	// Wow, in this case initial values are set to 0
	printf("printing the values in array2 without initializing...\n");
	for (int i = 0; i < 10; i++){
		printf("%d\n", array2[i]);
	}

	// Taking input from user
	printf("Enter the values: \n");
	for (int i = 0; i < 10; i++){
		printf("Enter the value at index %d: ", i);
		//scanf("%d", &array2[i]);

		// Another way of intializing
		scanf("%d", array2+i); // works perfectly
	}

	// Printing the values in array
	for (int i = 0; i < 10; i++){
		printf("%d\n", array2[i]);
	}
	return 0;
}