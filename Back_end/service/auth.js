const jwt = require('jsonwebtoken');
const secret = 'Zoro$1999';

const setUserID = (user)=>{
    return jwt.sign(user,secret);    
}

const getUserID = (token) => {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        console.error(err);
        return null;
    }
};

module.exports = {
    setUserID,
    getUserID
}