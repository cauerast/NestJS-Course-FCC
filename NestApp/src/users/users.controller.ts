import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Patch,
    Delete,
    Query,
    ParseIntPipe
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

    // const UsersService = new UsersService(); // not recommended way
    constructor(readonly UsersService: UsersService) {}; // best dependency injection

    @Get() // GET /users
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.UsersService.findAll(role);
    }

    @Get(':id') // GET /users/:id
    findById(@Param('id', ParseIntPipe) id: number) {
        // return this.UsersService.findById(Number.parseInt(id));
        return this.UsersService.findById(id);
    }

    @Post() // POST /users/id
    create(@Body() createUserDto: CreateUserDto) {
        return this.UsersService.create(createUserDto);
    }

    @Patch(':id') // PATCH /users/:id
    update(@Param('id', ParseIntPipe) id: number, @Body() userUpdate: UpdateUserDto) {
        return this.UsersService.update(id, userUpdate);
    }

    @Delete(':id') // DELETE /users/:id
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.UsersService.findById(id);
    }
}
