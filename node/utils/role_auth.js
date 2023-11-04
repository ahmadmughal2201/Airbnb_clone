function requireRoles(roles) {

    return (req, res, next) => {

        const userRole = req.user.role; // Assuming you saved the user's role in req.user

        if (roles.includes(userRole)) {

            next();

        } else {

            // User does not have any of the required roles, so send a forbidden response

            res.status(403).json({ message: 'Permission denied' });

        }

    };

}