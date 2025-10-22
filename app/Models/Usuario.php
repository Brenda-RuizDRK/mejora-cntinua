<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable; // Cambio aquí
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $fillable = [
        'nombre',
        'apellido',
        'username',
        'password',
        'rol_id',
        'area_id', // Agregado para relacionar con el área
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Relación con Rol
    public function rol()
    {
        return $this->belongsTo(Rol::class);
    }

    // Verificar permisos del usuario
    public function hasPermission(string $permission): bool
    {
        $permissions = $this->rol->permissions ?? [];
        return in_array($permission, $permissions);
    }
  public function getAuthIdentifierName()
{
    return 'username';
}

    
}
