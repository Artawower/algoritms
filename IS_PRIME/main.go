package main

import (
	"fmt"
	"math"
)

func isPrimeNumber2(n int) bool {
	for i := 2; i < n-1; i++ {
		if n%i == 0 {
			return false
		}
	}
	return true
}

func _isPrimeNumber(n, d int) bool {
	if n == 2 {
		return true
	}
	for i := 2; i < d; i++ {
		if n%i == 0 {
			fmt.Println(n, " поделило на", i, "без остатка")
			return false
		}
		fmt.Println(n, " поделило на", i, "c остатком")
	}
	return true
}

func isPrimeNumber(n int) bool {
	d := int(math.Sqrt(float64(n)))
	fmt.Println("Корень из ", n, "=", d)
	fmt.Println("Проверяем делится ли ", n, " на числа от 2 до ", d-1)
	return _isPrimeNumber(n, d)
}

func main() {
	if isPrimeNumber(24) {
		fmt.Println("Число простое")
		return
	}
	fmt.Println("Число не является простым")
}
