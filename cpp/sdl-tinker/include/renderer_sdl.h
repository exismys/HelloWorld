#pragma once

#include <SDL2/SDL.h>
#include "mathematics.h"
#include "objects.h"
#include <string>
#include <SDL2/SDL_ttf.h>

struct Renderer_SDL {
    SDL_Renderer* renderer;
    TTF_Font* font;
    int width;
    int height;
};

void draw_particle_sdl(Renderer_SDL& renderer, Particle& particle);
void draw_circle_sdl(Renderer_SDL& renderer, Vec2 pos, float radius); 
void draw_text_sdl(Renderer_SDL& renderer, const std::string& text, Vec2 pos);
IVec2 world_to_screen(const Renderer_SDL& renderer, const Vec2 point);
 