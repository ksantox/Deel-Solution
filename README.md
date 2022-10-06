# Initialization

Copy the `.env.default` and rename it to `.env`. Change any configurations you need.
Run `npm run build` to build the JavaScript files and then run `npm run seed` to seed the database.

# Notes
## In a scenario where more time was allowed for the problem
1. Implement admin APIs
2. Introduce Data Access Layer(DAL) and split models
3. Refactor controllers and move DB related logic to corresponding DAL
4. Introduce error handling for routers
5. Implement unit tests
6. Create a basic React client to consume APIs