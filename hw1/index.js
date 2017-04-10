//@flow

var csv = require('csvtojson');
var fs = require('fs');
var childrenWeight = [
    {
        "year": "96",
        "data":[]
    },
    {
        "year": "97",
        "data":[]
    },
    {
        "year": "98",
        "data":[]
    },
    {
        "year": "99",
        "data":[]
    },
    {
        "year": "100",
        "data":[]
    },
    {
        "year": "101",
        "data":[]
    },
    {
        "year": "102",
        "data":[]
    },
    {
        "year": "103",
        "data":[]
    },
    {
        "year": "104",
        "data":[]
    }
];



csv()
.fromFile('weight6-15.csv')
.on('json', (data) => {

    for(let i = 0; i < childrenWeight.length; i++){
        
        if(childrenWeight[i].year === data["學年度"]){
            
            childrenWeight[i].data.push(
                {
                    "age": data["年齡"],
                    "total": data["總計(公斤)"],
                    "boys": data["男(公斤)"],
                    "girls": data["女(公斤)"]
                }
            );
            break;
        }

    }

})
.on('done', (err) => {
    
    fs.writeFile('weight6-15.js',"let data = " + JSON.stringify(childrenWeight) + ";",(err) =>{

        console.log(JSON.stringify(childrenWeight));
        console.log('end');

    })
    
})


