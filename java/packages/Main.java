import package1.Calculator;
import package2.Greeting;

public class Main {
    public static void main(String[] args) {
        int num1 = 5;
        int num2 = 10;
        System.out.println(Calculator.add(num1, num2));
        System.out.println(Greeting.sayHello("Ritesh"));
    }
}