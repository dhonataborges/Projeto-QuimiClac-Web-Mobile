import logo from "@/assets/tela_inicial.svg";

export default function Home() {
  return (
    <section className="flex items-center justify-center px-6 py-12">
      <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl w-full">
        {/* Imagem */}
        <img src={logo} alt="Logo" className="w-full md:w-1/2 max-w-xl" />

        {/* Texto */}
        <div className="text-center md:text-left max-w-md">
          <h1 className="text-2xl font-semibold text-blue-700 mb-3">
            QuimiCalc
          </h1>

          <p className="text-gray-600 text-sm">
            Sistema para cálculos químicos em ETA. Rápido, preciso e fácil de
            usar.
          </p>
        </div>
      </div>
    </section>
  );
}
