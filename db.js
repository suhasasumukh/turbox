// db.js

class VectorDB {
    constructor() {
        this.vectors = []; // Array to store vectors
    }

    // Method to add a vector
    addVector(id, vector) {
        this.vectors.push({ id, vector });
    }

    // Method to retrieve all vectors
    getAllVectors() {
        return this.vectors;
    }

    // Method to retrieve a vector by ID
    getVectorById(id) {
        return this.vectors.find(vec => vec.id === id);
    }

    // Method to delete a vector by ID
    deleteVector(id) {
        this.vectors = this.vectors.filter(vec => vec.id !== id);
    }

    // Method to sort vectors by criteria
    sortVectors(criteria) {
        switch(criteria) {
            case 'id':
                return this.vectors.sort((a, b) => a.id.localeCompare(b.id));
            case 'vector':
                return this.vectors.sort((a, b) => a.vector.length - b.vector.length);
            default:
                throw new Error(`Unsupported sorting criteria: ${criteria}`);
        }
    }

    // Method to perform vector addition
    vectorAddition(vector1, vector2) {
        if (vector1.length !== vector2.length) {
            throw new Error('Vectors must be of the same length for addition');
        }
        // Adding vectors element-wise
        const result = vector1.map((val, index) => val + vector2[index]);
        return result;
    }

    // Method to filter vectors based on criteria
    filterVectors(filterCriteria) {
        const { maxLength } = filterCriteria;
        return this.vectors.filter(vec => vec.vector.length <= maxLength);
    }

    // Method for advanced search with query parameters
    advancedSearch(id, minValue, maxValue) {
        return this.vectors.filter(vec => {
            return vec.id === id &&
                   vec.vector.every(val => val >= minValue && val <= maxValue);
        });
    }
}

module.exports = VectorDB;
