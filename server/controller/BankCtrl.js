const index = async (req, res) => {
	try {
		const payload = await req.context.models.bank.findAll();
		if (!payload.length) {
			return res.sendStatus(404);
		} else {
			return res.status(200).send(payload);
		}
	} catch (error) {
		return res.sendStatus(404);
	}
};

const show = async (req, res) => {
	try {
		const id = req.params.id;
		const payload = await req.context.models.bank.findByPk(id);
		return res.status(200).send(payload);
	} catch (error) {
		return res.sendStatus(404);
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
		return res.status(422).send('Already exists');
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
		if (payload[0] === 0) {
			return res.sendStatus(404);
		} else {
			return res.status(200).send(payload);
		}
	} catch (error) {
		return res.sendStatus(422);
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
		return res.sendStatus(200);
	} catch (error) {
		return res.sendStatus(422);
	}
};

export default {
	index,
	show,
	create,
	update,
	destroy,
};
