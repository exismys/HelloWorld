#include <SFML/Audio.hpp>
#include <vector>
#include <cmath>

int main() {
    const unsigned SAMPLE_RATE = 44100;
    const unsigned DURATION = 2;
    const double FREQUENCY = 440.0;
    const double AMPLITUDE = 30000;

    std::vector<sf::Int16> samples;
    samples.reserve(SAMPLE_RATE * DURATION);

    // Generate sine wave samples
    for (unsigned i = 0; i < SAMPLE_RATE * DURATION; i++) {
        double t = static_cast<double>(i) / SAMPLE_RATE;
        double value = AMPLITUDE * std::sin(2 * M_PI * FREQUENCY * t);
        samples.push_back(static_cast<sf::Int16>(value));
    }

    // Load into SFML sound buffer
    sf::SoundBuffer buffer;
    if (!buffer.loadFromSamples(samples.data(), samples.size(), 1, SAMPLE_RATE)) {
        return -1; // error
    }

    // Play the sound
    sf::Sound sound;
    sound.setBuffer(buffer);
    sound.play();

    // Keep program alive until sound ends
    sf::sleep(sf::seconds(DURATION));

    return 0;
}
