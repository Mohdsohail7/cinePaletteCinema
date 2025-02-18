const {CuratedList} = require("../models");


const createSlug = (name) => {
    const specialChars = "!@#$%^&*()_+[]{}|;:'\",.<>?/`~";
    const lowercaseName = name.toLowerCase();
    let slug = '';

    for (let i = 0; i < lowercaseName.length; i++) {
        const char = lowercaseName[i];
        if (specialChars.includes(char)) {
            continue; // skip special character
        }

        if (char === ' ') {
            // space replace with '-'
            if (slug.endsWith('-')) {
                continue; // avoid consctive '-'
            }
            slug += '-'
        } else {
            slug += char // valid characters
        }
    }
    // Remove any trailing hyphen
    return slug.endsWith('-') ? slug.slice(0, -1): slug;
}
async function createCuratedList(req, res){
    const { name, description, slug } = req.body;
    // input validations
    if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required.'});
    }

    try {
        const finalSlug = slug || createSlug(name);

        if (!finalSlug) {
            return res.status(400).json({ error: 'Slug is missing.'});
        }

        const createdCuratedList = await CuratedList.create({ name, description, slug: finalSlug });
        if (!createdCuratedList) {
            return res.status(400).json({ error: 'Curated List not created.'})
        }

        return res.status(201).json({ message: 'Curated list created successfully.' });
    } catch (error) {
        return res.status(500).json({ message: 'Server Internal Error.', error: error.message });
    }
}

async function updateCuratedList(req, res) {
    const {curatedListId} = req.params;
    const { name, description } = req.body;
    console.log('curatedlistid-->', curatedListId);
    if (!curatedListId) {
        return res.status(400).json({ error: 'Curated List ID is required.'});
    }

    if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required.'});
    }

    try {
        const findCuratedList = await CuratedList.findOne({ where: { id: curatedListId }});
        if (!findCuratedList) {
            return res.status(404).json({ error: `Curated list not found with ID: ${curatedListId}`});
        }

        findCuratedList.set({ name, description });

        const updatedCuratedList = await findCuratedList.save();

        return res.status(200).json({ message: 'Curated list updated successfully.' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error.', error: error.message });
    }

}

module.exports = { createCuratedList, updateCuratedList };