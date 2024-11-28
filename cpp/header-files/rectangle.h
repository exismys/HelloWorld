#ifndef rectangle_h
#define rectangle_h

class Rectangle {
private:
	int length;
	int width;

public:
	Rectangle(int l, int w);
	void setLength(int l);
	int getLength();
	void setWidth(int w);
	int getWidth();
};

#endif