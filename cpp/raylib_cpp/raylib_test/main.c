#include "raylib.h"

int main(void)
{
    InitWindow(800, 600, "raylib sanity check");
    SetTargetFPS(60);

    while (!WindowShouldClose())
    {
        BeginDrawing();
        ClearBackground(BLACK);
        DrawText("raylib is alive", 300, 280, 20, WHITE);
        EndDrawing();
    }

    CloseWindow();
    return 0;
}

