#pragma once

#include "mathematics.h"
#include <string>
#include <SDL2/SDL.h>
#include "renderer_sdl.h"
#include <iostream>

struct Button {
    Vec2 pos;
    Vec2 size;
    std::string label;
};

void draw_button(Renderer_SDL& renderer, const Button& button) {
    IVec2 pos_screen = world_to_screen(renderer, button.pos);
    SDL_Rect rect{
        pos_screen.x,
        pos_screen.y,
        static_cast<int>(button.size.x),
        static_cast<int>(button.size.y)
    };
    SDL_SetRenderDrawColor(renderer.renderer, 150, 150, 150, 255);
    SDL_RenderFillRect(renderer.renderer, &rect);
    draw_text_sdl(renderer, button.label, Vec2{button.pos.x + button.size.x/2, button.pos.y - button.size.y/2});
}

bool button_hovered(Renderer_SDL& renderer, const Button& button, const IVec2& mouse_pos) {
    IVec2 pos_screen = world_to_screen(renderer, button.pos);

    SDL_Rect rect{
        pos_screen.x,
        pos_screen.y,
        static_cast<int>(button.size.x),
        static_cast<int>(button.size.y)
    };

    SDL_Point point{mouse_pos.x, mouse_pos.y};

    return SDL_PointInRect(&point, &rect);
}

bool button_clicked(Renderer_SDL& renderer, const Button& button) {
    IVec2 mouse_pos;
    int buttons = SDL_GetMouseState(&mouse_pos.x, &mouse_pos.y);

    if (button_hovered(renderer, button, mouse_pos)) {
        return buttons & SDL_BUTTON(SDL_BUTTON_LEFT);
    }
    return false;
}