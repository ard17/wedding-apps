import bcrypt from 'bcrypt';
const SALT_ROUND = 10;

const signup = async (req, res) => {
	const { username, email, user_password, user_phone, user_roles } = req.body;

	let hashPassword = user_password;
	hashPassword = await bcrypt.hash(hashPassword, SALT_ROUND);
	try {
		const result = await req.context.models.users.create({
			user_name: username,
			user_email: email,
			user_password: hashPassword,
			user_handphone: user_phone,
			user_roles: user_roles,
		});
		return res.send({ username, user_password });
	} catch (error) {
		return res.status(422).send(error);
	}
};

const signin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const result = await req.context.models.users.findOne({
			where: { user_email: email },
		});
		const { user_name, user_email, user_password } = result.dataValues;
		const compare = await bcrypt.compare(password, user_password);
		if (compare) {
			return res.send({ user_name, user_email });
		} else {
			return res.sendStatus(404);
		}
	} catch (error) {
		return res.sendStatus(404);
	}
};

const updateRow = async (req, res) => {
	const { username, email, user_password, user_phone, user_roles } = req.body;
	let hashPassword = user_password;
	hashPassword = await bcrypt.hash(hashPassword, SALT_ROUND);

	const result = await req.context.models.users.update(
		{
			user_name: username,
			user_email: email,
			user_password: hashPassword,
			user_handphone: user_phone,
			user_roles: user_roles,
		},
		{
			returning: true,
			where: { weve_id: req.params.id },
		}
	);
	return res.send(result);
};

// delete from category where cate_id=${id}
const deleteRow = async (req, res) => {
	const userId = req.params.id;

	await req.context.models.users
		.destroy({
			where: { user_id: userId },
		})
		.then((result) => {
			return res.send('delete ' + result + ' rows.');
		})
		.catch((error) => {
			return res.sendStatus(404).send('Data not found.');
		});
};

export default {
	signup,
	signin,
	updateRow,
	deleteRow,
};
