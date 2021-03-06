var Logger = require("winston");
module.exports = function (res) {
    return function (error, object, count) {
        if(error){
            res.status(500).json({message: "internal error"});
            Logger.error(error);
        }else{
            res.status(201).send(object);
            Logger.debug("saved " + count + " "+ object);
        }
    };
};
