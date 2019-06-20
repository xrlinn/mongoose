var express = require('express');
var router = express.Router();
var bookModel = require("../database/book")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/book",(req,res,next) => {
  const {title,author} = req.body;
  bookModel.create({title,author}).then(data => {
    console.log(data)
    res.json({
      code:200,
      data
    })
  })
})//增加数据

// router.get("/book",(req,res,next) => {
//   bookModel.find().then(data => {
//     res.json({
//       code:200,
//       data
//     })
//   })
// })//查询

router.get("/book",(req,res,next) => {
  let {pn=1,size=2} = req.query;
  pn = Number(pn);
  size = Number(size);
  bookModel.find().limit(size).skip((pn-1)*size).then(data => {
    res.json({
      code:200,
      data
    })
  })
})//分页查询

router.patch("/book",(req,res,next) => {
  const {_id,author,reader} = req.body
  bookModel.updateOne({_id},{$set: {reader}}).then(change => {
    res.json({
      code:200,
      data:change
    })
  })
})//修改对象属性的数据

router.delete("/book/:id",(req,res,next) => {
  const {id} = req.params;
  bookModel.deleteOne({_id:id}).then(del => {
    res.json({
      code:200,
      data:del
    })
  })
})//删除某条数据

module.exports = router;
