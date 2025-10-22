<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'permissions'];

    protected $casts = [
        'permissions' => 'array', // Asegura que se maneje como un array
    ];

    // Relación con User
 /*    public function users()
    {
        return $this->hasMany(User::class);
    } */
}
