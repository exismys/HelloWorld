#include "raylib.h"
#include "visualization.h"
#include "coordinate.h"
#include <vector>

struct Particle {
  Vector2 position;
  Vector2 velocity;
  float radius;
  float mass;
};

void updatePhysics(std::vector<Particle> &particles, float dt) {
  for (Particle& p : particles) {
    p.position.x += p.velocity.x * dt;
    p.position.y += p.velocity.y * dt;
  }
}

int main(void) {
  // Window configuration
  const int screenWidth = 1200;
  const int screenHeight = 800;

  InitWindow(screenWidth, screenHeight, "Canvas of Emergence - v0");
  SetTargetFPS(60);

  std::vector<Particle> particles;
  particles.push_back({{2, 2}, {2, 2}, 10, 1});
  
  Arrow arrow = {{1, 1}, {3, 3}};

  Cartesian coords(screenWidth, screenHeight);

  // Game loop
  while (!WindowShouldClose()) {
    float dt = GetFrameTime();
    updatePhysics(particles, dt);
    BeginDrawing();
    ClearBackground(BLACK);
    for (Particle& p: particles) {
      DrawCircleV(coords.toScreen(p.position), p.radius, RED);
    }
    arrow.drawArrow(coords);
    coords.drawAxis();
    EndDrawing();
  }

  CloseWindow();
  return 0;
}

