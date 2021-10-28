const index = async (req, res) => {
	try {
		const user_id = req.params.user_id;
		const payload = await req.context.models.account_payment.findAll();
		return res.status(200).send(payload);
	} catch (error) {
		return res.status(400).send(error);
	}
};

const create = async (req, res) => {
	try {
		const user_id = req.params.user_id;
		const { acc_pin_number } = req.body;
		const payload = await req.context.models.account_payment.create({
			acc_pin_number: acc_pin_number,
			acc_saldo: 0,
			acc_total_point: 0,
			acc_user_id: user_id,
		});
		return res.status(200).send(payload);
	} catch (error) {
		return res.status(422).send(error);
	}
};

const show = async (req, res) => {
	try {
		const id = req.params.id;
		const payload = await req.context.models.account_payment.findByPk(id);
		if (payload === null) {
			res.sendStatus(404);
		} else {
			res.status(200).send(payload);
		}
	} catch (error) {
		return res.status(400).send(error);
	}
};

const update = async (req, res) => {
	try {
		const { id, user_id } = req.params;
		const { acc_pin_number, acc_saldo, acc_total_point } = req.body;
		const payload = await req.context.models.account_payment.update(
			{
				acc_pin_number: acc_pin_number,
				acc_saldo: acc_saldo,
				acc_total_point: acc_total_point,
			},
			{
				returning: true,
				where: {
					acc_number: id,
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
		const payload = await req.context.models.account_payment.destroy({
			where: {
				acc_number: id,
			},
		});
		return res.status(200).send(`Delete ${payload} rows`);
	} catch (error) {
		return res.status(400).send(error);
	}
};

export default {
	index,
	create,
	show,
	update,
	destroy,
};
