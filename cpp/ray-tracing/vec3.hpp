#ifndef VEC3_H
#define VEC3_H

#include <cmath>
#include <iostream>

class vec3 {
    public:
    double e[3];

    vec3() : e{0, 0, 0}{}

    vec3(double e0, double e1, double e2) : e{e0, e1, e2}{}

    double x() { return e[0]; }
    double y() { return e[1]; }
    double z() { return e[2]; }

    vec3 operator-() {
        return vec3(-e[0], -e[1], -e[2]);
    }

    // This is called when the object itself is constant
    double operator[](int i) const {
        return e[i];
    }

    double& operator[](int i) {
        return e[i];
    }

    vec3& operator+=(const vec3& v) {
        e[0] += v[0];
        e[1] += v[1];
        e[2] += v[2];
        return *this;
    }

    vec3& operator*=(double t) {
        e[0] *= t;
        e[1] *= t;
        e[2] *= t;
        return *this;
    }

    vec3& operator/=(double t) {
        return *this *= 1/t;
    }

    double length() const {
        return std::sqrt(length_squared());
    }

    double length_squared() const {
        return e[0]*e[0] + e[1]*e[1] + e[2]*e[2];
    }
};

using point3 = vec3;

#endif