const fs = require('fs-extra');
const { v4: uuidv4 } = require('uuid');
const postsPath = './data/posts/';

async function createPost(userId, title, description) {
    const postId = uuidv4();
    const post = {
        id: postId,
        title,
        description,
        authorId: userId,
        likeCount: 0,
        comments: []
    };

    await fs.writeJson(`${postsPath}${postId}.json`, post);

    // Add post ID to user’s post list
    const user = await fs.readJson(`./data/users/${userId}.json`);
    user.posts.push(postId);
    await fs.writeJson(`./data/users/${userId}.json`, user);

    return `Post created by ${user.username}`;
}

async function editPost(postId, userId, newTitle, newDescription) {
    const post = await fs.readJson(`${postsPath}${postId}.json`);

    if (post.authorId === userId) {
        post.title = newTitle;
        post.description = newDescription;
        await fs.writeJson(`${postsPath}${postId}.json`, post);
        return `Post updated successfully`;
    }
    throw new Error('Only the post author can edit this post');
}

async function addComment(postId, userId, text) {
    const post = await fs.readJson(`${postsPath}${postId}.json`);
    const commentId = uuidv4();

    const comment = {
        commentId,
        authorId: userId,
        text,
        replies: []
    };

    post.comments.push(comment);
    await fs.writeJson(`${postsPath}${postId}.json`, post);

    return `Comment added`;
}

module.exports = { createPost, editPost, addComment };
