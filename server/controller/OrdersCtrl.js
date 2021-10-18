import { sequelize } from "../model/indexModel"

const createOrders = async (req, res) => {
    const {
        //order_created,
        order_subtotal,
        order_tax,
        order_discount,
        order_promo,
        order_total_price,
        order_status,
        order_payment_type,
        order_user_id
    } = req.body;
    const result = await req.context.models.orders.create({
        //order_created :order_created,
        order_subtotal: order_subtotal,
        order_tax: order_tax,
        order_discount: order_discount,
        order_promo: order_promo,
        order_total_price: order_total_price,
        order_status: order_status,
        order_payment_type: order_payment_type,
        order_user_id: order_user_id
    });
    return res.send(result);
};

const updateOrder = async (req, res) => {
    const result = await req.context.models.orders.update(
        {
            order_subtotal: req.body.order_subtotal,
            order_tax: req.body.order_tax,
            order_discount: req.body.order_discount,
            order_promo: req.body.order_promo,
            order_total_price: req.body.order_total_price,
            order_status: req.body.order_status,
            order_payment_type: req.body.order_payment_type,
            order_user_id: req.body.order_user_id
        },
        {
            returning: true,
            where: { order_name: req.params.id }
        }
    );
    return res.send(result);
};

const findAllOrders = async (req, res) => {
    const result = await req.context.models.orders.findAll();
    return res.send(result);
};

const deleteOrder = async (req, res) => {
    const id = req.params.id;

    await req.context.models.orders.destroy({
        where: { oreder_name: id }
    }).then(result => {
        return res.send("delete " + result + " rows.")
    }).catch(error => {
        return res.sendStatus(404).send("Data not found.")
    });

};

export default {
    createOrders,
    updateOrder,
    findAllOrders,
    deleteOrder
};