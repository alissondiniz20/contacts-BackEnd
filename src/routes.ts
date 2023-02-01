import { Router } from "express";
import ContatoController from "./controllers/ContatoController";
import { body } from "express-validator";

export const router = Router();

const validatorCreate = [
  body('nome')
    .exists().withMessage("Campo nome não preenchido")
    .notEmpty().withMessage("Campo não pode ser vazio"),

  body('sobrenome')
  .exists().withMessage("Campo nome não preenchido")
  .notEmpty().withMessage("Campo não pode ser vazio"),

  body('telefone')
    .exists().withMessage("Campo nome não preenchido")
    .notEmpty().withMessage("Campo não pode ser vazio"),

  body('datanasci')
    .exists().withMessage("Campo nome não preenchido")
    .notEmpty().withMessage("Campo não pode ser vazio"),
  body('endereco')
    .exists().withMessage("Campo nome não preenchido")
    .notEmpty().withMessage("Campo não pode ser vazio"),

  body('email')
    .exists().withMessage("Campo nome não preenchido")
    .notEmpty().withMessage("Campo não pode ser vazio")
] 

router.post("/", validatorCreate, ContatoController.create);

router.get("/", ContatoController.findAll);

router.get("/:id", ContatoController.findOne);

router.put("/:id", ContatoController.update);

router.delete("/:id", ContatoController.delete);