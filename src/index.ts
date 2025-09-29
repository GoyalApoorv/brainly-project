import express from "express"
import jwt from "jsonwebtoken";
import { UserModel, ContentModel, LinkModel, TagModel } from './db'
import { JWT_PASSSWORD } from "./config"
import { userMiddleware } from "./middleware";
import { random } from "./utils";
import cors from 'cors'
import { Request } from 'express';
import { FileFilterCallback } from 'multer';
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());

// Creates uploads directory if it doesn't exist
const uploadDir = 'uploads/documents/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer 
const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        cb(null, uploadDir);
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ 
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (_req: Request,
         file: Express.Multer.File, cb: FileFilterCallback ) => {
        const allowedTypes = /jpeg|jpg|png|gif|pdf/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
});

app.post("/api/v1/content/document", userMiddleware, upload.single('document'), async (req, res) => {
    try {
        const { title } = req.body;
        const userId = req.userId;
        
        if (!req.file) {
            res.status(400).json({ message: "No file uploaded" }); // Remove return
            return;
        }
        
        const content = await ContentModel.create({
            title,
            link: `/uploads/documents/${req.file.filename}`,
            type: 'document',
            userId
        });
        
        res.json({ message: "Document uploaded successfully", content }); // Remove return
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ message: "Error uploading document" }); // Remove return
    }
});
// Serve uploaded files
app.use('/uploads', express.static('uploads'));


 app.post("/api/v1/signup", (req, res) => {
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

 app.post("/api/v1/signin", async (req, res) => {
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

 app.get("/api/v1/content", userMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const content = await ContentModel.find({userId});
        res.json({
            content
        });
    } catch (error) {
        console.error("Error fetching content:", error);
        res.status(500).json({message: "Error fetching content"});
    }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    console.log("=== ROUTE HANDLER HIT ===");
    console.log("req.body:", req.body);
    console.log("req.body type:", typeof req.body);
    console.log("Keys in body:", Object.keys(req.body || {}));
    
    const { link, type, title } = req.body;
    console.log("Destructured - title:", title, "link:", link, "type:", type);
    
    try {
        const userId = req.userId;
        const content = await ContentModel.create({
            link, type, title, tags: [], userId
        });
        
        res.json({
            message: 'content added',
            content
        });
    } catch (error) {
        const err = error as Error;
        console.log("Route handler error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

app.delete("/api/v1/content/:id", userMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        
        // Find and delete only if it belongs to the user
        const deletedContent = await ContentModel.findOneAndDelete({ 
            _id: id, 
            userId: userId 
        });
        
        if (!deletedContent) {
            res.status(404).json({ message: "Content not found" });
            return
        }
        
        res.json({ message: "Content deleted successfully" });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ message: "Error deleting content" });
    }
});
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

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});