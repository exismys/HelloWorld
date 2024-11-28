#include <iostream>
using namespace std;

int main() {
	string str("Ritesh");
	for (string::size_type i = 0; i < str.size(); i++) {
		cout << str[i] << endl;
	}
	return 0;
}