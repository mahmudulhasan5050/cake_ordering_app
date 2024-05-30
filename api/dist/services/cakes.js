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
const apiErrors_1 = require("../apiErrors/apiErrors");
const Cakes_1 = __importDefault(require("../models/Cakes"));
const allCake = () => {
    return Cakes_1.default.find();
};
const findCakeById = (cakeId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundCakeById = yield Cakes_1.default.findById(cakeId);
    if (!foundCakeById)
        throw new apiErrors_1.NotFoundError("Cake is not found!!");
    return foundCakeById;
});
const createCake = (cake) => __awaiter(void 0, void 0, void 0, function* () {
    const saveCake = yield cake.save();
    return saveCake;
});
const deleteCake = (cakeId) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteFromCakeDatabase = yield Cakes_1.default.findByIdAndDelete(cakeId);
    if (!deleteFromCakeDatabase) {
        throw new apiErrors_1.NotFoundError('Cake is not found!!');
    }
    return deleteFromCakeDatabase;
});
const updateCake = (cakeId, updateCakeInfoFromBody) => __awaiter(void 0, void 0, void 0, function* () {
    const findAndUpdateCake = yield Cakes_1.default.findByIdAndUpdate(cakeId, updateCakeInfoFromBody, { new: true });
    if (!findAndUpdateCake)
        throw new apiErrors_1.NotFoundError("Can not update cake info!!");
    return findAndUpdateCake;
});
exports.default = {
    allCake,
    createCake,
    deleteCake,
    findCakeById,
    updateCake
};
