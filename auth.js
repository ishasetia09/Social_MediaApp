const fs = require('fs-extra');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const usersPath = './data/users/';

async function registerUser(username, email, mobile, password) {
    // Check for email and mobile duplicity
    const userFiles = await fs.readdir(usersPath);
    for (const file of userFiles) {
        const user = await fs.readJson(usersPath + file);
        if (user.email === email) throw new Error('Email already registered');
        if (user.mobile === mobile) throw new Error('Mobile number already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    const user = {
        id: userId,
        username,
        email,
        mobile,
        password: hashedPassword,
        role: 'registered_user',
        followers: [],
        following: [],
        posts: []
    };

    await fs.writeJson(`${usersPath}${userId}.json`, user);
    return `User ${username} registered successfully`;
}

async function loginUser(email, password) {
    const userFiles = await fs.readdir(usersPath);
    for (const file of userFiles) {
        const user = await fs.readJson(usersPath + file);
        if (user.email === email) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) return `Welcome, ${user.username}`;
            else throw new Error('Invalid password');
        }
    }
    throw new Error('User not found');
}

module.exports = { registerUser, loginUser };
