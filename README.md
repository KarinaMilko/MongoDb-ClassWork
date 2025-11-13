## 🌟 MongoDb-ClassWork: Practical MongoDB Essentials

This repository contains practical examples for working with the non-relational database **MongoDB** (a document-oriented NoSQL database) using the `mongosh` console.

The project demonstrates key differences from relational databases (like PostgreSQL) and the core operations.

---

### ⚙️ Core Terms and Commands

| SQL (PostgreSQL) Equivalent | NoSQL (MongoDB) Term |
| :--- | :--- |
| Table | **Collection** |
| Row | **Document** |

| Command | Purpose |
| :--- | :--- |
| `mongosh` | Starts the console client. |
| `use usersDb` | Switches to the specified database. |
| `show collections` | Shows collections in the current DB. |

---

### 💾 Key Operations (CRUD)

The `playground-1.mongodb.js` file contains essential queries covering the CRUD methodology:

1.  **Create (C)**: Data insertion.
    * `db.users.insertOne({})` / `db.users.insertMany([])`
2.  **Read (R)**: Data retrieval.
    * `db.users.find({ filter }, { projection })`
    * Includes examples of filtering (`$gt`, `$or`), sorting (`sort`), and pagination (`limit`, `skip`).
3.  **Update (U)**: Data modification.
    * `db.users.updateOne({ filter }, { $set: {} })`
4.  **Delete (D)**: Data removal.
    * `db.users.deleteOne({})`

---

### 🧩 Advanced Queries

The examples extend beyond basic CRUD to demonstrate powerful features for data analysis and modeling:

* **Aggregation Pipeline**: Uses multi-stage processing for complex data analysis. Key stages include:
    * `$match` (filtering, like SQL `WHERE`)
    * **`$group`** (grouping data and performing calculations, like SQL `GROUP BY`)
* **Relationships (JOIN)**: Demonstrates linking documents between different collections (e.g., `users` and `tasks1`) using the **`$lookup`** operator, simulating a SQL `LEFT JOIN`.
