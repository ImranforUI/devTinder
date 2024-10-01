const adminAuth = (req, res, next) => {
    console.log("Admin Auth is getting Checked!!");
    const token = 'xyz';
    const authtoken = token === 'xyz';
    if(!authtoken){
        res.status(401).send('Unauthorized Access Denied!!')
    }else{
        next();
    }
};

const userAuth = (req, res, next) => {
    console.log("User Auth is getting Checked!!");
    const token = 'xyz';
    const authtoken = token === 'xyz';
    if(!authtoken){
        res.status(401).send('Unauthorized Access denied!!')
    }else{
        next();
    }
}
module.exports = {adminAuth, userAuth};