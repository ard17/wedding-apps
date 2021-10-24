const updatePaymentAcc = async (req, res, next) => {
	const { acc_number, baac_acc_bank, amount, payt_type } = req.body;

	try {
		const accPayment = await req.context.models.account_payment.findByPk(
			acc_number
		);
		switch (payt_type) {
			case 'topup':
				accPayment.acc_saldo =
					parseInt(accPayment.acc_saldo) + parseInt(amount);
				break;
			case 'order':
				if (parseInt(accPayment.acc_saldo) < parseInt(amount)) {
					return res.status(422).send('Saldo Tidak Cukup');
				} else {
					accPayment.acc_saldo =
						parseInt(accPayment.acc_saldo) - parseInt(amount);
				}
				break;
			case 'refund':
				accPayment.acc_saldo =
					parseInt(accPayment.acc_saldo) + parseInt(amount);
				break;
			case 'transfer':
				if (!baac_acc_bank) {
					accPayment.acc_saldo =
						parseInt(accPayment.acc_saldo) + parseInt(amount);
				} else {
					accPayment.acc_saldo =
						parseInt(accPayment.acc_saldo) - parseInt(amount);
				}
				break;
		}
		await req.context.models.account_payment.update(
			{
				acc_saldo: accPayment.acc_saldo,
			},
			{
				returning: true,
				where: {
					acc_number: acc_number,
				},
			}
		);
		next();
	} catch (error) {
		return res.sendStatus(422);
	}
};

const updateBankAcc = async (req, res, next) => {
	const { baac_acc_bank, baac_pin_number, amount, payt_type } = req.body;
	try {
		const accBank = await req.context.models.bank_account.findOne({
			where: {
				baac_acc_bank: baac_acc_bank,
			},
		});
		if (accBank === null) {
			return res.sendStatus(404);
		} else {
			console.log(accBank.baac_saldo);
			switch (payt_type) {
				case 'topup':
					if (accBank.baac_pin_number !== baac_pin_number) {
						return res
							.status(422)
							.send('Pin yang ada masukkan salah');
					} else {
						if (parseInt(accBank.baac_saldo) < parseInt(amount)) {
							return res.status(422).send('Saldo Tidak Cukup');
						} else {
							accBank.baac_saldo =
								parseInt(accBank.baac_saldo) - parseInt(amount);
						}
					}
					break;
				case 'transfer':
					accBank.baac_saldo =
						parseInt(accBank.baac_saldo) + parseInt(amount);
					break;
			}
			await req.context.models.bank_account.update(
				{
					baac_saldo: accBank.baac_saldo,
				},
				{
					returning: true,
					where: {
						baac_acc_bank: baac_acc_bank,
					},
				}
			);
			next();
		}
	} catch (error) {
		return res.sendStatus(404);
	}
};

const getDataTrx = async (req, res, next) => {
	try {
		const { payt_trx_number, payt_type } = req.body;
		const payload = await req.context.models.payment_transaction.findOne({
			where: { payt_trx_number: payt_trx_number },
		});
		if (payload === null) {
			res.sendStatus(404);
		} else {
			req.body.amount = parseInt(payload.payt_credit);
			if (payt_type === 'refund') {
				req.body.acc_number = payload.payt_acc_number;
			}
			next();
		}
	} catch (error) {
		res.sendStatus(404);
	}
};

export default {
	updatePaymentAcc,
	updateBankAcc,
	getDataTrx,
};
