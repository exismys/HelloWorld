#include <stdio.h>

int main(){
	int a = 10;
	if (1 || a++){
		printf("value of a: %d\n", a); // 10, second operand did not get executed
	}
	if (0 || a++){
		printf("value of a: %d\n", a); // 11, second operand did get executed
	}
	if (0 && a++){
		printf("value of a (inside if): %d\n", a);
	}
	else{
		printf("value of a (inside else): %d\n", a); // 11, second operand did not get executed
	}
	if (1 && a++){
		printf("value of a (inside if): %d\n", a); // 12, second operand did get executed
	}
	else{
		printf("value of a (inside else): %d\n", a);
	}
	return 0;
}