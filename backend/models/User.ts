const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: { 
        type: String, 
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

export default mongoose.model("User", UserSchema);