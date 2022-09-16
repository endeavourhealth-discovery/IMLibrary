import { it, describe, expect, afterAll, afterEach, beforeAll, beforeEach, vi } from "vitest";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { factory, primaryKey, manyOf, nullable } from "@mswjs/data";
import { faker } from "@faker-js/faker";

const apiUrl = "http://localhost/imapi/api/";

const data = factory({
  entity: {
    "@id": primaryKey(faker.internet.url),
    "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": nullable(manyOf("iriRef", { unique: true })),
    "http://www.w3.org/2000/01/rdf-schema#label": nullable(faker.lorem.sentence)
  },
  iriRef: {
    "@id": primaryKey(faker.internet.url),
    name: faker.lorem.sentence
  },
  pagedChildren: {
    uuid: primaryKey(faker.datatype.uuid),
    result: manyOf("entitySummary", { unique: true }),
    totalCount: Number
  },
  entitySummary: {
    "@id": primaryKey(faker.internet.url),
    hasChildren: Boolean,
    hasGrandChildren: Boolean,
    name: faker.lorem.sentence,
    orderNumber: faker.datatype.number,
    parents: manyOf("iriRef", { unique: true }),
    type: manyOf("iriRef", { unique: true })
  }
});

const restHandlers = [
  rest.get(apiUrl + "entity/public/partial", async (req, res, ctx) => {
    console.log("using msw");
    const iri = req.url.searchParams.get("iri");
    const predicates = req.url.searchParams.get("predicates");
    const predicatesArray = predicates?.split(",");
    const entityValue = {};
    if (iri) entityValue["@id"] = iri;
    if (predicatesArray && !predicatesArray.includes("http://www.w3.org/1999/02/22-rdf-syntax")) entityValue["http://www.w3.org/1999/02/22-rdf-syntax"] = null;
    if (predicatesArray && !predicatesArray.includes("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"))
      entityValue["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"] = null;
    const entity = data.entity.create(entityValue);
    Object.keys(entity).forEach(key => {
      if (null === entity[key]) delete entity[key];
    });
    return res(ctx.status(200), ctx.json(entity));
  }),
  rest.get(apiUrl + "entity/public/parents", async (req, res, ctx) => {
    const iri = req.url.searchParams.get("iri");
    return res(ctx.status(200), ctx.json([data.entitySummary.create(), data.entitySummary.create()]));
  }),
  rest.get(apiUrl + "entity/public/childrenPaged", async (req, res, ctx) => {
    const iri = req.url.searchParams.get("iri");
    const children = [data.entitySummary.create(), data.entitySummary.create(), data.entitySummary.create(), data.entitySummary.create()];
    return res(ctx.status(200), ctx.json(data.pagedChildren.create({ result: children, totalCount: 4 })));
  }),
  rest.get(apiUrl + "entity/public/summary", async (req, res, ctx) => {
    const iri = req.url.searchParams.get("iri");
    if (iri) {
      const found = data.entitySummary.findFirst({ where: { "@id": { equals: iri } } });
      if (found) return res(ctx.status(200), ctx.json(found));
      else return res(ctx.status(200), ctx.json(data.pagedChildren.create()));
    } else return res(ctx.status(500), ctx.json({ errorMessage: "Missing iri parameter" }));
  })
];
const server = setupServer(...restHandlers);

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

afterAll(() => {
  server.close();
});

afterEach(() => {
  server.resetHandlers();
});

export { data, server, restHandlers };
