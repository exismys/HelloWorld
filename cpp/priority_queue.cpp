#include <iostream>
#include <queue>
using namespace std;

int main()
{
    // Max Heap version
    priority_queue<int> pq;
    pq.push(10);
    pq.push(25);
    pq.push(15);
    while (!pq.empty())
    {
        cout << pq.top() << " ";
        pq.pop();
    }
    cout << endl;

    // Min Heap version
    priority_queue<int, vector<int>, greater<int>> pqMin;
    pqMin.push(10);
    pqMin.push(25);
    pqMin.push(15);
    while (!pqMin.empty())
    {
        cout << pqMin.top() << " ";
        pqMin.pop();
    }
}