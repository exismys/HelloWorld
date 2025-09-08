#include <iostream>
#include <map>
using namespace std;

int main() {
	map<int, string> movie;
	movie.insert(pair<int, string>(1, "Arrival"));
	movie.insert(pair<int, string>(2, "Interstellar"));
	movie.insert(pair<int, string>(3, "The Matrix"));

	map<int, string>::iterator mapIter;
	for (mapIter = movie.begin(); mapIter != movie.end(); mapIter++) {
		cout << mapIter->first << ": " << mapIter->second << endl;
	}

	cout << "movie at 1st fav: " << movie[1] << endl;
	movie.insert(pair<int, string>(1, "Interstellar")); // No insertion takes place as key already exists

}