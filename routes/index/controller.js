export const getIndex = (req, res) => {
    try {
        return res.send({result: "Hello world!"});
    } catch (err) {
        throw err;
    }
};

export const postIndex = (req, res) => {
    try {
        const { name } = req.body;
        return res.send({result: `Hello ${name}!`});
    } catch (err) {
        throw err;
    }
};