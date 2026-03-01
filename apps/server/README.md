# Nova Codenames server

This is the server part of the Nova-Codenames game. The server is deployed on the resource [Render.com](https://render.com/). The deployment is accessed via https://nova-codenames-server.onrender.com.

## Instructions for installing and running on a local machine

  - ### Downloading
    ```
    git clone https://github.com/mvavilin/Nova-Codenames.git
    ```
    
    ```
    cd Nova-Codenames/apps/server
    ```

  - ### Installing NPM modules
  
    ```
    git checkout dev
    ```
    
    ```
    npm install
    ```

  - ### Initial installation (Performed only for the first time)
  
  1. Install Docker if it is not installed on your local machine (Docker Desktop for Mac or Windows or Docker Engine for Linux)
     
  2. Launch docker
     
  3. Install the global docker package (if not already installed)
     
      ```
      npm install -g docker
      ```
  4. Create a .env file based on the .env.example file. Change settings if necessary.
  
  5. Create image and run container with posgres database
     
      ```
      docker compose up
      ```
  6. Update migration for prisma

      ```
      npm run prisma:migrate
      ```
  7. Generate Prisma Client
  
      ```
      npm run prisma:generate
      ```

  - ### Running application
  
      ```
      npm run dev
      ```
      **!Important** Launch the app only if the initial settings have been completed
  
## Sending requests to the server

  - ### Structure of the URL for request
    The request URL must have the following structure
    ```
    {BASE_URL}{Endpoint}
    ```
    When requesting a local server, the BASE_URL will be
    ```
    http://localhost:{PORT}
    ```
    and when requesting a remote server, it will be
    ```
    https://nova-codenames-server.onrender.com
    ```
    Possible endpoints are listed below.
    
  - ### General requests
    
  1. **Login user**<br/>
    
      <details>
      
      - **Endpoint**

         /api/auth/login

      - **Method**

         `POST` 

      - **URL Params**

          None

      - **Body Params**
        ```
          {
            "email": string;
            "password": string;
          }
        ```
      - **Success response**
       
        **Code 200** <br/>
        **Content**
        ```
          {
            "id": string;
            "email": string;
            "username": string;
          }
        ```
        **Headers**
        ```
        "Auth_token": string;
        ```
      - **Error response**
   
        **Code 400 - Fields in the body are set incorrectly**<br/>
        **Code 403 - Invalid login or password**
      </details>

  2. **Register user**<br/>
    
      <details>
      
      - **Endpoint**

         /api/auth/register

      - **Method**

         `POST` 

      - **URL Params**

          None

      - **Body Params**
        ```
          {
            "email": string;
            "password": string;
            "username": string;
          }
        ```
      - **Success response**
       
        **Code 200** <br/>
        **Content**
        ```
          {
            "id": string;
            "email": string;
            "username": string;
          }
        ```
        **Headers**
        ```
        "Auth_token": string;
        ```
      - **Error response**
   
        **Code 400 - Fields in the body are set incorrectly**<br/>
        **Code 409 - Email is already busy**
      </details>

  - ### Additional (temporary) requests
    
  1. **Get all users**<br/>
    
      <details>
      
      - **Endpoint**

         /api/users

      - **Method**

         `GET` 

      - **URL Params**

          None

      - **Body Params** 
      
          None
      - **Success response**
       
        **Code 200** <br/>
        **Content**
        ```
          [
            {
              "id": string;
              "email": string;
              "username": string;
            }
          ]
        ```
        **Headers**
        
          None
      - **Error response**
   
          None
      </details>

  2. **Create user**<br/>
    
      <details>
      
      - **Endpoint**

         /api/users/

      - **Method**

         `POST` 

      - **URL Params**

          None

      - **Body Params**
        ```
          {
            "email": string;
            "password": string;
            "username": string;
          }
        ```
      - **Success response**
       
        **Code 201** <br/>
        **Content**
        ```
          {
            "id": string;
            "email": string;
            "username": string;
          }
        ```
        **Headers** 
        
          None
      - **Error response**
   
        **Code 400 - Fields in the body are set incorrectly**<br/>
        **Code 409 - Email is already busy**
      </details>

  3. **Get one user**<br/>
    
      <details>
      
      - **Endpoint**

         /api/users/:id

      - **Method**

         `GET` 

      - **URL Params**

          `id=[integer]`

      - **Body Params** 
      
          None
      - **Success response**
       
        **Code 200** <br/>
        **Content**
        ```
          {
            "id": string;
            "email": string;
            "username": string;
          }
        ```
        **Headers** 
        
          None
      - **Error response**
   
        **Code 400 - URL params are set incorrectly**<br/>
        **Code 404 - User not found**
      </details>
  4. **Delete user**<br/>
    
      <details>
      
      - **Endpoint**

         /api/users/:id

      - **Method**

         `DELETE` 

      - **URL Params**

          `id=[integer]`

      - **Body Params** 
      
          None
      - **Success response**
       
        **Code 204** <br/>
        **Content**
        ```
          {
            "id": string;
            "email": string;
            "username": string;
          }
        ```
        **Headers** 
        
          None
      - **Error response**
   
        **Code 400 - URL params are set incorrectly**<br/>
        **Code 404 - User not found**
      </details>
