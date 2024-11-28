#include <iostream>
#include <queue>
using namespace std;

/**
 * Prints the k largest elements of the array
 * Time Complexity: O(k + (n - k) * log(k))
 */
void printKLargest(int arr[], int size, int k)
{
    priority_queue<int, vector<int>, greater<int>> minHeap;
    for (int i = 0; i < k; i++)
    {
        minHeap.push(arr[i]);
    }

    for (int i = k; i < size; i++)
    {
        if (minHeap.top() > arr[i])
        {
            continue;
        }
        else
        {
            minHeap.pop();
            minHeap.push(arr[i]);
        }
    }

    while (!minHeap.empty())
    {
        cout << minHeap.top() << " ";
        minHeap.pop();
    }
}

int main()
{
    int arr[] = {100, 10, 11, 16, 57, 28, 1, 19, 25};
    printKLargest(arr, sizeof(arr) / sizeof(arr[0]), 3);
    return 0;
}