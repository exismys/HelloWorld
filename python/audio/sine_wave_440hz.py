import numpy as np
from scipy.io.wavfile import write

# Parameters
sample_rate = 44100  # samples per second
duration = 2         # seconds
frequency = 440      # Hz (A4 note)

if __name__ == "__main__":
    time_axis = np.linspace(0, duration, int(sample_rate * duration), endpoint=False)
    audio = 0.5 * np.sin(2 * np.pi * frequency * time_axis)
    audio_int = np.int16(audio * 32767)
    write("A_note.wav", sample_rate, audio_int)
    print("WAV file 'A_note.wav' generated!")
