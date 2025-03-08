const request = require("supertest");
const http = require("http");
const { app } = require("../../index");

let server;

beforeAll((done) => {
    server = http.createServer(app);
    server.listen(4040, done);
});

afterAll((done) => {
    server.close(done);
});

describe("Review and Rating API Endpoint Test", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("POST /api/movies/:movieId/reviews should add review and rating", async() => {
        const response = await request(server).post("/api/movies/2/reviews").send({
            rating: 5.5,
            reviewText: "Great movie"
        });

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toEqual("Review added successfully.");
    });

    it("POST /api/movies/:movieId/reviews should return 404 if id is not found", async() => {
        const response = await request(server).post("/api/movies/444/reviews").send({
            rating: 5.5,
            reviewText: "Great movie"
        });

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toEqual("Movie not found.");
    });

    it("POST /api/movies/:movieId/reviews should return 400 if rating is not number", async() => {
        const response = await request(server).post("/api/movies/444/reviews").send({
            rating: "5.5",
            reviewText: "Great movie"
        });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toEqual("Rating must be a float between 0 and 10.");
    });

    it("POST /api/movies/:movieId/reviews should return 400 if review is not string", async() => {
        const response = await request(server).post("/api/movies/444/reviews").send({
            rating: 5.5,
            reviewText: 234
        });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toEqual("Review text must not exceed 500 characters.");
    });

    
});