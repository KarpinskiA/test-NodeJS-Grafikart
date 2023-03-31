import { createServer } from "node:http";
import { create, index, remove, update } from "./functions/api/todos.js";
import { NotFoundError } from "./functions/errors.js";

createServer(async (req, res) => {
  // je fais un try catch pour gérer les erreurs
  try {
    // je précise que la réponse(res) renvoi du JSON
    res.setHeader('Content-Type', 'application/json');

    // je récupère l'url. Pour avoir le nom de l'hote = http://${req.headers.host}
    const url = new URL(req.url, `http://${req.headers.host}`);

    // Permet d'avoir la méthode HTTP et le endpoint appellé (ex= 'GET:/todos')
    const endpoint = `${req.method}:${url.pathname}`;

    let results = null;
    switch (endpoint) {
      case 'GET:/todos':
        results = await index(req, res);
        break;
      case 'POST:/todos':
        results = await create(req, res);
        break;
      case 'DELETE:/todos':
        results = await remove(req, res, url);
        break;
      case 'PUT:/todos':
        results = await update(req, res, url);
        break;

      default:
        // Si je ne connais pas l'URL alors on retourne une 404
        res.writeHead(404);
    }
    if (results) {
      res.write(JSON.stringify(results));
    }
  } catch (e) {
    if (e instanceof NotFoundError) {
      // Si je connais l'erreur alors on retourne une 404
      res.writeHead(404);
    } else {
      // Sinon je ne la connais pas
      throw e;
    }
  }
  res.end();
}).listen(3000); // je lance le serveur sur le port 3000