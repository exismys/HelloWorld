#pragma once

#include <vector>
#include <cstdint>
#include "mathematics.h"

struct Renderer {
    int width;
    int height;
    std::vector<uint32_t> framebuffer;
};

void draw_point(Renderer& renderer, Vec2 world_point, uint32_t color);

void put_pixel(Renderer& renderer, IVec2 screen_point, uint32_t color);

IVec2 world_to_screen(const Renderer& Renderer, const Vec2 point);