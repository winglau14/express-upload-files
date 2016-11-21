/**
 * Created by Winglau on 2016/11/21.
 */
var fs = require('fs');
var express = require('express');
var multer  = require('multer');

var app = express();
var upload = multer({ dest: 'upload/' });

// 多图上传
app.post('/upload',upload.array('logo', 2) /*upload.single('logo')*/, function(req, res, next){
    //res.send({ret_code: '0'});
    console.log(req.files);
    req.files.forEach(function(item){
        var path1 = item.path;
         var path2 = item.destination+item.originalname;
         console.log(path1,path2);
        res.send(
            renameFile(path1,path2)
        );
    })

});
var renameFile =function(path1,path2){
    fs.rename(path1,path2,function(){
        console.log('done!');
    })
}


app.get('/form', function(req, res, next){
    var form = fs.readFileSync('./form.html', {encoding: 'utf8'});
    res.send(form);
});

app.listen(3000);