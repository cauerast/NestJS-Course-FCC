import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Patch,
    Delete,
    Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    

    @Get() // GET /users
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return [];
    }

    @Get(':id') // GET /users/:id
    findOne(@Param('id') id: string) {
        return { id };
    }

    @Post() // POST /users/id
    create(@Body() user: {}) {
        return user;
    }

    @Patch(':id') // PATCH /users/:id
    update(@Param('id') id: string, @Body() userUpdate: {}) {
        return { id, ...userUpdate };
    }

    @Delete(':id') // DELETE /users/:id
    delete(@Param('id') id: string) {
        return { id };
    }
}
