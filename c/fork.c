#include <stdio.h>
#include <unistd.h>

int main(){
	// Hello World will be printed four times (2^n)
	/*
	fork();
	fork();
	printf("Hello World\n");
	*/

	/*
	fork() returns 0 in the child process and positive integer in the parent process

	int id = fork();
	if (id == 0){
		printf("Hello from the child\n");
	}
	else{
		printf("Hello from the parent\n");
	}
	*/

	/*
	Hello World will be printed two times (no of fork calls in this case)

	if (fork() || fork()){
		printf("Hello World\n");
	}
	*/

	if (fork() && fork() && fork()){
		printf("Hello World\n"); // Hello World will be printed 1 time no matter how many fork calls are made
	}
	return 0;
}