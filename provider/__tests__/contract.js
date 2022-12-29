const { Verifier } = require("@pact-foundation/pact");
const { app } = require("../app");
const path = require("path");

const server = app.listen(8081);

describe("Pact verification", () => {
  it("validates the expectations of ProductService", () => {
    const opts = {
      provider: "CompaniesProvider",
      logLevel: "DEBUG",
      providerBaseUrl: "http://localhost:8081",
      pactUrls: [
        path.resolve(
          __dirname,
          "../../consumer/pacts/companiesconsumer-companiesprovider.json"
        ),
      ],
    };

    return new Verifier(opts).verifyProvider().finally(() => {
      console.log("Pact Verification complete");

      server.close();
    });
  });
});
