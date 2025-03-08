const {movieAddToWishlist} = require("../../controllers/wishlist");

jest.mock("../../controllers/wishlist", () => ({
    ...jest.requireActual("../../controllers/wishlist"),
    movieAddToWishlist: jest.fn(),
}));

describe("Wishlist Unit Test", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("movie add to wishlist should add movie in wishlist", async () => {
        const movie = { movieId: 27205 };
        movieAddToWishlist.mockResolvedValue(movie);

        const result = await movieAddToWishlist(movie);

        expect(movieAddToWishlist).toHaveBeenCalledWith(movie);
        expect(result).toEqual(movie);
    });
});