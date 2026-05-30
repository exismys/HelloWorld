use crate::math::Vec2;


pub fn load_font() -> fontdue::Font {
    let font = fontdue::Font::from_bytes(
        include_bytes!("../assets/UbuntuMono[wght].ttf") as &[u8],
        fontdue::FontSettings::default(),
    ).unwrap();
    return font;
}

pub fn render_char(framebuffer: &mut [u32], width: usize, position: &Vec2, character: char, font: &fontdue::Font, font_size: f32) -> f32 {

    let (metrics, bitmap) = font.rasterize(character, font_size);

    for y in 0..metrics.height {
        for x in 0..metrics.width {
            let v = bitmap[y * metrics.width + x];

            if v < 128 {
                continue;
            }

            let screen_x = position.x as usize + x;
            let screen_y = position.y as usize + y;

            framebuffer[screen_y * width + screen_x] =
                ((v as u32) << 16) |
                ((v as u32) << 8) |
                (v as u32);
        }
    }

    metrics.advance_width
}

pub fn render_text(framebuffer: &mut [u32], width: usize, position: &Vec2, text: &str, font: &fontdue::Font, font_size: f32) {
    let mut pos: Vec2 = Vec2 { x: (position.x), y: (position.y) };

    for c in text.chars() {
        let advance_width = render_char(framebuffer, width, &pos, c, font, font_size);
        pos.x += advance_width;
    }
}