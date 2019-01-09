package main

import "fmt"

// Нахождение НОД
func calcCommonDivisor(v1, v2 int) int {
	var div int
	if v1 < v2 {
		v1, v2 = v2, v1
	}

	for {
		fmt.Println(v1, "/", v2)
		div = v1 % v2
		if div == 0 {
			return v2
		}
		v1, v2 = v2, div
	}
}

// Нахождение НОК
func calcMinCommonMult(v1, v2 int) int {
	d := calcCommonDivisor(v1, v2)
	return v1 * v2 / d
}

func main() {
	// тут считаем НОД
	d := calcCommonDivisor(30, 12)
	fmt.Println("НОД: ", d)
	// тут Считаем НОК
	m := calcMinCommonMult(30, 12)
	fmt.Println("НОK: ", m)
}
