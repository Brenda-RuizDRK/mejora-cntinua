<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;


class ExtruisionController extends Controller
{
       public function index()
    {
       
        return Inertia::render('Extrusion/Extrusores', [
           
        ]);
    }

     public function show($id)
    {
        // Puedes obtener datos del extrusor desde la BD si existen
        // $extrusor = Extrusor::findOrFail($id);

        // Por ahora lo mandamos simple
        return Inertia::render('Extrusion/ExtrusorView', [
            'extrusorId' => $id,
        ]);
    }

    public  function view54_2(){
        return Inertia::render('Extrusion/54_2/Ext54_2', [
           
        ]);
    }
}
