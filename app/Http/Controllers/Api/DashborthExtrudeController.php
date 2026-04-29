<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashborthExtrudeController extends Controller
{
          public function dashborthExtrude()
{
    return Inertia::render('Extrusion/Dashborth/Dashbot');
}
}
