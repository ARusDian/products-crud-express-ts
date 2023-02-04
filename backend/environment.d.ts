declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_URL : string,
            APP_PORT :number,
            JWT_SECRET: string,
            NODE_ENV: "development" | "production" | "test"
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { };
