const fs = require('fs-extra');
const usersPath = './data/users/';

async function followUser(userId, targetId) {
    const user = await fs.readJson(`${usersPath}${userId}.json`);
    const targetUser = await fs.readJson(`${usersPath}${targetId}.json`);

    if (!user.following.includes(targetId)) {
        user.following.push(targetId);
        targetUser.followers.push(userId);

        await fs.writeJson(`${usersPath}${userId}.json`, user);
        await fs.writeJson(`${usersPath}${targetId}.json`, targetUser);
        return `You are now following ${targetUser.username}`;
    }
    return `Already following ${targetUser.username}`;
}

async function unfollowUser(userId, targetId) {
    const user = await fs.readJson(`${usersPath}${userId}.json`);
    const targetUser = await fs.readJson(`${usersPath}${targetId}.json`);

    user.following = user.following.filter(id => id !== targetId);
    targetUser.followers = targetUser.followers.filter(id => id !== userId);

    await fs.writeJson(`${usersPath}${userId}.json`, user);
    await fs.writeJson(`${usersPath}${targetId}.json`, targetUser);
    return `You unfollowed ${targetUser.username}`;
}

module.exports = { followUser, unfollowUser };
