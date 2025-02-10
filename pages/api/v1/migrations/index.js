import { createRouter } from "next-connect";
import controller from "infra/controller";
import migrator from "models/migrator";

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const pendingMigrations = await migrator.listPendingMigrations();
  return response.status(200).json(pendingMigrations);
}

async function postHandler(request, response) {
  const migratedMigrations = await migrator.applyMigrations();
  const responseCode = migratedMigrations.length === 0 ? 200 : 201;
  return response.status(responseCode).json(migratedMigrations);
}
