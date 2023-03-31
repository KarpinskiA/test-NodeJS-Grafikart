// Fichier permettant d'interagir avec les requetes
// Il appelle les méthodes agissant sur les taches

import { createTodo, findTodos, removeTodo, updateTodo } from "../todos_storage.js";
import { json } from "node:stream/consumers";

//!Code mimifié
export async function index (req, res) {
  // je récupère toutes les taches
  return findTodos();
}

export async function create (req, res) {
  // je crée la nouvelle tache
  return createTodo(await json(req));
}

export async function remove (req, res, url) {
  // je récuprère l'URL dans les paramètres
  const id = parseInt(url.searchParams.get('id'), 10);
  // je crée la nouvelle tache
  await removeTodo(id);
  // je retourne 204 car la tache n'existe plus
  res.writeHead(204);
}

export async function update (req, res, url) {
  // je récuprère l'URL dans les paramètres
  const id = parseInt(url.searchParams.get('id'), 10);
  return updateTodo(id, await json(req));
}

/*! 
//!Code non mimifié
export async function index (req, res) {
  //je récupère toutes les taches
  const todos = await findTodos();
  return todos;
}

export async function create (req, res) {
  //je récuprère les données envoyé en requête
  const newTodo = await json(req);
  //je crée la nouvelle tache
  const todo = await createTodo(newTodo);
  return todo;
}

export async function remove (req, res, url) {
  //je récuprère l'URL dans les paramètres
  const id = parseInt(url.searchParams.get('id'), 10);
  //je crée la nouvelle tache
  await removeTodo(id);
  //je retourne 204 car la tache n'existe plus
  res.writeHead(204);
}

export async function update (req, res, url) {
  //je récuprère l'URL dans les paramètres
  const id = parseInt(url.searchParams.get('id'), 10);
  //je récuprère les données envoyé en requête
  const data = await json(req);
  //je crée la met a jour la tache
  const todo = await updateTodo(id, data);
  return todo;
}
*/