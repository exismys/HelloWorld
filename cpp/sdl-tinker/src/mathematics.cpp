#include "mathematics.h"

Vec2 operator+(const Vec2& a, const Vec2& b) {
    return Vec2{
        a.x + b.x,
        a.y + b.y
    };
}

Vec2& operator+=(Vec2& a, const Vec2& b) {
    a.x += b.x;
    a.y += b.y;
    return a;
}

Vec2 operator-(const Vec2& a, const Vec2& b) {
    return Vec2{
        a.x - b.x,
        a.y - b.y
    };
}

Vec2& operator-=(Vec2& a, const Vec2& b) {
    a.x -= b.x;
    a.y -= b.y;
    return a;
}

Vec2 operator*(const Vec2& a, float b) {
    return Vec2{
        a.x * b,
        a.y * b,
    };
}

Vec2& operator*=(Vec2& a, float b) {
    a.x *= b;
    a.y *= b;
    return a;
};

Vec2 operator/(const Vec2& a, float b) {
    return Vec2 {
        a.x / b,
        a.y / b
    };
}

Vec2& operator/=(Vec2& a, float b) {
    a.x /= b;
    a.y /= b;
    return a;
}

IVec2 operator+(const IVec2& a, const IVec2& b) {
    return IVec2{
        a.x + b.x,
        a.y + b.y
    };
}

IVec2 operator-(const IVec2& a, const IVec2& b) {
    return IVec2{
        a.x - b.x,
        a.y - b.y
    };
}

Vec2 operator*(const IVec2& a, float b) {
    return Vec2{
        a.x * b,
        a.y * b,
    };
}

