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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const pagination_query_dto_1 = require("../common/dto/pagination-query.dto");
const event_entity_1 = require("../events/entities/event.entity");
const typeorm_2 = require("typeorm");
const coffees_constants_1 = require("./coffees.constants");
const coffees_config_1 = require("./config/coffees.config");
const coffee_entity_1 = require("./entities/coffee.entity");
const flavor_entity_1 = require("./entities/flavor.entity");
let CoffeesService = class CoffeesService {
    constructor(coffeeRepository, flavorRepository, connection, coffeeBrands, coffeesConfiguration) {
        this.coffeeRepository = coffeeRepository;
        this.flavorRepository = flavorRepository;
        this.connection = connection;
        this.coffeesConfiguration = coffeesConfiguration;
        console.log(coffeesConfiguration.foo);
    }
    findAll(paginationQuery) {
        const { limit, offset } = paginationQuery;
        return this.coffeeRepository.find({
            relations: ['flavors'],
            skip: offset,
            take: limit,
        });
    }
    async findOne(id) {
        const coffee = await this.coffeeRepository.findOne(id, {
            relations: ['flavors'],
        });
        if (!coffee) {
            throw new common_1.NotFoundException(`Coffee #${id} not found`);
        }
        return coffee;
    }
    async create(createCoffeeDto) {
        const flavors = await Promise.all(createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)));
        const coffee = this.coffeeRepository.create(Object.assign(Object.assign({}, createCoffeeDto), { flavors }));
        return this.coffeeRepository.save(coffee);
    }
    async update(id, updateCoffeeDto) {
        const flavors = updateCoffeeDto.flavors &&
            (await Promise.all(updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name))));
        const coffee = await this.coffeeRepository.preload(Object.assign(Object.assign({ id: +id }, updateCoffeeDto), { flavors }));
        if (!coffee) {
            throw new common_1.NotFoundException(`Coffee #${id} not found`);
        }
        return this.coffeeRepository.save(coffee);
    }
    async remove(id) {
        const coffee = await this.findOne(id);
        return this.coffeeRepository.remove(coffee);
    }
    async recommendCoffee(coffee) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            coffee.recommendations++;
            const recommendEvent = new event_entity_1.Event();
            recommendEvent.name = 'recommend_coffee';
            recommendEvent.type = 'coffee';
            recommendEvent.payload = { coffeeId: coffee.id };
            await queryRunner.manager.save(coffee);
            await queryRunner.manager.save(recommendEvent);
            await queryRunner.commitTransaction();
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }
    }
    async preloadFlavorByName(name) {
        const existingFlavor = await this.flavorRepository.findOne({ name });
        if (existingFlavor) {
            return existingFlavor;
        }
        return this.flavorRepository.create({ name });
    }
};
CoffeesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(coffee_entity_1.Coffee)),
    __param(1, typeorm_1.InjectRepository(flavor_entity_1.Flavor)),
    __param(3, common_1.Inject(coffees_constants_1.COFFEE_BRANDS)),
    __param(4, common_1.Inject(coffees_config_1.default.KEY)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Connection, Array, void 0])
], CoffeesService);
exports.CoffeesService = CoffeesService;
//# sourceMappingURL=coffees.service.js.map