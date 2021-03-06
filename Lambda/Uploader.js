const AWS = require('aws-sdk');
var s3  = new AWS.S3();

exports.handler = (event, context, callback) =>{
    let recieved_request =JSON.stringify(event.image);
    let recieved_request_imageId = JSON.stringify(event.imageId);
    let recieved_request_ext = JSON.stringify(event.fileExt);
    let recieved_request_folder = JSON.stringify(event.folder);
    
    recieved_request = recieved_request.slice(1,-1);
    
    var filePath = recieved_request_imageId +"."+recieved_request_ext.slice(1,-1);
    let buffer = Buffer.from(recieved_request.replace(/^data:image\/\w+;base64,/,""),'base64');
    
    var params = {
        Key: filePath,
        Body : buffer,
        ContentEncoding:'base64',
        Bucket : "YOUR BUCKET NAME"
        
    };
    s3.upload(params, function(err, data){
        if(err){
            callback(err, null);
        }else {
            var res = {
                "statuscode" : 200,
                "headers" :{
                    "content-Type":"application/json"
                }
                
            };
            res.body = "Uploaded";
            callback(null, res);
        }
        
        
    });
};
