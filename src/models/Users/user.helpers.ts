import { UserModel } from './user.model';

const getUsers = () => UserModel.find();

const getUserByEmail = (email: string) => UserModel.findOne({ email });

const getUserBySessionToken = (sessionToken: string) =>
	UserModel.findOne({
		'authorization.sessionToken': sessionToken,
	});

const getUserById = (id: string) => UserModel.findById(id);

const createUser = (values: Record<string, any>) =>
	new UserModel(values).save().then((user) => user.toObject());
