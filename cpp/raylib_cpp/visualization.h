#ifndef ARROW_H
#define ARROW_H

#include "raylib.h"
#include "raymath.h"
#include "coordinate.h"

struct Arrow {
    Vector2 pos1;
    Vector2 pos2;

    void drawArrow(const Cartesian& coords);
};

#endif