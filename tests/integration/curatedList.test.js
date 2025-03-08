const request = require("supertest");
const http = require("http");
const { app } = require("../../index");
const { createCuratedList, updateCuratedList, movieAddToCuratedList } = require("../../controllers/curatedLists");


let server;

beforeAll((done) => {
    server = http.createServer(app);
    server.listen(4040, done)
});

afterAll((done) => {
    server.close(done)
});

describe("Curated List API Endpoints Test", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("POST /api/curated-lists should create curated list valid input", async () => {
        const response = await request(server).post("/api/curated-lists").send({
            name: "Action Movies",
            description: "A collection of the best action films.",
            slug: "action-movies"
        });

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toEqual("Curated list created successfully.");
    });

    it("POST /api/curated-lists should return 400 name or description is missing", async () => {
        const response = await request(server).post("/api/curated-lists").send({
            description: "A collection of the best action films.",
            slug: "action-movies"
        });

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toEqual("Name and description are required.");
    });

    it("POST /api/curated-lists/:curatedListId should update curated list valid input", async () => {
        const response = await request(server).put("/api/curated-lists/2").send({
            name: "Thriller",
            description: "Good movie"
        });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("Curated list updated successfully.")
    });

    it("POST /api/curated-lists/:curatedListId should return 404 if id doesn't exist", async () => {
        const response = await request(server).put("/api/curated-lists/567").send({
            name: "Thriller",
            description: "Good movie"
        });

        expect(response.statusCode).toBe(404);
        expect(response.body.error).toEqual("Curated list not found with ID: 567")
    });

    it("POST /api/curated-lists/:curatedListId should return 400 name or description is missing", async () => {
        const response = await request(server).put("/api/curated-lists/2").send({
            name: "Thriller",
        });

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toEqual("Name and description are required.")
    });

    it("POST /api//movies/curated-list should add movie in the curated list", async () => {
        const response = await request(server).post("/api//movies/curated-list").send({
            movieId: 27205,
            curatedListId: 2
        });

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toEqual("Movie added to curated list successfully.")
    });

    it("POST /api//movies/curated-list should return 400 if invalid input", async () => {
        const response = await request(server).post("/api//movies/curated-list").send({
            movieId: 27205,
        });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toEqual("movieId and curatedListId are required.")
    });
});