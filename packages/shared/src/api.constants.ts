export enum Endpoints {
  BASE = '/',
  LOGIN = '/api/auth/login',
  REGISTRATION = '/api/auth/register',
  USERS = '/api/users',
}

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

export enum ServerConstants {
  DEFAULT_PORT = 3000,
  DEFAULT_JWT_SECRET_KEY = 'secret123123',
  DEFAULT_FRONTEND_URL = 'http://localhost:5173',
}

export enum ServerUrl {
  LOCAL_BASE = 'http://localhost:3000',
  DEPLOY_BASE = 'https://nova-codenames-server.onrender.com',
}
