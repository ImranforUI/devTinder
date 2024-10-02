const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://namastedev:DvNknJWu51nZ2SXd@namastenode.qcsnr.mongodb.net/devTinder")
}

module.exports = connectDB;