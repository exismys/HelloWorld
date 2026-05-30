use crate::particle::Particle;

pub fn draw_particles(
    framebuffer: &mut [u32],
    width: usize,
    height: usize,
    particles: &[Particle]
) {

    for particle in particles {
        let cx = particle.position.x as i32;
        let cy = particle.position.y as i32;
        let r = particle.radius as i32;

        for y in (cy - r)..=(cy + r) {
            for x in (cx - r)..=(cx + r) {
                let dx = x - cx;
                let dy = y - cy;

                if dx * dx + dy * dy <= r * r {
                    if x >= 0 && x < width as i32 && y >= 0 && y < height as i32 {
                        let index = y as usize * width + x as usize;
                        framebuffer[index] = particle.color;
                    }
                }
            }
        }
    }
}

// pub fn world_to_screen(pos: Vec2) -> (i32, i32) {
//
//
// }
