## Compile C++
```bash
g++ -std=c++20 -Wall -Wextra -Wpedantic -O2 -g -c my_math.cpp -o my_math.o
g++ -std=c++20 -Wall -Wextra -Wpedantic -O2 -g -c main.cpp -o main.o
g++ -std=c++20 -Wall -Wextra -Wpedantic -O2 -g -c audio.cpp -o audio.o
```

Compile while linking SFML audio lib
```bash
g++ main.cpp -o playnote -lsfml-audio -lsfml-system
```

## Link C++
g++ main.o my_math.o -o app.out
g
./app

## Compile C
```bash
gcc -std=c11 -c mathlib.c -o mathlib.o
```

## Link C object file with C++ object file
```bash
g++ main.o mathlib.o -o app
```
