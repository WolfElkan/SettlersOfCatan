function fact(num) {
	f = 1
	for (var i = 1; i <= num; i++) {
		f *= i
	}
	return f
}

function range(num) {
	var r = []
	for (var i = 0; i < num; i++) {
		r.push(i)
	}
	return r
}

// function repeat(len,element=0) {
// 	var r = []
// 	for (var i = 0; i < len; i++) {
// 		r.push(element)
// 	}
// 	return r
// }

function rand(top) {
	return Math.floor(Math.random() * top)
}

function swap(arr, a, b) {
	var m  = arr[a]
	arr[a] = arr[b]
	arr[b] = m
	return arr
}

function shuffle(arr,seed=rand(fact(arr.length))) {
	console.log(seed)
	var len = arr.length
	for (var i = arr.length - 1; i >= 0; i--) {
		var s = seed % len
		seed = Math.floor(seed / len)
		swap(arr,i,s)
		len--
	}
	return arr
}

// x = 5

// var count = [
// 	[0,0,0,0,0],
// 	[0,0,0,0,0],
// 	[0,0,0,0,0],
// 	[0,0,0,0,0],
// 	[0,0,0,0,0],
// ]

// for (var i = 0; i < fact(x); i++) {
// 	arr = range(x)
// 	shuffle(arr,i)
// 	for (var j = 0; j < x; j++) {
// 		var e = arr[j]
// 		count[e][j] += 1
// 	}
// 	console.log(arr)
// }

// console.log(count)