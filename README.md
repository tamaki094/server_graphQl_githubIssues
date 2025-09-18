
# Servidor GraphQL con Node.js, Express y GraphQL Yoga

Este proyecto es un servidor GraphQL construido por **Edri** usando Node.js, Express y GraphQL Yoga. El servidor consulta los *issues* del repositorio oficial de Angular en GitHub y expone endpoints para obtener información útil como etiquetas y autores.

## 🚀 Tecnologías utilizadas
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server)
- [Axios](https://axios-http.com/)

## 📦 Instalación
```bash
npm install
```

## ▶️ Ejecución
```bash
nodemon index.js
```
El servidor estará disponible en:
```
http://localhost:4000/graphql
```

## 📌 Endpoints disponibles

### `issues`
Obtiene los issues del repositorio `angular/angular` desde GitHub.
```graphql
query {
  issues {
    id
    number
    title
    html_url
    state
    created_at
    updated_at
    user {
      login
      html_url
      avatar_url
    }
    labels {
      name
      description
      color
    }
  }
}
```

### `searchLabels(term: String!)`
Busca etiquetas dentro de los issues que contengan el término especificado.
```graphql
query BuscarEtiquetas($term: String!) {
  searchLabels(term: $term) {
    name
    description
    color
  }
}
```

## 🧪 Cómo probar en Postman
1. Método: `POST`
2. URL: `http://localhost:4000/graphql`
3. En la pestaña **GraphQL**, escribe la consulta.
4. Si usas variables, agrégalas en la pestaña **Query Variables**.

## ✨ Autor
Creado con cariño por **Edri** 💻
