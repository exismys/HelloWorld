#pragma once

#include "mathematics.h"
#include <cstdint>

struct Particle {
    Vec2 pos;
    Vec2 vel;
    Vec2 acc;
    float mass;
    float radius;
    uint32_t color; 
};

void update_particle(Particle& particle, float dt);
void apply_force(Particle& particle, Vec2 force); 