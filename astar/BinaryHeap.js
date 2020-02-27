const defaultAccessor = (o) => o;

class BinaryHeap {
    heap;

    constructor(accessorFn = defaultAccessor) {
        this.heap = [];
        this.accessorFn = accessorFn
    }

    push(value) {
        this.bubbleUp(this.lastLeaf(), value)
    }

    pop() {
        if (this.heap.length == 0) return null
        let root = this.heap[0]
        let last = this.heap.pop()
        if (this.heap.length == 0) return last
        this.heap[0] = last
        this.bubbleDown(0)
        return root;
    }
       
    bubbleUp(i, value) {
        let shouldSwap = value < this.heap[this.parentIndex(i)]  
        if (shouldSwap) {
            this.swap(i, this.parentIndex(i))
            this.bubbleUp(this.parentIndex(i),value)
        } else {
            this.heap[i] = value
        }
    }

    bubbleDown(i) {
        let left = this.leftIndex(i)
        let right = this.rightIndex(i)
        let lowest = i

        if (right <= this.heap.length - 1 && this.heap[right] < this.heap[lowest]) {
            lowest = this.rightIndex(i)
        } 
        
        if (left <= this.heap.length - 1 && this.heap[left] < this.heap[lowest]) {
            lowest = this.leftIndex(i)
        }

        if (lowest != i) {
            this.swap(i, lowest)
            this.bubbleDown(lowest)
        }
    }

    lastLeaf() {
        return this.heap.length;
    }

    swap(a,b) {
        let temp = this.heap[a]
        this.heap[a] = this.heap[b]
        this.heap[b] = temp; 
    }

    parentIndex(childIndex) {
        return floor((childIndex - 1) / 2)
    }
    
    leftIndex(parentIndex) {
        return parentIndex * 2 + 1
    }
    
    rightIndex(parentIndex) {
        return parentIndex * 2 + 2
    }
}

//         0
//    1           2
// 3    4      5     6
//7 8  9 10  11 12  13 14

//val:4
//         3
//    4           6
// 5     7     8     9
//     9 15  11 9  10 14

//         3
//    2           10
// 5     7     8     9
//     9 15  11 9  10 14
