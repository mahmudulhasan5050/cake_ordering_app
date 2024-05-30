"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCake = exports.deleteCake = exports.createCake = exports.findCakeById = exports.allCakes = void 0;
const cakes_1 = __importDefault(require("../services/cakes"));
const Cakes_1 = __importDefault(require("../models/Cakes"));
const apiErrors_1 = require("../apiErrors/apiErrors");
//Find all cakes info
const allCakes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findAllCakes = yield cakes_1.default.allCake();
        res.status(200).json(findAllCakes);
    }
    catch (err) {
        next(new apiErrors_1.BadRequestError('Invalid Request', err));
    }
});
exports.allCakes = allCakes;
//Find cake by Id
const findCakeById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cakeId = req.params.cakeId;
        const foundCakeById = yield cakes_1.default.findCakeById(cakeId);
        res.status(200).json(foundCakeById);
    }
    catch (err) {
        next(new apiErrors_1.BadRequestError('Invalid Request', err));
    }
});
exports.findCakeById = findCakeById;
//Create cake
const createCake = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, description, selectedFile } = req.body;
        const existingCake = yield Cakes_1.default.findOne({ name });
        if (existingCake)
            throw new apiErrors_1.AlreadyExistError();
        const cake = new Cakes_1.default({
            name,
            price,
            description,
            selectedFile,
        });
        const newCake = yield cakes_1.default.createCake(cake);
        res.status(200).json(newCake);
    }
    catch (err) {
        next(new apiErrors_1.BadRequestError('Can not create Product name', err));
    }
});
exports.createCake = createCake;
//Delete a cake
const deleteCake = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cakeId = req.params.cakeId;
        const existingCake = yield Cakes_1.default.findOne({ cakeId });
        if (!existingCake)
            throw new apiErrors_1.NotFoundError();
        yield cakes_1.default.deleteCake(cakeId);
        res.status(204).end();
    }
    catch (err) {
        next(new apiErrors_1.BadRequestError('Can not delete.....', err));
    }
});
exports.deleteCake = deleteCake;
//Update Cake info by Id
const updateCake = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateCakeInfoFromBody = req.body;
        const cakeId = req.params.cakeId;
        const updatedCakeInfo = yield cakes_1.default.updateCake(cakeId, updateCakeInfoFromBody);
        res.json(updatedCakeInfo);
    }
    catch (err) {
        next(new apiErrors_1.BadRequestError('Can not delete.....', err));
    }
});
exports.updateCake = updateCake;
