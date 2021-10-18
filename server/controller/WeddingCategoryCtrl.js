import { sequelize } from "../model/indexModel";

const findCategoryBySQL = async(req,res)=>{
    const result = await sequelize.query("select weca_id,weca_name from wedding_category",{
        type : sequelize.QueryTypes.SELECT,
        model : req.context.models.wedding_category,
        mapToModel : true
    });

    return res.send(result);
}

const findAllRows = async(req,res)=>{
    const result = await req.context.models.wedding_category.findAll();
    return res.send(result);
}


const findRowById = async(req,res)=>{
    const result = await req.context.models.wedding_category.findByPk(
        req.params.id
    );
    return res.send(result);
}

const createRow = async(req,res)=>{
    try {
    const {weca_id,weca_name} = req.body;
    const result = await req.context.models.wedding_category.create({
        weca_id :weca_id,
        weca_name : weca_name
    });
    return res.send(result);
} catch (error){
    return res.send(error);
}
};

// update category set cate_name=${1} where cate_id=${2}
const updateRow = async(req,res)=>{
    const {weca_name} = req.body;
    const result = await req.context.models.wedding_category.update(
        {weca_name : weca_name},
        {returning:true,
            where : {weca_id : req.params.id}
        }
        );
    return res.send(result);
}

// delete from category where cate_id=${id}
const deleteRow = async(req,res)=>{
    const id = req.params.id;

    await req.context.models.wedding_category.destroy({
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