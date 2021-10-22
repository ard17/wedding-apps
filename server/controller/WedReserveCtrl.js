const createWeddReserve = async (req, res) => {
    const {
        were_status,
        were_user_id
    } = req.body;
    try {
        const result = await req.context.models.wedding_reserve.create({
            were_created: Date.now(),
            were_status: were_status,
            were_user_id: were_user_id
        });
        return res.send(result);
    } catch (error) {
        res.send(error)
    }
};


const updateWeddReserve = async (req, res) => {
    const result = await req.context.models.wedding_reserve.update(
        {
            were_created: Date.now(),
            were_status: req.body.were_status,
            were_user_id: req.body.were_user_id
        },
        {
            returning: true,
            where: { were_id: req.params.id }
        }
    );
    return res.send(result);
};

const findAllWeddReserve = async (req, res) => {
    const result = await req.context.models.wedding_reserve.findAll();
    return res.send(result);
};

const findWeddReserveById = async(req,res)=>{
    const result = await req.context.models.wedding_reserve.findByPk(
        req.params.id
    );
    return res.send(result);
}

const deleteWeddReserve = async (req, res) => {
    const id = req.params.id;

    await req.context.models.wedding_reserve.destroy({
        where: { were_id: id }
    }).then(result => {
        return res.send("delete " + result + " rows.")
    }).catch(error => {
        return res.sendStatus(404).send("Data not found.")
    });

};

export default {
    createWeddReserve,
    updateWeddReserve,
    findAllWeddReserve,
    findWeddReserveById,
    deleteWeddReserve
};