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

## Work with API requests

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

1.  **Get all users**<br/>

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

2.  **Create user**<br/>

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

3.  **Get one user**<br/>

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

4.  **Delete user**<br/>

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

## Work with Socket.io
- ### Installation Socket.io on the client side
1. First options: installation after authentication
  ```
    const auth: Tokens = {
      auth_token,
      session_token: '',
    };
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      Constants.url,
      { auth },
    );
  ```
  The main disadvantage is that socket.io requires an authentication token during creation.
  
  **Important!** You must specify `Socket<ServerToClientEvents, ClientToServerEvents>` to type the data that goes to the server and back
  
2. Second options: install during app startup and connect after authentication (recommended)
  - Declare socket.io in a separate module with auto-connect blocking
  ```
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      Constants.url,
      { autoConnect: false },
    );
  ```
  - After authentication, pass the socket.io tokens and start it
  ```
    const auth: Tokens = {
      auth_token,
      session_token: '',
    };
    socket.auth = auth;
    socket.connect();
  ```
  - After logging out, disable socket.io
  ```
    socket.disconnect(
  ```
- ### Socket.io methods for interacting with the server
1. Register a new handler for the given event
  ```
    socket.on(type, (payload) => {
      // Event handler
    });
  ```
2. Remove listener for event
  ``` 
    socket.off(type);
  ```
3. Emits an event to the socket
  ```
    socket.emit(type, payload);
  ```

- ### List of events sent to the server (stored in the @repo/shared/src/socketEvents.ts)

  **Important!** Data is not converted to JSON for transmission to and from the server

  - **Create room**
    <details>
      
      - Request to server
      
      ```
        { type: 'room:create'; payload: { settings: RoomSettings } }
      ```
      
      - Response to all users in loggy and user who sent the request

      ```
        { type: 'room:created'; payload: { roomPreview: RoomPreview } }
      ```
    </details>

  - **Requesting a list of all rooms**
 
    <details>
 
      - Request to server
 
      ```
        { type: 'room:ask-list' }
      ```
 
      - Response to the user who sent the request
   
      ```
        { type: 'room:send-list'; payload: { roomPreviews: RoomPreview[] } }
      ```
    </details>

  - **Requesting a list of rooms with a filter by name**

    <details>
 
      - Request to server
   
      ```
        { type: 'room:search'; payload: { name: string | undefined } }
      ```
      If no room name is specified, a list of all rooms is returned
 
      - Response to the user who sent the request
   
      ```
        { type: 'room:send-list'; payload: { roomPreviews: RoomPreview[] } }
      ```
  
    </details>

  - **Join a room**

    <details>
 
    - Request to server
 
    ```
      { type: 'room:join'; payload: { roomId: string } }
    ```
 
    - Response to the user who sent the request
 
    ```
      { type: 'room:state'; payload: { roomInfo: RoomInfo } }
    ```
 
    - Response to all users in lobby
   
    ```
      { type: 'room:update-review'; payload: { roomPreview: RoomPreview } }
    ```

    - Response to all users in room
   
    ```
      { type: 'room:player-joined'; payload: { player: Player } }
    ```
 
    - Response in case of an error
   
    ```
      { type: 'error'; payload: { code: ErrorCode } }
    ```
    This request may receive a response with codes `ROOM_NOT_FOUND` and `ROOM_FULL`. The full list of error codes is listed below

    </details>

  - **Exit the room**

    <details>
      
    - Request to server
 
    ```
      { type: 'room:leave' }
    ```
 
    - Response to all users in lobby
   
    ```
      { type: 'room:update-review'; payload: { roomPreview: RoomPreview } }
    ```

    - Response to all users in room
   
    ```
      { type: 'room:player-left'; payload: { player: Player } }
    ```

    </details>

  - **Possible error codes**

    ```
      type ErrorCode = 'ROOM_NOT_FOUND' | 'ROOM_FULL' | 'INVALID_ACTION';
    ```

- ### List of types and interfaces for transferring data to and from the server (stored in the @repo/shared/src/types folder)

  **Important!** Data is not converted to JSON for transmission to and from the server

  <details>

  - Room settings that are transmitted to the server when a room is created
 
  ```
    export interface RoomSettings {
      name: string;
      maxPlayers: number;
    }
  ```

  - Room statuses
 
  ```
    export type RoomStatus = 'waiting' | 'playing' | 'finishing';
  ```

  - Reduced information about the room for display on the Lobby page

  ```
    export interface RoomPreview {
      id: string;
      name: string;
      maxPlayers: number;
      playerCount: number;
      status: RoomStatus;
    }
  ```

  - Player information for display on the Room page

  ```
    export type Player = {
      userId: string;
      username: string;
    };
  ```

  - Room Information

  ```
    export interface RoomInfo {
      id: string;
      name: string;
      maxPlayers: number;
      players: Player[];
    }
  ```
  
  </details>
