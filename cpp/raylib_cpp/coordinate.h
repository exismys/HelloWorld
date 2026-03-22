#ifndef CARTESIAN_H
#define CARTESIAN_H

#include "raylib.h"
#include "raymath.h"

struct Cartesian {

    Vector2 origin;
    float scale;
    float screenWidth;
    float screenHeight;

    Cartesian(float screenWidth, float screenHeight, float s = 50.0f);

    Vector2 toScreen(Vector2 worldPos);

    void drawAxis();
};

#endif