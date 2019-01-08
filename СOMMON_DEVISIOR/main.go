package main

import "fmt"

// Нахождение НОД
func calcCommonDivisor(v1, v2 int) int {
	var div int
	if v1 < v2 {
		v1, v2 = v2, v1
	}

	for {
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
	d := calcCommonDivisor(30, 12)
	m := calcMinCommonMult(30, 12)
	fmt.Println(d, m)
}
