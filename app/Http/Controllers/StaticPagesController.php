<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;

class StaticPagesController extends Controller
{
    public function ventaMayor(): View
    {
        return view('pages.venta-de-paltas-por-mayor');
    }

    public function proveedorSantiago(): View
    {
        return view('pages.proveedor-de-paltas-santiago');
    }

    public function hassPorMayor(): View
    {
        return view('pages.palta-hass-por-mayor');
    }

    public function paraRestaurantes(): View
    {
        return view('pages.paltas-para-restaurantes');
    }

    public function paraCasinos(): View
    {
        return view('pages.paltas-para-casinos');
    }

    public function paraEmpresas(): View
    {
        return view('pages.paltas-para-empresas');
    }

    public function contacto(): View
    {
        return view('contacto');
    }
}
