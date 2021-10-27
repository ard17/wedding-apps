const index = async (req, res) => {
	try {
		const payload = await req.context.models.bank.findAll();
		return res.status(200).send(payload);
	} catch (error) {
		return res.status(400).send(error);
	}
};

const show = async (req, res) => {
	try {
		const id = req.params.id;
		const payload = await req.context.models.bank.findByPk(id);
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
		const { bank_id, bank_name } = req.body;
		const payload = await req.context.models.bank.create({
			bank_id: bank_id,
			bank_name: bank_name,
		});
		return res.status(200).send(payload);
	} catch (error) {
		return res.status(422).send(error.errors);
	}
};

const update = async (req, res) => {
	try {
		const id = req.params.id;
		const { bank_id, bank_name } = req.body;
		const payload = await req.context.models.bank.update(
			{
				bank_id: bank_id,
				bank_name: bank_name,
			},
			{
				returning: true,
				where: {
					bank_id: id,
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
		const payload = await req.context.models.bank.destroy({
			where: {
				bank_id: id,
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
