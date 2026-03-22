#include "raylib.h"
#include "raymath.h"
#include "coordinate.h"

struct Arrow {
  Vector2 pos1;
  Vector2 pos2;

  void drawArrow(Cartesian coords) {
    DrawLineV(coords.toScreen(pos1), coords.toScreen(pos2), LIGHTGRAY);

    Vector2 tip = coords.toScreen(pos2);
    Vector2 direction = Vector2Normalize(Vector2Subtract(coords.toScreen(pos2), coords.toScreen(pos1)));
    Vector2 perpendicular = {-direction.y, direction.x};

    float arrowHeadLength = 20.0f;
    float arrowHeadWidth = 10.0f;

    Vector2 left = Vector2Add(Vector2Subtract(tip, Vector2Scale(direction, arrowHeadLength)), Vector2Scale(perpendicular, arrowHeadWidth / 2.0f));
    Vector2 right = Vector2Add(Vector2Subtract(tip, Vector2Scale(direction, arrowHeadLength)), Vector2Scale(perpendicular, -arrowHeadWidth / 2.0f));

    DrawTriangle(left, tip, right, YELLOW);
  }
};
