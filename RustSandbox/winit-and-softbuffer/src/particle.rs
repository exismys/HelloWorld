use crate::math::Vec2;

pub struct Particle {
    pub position: Vec2,
    pub velocity: Vec2,
    pub mass: f32,
    pub radius: f32,
    pub color: u32,
}

impl Particle {
    pub fn new(position: Vec2, velocity: Vec2, mass: f32, radius: f32, color: u32) -> Self {
        Self {
            position,
            velocity,
            mass,
            radius,
            color,
        }
    }

    pub fn update(&mut self, dt: f32, width: f32, height: f32) {
        self.position.x += self.velocity.x * dt;
        self.position.y += self.velocity.y * dt;

        // X-axis boundary
        if self.position.x - self.radius < 0.0 {
            self.position.x = self.radius;
            self.velocity.x *= -1.0;
            self.color = 0xFF0000;
        } else if self.position.x + self.radius > width {
            self.position.x = width - self.radius;
            self.velocity.x *= -1.0;
            self.color = 0xFFFF00;
        }

        // Y-axis boundary
        if self.position.y - self.radius < 0.0 {
            self.position.y = self.radius;
            self.velocity.y *= -1.0;
            self.color = 0x0000FF;
        } else if self.position.y + self.radius > height {
            self.position.y = height - self.radius;
            self.velocity.y *= -1.0;
            self.color = 0xFF00FF;
        }
    }
}
