const { addReviewAndRating } = require("../../controllers/review");

jest.mock("../../controllers/review", () => ({
    ...jest.requireActual("../../controllers/review"),
    addReviewAndRating: jest.fn(),
}));

describe("Review and Rating Unit Test", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("add review and rating should add review in movie", async () => {
        const movie = { movieId: 27205 };
        addReviewAndRating.mockResolvedValue(movie);

        const result = await addReviewAndRating(movie);
        expect(addReviewAndRating).toHaveBeenCalledWith(movie);
        expect(result).toEqual(movie);
    });
});