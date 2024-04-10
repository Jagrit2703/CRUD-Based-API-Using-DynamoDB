# My API Project

This is a Node.js project using Express.js as the API gateway and DynamoDB as the database.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/my-api-project.git
   cd my-api-project
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```
   PORT=3000

   TABLE_NAME=your_db_table_name
   AWS_REGION=your_aws_region
   AWS_ACCESS_KEY_ID=your_access_key_id
   AWS_SECRET_ACCESS_KEY=your_secret_access_key
   ```

   Replace `your_aws_region`, `your_access_key_id`, and `your_secret_access_key` with your actual AWS credentials.

4. **Start the server:**

   ```bash
   node index.js
   or
   npm start
   ```

   Your API server should now be running on http://localhost:3000.

## Usage

You can now access the API endpoints to interact with your application. Here's an example endpoint:

- **Test Endpoint**: GET /test

  Returns a JSON message indicating that the server is running.

  Example:

  ```
  GET http://localhost:3000/test
  ```

  Response:

  ```json
  {
    "message": "This is a test endpoint!"
  }
  ```

- **User Endpoints**:

  GET /users

  Returns all the users from users table.

  Example:

  ```
  GET http://localhost:3000/users
  ```

  Response:

  ```json
    "success": true,
       "data": {
        "Items": [
            {
                "company-id": "1234",
                "updated-at": "6:00",
                "user-id": "1",
                "id": "123",
                "email": "dasdasadd@gmail.com",
                "name": "user-asdb",
                "created-at": "5:55"
            },
            {
                "company-id": "1234",
                "updated-at": "6:00",
                "user-id": "2",
                "id": "123",
                "email": "bcde@gmail.com",
                "name": "user-b",
                "created-at": "5:55"
            },
        ],
        "Count": 2,
        "ScannedCount": 2
    }
  ```

  GET /users/:userid/company/:companyid

  Returns the item whose ids are provided.

  Example:

  ```
  GET http://localhost:3000/users/1/company/1234
  ```

  Response:

  ```json
  {
    "success": true,
    "data": {
        "Item": {
            "company-id": "1234",
            "updated-at": "6:00",
            "user-id": "1",
            "email": "dasdasadd@gmail.com",
            "name": "user-asdb",
            "created-at": "5:55"
        }
    }
   }
  ```

  POST /users
  Returns a JSON message indicating that the item is successfully added.

  Example:

  ```
  POST http://localhost:3000/users
  ```

  Request:

  ```json
   {
    "user-id":"5",
    "company-id": "124",
    "updated-at": "6:00",
    "email": "sas@gmail.com",
    "name": "user-sas",
    "created-at": "5:55"
   }
  ```

  Response:

  ```json
   {
    "success": true
   }
  ```

  PUT /users/:uid/:cid
  Returns a JSON message indicating that the item is successfully updated.

  Example:

  ```
  PUT http://localhost:3000/users/5/124

  ```

  Request:

  ```json
  {
    "user-id":"5",
    "company-id": "124",
    "updated-at": "6:00",
    "email": "aabc@gmail.com",
    "name": "user-aabc",
    "created-at": "5:55"
   }
  ```

  Response:

  ```json
   {
    "success": true
   }
  ```

  DELETE /users/:uid/:cid
  Returns a JSON message indicating that the item is successfully deleted.

  Example:

  ```
  DELETE http://localhost:3000/users/2/123
  ```

  Response:

  ```json
  {
    "success": true
  }
  ```
- **Company Endpoints**:

  GET /company/:companyid

  Returns the item whose id is provided.

  Example:

  ```
  GET http://localhost:3000/company/231
  ```

  Response:

  ```json
   {
    "success": true,
    "data": {
        "Item": {
            "companyId": "231",
            "updatedAt": "6:00",
            "createdAt": "5:55",
            "address": "avcd",
            "name": "mike"
        }
    }
   }
  ```

  POST /company
  Returns a JSON message indicating that the item is successfully added.

  Example:

  ```
  POST http://localhost:3000/company
  ```

  Request:

  ```json
   {
    "companyId": "231",
    "name": "mike",
    "createdAt": "5:55",
    "address":"avcd",
    "updatedAt": "6:00"
   }
  ```

  Response:

  ```json
  {
    "success": true
   }
  ```

  PUT /company/:cid
  Returns a JSON message indicating that the item is successfully updated.

  Example:

  ```
  PUT http://localhost:3000/company/2

  ```

  Request:

  ```json
   {
    "companyId": "231",
    "name": "mikkey",
    "createdAt": "5:55",
    "address":"avcd",
    "updatedAt": "6:00"
   }
  ```

  Response:

  ```json
   {
    "success": true
   }
  ```

  DELETE /company/:cid
  Returns a JSON message indicating that the item is successfully deleted.

  Example:

  ```
  DELETE http://localhost:3000/company/2
  ```

  Response:

  ```json
  {
    "success": true
  }
  ```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
