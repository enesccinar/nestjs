import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
export declare class CoffeesController {
    private readonly coffeesService;
    constructor(coffeesService: CoffeesService);
    findAll(paginationQuery: any): import("./entities/coffee.entity").Coffee[];
    findOne(id: string): import("./entities/coffee.entity").Coffee;
    create(createCoffeeDto: CreateCoffeeDto): void;
    update(id: string, updateCoffeeDto: UpdateCoffeeDto): void;
    remove(id: string): void;
}
