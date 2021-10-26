import { text } from "body-parser";
import { sequelize } from "../model/indexModel";

/* const findCategoryBySQL = async (req, res) => {

    try {
        const result = await sequelize.query(`select weca_id, weca_name, wedding_vendor.* from wedding_category join wedding_vendor
    on weca_id = weve_weca_id`, {
            type: sequelize.QueryTypes.SELECT,
        });
        return res.send(result);
    } catch (error) {
        return res.send(error);
    }

} */

const findAllRows = async (req, res) => {
    const result = await req.context.models.wedding_vendor.findAll();
    return res.send(result);
}


const findRowById = async (req, res) => {
    const result = await req.context.models.wedding_vendor.findByPk(
        req.params.id
    );
    return res.send(result);
}

/* const findByOne = async (req, res) => {
    const result = await req.context.models.weddingvendor.findOne({
        where : {
            addr_user_id : req.params.userid
        }
    });
    return res.send(result);
} */

const createRow = async (req, res) => {
    try {
        const {  weve_name, weve_rating, weve_type, weve_province, weve_city, weve_address, weve_start_price, weve_weca_id } = req.body;
        const result = await req.context.models.wedding_vendor.create({
            weve_name:weve_name,
            weve_rating: weve_rating,
            weve_type: weve_type,
            weve_province: weve_province,
            weve_city: weve_city,
            weve_address: weve_address,
            weve_start_price: weve_start_price,
            weve_weca_id : weve_weca_id
        });
        return res.send(result);
    } catch (error) {
        return res.send(error);
    }
};

// update category set cate_name=${1} where cate_id=${2}
const updateRow = async (req, res) => {
    const { weve_name, weve_rating, weve_type, weve_province, weve_city, weve_address, weve_start_price, weve_weca_id } = req.body;
    const result = await req.context.models.wedding_vendor.update(
        { weve_name:weve_name,
            weve_rating: weve_rating,
            weve_type: weve_type,
            weve_province: weve_province,
            weve_city: weve_city,
            weve_address: weve_address,
            weve_start_price: weve_start_price,
            weve_weca_id : weve_weca_id },
        {
            returning: true,
            where: { weve_id: req.params.id }
        }
    );
    return res.send(result);
}

// delete from category where cate_id=${id}
const deleteRow = async (req, res) => {
    const id = req.params.id;

    await req.context.models.wedding_vendor.destroy({
        where: { weve_id: id }
    }).then(result => {
        return res.send("delete " + result + " rows.")
    }).catch(error => {
        return res.sendStatus(404).send("Data not found.")
    });

}



export default {
    
    findAllRows,
    findRowById,
    createRow,
    updateRow,
    deleteRow,
    
}