#include <iostream>
#include <string>
using namespace std;

int main() {
	string str = "110";
	int num = stoi(str);
	cout << "num/10: " << num/10 << endl;
	string str2 = to_string(num/10);
	cout << "str2: " + str2 << endl;
}