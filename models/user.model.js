const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, // takes away extra spaces in the end
        minlength: 3
    },
},
{
    timestamps: true, // automatically creates fields for when it was created and modified
}
);

const User = mongoose.model('User', userSchema);

module.exports = User;