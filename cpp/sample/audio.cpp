#include <SFML/Audio.hpp>
#include <cmath>
#include <map>
#include <string>
#include <vector>

int playNote(double frequency, double duration) {
  const unsigned SAMPLE_RATE = 44100;
  const double DURATION = duration;
  const double FREQUENCY = frequency;
  const double AMPLITUDE = 0.5;

  std::vector<sf::Int16> samples;
  samples.reserve(SAMPLE_RATE * DURATION);

  // Generate sine wave samples
  for (unsigned i = 0; i < SAMPLE_RATE * DURATION; i++) {
    double t = static_cast<double>(i) / SAMPLE_RATE;
    double value = AMPLITUDE * std::sin(2 * M_PI * FREQUENCY * t) * 32767;
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

int playCMajor() {
  std::map<std::string, double> notes = {
      {"C4", 261.63}, {"D4", 293.66}, {"E4", 329.63}, {"F4", 349.23},
      {"G4", 392.00}, {"A4", 440.00}, {"B4", 493.88}, {"C5", 523.25}};

  struct Note {
    double frequency;
    double duration;
  };

  std::vector<Note> melody = {
      {440.0, 0.5}, {494.0, 0.5}, {523.3, 1.0}, {0.0, 0.25}, {659.3, 0.75}};

  for (int i = 0; i < melody.size(); i++) {
    playNote(melody[i].frequency, melody[i].duration);
  }

  return 0;
}

int main() {
  /*playNoteA4()*/
  playCMajor();
  return 0;
}
