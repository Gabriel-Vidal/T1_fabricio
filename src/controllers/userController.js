const {User: UserModel} = require("../models/user");

const userController = {

        create : async(req, res) => {
            try {
                const user = {
                    user: req.body.user,
                    senha: req.body.senha,
                    funcao: req.body.funcao,
                };

                const response = await UserModel.create(user);

                res.status(201).json({response, msg: "criado"})
            } catch (error) {
                console.log(error);
            }
        },

        get : async(req, res) => {
            try {
                const user = await UserModel.find();
                res.json(user);
            } catch (error) {
                console.log(error);
            }
        },

        getAll: async(req, res) => {
            try {
                const id = req.params.id;
                const user = await UserModel.findById(id);

                if(!user) {
                    res.status(404).json({msg: 'Serviço não encontrado'});
                    return;
                }

                res.json(user);
            } catch (error) {
                console.log(error)
            }
        },

        delete: async(req, res) => {
            try {
                const id = req.params.id

                const user = await UserModel.findById(id)

                if(!user) {
                    res.status(404).json({msg: 'Não localizado.'});
                    return;
                }

                const deleteUser = await UserModel.findByIdAndDelete(id)
                res.status(200).json({msg: 'Usuario deletado'});
                
            } catch (error) {
                console.log(error)
            }
        },

        update: async (req, res) => {

            const id = req.params.id;

            const user = {
                user: req.body.user,
                senha: req.body.senha,
                funcao: req.body.funcao,
            };

            const updatedUsers = await UserModel.findByIdAndUpdate(id, user);

            if(!updatedUsers) {
                res.status(404).json({ msg: "Usuario não encontrado" })
                return;
            }

            res.status(200).json({ user, msg: "Usuario atualizado com sucesso" });
        }
};



module.exports = userController;