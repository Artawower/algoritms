package main

import "fmt"

func isNumberSimple(n int) bool {
	for i := 2; i < n; i++ {
		if n%i == 0 {
			return false
		}
	}
	return true
}

func strileOut(l []bool, idFreq int) {
	for i := idFreq * 2; i < len(l); i += idFreq {
		l[i] = true
	}
}

func createListOfPositions(n int) []bool {
	l := make([]bool, n)
	for i := 2; i < n; i++ {
		if !l[i] && isNumberSimple(i) {
			strileOut(l, i)
		}
	}
	return l
}

func selectPrimeNumbers(l []bool) []int {
	res := []int{}
	for i, val := range l[2:] {
		if !val {
			res = append(res, i+2)
		}
	}
	return res
}

func Er(n int) []int {
	l := createListOfPositions(n)
	res := selectPrimeNumbers(l)
	return res
}

func main() {
	fmt.Println(Er(10))
}
