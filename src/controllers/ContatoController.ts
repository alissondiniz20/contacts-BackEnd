import { Request, Response } from "express"; 
import { ContatoModel } from "../database/models/ContatoModel";
import { validationResult } from "express-validator"

class ContatoController {
 
  async create(req: any, res: Response) {
    const erros = validationResult(req) 

    try {
      if (erros.isEmpty()) {
        await ContatoModel.create(req.body)
          res.status(201).json({ msg: `Contato criado com sucesso.` })
      } 
      else {
        res.status(400).json(erros)
      }  
    }
    catch (erro) {
      return res
        .status(500).json({ msg: `Erro no servidor. Tente novamente! ${erro}` })
    }  

  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await ContatoModel.update(req.body, {where: { id }});

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

    try {
      return res
        .status(200).json(contatos);
    }
    catch (erro) {
      return res.status(500).json({ msg: `Erro no servidor. Tente novamente! ${erro}` })
    }

  }

  async findOne(req: Request, res: Response) {
    const contato = await ContatoModel.findByPk(req.params.id);

    if (!contato) {
      return res.status(404).json({ msg: `Contato não encontrado.`})
    }

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
      res.status(500).json({ msg: 'Erro no servidor. Tente novamente!' });
    }
    
  }
}

export default new ContatoController();