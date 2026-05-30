use std::{
    num::NonZeroU32, rc::Rc, time::Instant
};

use softbuffer::{Context, Surface};

use winit::{
    application::ApplicationHandler,
    event::WindowEvent,
    event_loop::{ActiveEventLoop, ControlFlow, EventLoop},
    window::{Window, WindowId},
};

use rand::RngExt;

// user defined modules
mod particle;
mod renderer;
mod math;
mod text;
use crate::text::{load_font, render_text};
use crate::particle::Particle;
use crate::renderer::draw_particles;
use crate::math::Vec2;

// Global constants
const BG_COLOR: u32 = 0xFF_292929;
const FRAME_RATE: i32 = 60;
const FIXED_DT: f32 = 1.0 / FRAME_RATE as f32;

struct App {
    window: Option<Rc<Window>>,
    surface: Option<Surface<Rc<Window>, Rc<Window>>>,
    particles: Vec<Particle>,
    font: fontdue::Font,
    last_frame: Instant,
    fps_timer: f32,
    frame_count: i32,
    fps_string: String,
    accumulator: f32,
}

impl App {
    fn new() -> Self {
        let mut particles: Vec<Particle> = Vec::new();
        for _i in 0..10 {
            let mut rng = rand::rng();
            let pos: Vec2 = Vec2 {
                x: rng.random_range(2..800 - 12) as f32,
                y: rng.random_range(2..600 - 12) as f32,
            };
            let vel: Vec2 = Vec2 {
                x: rng.random_range(50.0..100.0),
                y: rng.random_range(50.0..100.0),
            };
            let particle = Particle::new(
                pos,
                vel,
                1.0,
                20.0,
                0xFFFFFF,
            );
            particles.push(particle);
        }

        Self {
            window: None,
            surface: None,
            particles: particles,
            font: load_font(),
            last_frame: Instant::now(),
            accumulator: 0.0,
            fps_timer: 0.0,
            fps_string: format!("FPS: {}", 0),
            frame_count: 0,
        }
    }

    fn update(&mut self, dt: f32, width: f32, height: f32) {
        for particle in &mut self.particles {
            particle.update(dt, width, height);
        }

        // Collision detection: O(n^2)
        for i in 0..self.particles.len()-1 {
            for j in i + 1..self.particles.len() {
                let dx = self.particles[i].position.x - self.particles[j].position.x;
                let dy = self.particles[i].position.y - self.particles[j].position.y;
                let radius_sum = self.particles[i].radius + self.particles[j].radius;
                if dx * dx + dy * dy < radius_sum * radius_sum {
                    let (left, right) = self.particles.split_at_mut(j);
                    std::mem::swap(&mut left[i].velocity, &mut right[0].velocity);
                }
            }
        }
    }
}

impl ApplicationHandler for App {
    fn resumed(&mut self, event_loop: &ActiveEventLoop) {
        let attrs = Window::default_attributes()
            .with_title("Belight")
            .with_inner_size(winit::dpi::LogicalSize::new(800u32, 600u32));

        let window = Rc::new(
            event_loop
                .create_window(attrs)
                .expect("failed to create window"),
        );

        let context = Context::new(window.clone()).expect("failed to create window");
        let surface = Surface::new(&context, window.clone()).expect("falied to create surface");

        self.window = Some(window);
        self.surface = Some(surface);
    }

    fn about_to_wait(&mut self, _event_loop: &ActiveEventLoop) {
        if let Some(window) = &self.window {
            window.request_redraw();
        }
    }

    fn window_event(
        &mut self,
        event_loop: &ActiveEventLoop,
        _window_id: WindowId,
        event: WindowEvent,
    ) {
        match event {
            WindowEvent::CloseRequested => {
                event_loop.exit();
            }

            WindowEvent::KeyboardInput {
                event: key_event, ..
            } => {
                use winit::keyboard::{Key, NamedKey};
                if key_event.logical_key == Key::Named(NamedKey::Escape) {
                    event_loop.exit();
                }
            }

            WindowEvent::RedrawRequested => {
                // Get window attributes
                let Some(window) = self.window.as_ref()
                else {
                    return
                };

                let size = window.inner_size();
                let width = size.width;
                let height = size.height;
                if width == 0 || height == 0 {
                    return;
                }

                // Update simulation
                // Fixed timestamp accumulation loop
                let now = Instant::now();
                let frame_time = now.duration_since(self.last_frame).as_secs_f32();
                self.fps_timer += frame_time; 
                self.frame_count += 1;
                self.accumulator += frame_time;
                while self.accumulator >= FIXED_DT {
                    self.update(FIXED_DT, width as f32, height as f32);
                    self.accumulator -= FIXED_DT;
                }
                self.last_frame = now;
                if self.fps_timer > 0.5 {
                    let average_fps = self.frame_count as f32 / self.fps_timer;
                    self.fps_string = format!("FPS: {}", average_fps as i32);
                    self.fps_timer = 0.0;
                    self.frame_count = 0;
                }

                // Surface and framebuffer
                let Some(surface) = self.surface.as_mut()
                else {
                    return;
                };

                surface
                    .resize(
                        NonZeroU32::new(width).unwrap(),
                        NonZeroU32::new(height).unwrap(),
                    )
                    .expect("failed to resize surface");
                let mut buffer = surface.buffer_mut().expect("failed to create buffer");

                // Clear screen
                buffer.fill(BG_COLOR);

                // Update framebuffer for rendering
                
                draw_particles(&mut buffer, width as usize, height as usize, &self.particles);
                render_text(
                    &mut buffer,
                    width as usize,
                    &Vec2 {
                        x: 5.0,
                        y: 5.0,
                    },
                    &self.fps_string,
                    &self.font,
                    32.0,
                );

                // Render
                buffer.present().expect("failed to present");
            }
            _ => {}
        }
    }
}

fn main() {
    let event_loop = EventLoop::new().expect("failed to create event loop");
    event_loop.set_control_flow(ControlFlow::Poll);

    let mut app = App::new();
    event_loop.run_app(&mut app).expect("event loop error");
}
