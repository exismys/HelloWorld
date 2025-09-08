#include <iostream>
#include <string>
using namespace std;

int main() {
	string str("hello world");
	for (auto it = str.begin(); it != str.end() && !isspace(*it); ++it) {
		*it = toupper(*it);
	}
	cout << str << endl;
}