const createWeddResLines = async (req, res) => {
    const writ_start_date = new Date(req.body.writ_start_date)
    const writ_end_date = new Date(req.body.writ_end_date)
    // const writ_start_date = new Intl.DateTimeFormat('id-ID').format(newStartDate)
    // const writ_end_date = new Intl.DateTimeFormat('id-ID').format(newEndDate)
    const selisihDate = writ_end_date - writ_start_date
    const millisecondPerDay = 1000 * 60 * 60 * 24
    let writ_total_day = selisihDate / millisecondPerDay
    console.log(writ_start_date);

    const writ_subtotal = req.body.writ_qty * req.body.writ_price

    const {
        writ_qty,
        writ_price,
        writ_weve_id,
        writ_wepa_id,
        writ_order_name,
        writ_were_id
    } = req.body;
    try {
        const result = await req.context.models.wedding_reserve_lines.create({
            writ_start_date: writ_start_date,
            writ_end_date: writ_end_date,
            writ_total_day: writ_total_day,
            writ_qty: writ_qty,
            writ_price: writ_price,
            writ_subtotal: writ_subtotal,
            writ_weve_id: writ_weve_id,
            writ_wepa_id: writ_wepa_id,
            writ_order_name: writ_order_name,
            writ_were_id: writ_were_id
        });
        return res.send(result);
    } catch (error) {
        res.send(error)
    }
};


const updateWeddResLines = async (req, res) => {
    const writ_start_date = new Date(req.body.writ_start_date)
    const writ_end_date = new Date(req.body.writ_end_date)
    // const writ_start_date = new Intl.DateTimeFormat('id-ID').format(newStartDate)
    // const writ_end_date = new Intl.DateTimeFormat('id-ID').format(newEndDate)
    const selisihDate = writ_end_date - writ_start_date
    const millisecondPerDay = 1000 * 60 * 60 * 24
    let writ_total_day = selisihDate / millisecondPerDay

    const writ_subtotal = req.body.writ_qty * req.body.writ_price

    const result = await req.context.models.wedding_reserve_lines.update(
        {
            writ_start_date: writ_start_date,
            writ_end_date: writ_end_date,
            writ_total_day: writ_total_day,
            writ_qty: req.body.writ_qty,
            writ_price: req.body.writ_price,
            writ_subtotal: writ_subtotal,
            writ_weve_id: req.body.writ_weve_id,
            writ_wepa_id: req.body.writ_wepa_id,
            writ_order_name: req.body.writ_order_name,
            writ_were_id: req.body.writ_were_id
        },
        {
            returning: true,
            where: { writ_id: req.params.id }
        }
    );
    return res.send(result);
};

const findAllWeddResLines = async (req, res) => {
    const result = await req.context.models.wedding_reserve_lines.findAll();
    return res.send(result);
};

const findWeddResLinesById = async (req, res) => {
    const result = await req.context.models.wedding_reserve_lines.findByPk(
        req.params.id
    );
    return res.send(result);
}

const deleteWeddResLines = async (req, res) => {
    const id = req.params.id;

    await req.context.models.wedding_reserve_lines.destroy({
        where: { writ_id: id }
    }).then(result => {
        return res.send("delete " + result + " rows.")
    }).catch(error => {
        return res.sendStatus(404).send("Data not found.")
    });

};

export default {
    createWeddResLines,
    updateWeddResLines,
    findAllWeddResLines,
    findWeddResLinesById,
    deleteWeddResLines
};