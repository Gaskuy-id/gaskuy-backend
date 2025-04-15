const createTokenUser = (user) => {
    return {
        id: user._id,
        role: user.role,
    };
};

module.exports = createTokenUser;
