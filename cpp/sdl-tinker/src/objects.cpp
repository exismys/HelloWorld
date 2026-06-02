#include "objects.h"

void update_particle(Particle& particle, float dt) {
    particle.vel += particle.acc * dt;
    particle.pos += particle.vel * dt;
}

void apply_force(Particle& particle, Vec2 force) {
    particle.acc += force / particle.mass;
}