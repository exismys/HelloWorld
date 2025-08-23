#include <iostream>
#include <vector>
#include <string>
#include "my_math.hpp"
#include "mathlib.h"

using namespace std;

int main() {
  vector<string> names{"Ritesh", "Ada", "Bjarne"};

  for (const auto& s : names) {
    cout << "Hello, " << s << "!\n";
  }

  cout << "2 + 3 = " << mymath::add(2, 3) << "\n";
  cout << "2 * 3 = " << mymath::mul(2, 3) << "\n";

  cout << "This calculation from mathlib.c" << "\n";

  cout << "2 + 3 = " << add(2, 3) << "\n";
  cout << "2 * 3 = " << mul(2, 3) << "\n";

  return 0;
}
