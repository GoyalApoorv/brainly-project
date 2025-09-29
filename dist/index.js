"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Creates uploads directory if it doesn't exist
const uploadDir = 'uploads/documents/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
// Configure multer 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|pdf/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (mimetype && extname) {
            cb(null, true);
        }
        else {
            cb(null, false);
        }
    }
});
app.post("/api/v1/content/document", middleware_1.userMiddleware, upload.single('document'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const userId = req.userId;
        if (!req.file) {
            res.status(400).json({ message: "No file uploaded" }); // Remove return
            return;
        }
        const content = yield db_1.ContentModel.create({
            title,
            link: `/uploads/documents/${req.file.filename}`,
            type: 'document',
            userId
        });
        res.json({ message: "Document uploaded successfully", content }); // Remove return
    }
    catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ message: "Error uploading document" }); // Remove return
    }
}));
// Serve uploaded files
app.use('/uploads', express_1.default.static('uploads'));
app.post("/api/v1/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        db_1.UserModel.create({
            username: username,
            password: password
        });
        res.json({
            message: "User signed up"
        });
    }
    catch (error) {
        res.status(403).json({
            message: "User already exists"
        });
    }
});
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = yield db_1.UserModel.findOne({ username,
        password });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({ id: existingUser._id }, config_1.JWT_PASSSWORD);
        res.json({
            token
        });
    }
    else {
        res.status(403).json({
            message: "Incorrect credentials"
        });
    }
}));
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const content = yield db_1.ContentModel.find({ userId });
        res.json({
            content
        });
    }
    catch (error) {
        console.error("Error fetching content:", error);
        res.status(500).json({ message: "Error fetching content" });
    }
}));
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("=== ROUTE HANDLER HIT ===");
    console.log("req.body:", req.body);
    console.log("req.body type:", typeof req.body);
    console.log("Keys in body:", Object.keys(req.body || {}));
    const { link, type, title } = req.body;
    console.log("Destructured - title:", title, "link:", link, "type:", type);
    try {
        const userId = req.userId;
        const content = yield db_1.ContentModel.create({
            link, type, title, tags: [], userId
        });
        res.json({
            message: 'content added',
            content
        });
    }
    catch (error) {
        const err = error;
        console.log("Route handler error:", err.message);
        res.status(500).json({ error: err.message });
    }
}));
app.delete("/api/v1/content/:id", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.userId;
        // Find and delete only if it belongs to the user
        const deletedContent = yield db_1.ContentModel.findOneAndDelete({
            _id: id,
            userId: userId
        });
        if (!deletedContent) {
            res.status(404).json({ message: "Content not found" });
            return;
        }
        res.json({ message: "Content deleted successfully" });
    }
    catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ message: "Error deleting content" });
    }
}));
app.post("api/v1/brain/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingLink = yield db_1.LinkModel.findOne({
            //@ts-ignore
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        const hash = (0, utils_1.random)(10);
        const newLink = yield db_1.LinkModel.create({
            hash,
            //@ts-ignore
            userId: req.userId,
        });
        res.json({
            hash: newLink.hash
        });
    }
    else {
        yield db_1.LinkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        });
        res.json({
            Message: "Link removed"
        });
    }
}));
app.post("api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_1.LinkModel.findOne({
        hash
    });
    if (!link) {
        res.json({
            message: "Sorry, incorrect input"
        });
    }
    const content = yield db_1.ContentModel.findOne({
        userId: link === null || link === void 0 ? void 0 : link.userId
    });
    const user = yield db_1.UserModel.findOne({
        _id: link === null || link === void 0 ? void 0 : link.userId
    });
    if (!user) {
        res.status(411).json({
            message: "User not found"
        });
        return;
    }
    res.json({
        username: user.username,
        content: content
    });
}));
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
