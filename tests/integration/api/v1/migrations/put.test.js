import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("PUT to /api/v1/migrations should return 405", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "PUT",
  });
  expect(response.status).toBe(405);

  const responseBody = await response.json();
  expect(responseBody.message).toBe("Método não permitido para este endpoint.");
});
