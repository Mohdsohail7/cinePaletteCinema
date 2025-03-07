const { createCuratedList, updateCuratedList, movieAddToCuratedList } = require("../../controllers/curatedLists");


jest.mock("../../controllers/curatedLists", () => ({
    ...jest.requireActual("../../controllers/curatedLists"),
    createCuratedList: jest.fn(),
    updateCuratedList: jest.fn(),
    movieAddToCuratedList: jest.fn()
}));

describe("curated list Unit Test", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("create Curated List should create curated list", async () => {
        const newCuratedList = { name: "Horror Movies", description: "A collection of the best horror films.", slug: "horror-movies" }
        createCuratedList.mockResolvedValue(newCuratedList);

        const curatedListCreated = await createCuratedList(newCuratedList);

        expect(createCuratedList).toHaveBeenCalledWith(newCuratedList);
        expect(curatedListCreated).toEqual(newCuratedList)
    });

    it ("update Curated List should update curated list", async () => {
        const updateCuratedData = { name: "Thriller Movies", description: "A collection of the best thriller films." }
        updateCuratedList.mockResolvedValue(updateCuratedData);

        const curatedList = await updateCuratedList(updateCuratedData);

        expect(updateCuratedList).toHaveBeenCalledWith(updateCuratedData);
        expect(curatedList).toEqual(updateCuratedData)
    });

    it ("movie add to Curated List should add movie in curated list", async () => {
        const addMovie = { movieId: 27205, curatedListId: 1}
        movieAddToCuratedList.mockResolvedValue(addMovie);

        const result = await movieAddToCuratedList(addMovie);

        expect(movieAddToCuratedList).toHaveBeenCalledWith(addMovie);
        expect(result).toEqual(addMovie)
    });
});