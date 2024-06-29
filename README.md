# ⚡Turbox Vector Database

Turbox implements an in-memory Vector Database API using Node.js and Express. It allows users to store, retrieve, manipulate, and search vectors through various HTTP endpoints.

It is built for blazing fast performance, Turbox provides efficient operations on vectors, ensuring rapid data access and manipulation.

## Release Installation

### v1.0.0

### Download the latest release [here](https://github.com/suhasasumukh/turbox/releases/tag/v1.0.0).
- Click on **server.exe** to download the executable file.
- When downloaded, run the file. You will see a popup screen stating that the server is running on localhost:3000
<br>

![image](https://github.com/suhasasumukh/turbox/assets/70210383/45b6f180-0464-4c7a-816d-e72ef3f556bb)

- Once the server is running locally, open **PowerShell** to execute the endpoints

> [!IMPORTANT]
> Run the endpoints from the same directory where the server.exe is downloaded.

- [Here](https://github.com/suhasasumukh/turbox#vector-endpoints) are the list of endpoints you can run the VDB on.

<br>
<br>

This release includes the initial implementation of Turbox Vector Database.

Features:
- Implemented CRUD operations for vectors.
- Added sorting, addition, filtering, and advanced search functionalities with fast speed.

## Local Installation

To install and run the Turbox Vector Database locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/suhasasumukh/turbox.git
   cd turbox

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the server:**

   ```bash
   npm start
   ```
The server will start running at http://localhost:3000.

> [!NOTE]
> Turbox is actively maintained. We are committed to continuously improving this Vector Database API to ensure robust functionality and reliability.

## Vector endpoints

#### Add a Vector

   ```bash
   $body = @{
       id = "vec1"
       vector = @(1, 2, 3)
   } | ConvertTo-Json

   Invoke-RestMethod -Method POST -Uri 'http://localhost:3000/vector' -Body $body -ContentType 'application/json'
   ```

#### Retrieve All Vectors
   ```bash
   Invoke-RestMethod -Method GET -Uri 'http://localhost:3000/vectors'
   ```

#### Retrieve a Specific Vector by ID
   ```bash
   Invoke-RestMethod -Method GET -Uri 'http://localhost:3000/vector/vec1'
   ```

#### Delete a Vector by ID
   ```bash
   Invoke-RestMethod -Method DELETE -Uri 'http://localhost:3000/vector/vec1'
   ```

#### Sort Vectors
   ```bash
   Invoke-RestMethod -Method GET -Uri 'http://localhost:3000/vectors/sort/id'
   ```

#### Perform Vector Addition
   ```bash
   $body = @{
       vector1 = @(1, 2, 3)
       vector2 = @(4, 5, 6)
   } | ConvertTo-Json

   Invoke-RestMethod -Method POST -Uri 'http://localhost:3000/vector/addition' -Body $body -ContentType 'application/json'
   ```

#### Filter Vectors
   ```bash
   $body = @{
       filterCriteria = @{
           maxLength = 5
       }
   } | ConvertTo-Json

   Invoke-RestMethod -Method POST -Uri 'http://localhost:3000/vectors/filter' -Body $body -ContentType 'application/json'
   ```

#### Advanced Search
   ```bash
   Invoke-RestMethod -Method GET -Uri 'http://localhost:3000/vectors/search?id=vec1&minValue=1&maxValue=5'
   ```

## License
This project is licensed under the MIT License - see the LICENSE file for details.
