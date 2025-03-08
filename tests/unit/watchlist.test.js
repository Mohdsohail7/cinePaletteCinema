const {movieAddToWatchlist} = require("../../controllers/watchlist");

jest.mock("../../controllers/watchlist", () => ({
    ...jest.requireActual("../../controllers/watchlist"),
    movieAddToWatchlist: jest.fn()
}));

describe("watchlist Unit Test", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("movie add to watchlist should add movie in watchlist", async () => {
        const movie = { movieId: 27205 };
        movieAddToWatchlist.mockResolvedValue(movie);

        const result = await movieAddToWatchlist(movie);

        expect(movieAddToWatchlist).toHaveBeenCalledWith(movie);
        expect(result).toEqual(movie);
    });
})