import { UserModel, UserModelInterface } from './user.model';

const getUsers = () => UserModel.find();

const getUserByEmail = (email: string) => UserModel.findOne({ email });

const getUserById = (id: string) => UserModel.findById(id);

const createUser = (values: UserModelInterface) =>
	new UserModel(values).save().then((user) => user.toObject());

const deleteUserById = (id: string) => UserModel.findByIdAndRemove({ _id: id });

const updateUserById = (id: string, values: UserModelInterface) =>
	UserModel.findByIdAndUpdate(id, values);

const UserModelHelpers = {
	getUsers,
	getUserByEmail,
	getUserById,
	createUser,
	deleteUserById,
	updateUserById,
};

export default UserModelHelpers;
