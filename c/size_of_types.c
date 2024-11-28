#include <stdio.h>

int main(){
	printf("Size of char: %ld\n", sizeof(char)); // 1
	printf("Size of int: %ld\n", sizeof(int)); // 4
	printf("Size of float: %ld\n", sizeof(float)); // 4
	printf("Size of double: %ld\n", sizeof(double)); // 8
	printf("Size of long int: %ld\n", sizeof(long int)); // 8
	printf("Size of long: %ld\n", sizeof(long)); // 8
	printf("Size of long long: %ld\n", sizeof(long long)); // 8
	return 0;
}