const index = async (req, res) => {
	try {
		const payload = await req.context.models.wedding_reviews.findAll();
		return res.status(200).send(payload);
	} catch (error) {
		return res.status(400).send(error);
	}
};

const show = async (req, res) => {
	try {
		const id = req.params.id;
		const payload = await req.context.models.wedding_reviews.findByPk(id);
		if (payload === null) {
			return res.sendStatus(404);
		} else {
			return res.status(200).send(payload);
		}
	} catch (error) {
		return res.status(400).send(error);
	}
};

const create = async (req, res) => {
	try {
		const { wore_comments, wore_rating, wore_user_id, wore_weve_id } =
			req.body;
		const payload = await req.context.models.wedding_reviews.create({
			wore_comments: wore_comments,
			wore_rating: wore_rating,
			wore_user_id: wore_user_id,
			wore_weve_id: wore_weve_id,
		});
		return res.status(200).send(payload);
	} catch (error) {
		return res.status(422).send(error);
	}
};

const update = async (req, res) => {
	try {
		const id = req.params.id;
		const { wore_comments, wore_rating, wore_user_id, wore_weve_id } =
			req.body;
		const payload = await req.context.models.wedding_reviews.update(
			{
				wore_comments: wore_comments,
				wore_rating: wore_rating,
				wore_user_id: wore_user_id,
				wore_weve_id: wore_weve_id,
			},
			{
				returning: true,
				where: {
					wore_id: id,
				},
			}
		);
		return res.status(200).send(payload);
	} catch (error) {
		return res.status(422).send(error);
	}
};

const destroy = async (req, res) => {
	try {
		const id = req.params.id;
		const payload = await req.context.models.wedding_reviews.destroy({
			where: {
				wore_id: id,
			},
		});
		return res.status(200).send(`Delete ${payload} rows`);
	} catch (error) {
		return res.status(400).send(error);
	}
};

export default {
	index,
	show,
	create,
	update,
	destroy,
};
