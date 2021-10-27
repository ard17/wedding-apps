const createWeddPackage = async (req, res) => {
    const {
        wepa_name,
        wepa_price,
        wepa_capacity,
        wepa_type,
        wepa_weve_id
    } = req.body;
    try {
        const result = await req.context.models.wedding_package.create({
            wepa_name: wepa_name,
            wepa_price: wepa_price,
            wepa_capacity: wepa_capacity,
            wepa_type: wepa_type,
            wepa_weve_id: wepa_weve_id
        });
        return res.send(result);
    } catch (error) {
        res.send(error)
    }
};


const updateWeddPackage = async (req, res) => {
    try {
        const result = await req.context.models.wedding_package.update(
            {
                wepa_name: req.body.wepa_name,
                wepa_price: req.body.wepa_price,
                wepa_capacity: req.body.wepa_capacity,
                wepa_type: req.body.wepa_type,
                wepa_weve_id: req.body.wepa_weve_id
            },
            {
                returning: true,
                where: { wepa_id: req.params.id }
            }
        );
        return res.send(result);
    } catch (error) {
        return res.send(error);
    }
};

const findAllWeddPackage = async (req, res) => {
    try {
        const result = await req.context.models.wedding_package.findAll();
        return res.send(result);
    } catch (error) {
        return res.send(error);
    }
};

const findWeddPackageById = async (req, res) => {
    try {
        const result = await req.context.models.wedding_package.findByPk(
            req.params.id
        );
        if (result === null) {
            return res.sendStatus(404);
        } else {
            return res.send(result);
        }
    } catch (error) {
        return res.send(error);
    }
}

const deleteWeddPackage = async (req, res) => {
    const id = req.params.id;

    await req.context.models.wedding_package.destroy({
        where: { wepa_id: id }
    }).then(result => {
        return res.send("delete " + result + " rows.")
    }).catch(error => {
        return res.sendStatus(404).send("Data not found.")
    });

};

export default {
    createWeddPackage,
    updateWeddPackage,
    findAllWeddPackage,
    findWeddPackageById,
    deleteWeddPackage
};