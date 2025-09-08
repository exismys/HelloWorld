#include <iostream>
#include <string>
using namespace std;

int main() {
	string str("Hello World");
	for (decltype(str.size()) index = 0; index != str.size() && !isspace(str[index]); ++index) {
		str[index] = toupper(str[index]);
	}
	cout << str << endl;
}