"use client";

import logo from "@/assets/logo/calculadora_de_dosagem-playstore.png";
import { TextAlignJustify, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openProdutos, setOpenProdutos] = useState(false); // desktop
  const [openProdutosMobile, setOpenProdutosMobile] = useState(false); // mobile

  const refProdutos = useRef<HTMLDivElement>(null);

  // fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        refProdutos.current &&
        !refProdutos.current.contains(event.target as Node)
      ) {
        setOpenProdutos(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white lg:bg-transparent lg:py-4 border-b lg:border-0">
      <div className="w-full lg:max-w-7xl lg:mx-auto lg:px-6">
        <nav
          className="
        w-full flex items-center justify-between gap-6
        px-3 py-2 lg:p-3
        bg-white
        lg:border lg:border-gray-200
        lg:shadow-xl
        lg:rounded-2xl
      "
        >
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} className="h-8 w-auto" />
            <h2 className="text-lg font-semibold text-blue-600">QuimiCalc</h2>
          </Link>

          {/* MENU DESKTOP */}
          <div className="nav-desktop">
            <Link className="nav-pill" to="/">
              Home
            </Link>

            {/* PRODUTOS */}
            <div className="relative" ref={refProdutos}>
              <button
                onClick={() => setOpenProdutos(!openProdutos)}
                className="nav-pill flex items-center gap-1"
              >
                Produtos
                <ChevronDown size={16} />
              </button>

              {openProdutos && (
                <div className="absolute top-12 left-0 bg-white shadow-lg rounded-xl border p-2 w-40">
                  <Link
                    to="/produtos/cadastro"
                    onClick={() => setOpenProdutos(false)}
                    className="block px-3 py-2 rounded-lg hover:bg-gray-100"
                  >
                    Cadastro
                  </Link>

                  <Link
                    to="/produtos/lista"
                    onClick={() => setOpenProdutos(false)}
                    className="block px-3 py-2 rounded-lg hover:bg-gray-100"
                  >
                    Lista
                  </Link>
                </div>
              )}
            </div>

            <Link className="nav-pill" to="/dosagem-mg">
              Dosagem mg/L
            </Link>

            <Link className="nav-pill" to="/dosagem-ml">
              Dosagem mL
            </Link>
          </div>

          {/* BOTÃO SAIR */}
          <Link
            to="/home"
            className="hidden lg:flex px-4 py-2 rounded-full text-gray-600 hover:text-red-500"
          >
            Sair
          </Link>

          {/* MENU MOBILE */}
          <div className="lg:hidden">
            <button
              onClick={() => setOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <TextAlignJustify size={22} />
            </button>
          </div>
        </nav>
      </div>

      {/* BACKDROP */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* DRAWER MOBILE */}
      <div
        className={`
          fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-xl
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex flex-col p-4 gap-2">
          <Link className="nav-pill" to="/" onClick={() => setOpen(false)}>
            Home
          </Link>

          {/* PRODUTOS MOBILE */}
          <div>
            <button
              onClick={() => setOpenProdutosMobile(!openProdutosMobile)}
              className="nav-pill flex items-center gap-1 w-full text-left"
            >
              Produtos
              <ChevronDown size={16} />
            </button>

            {openProdutosMobile && (
              <div className="ml-4 mt-2 flex flex-col">
                <Link
                  to="/produtos/cadastro"
                  onClick={() => {
                    setOpen(false);
                    setOpenProdutosMobile(false);
                  }}
                  className="block px-3 py-2 rounded-lg hover:bg-gray-100"
                >
                  Cadastro
                </Link>

                <Link
                  to="/produtos/lista"
                  onClick={() => {
                    setOpen(false);
                    setOpenProdutosMobile(false);
                  }}
                  className="block px-3 py-2 rounded-lg hover:bg-gray-100"
                >
                  Lista
                </Link>
              </div>
            )}
          </div>

          <Link
            className="nav-pill"
            to="/dosagem-mg"
            onClick={() => setOpen(false)}
          >
            Dosagem mg/L
          </Link>

          <Link
            className="nav-pill"
            to="/dosagem-ml"
            onClick={() => setOpen(false)}
          >
            Dosagem mL
          </Link>

          <Link
            to="/home"
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white"
          >
            Sair
          </Link>
        </div>
      </div>
    </header>
  );
}
