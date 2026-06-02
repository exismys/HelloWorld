#include "renderer.h"
#include "mathematics.h"
#include <iostream>

void draw_point(Renderer& renderer, Vec2 world_point, uint32_t color) {
    IVec2 screen_point = world_to_screen(renderer, world_point);
    put_pixel(renderer, screen_point, color);

}

void put_pixel(Renderer& renderer, IVec2 screen_point, uint32_t color) {
    if (
        screen_point.x >= renderer.width || screen_point.x <= 0 ||
        screen_point.y >= renderer.height || screen_point.y <= 0
    ) {
        std::cerr << "Error: Invalid screen point" << screen_point.x << ", " << screen_point.y << '\n';
        exit(1);
    }
    renderer.framebuffer[screen_point.y * renderer.width + screen_point.x] = color;
}

IVec2 world_to_screen(const Renderer& renderer, const Vec2 point) {
    return IVec2{
        static_cast<int>(renderer.width / 2 + point.x),
        static_cast<int>(renderer.height / 2 - point.y)
    };
}