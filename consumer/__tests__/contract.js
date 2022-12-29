const path = require("path");
const { Pact } = require("@pact-foundation/pact");
const axios = require("axios");
const LOG_LEVEL = process.env.LOG_LEVEL || "WARN";
const { fetchCompanies } = require("../fetchCompanies");

describe("Pact with Companies API", () => {
  const provider = new Pact({
    cors: true,
    port: 1234,
    consumer: "CompaniesConsumer",
    provider: "CompaniesProvider",
    // port: 1234, // You can set the port explicitly here or dynamically (see setup() below)
    log: path.resolve(process.cwd(), "logs", "mockserver-integration.log"),
    dir: path.resolve(process.cwd(), "pacts"),
    logLevel: LOG_LEVEL,
    spec: 2,
    host: "localhost",
  });

  beforeAll(async () => await provider.setup());

  afterAll(() => provider.finalize());

  describe("when a call to list all companies is made", () => {
    afterEach(() => provider.verify);

    beforeAll(() =>
      provider.addInteraction({
        state: "is not authenticated",
        uponReceiving: "a request for all animals",
        withRequest: {
          method: "GET",
          path: "/companies",
        },
        willRespondWith: {
          status: 200,
          body: [{ id: 1, companies: "Github" }],
        },
      })
    );

    it("will receive the list of current companies", async () => {
      const res = await axios.get("http://127.0.0.1:1234/companies");

      expect(res.data).toMatchObject([{ id: 1, companies: "Github" }]);
    });
  });
});
