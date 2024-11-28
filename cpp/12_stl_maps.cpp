#include <iostream>
#include <map>
using namespace std;

int main() {
	map<int, int> myMap;
	myMap[25] = 5;
	myMap[24] = 2;
	myMap[26] = 2;
	myMap[18] = 3;
	myMap[18] = 2; // Overrides the previous values

	map<int, int>::iterator mIter;
	for (mIter = myMap.begin(); mIter != myMap.end(); mIter++) {
		cout << (*mIter).first << ": " << (*mIter).second << endl;
	}

	cout << "24 is divisible by " << myMap[24] << endl;
	return 0;
}