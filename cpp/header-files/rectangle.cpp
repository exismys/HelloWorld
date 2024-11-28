#include "rectangle.h"

Rectangle::Rectangle(int l, int w) {
	length = l;
	width = w;
}

void Rectangle::setLength(int l) {
	length = l;
}

int Rectangle::getLength() {
	return length;
}

void Rectangle::setWidth(int w) {
	width = w;
}

int Rectangle::getWidth() {
	return width;
}