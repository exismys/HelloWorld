#ifndef SPECIAL_NUMBER_H
#define SPECIAL_NUMBER_H

class SpecialNumber {
public:
    int value;
    SpecialNumber(int value);
    SpecialNumber operator+(const SpecialNumber& other);
};

#endif