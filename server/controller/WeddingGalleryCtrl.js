
import UpDonwloadHelper from '../helpers/UpDownloadHelper';

const findAllRows = async (req, res) => {
    try {
        const result = await req.context.models.wedding_gallery.findAll();
        return res.send(result);
    } catch (error) {
        return res.sendStatus(404).send("no data found");
    }

}

const createWeddingGallery = async (req, res, next) => {
    const files = req.files;
    const weveId = req.weveId;

    const rowImages = files.map(el => {
        return { ...el, wega_weve_id : weveId}
    })

    try {
         await req.context.models.wedding_gallery.bulkCreate(
            rowImages
        );

        req.weveId = weveId;
        next();
    } catch (error) {
        return res.send(error);
    }
}



const deleteRow = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await req.context.models.wedding_gallery.destroy({
            where: { prod_id: parseInt(id) }
        });
        return res.send("delete " + result + " rows.")
    } catch (error) {
        return res.sendStatus(404).send("Data not found.")
    }


}

const uploadWeddingGallery = async (req, res,next) => {
    try {
        const multiPart = await UpDonwloadHelper.uploadMultipleFile(req);
        const { files,fields, status: { status } } = multiPart;

        if (status === 'succeed') {
             
                req.weveId = fields.wega_weve_id;
                req.files = files;    
                next();
        }

    } catch (error) {
        return res.send(error);
    }
}

const findRowById = async (req, res) => {
    const weveId = req.weveId
    try {
        const result = await req.context.models.wedding_gallery.findAll(
            {
                where : {wega_weve_id:parseInt(weveId)}
            }
        );
        return res.send(result);
    } catch (error) {
        return res.send(error);
    }

}


export default {
    findAllRows,
    createWeddingGallery,
    deleteRow,
    uploadWeddingGallery,
    findRowById
}