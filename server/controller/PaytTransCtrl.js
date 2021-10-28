const index = async (req, res) => {
	try {
		const payload = await req.context.models.payment_transaction.findAll();
		return res.status(200).send(payload);
	} catch (error) {
		return res.status(422).send(error);
	}
};

const create = async (req, res) => {
	try {
		const {
			order_name,
			baac_acc_bank,
			payt_trx_number,
			amount,
			payt_desc,
			payt_type,
			acc_number,
		} = req.body;
		let payt_debet = 0,
			payt_credit = 0,
			payt_promo_point = 0;
		if (
			payt_type === 'topup' ||
			payt_type === 'refund' ||
			(payt_type === 'transfer' && !baac_acc_bank)
		) {
			payt_debet = amount;
		} else {
			payt_credit = amount;
		}
		const payload = await req.context.models.payment_transaction.create({
			payt_order_number: order_name,
			payt_baac_acc_bank: baac_acc_bank,
			payt_trx_number_ref: payt_trx_number,
			payt_date: new Date(),
			payt_debet: payt_debet,
			payt_credit: payt_credit,
			payt_desc: payt_desc,
			payt_type: payt_type,
			payt_promo_point: payt_promo_point,
			payt_acc_number: acc_number,
		});
		return res.status(200).send(payload);
	} catch (error) {
		return res.status(422).send(error);
	}
};

const show = async (req, res) => {
	try {
		const id = req.params.id;
		const payload = await req.context.models.payment_transaction.findByPk(
			id
		);
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
		const id = req.params.id;
		const {
			payt_order_number,
			payt_baac_acc_bank,
			payt_trx_number_ref,
			payt_date,
			payt_debet,
			payt_credit,
			payt_desc,
			payt_type,
			payt_promo_point,
			payt_acc_number,
		} = req.body;
		const payload = await req.context.models.payment_transaction.update(
			{
				payt_order_number: payt_order_number,
				payt_baac_acc_bank: payt_baac_acc_bank,
				payt_trx_number_ref: payt_trx_number_ref,
				payt_date: payt_date,
				payt_debet: payt_debet,
				payt_credit: payt_credit,
				payt_desc: payt_desc,
				payt_type: payt_type,
				payt_promo_point: payt_promo_point,
				payt_acc_number: payt_acc_number,
			},
			{
				where: {
					payt_id: id,
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
		const payload = await req.context.models.payment_transaction.destroy({
			where: {
				payt_id: id,
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
