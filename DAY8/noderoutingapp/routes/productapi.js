var express = require('express');
var router = express.Router();

    router.get('/list',async(req,res)=>{
        
    var products=[
        {
        pid:1,
        pname:"노트북",
        price:"5000",
        stock:4,
        
    
            
        pid:2,
        pname:"lg노트북",
        price:"5000",
        stock:6,
        }]
    
    res.json(products)
    }
    
    )
module.exports = router;