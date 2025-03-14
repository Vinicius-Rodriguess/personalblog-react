import { Link } from 'react-router-dom';
import Tema from '../../../models/Tema';

interface CardTemasProps {
  tema: Tema;
}

function CardTemas({ tema }: CardTemasProps) {
  return (
    <div className="border flex flex-col rounded-2xl overflow-hidden justify-between shadow-lg hover:scale-101 transition-all">
      <header className="py-2 px-6 bg-gray-800 text-white font-bold text-2xl">
        Tema
      </header>
      <p className="p-8 text-3xl bg-slate-200 h-full">{tema.descricao}</p>

      <div className="flex">
        <Link
          to={`/editartema/${tema.id}`}
          className="w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 sflex items-center justify-center py-2 text-center transition-all"
        >
          <button>Editar</button>
        </Link>

        <Link
          to={`/deletartema/${tema.id}`}
          className="text-slate-100 bg-red-400 hover:bg-red-700 flex items-center justify-center py-2 w-full transition-all"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardTemas;
