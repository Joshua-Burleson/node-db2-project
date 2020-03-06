class Exception extends Error {
    constructor(code, message){
        super(message);
        this.code = code;
    }
}

module.exports = {
    Exception
}