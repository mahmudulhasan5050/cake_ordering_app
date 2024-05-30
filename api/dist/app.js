"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_errors_1 = __importDefault(require("http-errors"));
const cors_1 = __importDefault(require("cors"));
const secrets_1 = require("./utils/secrets"); // add Port to run on local machine
const cakes_1 = __importDefault(require("./routers/cakes"));
const users_1 = __importDefault(require("./routers/users"));
const orders_1 = __importDefault(require("./routers/orders"));
const auth_1 = __importDefault(require("./routers/auth"));
//import serverless from 'serverless-http'; // This is used to deploy api to Lamda AWS
mongoose_1.default
    .connect(secrets_1.MongoUri)
    .then(() => {
    console.log('mongoDB connected!!');
})
    .catch((err) => {
    console.log('Mongo Error' + err);
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '100mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1/cakes', cakes_1.default);
app.use('/api/v1/users', users_1.default);
app.use('/api/v1/orders', orders_1.default);
app.use('/api/v1/auth', auth_1.default);
app.use((req, res, next) => {
    next(new http_errors_1.default.NotFound());
});
const errorHandler = (error, req, res, next) => {
    res.status(error.status || 500);
    res.send({
        status: error.status || 500,
        message: error.message,
    });
};
app.use(errorHandler);
const PORT = Number(process.env.PORT);
app.listen(secrets_1.Port, () => {
    console.log(`server is on port ${secrets_1.Port}`);
});
//export const handler = serverless(app);
