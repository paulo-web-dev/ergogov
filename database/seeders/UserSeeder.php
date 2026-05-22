<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insertOrIgnore([
            'name'              => 'Administrador',
            'email'             => 'admin@ergogov.com',
            'password'          => Hash::make('admin123'),
            'id_instituicao'    => 1,
            'created_at'        => now(),
            'updated_at'        => now(),
        ]);

        echo "Usuário criado: admin@ergogov.com / admin123\n";
    }
}
