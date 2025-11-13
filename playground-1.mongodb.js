// СУБД:       PostgreSQL   MongoDB
// port:       5432         27017
// clients:
// - CLI:      psql         mongosh
// - GUI:      PGAdmin, ... Compass
//             VSCode Ext   VSCode Ext
//             Server App   Server App
// ---------------------------------

// --- Start/stop mongo ---
// sudo systemctl status mongod

// sudo systemctl is-enabled mongod
// sudo systemctl enable mongod

// sudo systemctl start mongod
// sudo systemctl stop mongod

// ----- SHELL COMMANDS -----
// mongosh - start console client
// help    - shell help
// show dbs
// use db_name
// show collections
// db   - поточна БД
// exit - exit console client

// db.help() - database class help
// db.getMongo()
// --------------------------------

// use users - in shell
use("usersDb");

// --------------------------------

// --- collection (table) / document (row)
// [{},{},...] - collection
// {} - document

// ----- CRUD -----

// C insertOne({})/insertMany([])          INSERT
// R find({},{}).sort({}).limit().skip()   SELECT
// U updateOne/updateMany({фильтр},{})     UPDATE
// D deleteOne/deleteMany({фильтр})        DELETE

// --- C - INSERT - insertOne({})/insertMany([])
db.users.insertOne({ name: "Test", age: 20 });
db.users.insertOne({ name: "Ivo", age:￼
  {
    firstName: "Test1",
    lastName: "testovych1",
    email: "test@test.com",
    birthday: new Date(1995, 5, 20),
    isMarried: false,
    yearsOfExperiense: 8,
    gender: "male",
  },
  {
    firstName: "Test2",
    lastName: "testovych2",
    email: "test2@test.com",
    birthday: new Date(1998, 1, 5),
    yearsOfExperiense: 5,
    gender: "female",
    languages: ["EN", "UA"],
    phone: {
      work: "+380987654321",
      home: "+380987654322",
    },
  },
  {
    firstName: "Test2",
    lastName: "testovych2",
    email: "test2@test.com",
    birthday: new Date(1998, 1, 5),
    yearsOfExperiense: 5,
    gender: "female",
    languages: ["UA", "EN"],
    phone: {
      work: "+380987654321",
      home: "+380987654322",
    },
  },
  {
    firstName: "Test2",
    lastName: "testovych2",
    email: "test2@test.com",
    birthday: new Date(1998, 1, 5),
    yearsOfExperiense: 5,
    gender: "female",
    languages: ["EN", "UA", "PL"],
    phone: {
      work: "+380987654321",
      home: "+380987654322",
    },
  },
]);
db.users.insertMany([
  {
    name: "John Smith",
    email: "john.smith@example.com",
    yearsOfExperience: 5,
    address: {
      city: "Kyiv",
      street: "Khreshchatyk Street",
      building: "20",
    },
    hobbies: ["football", "reading", "traveling"],
    birthDate: new Date("1993-04-15"),
    gender: "male", // Gender field
  },
  {
    name: "Olena Petrivna",
    email: "olena.petrovna@example.com",
    yearsOfExperience: 3,
    address: {
      city: "Lviv",
      street: "Svobody Avenue",
      building: "5",
    },
    hobbies: ["drawing", "cycling", "swimming"],
    birthDate: new Date("1998-02-10"),
    gender: "female", // Gender field
  },
  {
    name: "Andriy Sydorov",
    email: "andriy.sydorov@example.com",
    yearsOfExperience: 15,
    address: {
      city: "Odesa",
      street: "Derybasivska Street",
      building: "15",
    },
    hobbies: ["fishing", "chess", "gardening"],
    birthDate: new Date("1983-07-25"),
    gender: "male", // Gender field
  },
  {
    name: "Maria Kovalenko",
    email: "maria.kovalenko@example.com",
    yearsOfExperience: 10,
    address: {
      city: "Kharkiv",
      street: "Sumskaya Street",
      building: "12",
    },
    hobbies: ["traveling", "yoga", "cooking"],
    birthDate: new Date("1989-12-05"),
    gender: "female", // Gender field
  },
]);

// --- R - SELECT - find()

// пагінація - LIMIT OFFSET - limit skip
db.users.find().limit(2).skip(2);

// сортування - ORDER BY - sort
//  1 - ASC
// -1 - DESC

db.users.find().sort({ yearsOfExperience: -1 });
db.users.find().sort({ lastName: 1, firstName: 1 });

// пагінація + сортування
// відобразити другу сторінку з 3 користувачів, впорядкованих за імейл за зрост.
db.users.find().sort({ email: 1 }).limit(3).skip(3);

// проєкція
// SELECT first_name ...

// ----- проекція ---- SELECT firstName
//           WHERE    SELECT firstName
//               \    /
// db.users.find({}, { firstName: 1 })
// db.users.find({}, { firstName: 1, _id: 0 })

db.users.find({}, { firstName: 1, lastName: 1, _id: 0 });
db.users.find({}, { name: 1, _id: 0 });

// фільтрація - WHERE - find({})
// gender = 'male'
db.users.find({ gender: "male" });

// WHERE firstName = 'Test1' AND isMarried = false
db.users.find({ firstName: "Test1", lastName: "testovych1" });
db.users.find({ firstName: "Test1", isMarried: false });

// WHERE firstName = 'Test1' OR lastName = 'testovych2'
db.users.find({ $or: [{ firstName: "Test1" }, { lastName: "testovych2" }] });

// WHERE yearsOfExperience > 4
db.users.find({ yearsOfExperience: { $gt: 4 } });

// birthDate від 1990 до 1999
// birthDate >= 1990-01-01 AND birthDate <= 1999-12-31
db.users.find({
  $and: [
    { birthDate: { $gte: new Date(1990, 0, 1) } },
    { birthDate: { $lte: new Date(1999, 11, 31) } },
  ],
});

// Загальний вигляд:
// db.collection.find({ фільтрация }, { проекція }).sort({}).limit().skip()

// Вбудовані документи
// from Lviv
db.users.find({ "address.city": "Lviv" });

// Пошук за масивом
// ["EN", "UA"], ["EN", "UA"], ["UA", "EN"], ["EN", "UA", "PL"];
// повні відповідність
db.users.find({ languages: ["EN", "UA"] });
// мають міститися
db.users.find({ languages: { $all: ["EN", "UA"] } });
// має міститися
db.users.find({ languages: "PL" });

// U - UPDATE - updateOne/updateMany
// db.collection.updateOne(<filter>, <update>, <options>)
// db.collection.updateMany(<filter>, <update>, <options>)
// db.collection.replaceOne(<filter>, <update>, <options>)

// змінити ім'я користувачу
db.users.updateOne({ name: "Test" }, { $set: { name: "newTest" } });
// змінити вік користувачу
db.users.updateOne(
  { _id: ObjectId("67239ba94a26f68c68033a2f") },
  { $set: { age: 21 } }
);

// D - DELETE - deleteOne/Many({})
db.users.deleteOne({ _id: ObjectId("67239bbaad93648685d95851") });

// ----- AGGREGATION PIPELINE -----

// GROUP BY - $group stage in aggregation pipeline
// вивести кількість чоловіків і жінок

db.users.aggregate([
  {
    $group: {
      _id: "$gender",
      peopleCount: {
        $count: {},
      },
    },
  },
  {
    $sort: {
      peopleCount: -1,
    },
  },
]);

// порахувати кількість чоловіків і жінок,
// які мають років досвіду > 4
db.users.aggregate([
  {
    $match: {
      yearsOfExperience: { $gt: 4 },
    },
  },
  {
    $group: {
      _id: "$gender",
      peopleCount: {
        $count: {},
      },
    },
  },
]);

//sum(yearsOfExperience)
// відобразити сумарну кількість років досвіду серед жінок і чоловіків
db.users.aggregate([
  {
    $group: {
      _id: "$gender",
      sumYearsOfExp: {
        $sum: "$yearsOfExperience",
      },
    },
  },
]);

// ---------- З додаткового відео ----------
// Зв'язки

// SQL:
// users(_id, name, )
// tasks(_id, value, user_id)

// MongoDB:
// users(_id, name, task:[{ value},{value}]) - ненормалізовані

// tasks(_id, value, user:{name, ...}) --- дублювання (ПОГАНО!)

// users(_id, name, )
// tasks(_id, value, userId) - нормалізовані

db.tasks1.insertMany([
  { value: "To do HW", userId: ObjectId("67239ba94a26f68c68033a2f") },
  { value: "Walk", userId: ObjectId("67239ba94a26f68c68033a2f") },
  { value: "Read", userId: ObjectId("67239c83fab562072f201df2") },
  { value: "Go to the sea", userId: ObjectId("67239c83fab562072f201df2") },
  { value: "Sleep", userId: ObjectId("67239ea5292ebac4050ac4b8") },
  { value: "Visit parents", userId: ObjectId("67239ea5292ebac4050ac4b8") },
  {
    value: "To do children`s HW",
    userId: ObjectId("67239ba94a26f68c68033a2f"),
  },
  { value: "Rest", userId: ObjectId("67239ba94a26f68c68033a2f") },
]);

// SELECT * FROM users1 LEFT JOIN tasks1 ON users1._id=tasks1.userId

// sql:
// user1 task1
// user1 task2
// user2 task3
// user3 null

// MongoDb:
// user1 [task1, task2]
// user2 [task3]
// user3 []

// $lookup - JOIN stage in aggregation pipeline

db.users.aggregate([
  {
    $lookup: {
      from: "tasks1",
      localField: "_id",
      foreignField: "userId",
      as: "userTasks",
    },
  },
]);

db.tasks1.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "author",
    },
  },
]);

// відобразити користувачів з їх тасками молодше 1991 р.н.
// вивести ім'я, таски, без _id

// послідовність:
// 1 відібрати користувачів молодше 1991 р.н. ($match)
// 2 з'єднати з їх тасками ($lookup)
// 3 відобразити лише окремі поля ($project)

db.users1.aggregate([
  {
    $match: {
      birthday: { $gt: new Date("1991-12-31") },
    },
  },
  {
    $lookup: {
      from: "tasks1",
      localField: "_id",
      foreignField: "userId",
      as: "userTasks",
    },
  },
  {
    $project: {
      firstName: 1,
      _id: 0,
      userTasks: 1,
    },
  },
]);
