import express from "express"
import jwt from "jsonwebtoken";
import { UserModel, ContentModel, LinkModel, TagModel } from './db'
import { JWT_PASSSWORD } from "./config"
import { userMiddleware } from "./middleware";
import { random } from "./utils";
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors());

 app.post("api/v1/signup", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    try {
        UserModel.create({
            username: username,
            password: password
        })

        res.json({
            message: "User signed up"
        })
    } catch (error) {
        res.status(403).json({
            message: "User already exists"
        })
    }
 })

 app.post("api/v1/signin", async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const existingUser = await UserModel.findOne({username,
    password})
    if(existingUser) {
        const token = jwt.sign({id: existingUser._id},JWT_PASSSWORD) 
        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
 })

 app.get("api/v1/content", userMiddleware, (req, res) => {
    //@ts-ignore
    const userId = req.userId
    const content = ContentModel.find({userId})
    res.json({
        content
    })
 })

 app.post("api/v1/content", userMiddleware, (req, res) => {
    const link = req.body.link
    const type = req.body.type
    //@ts-ignore
    const userId = req.userId
    const content = ContentModel.create({
        link, type, tags: [],
        //@ts-ignore
        userId
    }) 
    res.json({
        message: 'content added'
    })
 })

 app.delete("api/v1/content", userMiddleware, (req, res) => {
    const contentId = req.body.contentId;
    const content = ContentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId: req.userId
    })
    res.json({
        message: 'Content deleted'
    })
 })

 
 app.post("api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share;

    if(share) {
        const existingLink = await LinkModel.findOne({
            //@ts-ignore
            userId: req.userId
        });
        if(existingLink) {
            res.json({
                hash: existingLink.hash
            })
            return;
        }

        const hash = random(10);
        const newLink = await LinkModel.create({
            hash,
            //@ts-ignore
            userId: req.userId,
        });
        res.json({
            hash: newLink.hash
        })
    } else {
        await LinkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        })
        res.json({
            Message: "Link removed"
        })
    }
 })

 app.post("api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash
    })

    if(!link) {
        res.json({
            message: "Sorry, incorrect input"
        })
    }

    const content = await ContentModel.findOne({
        userId: link?.userId
    })

    const user = await UserModel.findOne({
        _id: link?.userId
    })

    if(!user){
        res.status(411).json({
            message: "User not found" 
        })
        return;
    }

    res.json({
        username: user.username,
        content: content
    })
 })

