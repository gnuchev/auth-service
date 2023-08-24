function checkRole(role) {
    return (req, res, next) => {
        if (req.user && req.user.roles.includes(role)) {
            next();
        } else {
            res.status(403).send('Access Denied: Insufficient Role');
        }
    };
}

module.exports = checkRole;
