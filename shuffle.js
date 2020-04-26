function fact(num) {
	f = 1
	for (var i = 1; i <= num; i++) {
		f *= i
	}
	return f
}

function range(num,top=null) {
	var r = []
	if (top === null) {
		for (var i = 0; i < num; i++) {
			r.push(i)
		}
	} else {
		for (var i = num; i < top; i++) {
			r.push(i)
		}
	}
	return r
}

function copy(arr) {
	var r = []
	for (var i = 0; i < arr.length; i++) {
		if (type(arr[i]) == Array) {
			r.push(copy(arr[i]))
		} else {
			r.push(arr[i])
		}
	}
	return r
}

function identical(arr1,arr2) {
	if (arr1.length != arr2.length) {
		return false
	}
	for (var i = 0; i < arr1.length; i++) {
		if (arr1[i] != arr2[i]) {
			return false
		}
	}
	return true
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

function shuffle(arr,seed) {
	if (seed === undefined) {
		seed = rand(fact(arr.length))
		console.log(seed)
	} else if (seed === true) {
		seed = 224944
	}
	var len = arr.length
	for (var i = arr.length - 1; i >= 0; i--) {
		var s = seed % len
		seed = Math.floor(seed / len)
		swap(arr,i,s)
		len--
	}
	return arr
}
	
const RESOURCES = ['brick','woods','grain','sheep','stone']

function port_shuffle(seed=rand(9*8*7*6*5*10)) {
	console.log(seed)
	for (var i = 0; i < 4; i++) {
		resources.push('multi')
	}

	var multi4 = ['multi','multi','multi','multi']

	resources = shuffle(RESOURCES.concat(multi4),Math.floor(seed/10))

	var slots = [0,3,6,10,13,16,20,23,26]

	var result = {
		'brick':null,
		'woods':null,
		'grain':null,
		'sheep':null,
		'stone':null,
		'multi':[],
	}

	var offset = seed % 10

	for (var i = 0; i < resources.length; i++) {
		if (resources[i] == 'multi') {
			result['multi'].push((slots[i] + offset) % 30)
		} else {
			result[resources[i]] = (slots[i] + offset) % 30
		}
	}

	// var resources = ['brick','woods','grain','sheep','stone']
	// var nums = []

	// for (var i = 9; i >= 5; i--) {
	// 	// console.log(i)
	// 	var num = seed % i
	// 	for (var j = 0; j < nums.length; j++) {
	// 		if (num >= nums[j]) num++
	// 	}
	// 	seed /= i
	// 	seed = Math.floor(seed)	
	// 	nums.push(num)
	// }
	// return nums

// 24721969683518570

	return result
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