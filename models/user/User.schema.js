import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    fname: {
        type: String,
        require: true,
        default: ""
    },
    lname: {
        type: String,
        require: true,
        default: ""
    },
    email: {
        type: String,
        require: true,
        default: ""
    },
    password: {
        type: String,
        require: true,
        default: ""
    }
},
    {
        timestamp: true,
    },

)

const AdminUsersSchema = mongoose.model("Admin_user", UserSchema)
export default AdminUsersSchema