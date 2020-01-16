const {Types : {ObjectId}} = require('mongoose')

module.exports = [
    {
        name: "Bhaji",
        category: {
            veg: true
        },
        cusine: ObjectId('5d6a23a80dc293326c97d394'),
        ingredients: [
            {
                ing: ObjectId('5d6a25bbc300d405b4a4572c'),
                quantity: 2,
                unit: "pieces"
            },
            {
                ing: ObjectId('5d6a25bbc300d405b4a4572d'),
                quantity: 5,
                unit: "pieces"
            }
        ],
        servings: "3 people",
        images: [
            {src: "thi s"},
            {src: "ksdjn"},
            {src: "qqq"}
        ],
        recipe: {
            steps: [
                {
                    image: "aaa",
                    description: "lorem ipsum"
                },
                {
                    image: "aaa",
                    description: "lorem ipsum"
                }
            ]
        },
        user: ObjectId('5d6be7dd018b76074009f0f2'),
        feedback: {
            ratings: [
                {
                    user: ObjectId('5d6be7dd018b76074009f0f2'),                    
                    rate: 3,
                    comment: "this is comment"
                }
            ]
        }
    }
]