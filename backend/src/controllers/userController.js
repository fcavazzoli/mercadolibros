export const getUser = async (req, res) => {
    const userId = req.params.userId;

    return res.status(200).send({
        message: `User with id: ${userId} fetched successfully`,
    });
};