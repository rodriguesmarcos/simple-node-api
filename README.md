# Simple Node Api

This is a very basic api created with express to study purposes. Which I explore concepts such as:

- Routes
- CRUD
- Middlewares
-- Route middlewares
-- Global middleware

This application will be used to store projects and their tasks.

## API Endpoints

| Endpoints                  | Usage                                      | Params               |
| -------------------------- | ------------------------------------------ | -------------------- |
| `GET /projects`            | Get all projects available and their tasks |                      |
| `POST /projects`           | Add a new project                          | **title** - [String] |
| `PUT /projects/:id`        | Edit the title of the project              |                      |
| `DELETE /projects/:id`     | Delete the project                         |                      |
| `POST /projects/:id/tasks` | Add a new task for the project             | **title** - [String] |

### Example

If I call the `POST /projects` route by passing `{title: 'New project'}` and the `POST /projects/9CcUTj2mx/tasks` route with `{title: 'New task' }`, my array of projects should look like this:

```js
[
  {
    id: "9CcUTj2mx",
    title: "New Project",
    tasks: ["New Task"]
  }
];
```

## Middlewares

- A middleware which will be used on all routes that receive the project ID in the URL parameters that verifies that the project with that ID exists. If there is no return error, otherwise allow the request to proceed normally;

- A global middleware called in every request that prints (`console.log`) a count of how many requests have been made in the application until then;
