import { Mongo } from "@mayajs/mongo";
import todos from "../controllers/todos/todos.model";

export = Mongo({
  name: "your-db-name-here",
  connectionString: "your-connection-string-here",
  schemas: [
    todos, // Add Mongoose Schema here
  ],
});
