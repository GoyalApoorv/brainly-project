import mongoose, { Model, model, mongo, MongooseError, Schema } from "mongoose";
import { BACKEND_URL } from "./config";

const connectDB = async () => {
    try {
      await mongoose.connect(BACKEND_URL); 
      console.log('MongoDB connected');
    } catch (err) {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    }
  };

const userSchema = new Schema({
    username: {type: String, unique: true},
    password: String,
})

const tagSchema = new Schema({
    title: {type: String, unique: true, required: true}
})

const linkSchema = new Schema({
    hash: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
})

const contentTypes = ['image', 'video', 'article', 'audio'];

const contentSchema = new Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    type: {type: String, enum: contentTypes, required: true},
    title: {type: String, required: true},
    link: {type: String, required: true},
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }]
})


const TagModel = mongoose.model('Tag', tagSchema)
const UserModel = mongoose.model('User', userSchema)
const LinkModel = mongoose.model('Link', linkSchema)
const ContentModel = mongoose.model('Content', contentSchema)

export {
    TagModel, ContentModel, LinkModel, UserModel
}