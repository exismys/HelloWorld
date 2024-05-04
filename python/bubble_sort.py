def bubbleSort(numbers):
    for i in range(0, len(numbers) - 1):
        for j in range(0, len(numbers) - 1):
            if (numbers[j] > numbers[j + 1]):
                temp = numbers[j]
                numbers[j] = numbers[j + 1]
                numbers[j + 1] = temp
                
def main():
    numbers = [10, 20, 5, 15, 10]
    bubbleSort(numbers)
    print(numbers)

if __name__ == "__main__":
    main()

