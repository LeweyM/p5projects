const defaultAccessor = (o) => o;

class BinaryHeap {
    heap;

    constructor(accessorFn = defaultAccessor) {
        this.heap = [];
        this.accessorFn = accessorFn
    }

    push(valueObject) {
        this.bubbleUp(this.lastLeaf(), valueObject)
    }

    pop() {
        if (this.heap.length == 0) return null
        let last = this.heap.pop()
        if (this.heap.length == 0) return last
        let root = this.heap[0]
        console.log(last)
        this.set(0, last)
        this.bubbleDown(0)
        return root;
    }
       
    bubbleUp(i, valueObject) {
        let shouldSwap = this.accessorFn(valueObject) < this.getValue(this.parentIndex(i))  
        if (shouldSwap) {
            this.swap(i, this.parentIndex(i))
            this.bubbleUp(this.parentIndex(i),valueObject)
        } else {
            this.heap[i] = valueObject
        }
    }

    bubbleDown(i) {
        let left = this.leftIndex(i)
        let right = this.rightIndex(i)
        let lowest = i

        if (right <= this.heap.length - 1 && this.getValue(right) < this.getValue(lowest)) {
            lowest = this.rightIndex(i)
        } 
        
        if (left <= this.heap.length - 1 && this.getValue(left) < this.getValue(lowest)) {
            lowest = this.leftIndex(i)
        }

        if (lowest != i) {
            this.swap(i, lowest)
            this.bubbleDown(lowest)
        }
    }

    getValue(i) {
        if (!this.heap[i]) return this.heap[i]
        return this.accessorFn(this.heap[i])
    }

    set(i, val) {
        this.heap[i] = val
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
