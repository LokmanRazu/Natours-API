const { findByIdAndRemove } = require('../model/tourMoel')
const Tour = require('../model/tourMoel')

exports.getTourController =async (req,res,next)=>{
    // 1. FINDING QUERY STRING(filtering) FROM DB
    console.log(req.query)
    // Filtering {query string}
    let queryObj = { ...req.query }
    const excludeFildes = ['page','sort','limit','fildes']
    excludeFildes.forEach(e => delete queryObj[e])

    // 1.1 Advance filtering
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    // gte = greater than or equal && lte = less than or equal 
    let query = Tour.find(JSON.parse(queryStr))

    // 2. Sorthing DATA
    if (req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ')
        query = query.sort(sortBy)
    }else{
        query = query.sort('-createdAt')
    }

    //  field DATA
    if(req.query.fields){
        console.log(req.query.fields)
      const fields = req.query.fields.split(',').join(' ')  
      query = query.select(fields)
    } else{
     query = query.select('-__v')   
    }

    // Pagination {IMPORTANT}
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page -1) * limit;
    query = query.skip(skip).limit(limit)
    // Pagination (if DATA and VALUE are equals then refuse to empty DATA page)
    if(req.query.page){
        const numTours = await Tour.countDocuments()
        if(skip >= numTours) throw new Error('This page does not exist')
    }




    const tours = await query
    // const tours = await Tour.find(req.query)


    // const tours = await Tour.find({
    //     rating:4.5
    // })

    // FINDING QUERY STRING(filtering) FROM DB {another way}
    // const tours = await Tour.find()
    //     .where('rating').equals(4.7)

    res.status(200).json({
        message:'Hello! I am from getTourcontroller',
        data:{
            tours:tours
        }
    });

    
}

exports.tourDataController =async (req,res,next)=>{
    const { name,ceo,owner,netWorth,since,headquarter } = req.body
    try{
        const testTour = new Tour({
         name,
         ceo,
         owner,
         netWorth,
         since,
         headquarter
        })
        const saveTour = await testTour.save().then(doc=>{console.log(doc)})
           return res.status(200).json({
            message:'Successfully Data save',
            data:{
                saveTour:saveTour
            }
        })
    }catch(e){
        console.log(`I am from tourController:- ${e}`)
            next()
    }

}


exports.patchController = async (req,res,next)=>{
    try{ 
        const updatedData = await Tour.findByIdAndUpdate(req.params.id,req.body,{new:true})
        console.log(updatedData)
        res.status(200).json({
            message:"I am from patchController",
            data:{
                updatedData:updatedData
            }
        })
    }catch(e){
        console.log(`I am from patchController: ${e}`)
        next(e)
    }
  

}

exports.deleteTour = async (req,res,next)=>{
    try{
        const deletedData = await Tour.findByIdAndRemove(req.params.id,req.bady, {new:true})
        res.status(204).json({
            message:"I am from deleteController",
            status:"sucess",
            data:{
                deletedData
            }
        })

    }catch(e){
        console.log(`I am from deleteController: ${e}`)
    }
}