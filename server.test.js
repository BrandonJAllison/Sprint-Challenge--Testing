const request = require("supertest");
const server = require("./server.js");

//test for GET route
describe("GET for '/games' while empty", () => {
    it("should return a status 200", async () => {
        const response = await request(server).get("/games");
        expect(response.status).toBe(200);
    });
    //test for empty game db
    it("should return an empty array if no games in storage", async () => {
        const response = await request(server).get("/games");
        expect(response.body).toEqual([]);
    });
});

//test for POST route
describe("POST for '/games'", () => {
    it("should return a status 422 if sent invalid data", async () => {
        const response = await request(server).post("/games").send({invalid: "data"});
        expect(response.status).toBe(422);
    });
    //test for invalid data
    it("should return an error message if sent invalid data", async () => {
        const response = await request(server).post("/games").send({invalid: "data"});
        expect(response.body.error).toBe("bad game data")
    });
    //test for sucessful post
    it("should return a status 201 if data posts successfully", async () => {
        const response = await request(server).post("/games").send({
            title: "Sonic the Hedgehog",
            genre: "Platform Game",
            releaseYear: 1991
        });
        expect(response.status).toBe(201);
    });

});

describe('DELETE /games/:id endpoint', () => {

    it('should delete a game from the database', async () => {
        
        let response = await request(server)
        .delete(`/games/2`);

        expect(response.status).toBe(200);
        
    });

    it('should return a response with status code 404 when a game was not found in the database', async () => {
        
        let response = await request(server)
        .delete(`/games/10`);

        expect(response.status).toBe(404);
        
    });

});

//Test for populated gamesDB
describe("GET route for '/games' while populated", () => {
    it("should return an array of all games", async () => {
        const response = await request(server).get("/games");
        expect(response.body.length).toBe(1);
    });
});





