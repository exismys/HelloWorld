#include <iostream>
#include <queue>
using namespace std;

/**
 * Sorts k-sorted array (nearly sorted array)
 * Time Complexity: n * log(k)
 */
void kSort(int arr[], int size, int k)
{
    priority_queue<int, vector<int>, greater<int>> pq;

    for (int i = 0; i <= k; i++)
    {
        pq.push(arr[i]);
    }

    int index = 0;

    for (int i = k + 1; i < size; i++)
    {
        arr[index++] = pq.top();
        pq.pop();
        pq.push(arr[i]);
    }

    while (!pq.empty())
    {
        arr[index++] = pq.top();
        pq.pop();
    }
}

void printArray(int arr[], int size)
{
    for (int i = 0; i < size; i++)
    {
        cout << arr[i] << " ";
    }
    cout << endl;
}

int main()
{
    int arr[] = {2, 6, 3, 12, 56, 8};
    kSort(arr, sizeof(arr) / sizeof(arr[0]), 3);
    printArray(arr, sizeof(arr) / sizeof(arr[0]));
    return 0;
}