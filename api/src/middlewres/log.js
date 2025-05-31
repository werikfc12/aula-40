function logRequest(log = console.log){
return (req, res, next, ) => {
    log({

       
            method: req.method,
            url: req.url,
            Headers: req.headers
        })
        
        next();}
    }
        module.exports = logRequest