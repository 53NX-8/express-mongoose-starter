import { Request, Response } from "express";
import { Post } from "../models/post.model"

export const index = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 })
        if (posts.length < 0) {
            res.status(404).send({ message: 'No Posts found' })
        } else {
            res.status(200).send(posts);
        }
    } catch (error) {
        res.status(500).send("Something went wong");
    }
}

export const store = async (req: Request, res: Response) => {
    try {
        const post = req.body
        const new_post = await Post.create(post);
        res.status(201).json(new_post);
    } catch (error) {
        res.status(500).send("Something went wong");

    }
}