#include <stdio.h>

struct CharInt{
	char alpha;
	int num;
};

typedef struct{
	int num1, num2, num3, num4;
} FourInts;

typedef struct OneInt{
	int num1;
} OneInt;

struct TwoInts{
	int num1, num2;
};
typedef struct TwoInts TwoInts;

int main(){
	// For CharInt
	struct CharInt variable1;
	variable1.alpha = 'A';
	variable1.num = 45;
	printf("%c %ld\n", variable1.alpha, sizeof(variable1.alpha)); // A 1
	printf("%d %ld\n", variable1.num, sizeof(variable1.num)); // 45 4
	// printf("%ld\b", sizeof(struct)); not possible
	// printf("%ld\n", sizeof(CharInt)); // not possible: undeclared identifier
	printf("%ld\n", sizeof(struct CharInt)); // 8
	printf("%ld\n", sizeof(variable1)); // 8, sizeof(variable1.alpha) + sizeof(variable1.num) + 3 padding characters
	printf("\n");

	// For FourInts
	FourInts variable2;
	variable2.num1 = 10, variable2.num2 = 20, variable2.num3 = 30, variable2.num4 = 40;
	printf("%d %ld\n", variable2.num2, sizeof(variable2.num2)); // 20 4
	printf("%ld\n", sizeof(FourInts)); // 16
	// printf("%ld\n", sizeof(struct FourInts)); // not possible: incomplete type
	printf("\n");

	// For OneInt
	printf("%ld\n", sizeof(struct OneInt)); // 4

	// For TwoInts
	printf("%ld\n", sizeof(TwoInts)); // works perfectly fine
	printf("\n");

	// Pointers to structures
	struct CharInt* p_CharInt1 = &variable1;
	printf("%d\n", p_CharInt1->num); // 45
	printf("%c\n", p_CharInt1->alpha); // A
	printf("%ld\n", sizeof(p_CharInt1)); // 8
	//char* p = &variable1; // Incompatible types

	// Pointers to pointers to structures
	struct CharInt** pp_CharInt1 = &p_CharInt1;
	printf("%d %d\n", (*pp_CharInt1)->num, (**pp_CharInt1).num); // Bracket as . and -> have higher precedence, output: 45 45

	return 0;
}