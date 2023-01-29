import { Request, Response } from "express"; 
import { ContatoModel } from "../database/models/ContatoModel";

class ContatoController {
  
  // async create(req: Request, res: Response) {
  //   console.log('teste', req)
  //   const { name, lastName, phone, birthDay, address, email } = req.body;
  //   console.log(req.body)
  //   const novoContato = await ContatoModel.create({
  //     name: 'Alisson',
  //     lastName: 'Diniz',
  //     phone: 888888888,
  //     address: 'rua teste',
  //     email: 'teste4@example.com'
  //   }).then(() => {
  //     res.writeHead(201).json({ message: 'Contato criado: ', novoContato });
  //   }).catch(error => {
  //     res.status(500).json({ message: `Falha ao criar contato.`, error });
  //   });
  // }


  // async findAll(req: Request, res: Response) {
  //   const contatos = await ContatoModel.findAll().then(() => {
  //     res.status(200).toString(({ message: `Contatos: `, contatos }))
  //   }).catch((error) => {
  //     res.status(500).json({ message: `Contatos não encontrandos:`, error })
  //   });
  // }

  // async findByPk(req: Request, res: Response) {
  //   const contato = await ContatoModel.findByPk(req.params.id).then(() => {
  //     console.log(req.params.id)
  //     res.status(200).json({ message: 'Contato: ', contato });
  //   }).catch((error) => {
  //     res.status(500).json({ message: `Contato não encontrado:`, error });
  //   });
  // }

  // async update(req: Request, res: Response) {
  //   if (req.params.name === null
  //   || req.params.lastName === null
  //   || req.params.phone === null
  //   || req.params.birthDay === null
  //   || req.params.address === null
  //   || req.params.email === null) {
  //     return res.jsonp({ status: 500, message: 'Informações inválidas' })
  //   }
    
  //   await ContatoModel.update(
  //       {
  //         name: req.body.name,
  //         lastName: req.body.lastName,
  //         phone: req.body.phone,
  //         birthday: req.body.birthday,
  //         address: req.body.address,
  //         email: req.body.email
  //       }, 
  //       {
  //       where: {
  //         id: req.params.id
  //       },
  //     },
  //     );
  //     ContatoModel.findByPk(req.params.id).then((resultado) => {
  //       res.status(200).json({ message: `Contanto atualizado.`, resultado });
  //     }).catch(error => {
  //       res.status(500).json({ message: `Error:`, error });
  //     });
  // }

  // async delete(req: Request, res: Response) {
  //   await ContatoModel.destroy({
  //       where: {
  //         id: req.params.id
  //       }
  //     });
  //     ContatoModel.findAll().then((resultado) => {
  //       res.status(200).json({ message: `Contato excluído.`, resultado })
  //     }).catch(error => {
  //       res.status(500).json({ message: `Falha ao excluir contato:`, error })
  //     });
  // }
 
  async create(req: Request, res: Response) {
    const { 
      nome, 
      sobrenome, 
      telefone, 
      datanasci, 
      endereco, 
      email 
    } = req.body;

    // if (
    //   !nome ||
    //   !sobrenome ||
    //   !telefone ||
    //   !datanasci ||
    //   !endereco ||
    //   !email
    //   ) {
    //   return res
    //     .status(422).json({
    //       msg: `Dados inválidos. 
    //         ${nome}, 
    //         ${sobrenome}, 
    //         ${telefone}, 
    //         ${datanasci}, 
    //         ${endereco}, 
    //         ${email}`
    //     })
    // }
  
    const novoContato = { 
      nome, 
      sobrenome, 
      telefone, 
      datanasci, 
      endereco, 
      email 
    }; 

    await ContatoModel.create(novoContato)

    try {    
      return res.status(201).json(novoContato.toString())
    }
    catch (erro) {
      return res
        .status(500).json({ msg: `Erro no servidor. Tente novamente! ${erro}`})
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { 
      nome, 
      sobrenome, 
      telefone, 
      datanasci, 
      endereco, 
      email 
    } = req.body;

    const contato = { 
      nome, 
      sobrenome, 
      telefone, 
      datanasci, 
      endereco, 
      email 
    };

    try {
      await ContatoModel.update({contato},{where: { id }});

      const updatedContact = await ContatoModel.findByPk(id);
      return res.status(200).json(updatedContact)
    }
    catch (erro) {
      return res
        .status(500).json({ msg: `Erro no servidor. Tente novamente! ${erro}`})
    }    
    
  }

  async findAll(req: Request, res: Response) {
    const contatos = await ContatoModel.findAll();
    console.log("lista de contatos: ", (contatos));

    try {
      return res
        .status(200).json(contatos);
    }
    catch (erro) {
      return res.status(500).json({ msg: `Erro no servidor. Tente novamente! ${erro}` })
    }
    // return res
    //   .setHeader('Content-Type', 'application/json')
    //   .end(contatos);
  }

  async findOne(req: Request, res: Response) {
    const contato = await ContatoModel.findByPk(req.params.id);

    try {
      return res.status(200).json(contato)
    } 
    catch (erro) {
      return res.status(500).json({ msg: `Erro no servidor. Tente novamente! ${erro}`})
    }
    
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;
    const contato = await ContatoModel.findByPk(id);

    if (!contato) {
      res
        .status(404).json({ 
          msg: 'Contato não encontrado. Tente novamente!'
        })
      return
    }

    try {
      await ContatoModel.destroy({where:{id}});

      return res.status(200).json({ msg: `Contato deletado.`});
    }
    catch (erro) {
      res.
        status(500).json({ msg: 'Erro no servidor. Tente novamente!' });
    }
    
  }
}

export default new ContatoController();