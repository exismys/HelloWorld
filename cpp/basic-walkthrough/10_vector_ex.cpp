#include <iostream>
#include <vector>
using namespace std;

int main() {
	vector<int> vint;
	vector<int> sum;
	int temp;
	while (cin >> temp) {
		vint.push_back(temp);
	}
	vector<int>::size_type j = vint.size() - 1;
	for (decltype(vint.size()) index = 0; index <= j; index++) {
		sum.push_back(vint[index] + vint[j]);
		j--;
	}
	for (auto i : sum) {
		cout << i << endl;
	}
}