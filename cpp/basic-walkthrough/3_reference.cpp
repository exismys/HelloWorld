#include <iostream>
using namespace std;

int main() {
	int a = 5, b = 10;

	int &ref = a;
	cout << "ref: " << ref << " a: " << a << endl;
	ref = b;

	cout << "ref: " << ref << " a: " << a << endl;
	
	const int c = 100;

	// int &ref2 = c; Error

	const int &ref2 = c; // OK

	// ref2++; Error: read only reference
	return 0;
}