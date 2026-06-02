#pragma once

struct Vec2 {
    float x;
    float y;
};

struct IVec2 {
    int x;
    int y;
};

// Overload operators
Vec2 operator+(const Vec2& a, const Vec2& b);
Vec2& operator+=(Vec2& a, const Vec2& b);
Vec2 operator-(const Vec2& a, const Vec2& b);
Vec2& operator-=(Vec2& a, const Vec2& b);
Vec2 operator*(const Vec2& a, float b);
Vec2& operator*=(Vec2& a, float b);
Vec2 operator/(const Vec2& a, float b); 
Vec2& operator/=(Vec2& a, float b);

IVec2 operator+(const IVec2& a, const IVec2& b);
IVec2 operator-(const IVec2& a, const IVec2& b);
Vec2 operator*(const IVec2& a, float b);
