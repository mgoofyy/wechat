var express = require('express');
var router = express.Router();
var config = require('./../../config');
var crypto = require('crypto');

/* GET home page. */
router.get('/verfity', function(req, res, next) {
    console.log("请求参数",req.query);
    if(!req.query) {
       return  res.send("非法请求");
    }
    const parms = [config.WECHAT_KEY,req.query.timestamp,req.query.nonce];
    parms.sort();

    console.log(parms);
    const hash1 = crypto.createHash('sha1');
    const sign = hash1.update(parms.join('')).digest('hex');

    console.log(sign);

    if(sign == req.query.signature) {
        res.send(req.query.echostr);
    }
    else {
        res.send('非法请求');
    }
});

module.exports = router;