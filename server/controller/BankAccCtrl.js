const index = async (req, res) => {
	try {
		const payload = await req.context.models.bank_account.findAll();
		return res.status(200).send(payload);
	} catch (error) {
		return res.status(400).send(error);
	}
};

const show = async (req, res) => {
	try {
		const id = req.params.id;
		const payload = await req.context.models.bank_account.findByPk(id);
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
		const user_id = req.params.user_id;
		const {
			baac_acc_bank,
			baac_owner,
			baac_saldo,
			baac_pin_number,
			baac_start_date,
			baac_end_date,
			baac_type,
			baac_bank_id,
		} = req.body;
		const payload = await req.context.models.bank_account.create({
			baac_acc_bank: baac_acc_bank,
			baac_owner: baac_owner,
			baac_saldo: baac_saldo,
			baac_pin_number: baac_pin_number,
			baac_start_date: baac_start_date,
			baac_end_date: baac_end_date,
			baac_type: baac_type,
			baac_bank_id: baac_bank_id,
			baac_user_id: user_id,
		});
		return res.status(200).send(payload);
	} catch (error) {
		return res.status(422).send(error);
	}
};

const update = async (req, res) => {
	try {
		const { id, user_id } = req.params;
		const {
			baac_acc_bank,
			baac_owner,
			baac_saldo,
			baac_pin_number,
			baac_start_date,
			baac_end_date,
			baac_type,
			baac_bank_id,
		} = req.body;
		const payload = await req.context.models.bank_account.update(
			{
				baac_acc_bank: baac_acc_bank,
				baac_owner: baac_owner,
				baac_saldo: baac_saldo,
				baac_pin_number: baac_pin_number,
				baac_start_date: baac_start_date,
				baac_end_date: baac_end_date,
				baac_type: baac_type,
				baac_bank_id: baac_bank_id,
				baac_user_id: user_id,
			},
			{
				returning: true,
				where: {
					baac_acc_bank: id,
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
		const { id } = req.params;
		const payload = await req.context.models.bank_account.destroy({
			where: {
				baac_acc_bank: id,
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
