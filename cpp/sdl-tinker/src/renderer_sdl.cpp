#include "SDL2/SDL.h"
#include "renderer_sdl.h"
#include "renderer.h"
#include "mathematics.h"
#include "objects.h"

void draw_particle_sdl(Renderer_SDL& renderer, Particle& particle) {
    draw_circle_sdl(renderer, particle.pos, particle.radius);
    draw_text_sdl(renderer, std::to_string(static_cast<int>(particle.mass)), particle.pos);
}

void draw_circle_sdl(Renderer_SDL& renderer, Vec2 pos, float radius) {
    IVec2 screen_pos = world_to_screen(renderer, pos);
    int cx = screen_pos.x;
    int cy = screen_pos.y;
    int r = static_cast<int>(radius);
    for (int y = cy - r; y <= cy + r; y++) {
        for (int x = cx - r; x <= cx + r; x++) {
            int dx = cx - x;
            int dy = cy - y;
            if (dx * dx + dy * dy <= r * r) {
                SDL_RenderDrawPoint(renderer.renderer, x, y);
            }
        }
    }
}

IVec2 world_to_screen(const Renderer_SDL& renderer, const Vec2 point) {
    return IVec2{
        static_cast<int>(renderer.width / 2 + point.x),
        static_cast<int>(renderer.height / 2 - point.y)
    };
}

void draw_text_sdl(Renderer_SDL& renderer, const std::string& text, Vec2 pos) {
    IVec2 screen_pos = world_to_screen(renderer, pos);
    SDL_Color color{32, 32, 32, 0};
    SDL_Surface* surface = TTF_RenderText_Blended(renderer.font, text.c_str(), color);
    SDL_Texture* texture = SDL_CreateTextureFromSurface(renderer.renderer, surface);
    SDL_Rect dst{
        screen_pos.x - surface->w / 2,
        screen_pos.y - surface->h / 2,
        surface->w,
        surface->h
    };

    SDL_RenderCopy(renderer.renderer, texture, nullptr, &dst);
    
    SDL_DestroyTexture(texture);
    SDL_FreeSurface(surface);
}