#include "simulation.h"


// Create simulation
void create_simulation(Simulation& simulation) {
    // Initialize particles
    std::vector<Particle> particles;
    for (int i = 0; i < 4; i++) {
        particles.push_back(Particle{ Vec2{-200.0f, -200.0f + i * 100}, Vec2{0, 0}, Vec2{0, 0}, float(i + 1), float(i + 1) * 10, 0xFFFFFFFF});
    }
}

void update_particle(Particle& particle, float dt) {
    particle.vel += particle.acc * dt;
    particle.pos += particle.vel * dt;
}

void apply_force(Particle& particle, Vec2 force) {
    particle.acc += force / particle.mass;
}