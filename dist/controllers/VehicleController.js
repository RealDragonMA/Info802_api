"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const fastify_decorators_1 = require("fastify-decorators");
const GetVehiclesRoute_1 = __importDefault(require("../routes/vehicles/GetVehiclesRoute"));
const fluent_json_schema_1 = __importDefault(require("fluent-json-schema"));
const GetVehicleRoute_1 = __importDefault(require("../routes/vehicles/GetVehicleRoute"));
let VehicleController = class VehicleController {
    constructor() {
        this.handlerGetVehicles = (req, reply) => __awaiter(this, void 0, void 0, function* () { return new GetVehiclesRoute_1.default().run(req, reply); });
        this.handlerGetVehicle = (req, reply) => __awaiter(this, void 0, void 0, function* () { return new GetVehicleRoute_1.default().run(req, reply); });
    }
};
__decorate([
    (0, fastify_decorators_1.GET)('/', {
        schema: {
            querystring: fluent_json_schema_1.default.object()
                .prop('page', fluent_json_schema_1.default.number().default(1))
                .prop('size', fluent_json_schema_1.default.number().default(10))
                .prop('search', fluent_json_schema_1.default.string().default(''))
                .prop('filter')
        }
    }),
    __metadata("design:type", Object)
], VehicleController.prototype, "handlerGetVehicles", void 0);
__decorate([
    (0, fastify_decorators_1.GET)('/:id', {
        schema: {
            params: fluent_json_schema_1.default.object()
                .prop('id', fluent_json_schema_1.default.string().required())
        }
    }),
    __metadata("design:type", Object)
], VehicleController.prototype, "handlerGetVehicle", void 0);
VehicleController = __decorate([
    (0, fastify_decorators_1.Controller)('/vehicle')
], VehicleController);
exports.default = VehicleController;
