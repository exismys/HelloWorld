#include <iostream>
#include "special_number.hpp"

SpecialNumber::SpecialNumber(int value) : value(value) {}

// Overload the + operator
SpecialNumber SpecialNumber::operator+(const SpecialNumber& other) {
    return SpecialNumber(this->value - other.value);
}