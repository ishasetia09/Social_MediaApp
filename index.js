const { registerUser, loginUser } = require('./auth');
const { followUser, unfollowUser } = require('./user');
const { createPost, editPost, addComment } = require('./post');

async function runApp() {
    try {
        // Register users
        await registerUser('Alice', 'alice@example.com', '1234567890', 'password1');
        await registerUser('Bob', 'bob@example.com', '0987654321', 'password2');
        
        // Login
        console.log(await loginUser('alice@example.com', 'password1'));
        
        // Follow user
        const aliceId = 'userId_for_alice'; // replace with actual ID
        const bobId = 'userId_for_bob';     // replace with actual ID
        console.log(await followUser(aliceId, bobId));

        // Create post
        console.log(await createPost(aliceId, 'Hello World', 'My first post!'));
        
        // Add comment
        const postId = 'postId_for_hello_world'; // replace with actual ID
        console.log(await addComment(postId, bobId, 'Nice post!'));

    } catch (error) {
        console.error(error.message);
    }
}

runApp();
