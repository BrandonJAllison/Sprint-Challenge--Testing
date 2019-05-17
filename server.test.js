const request = require("supertest");
const server = require("./server.js");

//test for GET route
describe("GET for '/games' while empty", () => {
    it("should return a status 200", async () => {
        const response = await request(server).get("/games");
        expect(response.status).toBe(200);
    });

    it("should return an empty array if no games in storage", async () => {
        const response = await request(server).get("/games");
        expect(response.body).toEqual([]);
    });
});

describe("GET route for '/games' while populated", () => {
    it("should return an array of all games", async () => {
        const response = await request(server).get("/games");
        expect(response.body.length).toBe(2);
    });
});

//test for POST route
describe("POST for '/games'", () => {
    it("should return a status 422 if sent invalid data", async () => {
        const response = await request(server).post("/games").send({invalid: "data"});
        expect(response.status).toBe(422);
    });
    it("should return an error message if sent invalid data", async () => {
        const response = await request(server).post("/games").send({invalid: "data"});
        expect(response.body.error).toBe("bad game data")
    });
    it("should return a status 201 if data posts successfully", async () => {
        const response = await request(server).post("/games").send({
            title: "Sonic the Hedgehog,
            genre: "Platform Game",
            releaseYear: 1991
        });
        expect(response.status).toBe(201);
    });

    it("should return a new item id if data posts successfully", async () => {
        const response = await request(server).post("/games").send({
            title: "Sonic the Hedgehog 2",
            genre: "Platform Game",
            releaseYear: 1992
        });
        expect(response.body).toBe(2);
    });
});



