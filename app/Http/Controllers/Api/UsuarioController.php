<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use App\Models\Rol;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsuarioController extends Controller
{
    // ✅ Listar todos los usuarios
   public function index()
    {
        $usuarios = Usuario::with('rol')->get();
        return Inertia::render('Admin/Usuarios/Usuarios', [
            'usuarios' => $usuarios,
        ]);
    }


}
