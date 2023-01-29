import { Router } from "express";
import ContatoController from "./controllers/ContatoController";

export const router = Router();

router.post("/", ContatoController.create);

router.get("/", ContatoController.findAll);

router.get("/:id", ContatoController.findOne);

router.put("/:id", ContatoController.update);

router.delete("/:id", ContatoController.delete);