

// const array1 = [1, 4, 9, 16];

// // pass a function to map
// const map1 = array1.map(x => x * 2);

// console.log(map1);

// const a = [3,0,3]
// const b = a.map((x,y) =>{
   


// })
// console.log(b)
// function a(h,array1 = []){
//     let arr =[]
// for(let i = 0;i<array1.length;i++){
//     for(let j = i+1;j<array1.length;j++){
//        let sum = array1[i]+array1[j]
//        if(sum ==h){
//         let s = [i,j]
//         return s
//        }
//     }
// }

// }
// let g = a(-8,[-1,-2,-3,-5])
// console.log(g)

const a = [0,1,2,3,4,5,6]
for (let i = 0;i<a.length;i++){
    let x = a[i]
    if(x % 2 == 0){
        console.log('the value is even ',+ a[i])
    }else{
        console.log('the value is odd '+a[i])
    }

}