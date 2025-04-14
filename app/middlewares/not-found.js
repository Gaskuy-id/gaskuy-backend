// Untuk handler ketika routernya ga ada
const notFound = (req, res) => {
    res.status(404).send({
        msg: 'Route does not exist'
    });
};

module.exports = notFound;
