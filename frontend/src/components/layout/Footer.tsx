import logo from "@/assets/logo/calculadora_de_dosagem-playstore.png";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
            <span className="text-sm font-semibold text-blue-600">
              QuimiCalc
            </span>
          </div>

          {/* Texto */}
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} QuimiCalc. Todos os direitos
            reservados.
          </p>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-blue-600 transition-colors">
              Privacidade
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Termos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
