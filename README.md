# ChatApp HQ

Welcome to ChatApp HQ, a messaging application project with both backend and frontend components. This README will guide you through the setup process, provide information on running the backend and frontend, and detail various API endpoints along with their descriptions, expected inputs, and outputs.

## Setup

### Backend

1. Clone the repository:
git clone https://github.com/rahulvijay5/chatApp_hq.git

2. Navigate to the backend directory:
cd chatApp_hq/backend

3. Install dependencies:
npm install

### Frontend

1. Navigate to the frontend directory:
cd chatApp_hq/frontend


2. Install dependencies:
npm install


## Running the Application

### Backend

- For development (localhost):
npm run dev

- For production:
npm start

### Frontend

- Run the frontend:
npm start

<!-- ## API Endpoints

### User Routes

| REST Method | URL                                  | Inputs                      | Outputs                                                                                                       |
|-------------|--------------------------------------|-----------------------------|----------------------------------------------------------------------------------------------------------------|
| POST        | /api/v1/user/register                | { "username": "", "password": "" } | Status Code and User Object                                                                                        |
| POST        | /api/v1/user/login                   | { "username": "", "password": "" } | Status Code and User Object                                                                                        |
| GET         | /api/v1/user/logout                  | -                           | Status Code                                                                                                    |
| GET         | /api/v1/user/                        | -                           | Status Code and List of Other Users                                                                             |
| POST        | /api/v1/user/updatestatus           | { "status": "" }            | Status Code                                                                                                    |
| GET         | /api/v1/user/status                 | -                           | Status Code and User Status Object                                                                             |
| GET         | /api/v1/user/status/:userId         | -                           | Status Code and User Status Object                                                                             |

### Message Routes

| REST Method | URL                                  | Inputs                      | Outputs                                                                                                       |
|-------------|--------------------------------------|-----------------------------|----------------------------------------------------------------------------------------------------------------|
| POST        | /api/v1/message/send/:id             | Message Object              | Status Code                                                                                                    |
| GET         | /api/v1/message/:id                 | -                           | Status Code and List of Messages                                                                               |

### AI Routes

| REST Method | URL                                  | Inputs                      | Outputs                                                                                                       |
|-------------|--------------------------------------|-----------------------------|----------------------------------------------------------------------------------------------------------------|
| POST        | /api/v1/user/ai/chat                 | { "message": "" }           | Status Code and AI Response Object                                                                             | -->

## Middlewares

The `isAuthenticated` middleware function is used to authenticate user requests. It verifies the JWT token present in the request cookie and sets the `req.id` property if the token is valid.

## Example Usage of Middleware

```javascript
import jwt from "jsonwebtoken";

const isAuthenticated = async(req,res,next) => {
try {
 const token = req.cookies.token;
 if(!token){
     return res.status(401).json({message:"User not authenticated."})
 };
 const decode = await jwt.verify(token,process.env.JWT_SECRET_KEY);
 if(!decode){
     return res.status(401).json({message:"Invalid token"});
 };
 req.id = decode.userId;
 next();
} catch (error) {
 console.log(error);
}
};

export default isAuthenticated;

const req = {
 id:"",
}
req.id = "sdlbgnjdfn"