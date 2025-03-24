const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        // enum is used to restrict the value of role to either 'user' or 'admin'. If the value is neither of these two, an error will be thrown.
        enum: ['user', 'admin'],
    },
})

// The pre-save hook is a Mongoose middleware that runs before a document is saved to the database.
// This is a pre-save hook that hashes the password before saving it to the database.
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(admin.password, 10); 
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;