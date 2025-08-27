#include <SFML/Audio.hpp>
#include <cmath>
#include <map>
#include <string>
#include <vector>

int playNote(double frequency, double duration) {
  const unsigned SAMPLE_RATE = 44100;
  const double AMPLITUDE = 0.5;
  duration = 0.4;

  std::vector<sf::Int16> samples;
  samples.reserve(SAMPLE_RATE * duration);

  // Generate sine wave samples
  for (unsigned i = 0; i < SAMPLE_RATE * duration; i++) {
    double t = static_cast<double>(i) / SAMPLE_RATE;
    double value = AMPLITUDE * std::sin(2 * M_PI * frequency * t) * 32767;
    samples.push_back(static_cast<sf::Int16>(value));
  }

  // Load into SFML sound buffer
  sf::SoundBuffer buffer;
  if (!buffer.loadFromSamples(samples.data(), samples.size(), 1, SAMPLE_RATE)) {
    return -1;
  }

  // Play the sound
  sf::Sound sound;
  sound.setBuffer(buffer);
  sound.play();

  // Keep program alive until sound ends
  sf::sleep(sf::seconds(duration));
  return 0;
}

int playChord(const std::vector<double>& frequencies, double duration) {
  const unsigned SAMPLE_RATE = 44100;
  const double AMPLITUDE = 0.5;
  duration = 0.4;

  std::vector<sf::Int16> samples;
  samples.reserve(SAMPLE_RATE * duration);

  // Generate combined sine wave samples for the chord
  for (unsigned i = 0; i < SAMPLE_RATE * duration; i++) {
    double t = static_cast<double>(i) / SAMPLE_RATE;
    double value = 0.0;
    for (double freq : frequencies) {
      value += AMPLITUDE * std::sin(2 * M_PI * freq * t);
    }
    value = (value / frequencies.size()) * 32767; // Normalize
    samples.push_back(static_cast<sf::Int16>(value));
  }

  // Load into SFML sound buffer
  sf::SoundBuffer buffer;
  if (!buffer.loadFromSamples(samples.data(), samples.size(), 1, SAMPLE_RATE)) {
    return -1;
  }

  // Play the sound
  sf::Sound sound;
  sound.setBuffer(buffer);
  sound.play();

  // Keep program alive until sound ends
  sf::sleep(sf::seconds(duration));
  return 0;
}

int playCMajor() {
  std::map<std::string, double> notes = {
    {"C4", 261.63},
    {"D4", 293.66},
    {"E4", 329.63},
    {"F4", 349.23},
    {"G4", 392.00},
    {"A4", 440.00},
    {"B4", 493.88},
    {"C5", 523.25}
  };

  struct Note {
    double frequency;
    double duration;
  };

  std::vector<Note> melody;

  // std::vector<Note> melody = {
  //   {440.0, 0.5}, {494.0, 0.5}, {523.3, 1.0}, {0.0, 0.25}, {659.3, 0.75}
  // };

  std::vector<Note> c_scale = {
    {notes["C4"], 0.5}, {notes["D4"], 0.5}, {notes["E4"], 0.5}, {notes["F4"], 0.5},
    {notes["G4"], 0.5}, {notes["A4"], 0.5}, {notes["B4"], 0.5}, {notes["C5"], 1.0}
  };

  melody.insert(melody.end(), c_scale.begin(), c_scale.end());

  for (int i = 0; i < melody.size(); i++) {
    playNote(melody[i].frequency, melody[i].duration);
  }

  return 0;
}

int playCMajorChord() {
  std::map<std::string, double> notes = {
    {"C4", 261.63},
    {"E4", 329.63},
    {"G4", 392.00}
  };

  std::vector<double> chord = {notes["C4"], notes["E4"], notes["G4"]};
  playChord(chord, 1.0);

  return 0;
}

int newSongIGuess() {
  std::map<std::string, double> notes = {
    {"C4", 261.63},
    {"D4", 293.66},
    {"E4", 329.63},
    {"F4", 349.23},
    {"G4", 392.00},
    {"A4", 440.00},
    {"B4", 493.88},
    {"C5", 523.25}
  };

  struct Note {
    double frequency;
    double duration;
  };

  std::vector<Note> melody = {
    {notes["E4"], 0.5}, {notes["D4"], 0.5}, {notes["C4"], 0.5}, {notes["D4"], 0.5},
    {notes["E4"], 0.5}, {notes["E4"], 0.5}, {notes["E4"], 1.0}, {0.0, 0.25},
    {notes["D4"], 0.5}, {notes["D4"], 0.5}, {notes["D4"], 1.0}, {0.0, 0.25},
    {notes["E4"], 0.5}, {notes["G4"], 0.5}, {notes["G4"], 1.0}, {0.0, 0.25},
    {notes["E4"], 0.5}, {notes["D4"], 0.5}, {notes["C4"], 0.5}, {notes["D4"], 0.5},
    {notes["E4"], 0.5}, {notes["E4"], 0.5}, {notes["E4"], 0.5}, {notes["E4"], 0.5},
    {notes["D4"], 0.5}, {notes["D4"], 0.5}, {notes["E4"], 0.5}, {notes["D4"], 0.5},
    {notes["C4"], 2.0}
  };

  for (int i = 0; i < melody.size(); i++) {
    playNote(melody[i].frequency, melody[i].duration);
  }

  return 0;
}

int mixedChordAndNotes() {
  std::map<std::string, double> notes = {
    {"C4", 261.63},
    {"D4", 293.66},
    {"E4", 329.63},
    {"F4", 349.23},
    {"G4", 392.00},
    {"A4", 440.00},
    {"B4", 493.88},
    {"C5", 523.25}
  };

  struct NoteOrChord {
    std::vector<double> frequencies; // Single note or multiple for chord
    double duration;
  };

  std::vector<NoteOrChord> sequence = {
    {{notes["C4"]}, 0.5}, {{notes["E4"]}, 0.5}, {{notes["G4"]}, 1.0}, {{0.0}, 0.25},
    {{notes["D4"]}, 0.5}, {{notes["F4"]}, 0.5}, {{notes["A4"]}, 1.0}, {{0.0}, 0.25},
    {{notes["E4"], notes["G4"], notes["C5"]}, 1.5}, // C major chord
    {{0.0}, 0.25},
    {{notes["F4"], notes["A4"], notes["C5"]}, 1.5}  // F major chord
  };

  for (const auto& item : sequence) {
    if (item.frequencies.size() == 1) {
      playNote(item.frequencies[0], item.duration);
    } else {
      playChord(item.frequencies, item.duration);
    }
  }

  return 0;
}



int main() {
  // playCMajor();
  // for (int i = 0; i < 5; i++) {
  //   playCMajorChord();
  // }
  newSongIGuess();
  mixedChordAndNotes();
  
  return 0;
}
