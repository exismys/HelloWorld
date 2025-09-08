#include <iostream>

int main() {
	int sum = 0, value = 0;
	// read until end-of-file
	while (std::cin >> value) {
		sum += value;
	}
	std::cout << "Sum is: " << sum << std::endl;
	return 0;
}