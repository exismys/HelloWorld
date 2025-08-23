#ifndef MATHLIB_H
#define MATHLIB_H

// Expose functions to C++ correctly
#ifdef __cplusplus
extern "C" {
#endif

int add(int a, int b);
int mul(int a, int b);

#ifdef __cplusplus
}
#endif

#endif // MATHLIB_H
