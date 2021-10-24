const index = async (req, res) => {
	try {
		const user_id = req.params.user_id;
		const payload = await req.context.models.account_payment.findAll();
		if (payload === null) {
			return res.sendStatus(404);
		} else {
			return res.status(200).send(payload);
		}
	} catch (error) {
		return res.sendStatus(404);
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
		return res.status(422);
	}
};

const show = async (req, res) => {
	try {
		const id = req.params.id;
		const payload = await req.context.models.account_payment.findByPk(id);
		return res.status(200).send(payload);
	} catch (error) {
		return res.sendStatus(404);
	}
};

const update = async (req, res, next) => {
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
		next();
		// return res.send(payload);
	} catch (error) {
		return res.sendStatus(422);
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
		return res.sendStatus(200);
	} catch (error) {
		return res.sendStatus(422);
	}
};

export default {
	index,
	create,
	show,
	update,
	destroy,
};
