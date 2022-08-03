const myCar = {
    make: 'Ford',
    model: 'Mustang',
    year: 1969
  };
//   console.log(myCar.make)
//   class myClass{
//     constructor(myCar,name){
//       this.to = myCar.make
//       this.you = myCar.model
//       this.name = name
//     }
//   }
//   const a = new myClass(myCar,'lokman')
//   console.log(a)

  function myfunction(myCar,name){
    // this.to = myCar.make
    //   this.you = myCar.model
    //   this.name = name
      return myCar
  }
  console.log(myfunction(myCar,'lokman'))