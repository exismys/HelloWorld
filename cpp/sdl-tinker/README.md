## BeLight
Experiments on graphic programming.

The actual goal is to make a minimal 3D software renderer for learning purposes.


## Dependences

This project requires SDL2 for windowing and other setups. Install following packages:

SDL2:

```sudo apt install libsdl2-dev```

SDL2_ttf:

```sudo apt install libsdl2-ttf-dev```

## Build
```
cmake -B build && \
cmake --build build && \
./build/bin/BeLight
```
or

`./build.sh
`