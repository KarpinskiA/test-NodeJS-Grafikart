// Fichier qui comporte toutes les fonctions permettant d'agir sur le stockage

import { readFile, writeFile } from "node:fs/promises";
import { NotFoundError } from "./errors.js";

const path = 'storage/todos.json';

/**
 * @typedef {objet} Todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */

/**
 * @return {Promise<Todo[]>}
 */
export async function findTodos () {
  // lit le contenu du fichier "patch"
  const data = await readFile(path, 'utf8');
  return JSON.parse(data);
}

/**
 * @param {string} title
 * @param {boolean} completed
 * @return {Promise<Todo>}
 */
export async function createTodo ({title, completed = false}) {
  // j'ajoute un id a la tache
  const todo = {id: Date.now(), title, completed};
  // je l'ajoute aux autres taches
  const todos = [todo, ...await findTodos()];
  // je l'écris dans le fichier
  await writeFile(path, JSON.stringify(todos, null, 2));
  return todo;
}

/**
 * @param {boolean} id
 * @return {Promise}
 */
export async function removeTodo (id) {
  // je récupère la liste des taches
  const todos = await findTodos();
  // je recherche si l'index de la tache existe
  const todo = todos.findIndex(todo => todo.id === id);
  // Si l'index n'existe pas, alors il renvoi -1
  if (todo === -1) {
    // je retourne une erreur
    throw new NotFoundError();
  }
  // je filtre les taches, si l'id est différent je veut garder la tache
  const todoFiltered = todos.filter(todo => todo.id !== id);
  // je l'écris dans le fichier
  await writeFile(path, JSON.stringify(todoFiltered, null, 2));
}

/**
 * @param {number} id
 * @param {{title?: string, completed?: boolean}} partialTodo
 * @return {Promise<Todo>}
 */
export async function updateTodo (id, partialTodo) { // V1: export async function updateTodo (id, {title})
  // je récupère la liste des taches
  const todos = await findTodos();
  // je cherche la tache dans la liste
  const todo = todos.find(todo => todo.id === id);
  // Si la tache n'existe pas
  if (todo === undefined){
    // je retourne une erreur
    throw new NotFoundError();
  }
  // V1: je fais manuellement les changements de chaque entrée => todo.title = title
  // Objet.assign permet de modifier un object mis en place
  Object.assign(todo, partialTodo);
  // je l'écris dans le fichier
  await writeFile(path, JSON.stringify(todos, null, 2));
  return todo;
}