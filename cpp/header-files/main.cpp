#include <iostream>
#include "rectangle.h"
using namespace std;

int main() {
	Rectangle rect(25, 25);
	cout << rect.getLength() << endl;
	cout << rect.getWidth() << endl;
}