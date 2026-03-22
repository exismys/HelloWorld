#include "raylib.h"
#include "raymath.h"
#include "coordinate.h"

Cartesian::Cartesian(float screenWidth, float screenHeight, float s = 50.0f) {
    this->origin = {screenWidth / 2.0f, screenHeight / 2.0f};
    this->scale = s;
    this->screenWidth = screenWidth;
    this->screenHeight = screenHeight;
}

Vector2 Cartesian::toScreen(Vector2 worldPos) {
    return {origin.x + worldPos.x * scale, origin.y - worldPos.y * scale};
}

void Cartesian::drawAxis() {
    DrawLineV({0, origin.y}, {screenWidth, origin.y}, DARKGRAY);
    DrawLineV({origin.x, 0}, {origin.x, screenHeight}, DARKGRAY);

    for (int i = -12; i <= 12; i++) {
        if (i == 0) continue;
        float x = origin.x + i * scale;
        float y = origin.y + i * scale;
        DrawLineV({x, origin.y - 5}, {x, origin.y + 5}, DARKGRAY);
        DrawLineV({origin.x - 5, y}, {origin.x + 5, y}, DARKGRAY);
    }

    for (int i = -12; i <= 12; i++) {
        if (i == 0) continue;
        float x = origin.x + i * scale;
        float y = origin.y + i * scale;
        DrawText(TextFormat("%d", i), x, origin.y + 10, 10, DARKGRAY);
        DrawText(TextFormat("%d", -i), origin.x + 10, y, 10, DARKGRAY);
    }

    DrawCircleV(origin, 5, DARKGRAY);
}
