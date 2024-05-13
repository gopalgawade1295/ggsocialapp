import User from "../models/User.js";


export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndUpdate(id, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            picturePath: req.body.picturePath,
            location: req.body.location,
            occupation: req.body.occupation,
        });
        res.status(201).json({ data: 'Updated Successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json({ data: user });
    } catch (err) {
        res.status(404).json({ dats: err.message });
    }
};

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        res.status(200).json({ data: formattedFriends });
    } catch (err) {
        res.status(404).json({ data: err.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        const { id } = req.params;
        const user = await User.findById(id);
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const friendsID = friends.map((v) => v.id)
        const filteredUsers = users.filter((v) => !friendsID.includes(v.id)).map((v) => v)
        res.status(200).json({ data: filteredUsers, friendsID: friendsID, users: users });
    }
    catch (err) {
        res.status(404).json({ data: err.message });
    }
}

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        res.status(200).json({ data: formattedFriends });
    } catch (err) {
        res.status(404).json({ data: err.message });
    }
};
