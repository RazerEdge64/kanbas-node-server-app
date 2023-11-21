

const assignment = {
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
};


const todos = [
    {
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09", completed: false,
    },
    {
        id: 2, title: "Test Assignment",
        description: "Test Assignment for NodeJS server with ExpressJS",
        due: "2021-09-09", completed: false,
    },
];



const Lab5 = (app) => {


    app.get("/a5/assignment", (req, res) => {
        res.json(assignment);
    });

    app.get("/a5/assignment/title", (req, res) => {
        res.json(assignment.title);
    });

    app.get("/a5/assignment/title/:newTitle", (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;
        res.json(assignment);
    });


    app.get("/a5/welcome", (req, res) => {
        res.send("Welcome to Assignment 5");
    });

    app.get("/a5/add/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) + parseInt(b);
        res.send(sum.toString());
    });

    app.get("/a5/subtract/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) - parseInt(b);
        res.send(sum.toString());
    });


    app.get("/a5/calculator", (req, res) => {
        const { a, b, operation } = req.query;
        let result = 0;
        switch (operation) {
            case "add":
                result = parseInt(a) + parseInt(b);
                break;
            case "subtract":
                result = parseInt(a) - parseInt(b);
                break;
            default:
                result = "Invalid operation";
        }
        res.send(result.toString());
    });

    app.get("/a5/todos/:id/completed/:completed", (req, res) => {
        const { id, completed } = req.params;
        const todo = todos.find((todo) => todo.id === parseInt(id));
        todo.completed = completed === "true";
        res.json(todo);
    });

    app.get("/a5/todos/:id/description/:description", (req, res) => {
        const { id, description } = req.params;
        const todo = todos.find((todo) => todo.id === parseInt(id));
        todo.description = description;
        res.json(todo);
    });

    app.get("/a5/todos", (req, res) => {
        res.json(todos);
    });

    app.delete("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        todos.splice(todos.indexOf(todo), 1);
        res.sendStatus(200);
    });


    // app.get("/a5/todos/:id/delete", (req, res) => {
    //   const { id } = req.params;
    //   const todo = todos.find((todo) => todo.id === parseInt(id));
    //   if (!todo) {
    //     res.res
    //         .status(404)
    //         .json({ message:
    //               `Unable to delete Todo with ID ${id}` });
    //     return;
    //   }
    //
    //   todos.splice(todos.indexOf(todo), 1);
    //   res.json(todos);
    // });
    app.get("/a5/todos/:id/delete", (req, res) => {
        const { id } = req.params;
        const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));

        if (todoIndex === -1) {
            res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
            return;
        }

        todos.splice(todoIndex, 1);
        res.json(todos);
    });


    app.post("/a5/todos", (req, res) => {
        const newTodo = {
            ...req.body,
            id: new Date().getTime(),
        };
        todos.push(newTodo);
        res.json(newTodo);
    });


    app.get("/a5/todos/create", (req, res) => {
        const id = todos.length + 1;
        const todo = { id, title: "New Todo", description: "New Todo", due: "2021-09-09", completed: false };
        todos.push(todo);
        res.json(todos);
    });

    app.get("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((todo) => todo.id === parseInt(id));
        res.json(todo);
    });

    app.get("/a5/todos/:id/title/:title", (req, res) => {
        const { id, title } = req.params;
        const todo = todos.find((todo) => todo.id === parseInt(id));
        todo.title = title;
        res.json(todos);
    });

    // app.put("/a5/todos/:id", (req, res) => {
    //   const { id } = req.params;
    //   const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    //
    //   if (todoIndex === -1) {
    //     return res.status(404).send('Todo not found');
    //   }
    //
    //
    //   try {
    //     const updatedTodo = req.body;
    //     if (!updatedTodo.title || !updatedTodo.description || !updatedTodo.due || typeof updatedTodo.completed !== 'boolean') {
    //       return res.status(400).send('Invalid request data');
    //     }
    //
    //     todos[todoIndex] = {
    //       ...todos[todoIndex],
    //       ...updatedTodo
    //     };
    //
    //     res.status(200).json(todos[todoIndex]);
    //   } catch (error) {
    //     res.status(500).send('Server error');
    //   }
    // });
    // app.put("/a5/todos/:id", (req, res) => {
    //   const { id } = req.params;
    //   const todo = todos.find((t) => t.id === parseInt(id));
    //   if (!todo) {
    //     res.res
    //         .status(404)
    //         .json({ message:
    //               `Unable to update Todo with ID ${id}` });
    //     return;
    //   }
    //   todo.title = req.body.title;
    //   todo.description = req.body.description;
    //   todo.due = req.body.due;
    //   todo.completed = req.body.completed;
    //   res.sendStatus(200);
    // });
    app.put("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todoIndex = todos.findIndex((t) => t.id === parseInt(id));

        if (todoIndex === -1) {
            res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
            return;
        }

        const updatedTodo = req.body;
        // You might want to add additional validation for the updatedTodo here

        todos[todoIndex] = {
            ...todos[todoIndex],
            ...updatedTodo
        };

        res.status(200).json(todos[todoIndex]);
    });




};
export default Lab5;