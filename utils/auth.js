const withAuth = (reg, res, next) => {
    if (!reg.session.logged_id) {
        res.redirect('/login');
    } else {
        next()
    }
    };

module.exports = withAuth


