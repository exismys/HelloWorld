#include <iostream>
#include "special_number.hpp"

int main() {
    SpecialNumber num1 = 10;
    SpecialNumber num2 = 5;
    SpecialNumber sum = num1 + num2;
    std::cout << "Sum: " << sum.value << std::endl;
    return 0;
}