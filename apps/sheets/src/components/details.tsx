export function Details() {
  return (
    <div className="container">
      <label htmlFor="Nome">
        <span className="text-sm font-medium text-gray-700"> Nome </span>

        <input
          className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm mb-5"
          type="email"
        />
      </label>

      <label htmlFor="descricao">
        <span className="text-sm font-medium text-gray-700"> Descrição </span>

        <input
          className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm"
          type="email"
        />
      </label>
    </div>
  );
}
