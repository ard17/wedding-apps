import { sequelize } from "../model/indexModel";

const findCategoryBySQL = async(req,res)=>{
    const result = await sequelize.query("select addr_id,addr_name from address",{
        type : sequelize.QueryTypes.SELECT,
        model : req.context.model.address,
        mapToModel : true
    });

    return res.send(result);
}

const findAllRows = async(req,res)=>{
    const result = await req.context.model.address.findAll();
    return res.send(result);
}


const findRowById = async(req,res)=>{
    const result = await req.context.model.address.findByPk(
        req.params.id
    );
    return res.send(result);
}

const createRow = async(req,res)=>{
    try {
    const {weca_id,weca_name} = req.body;
    const result = await req.context.model.address.create({
        addr_id : addr_id,
        addr_name : addr_name
    });
    return res.send(result);
} catch (error){
    return res.send(error);
}
};

// update category set cate_name=${1} where cate_id=${2}
const updateRow = async(req,res)=>{
    const {weca_name} = req.body;
    const result = await req.context.model.address.update(
        {addr_name : addr_name},
        {returning:true,
            where : {addr_id : req.params.id}
        }
        );
    return res.send(result);
}

// delete from category where cate_id=${id}
const deleteRow = async(req,res)=>{
    const id = req.params.id;

    await req.context.model.address.destroy({
        where : {weca_id : id}
    }).then(result =>{
        return res.send("delete "+result+" rows.")
    }).catch(error =>{
        return res.sendStatus(404).send("Data not found.")
    });
    
}



export default {
    findCategoryBySQL,
    findAllRows,
    findRowById,
    createRow,
    updateRow,
    deleteRow
}