#include <SDL2/SDL.h>
#include <SDL2/SDL_ttf.h>
#include <iostream>
#include <cstdint>
#include <vector>
#include <chrono>
#include "renderer.h"
#include "renderer_sdl.h"
#include "mathematics.h"
#include "ui.h"

enum class RenderMode {
    Software,
    SDL
};

RenderMode mode = RenderMode::SDL;

constexpr uint32_t WIDTH = 1920;
constexpr uint32_t HEIGHT = 1080;

int main() {
    if (SDL_Init(SDL_INIT_VIDEO) != 0) {
        std::cerr << "SDL_Init failed: " << SDL_GetError() << '\n';
        return 1;
    }

    SDL_Window* window = SDL_CreateWindow(
        "BeLight",
        SDL_WINDOWPOS_CENTERED,
        SDL_WINDOWPOS_CENTERED,
        WIDTH,
        HEIGHT,
        SDL_WINDOW_RESIZABLE
    );
    if (window == nullptr) {
        std::cerr << "SDL_CreateWindow failed: " << SDL_GetError() << '\n';
        SDL_Quit();
        return 1;
    }

    SDL_Renderer* sdl_renderer = SDL_CreateRenderer(
        window,
        -1,
        SDL_RENDERER_ACCELERATED
    );
    if (sdl_renderer == nullptr) {
        std::cerr << SDL_GetError() << '\n';
        SDL_DestroyWindow(window);
        SDL_Quit();
        return 1;
    }

    SDL_Texture* texture = SDL_CreateTexture(
        sdl_renderer,
        SDL_PIXELFORMAT_ARGB8888,
        SDL_TEXTUREACCESS_STREAMING,
        WIDTH,
        HEIGHT
    );
    if (texture == nullptr) {
        std::cerr << SDL_GetError() << '\n';
        SDL_DestroyRenderer(sdl_renderer);
        SDL_DestroyWindow(window);
        SDL_Quit();
        return 1;
    }

    // custom struct defined in renderer.h for software mode 
    Renderer renderer{
        WIDTH,
        HEIGHT,
        std::vector<uint32_t>(WIDTH * HEIGHT)
    };

    // custom struct defined in renderer_sdl.h for sdl mode
    if (TTF_Init() == -1) {
        std::cerr << TTF_GetError() << '\n';
        return 1;
    }
    TTF_Font* font = TTF_OpenFont("assets/fonts/UbuntuMono[wght].ttf", 20);
    if (!font) {
        std::cerr << TTF_GetError << '\n';
    }
    Renderer_SDL renderer_sdl = Renderer_SDL{
        sdl_renderer,
        font,
        WIDTH,
        HEIGHT
    };

    // Create buttons
    Button button{
        Vec2{
            -float(WIDTH/2) + 20,
            -float(HEIGHT/2) + 60
        },
        Vec2{
            80,
            40
        },
        "Button" 
    };

    // Initialize particles
    std::vector<Particle> particles;
    for (int i = 0; i < 4; i++) {
        particles.push_back(Particle{ Vec2{-200.0f, -200.0f + i * 100}, Vec2{0, 0}, Vec2{0, 0}, float(i + 1), float(i + 1) * 10, 0xFFFFFFFF});
    }

    auto start_time = std::chrono::steady_clock::now();
    double accumulator = 0.0;
    constexpr double dt = 1.0 / 60.0;

    bool running = true;
    SDL_Event event;
    while (running) {
        // Process events
        while (SDL_PollEvent(&event)) {
            if (event.type == SDL_QUIT) {
                running = false;
            }

            // Window resize event
            if (event.type == SDL_WINDOWEVENT) {
                if (event.window.event == SDL_WINDOWEVENT_SIZE_CHANGED) {
                    int width = event.window.data1;
                    int height = event.window.data2;
                    renderer.width = width;
                    renderer.height = height;
                    renderer.framebuffer.resize(width * height);
                    SDL_DestroyTexture(texture);
                    texture = SDL_CreateTexture(
                        sdl_renderer,
                        SDL_PIXELFORMAT_ARGB8888,
                        SDL_TEXTUREACCESS_STREAMING,
                        width,
                        height
                    );
                }
            }

            // Key events
            if (event.type == SDL_KEYDOWN) {
                if (event.key.keysym.sym == SDLK_ESCAPE) {
                    running = false;
                }

                if (event.key.keysym.sym == SDLK_1) {
                    mode = RenderMode::Software;
                }
                if (event.key.keysym.sym == SDLK_2) {
                    mode = RenderMode::SDL;
                }
            }
        }

        auto end_time = std::chrono::steady_clock::now();
        double frame_time = std::chrono::duration<double>(end_time - start_time).count();
        start_time = end_time;

        // Fixed timestep integration
        accumulator += frame_time;
        while (accumulator >= dt) {
            if (mode == RenderMode::Software) {

            } else {
                for (int i = 0; i < particles.size(); i++) {
                    update_particle(particles[i], dt);
                    apply_force(particles[i], Vec2 {1, 0.0});
                }
            }
            accumulator -= dt;
        }

        if (mode == RenderMode::Software) {
            // Update framebuffer
            std::fill(renderer.framebuffer.begin(), renderer.framebuffer.end(), 0xFF202020);

            draw_point(renderer, Vec2 {static_cast<float>(renderer.width / 4), static_cast<float>(renderer.height / 4)}, 0xFFFFFFFF);

            SDL_UpdateTexture(
                texture,
                nullptr,
                renderer.framebuffer.data(),
                renderer.width * sizeof(uint32_t)
            );

            SDL_RenderCopy(sdl_renderer, texture, nullptr, nullptr);
        } else {
            SDL_SetRenderDrawColor(sdl_renderer, 32, 32, 32, 255);
            SDL_RenderClear(sdl_renderer);

            draw_button(renderer_sdl, button);
            if (button_clicked(renderer_sdl, button)) {
                std::cout << "clicked button " << '\n';
            }

            SDL_SetRenderDrawColor(sdl_renderer, 255, 255, 255, 255);
            // SDL_RenderDrawLine(sdl_renderer, 100, 100, 700, 500);

            
            
            // draw_text_sdl(renderer_sdl, "Hello", Vec2{50, 50});
            for (int i = 0; i < particles.size(); i++) {
                draw_particle_sdl(renderer_sdl, particles[i]);   
            }
        }

        SDL_RenderPresent(sdl_renderer);
    }
    TTF_CloseFont(font);

    SDL_DestroyTexture(texture);
    SDL_DestroyRenderer(sdl_renderer);
    SDL_DestroyWindow(window);

    TTF_Quit();
    SDL_Quit();

    return 0;
}