# 📓 MercadoLibros 📓

## Descripción

Este proyecto consta de dos aplicaciones, una API REST y una aplicación web.  La aplicación web es un cliente que consume la API REST y permite a los usuarios realizar operaciones CRUD.

## Como correr el proyecto

### API REST

```bash
docker-compose up -d postgres prisma
```

Luego de que los contenedores estén corriendo, se procede a levantar el servidor de la API REST.

```bash
cd backend
npm install
npm run start:dev
```

En caso de tener problemas con las dependecias tambien se puede correr el backened con Docker.

```bash
docker-compose up -d server
```

### Aplicación web

```bash
cd frontend
npm install 
npm run start
```