/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useContext, useEffect, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Postagem from '../../../models/Postagem';
import Tema from '../../../models/Tema';
import { buscar, atualizar, cadastrar } from '../../../services/Service';
import { RotatingLines } from 'react-loader-spinner';
import { ToastAlerta } from '../../../utils/ToastAlerta';

function FormPostagem() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [temas, setTemas] = useState<Tema[]>([]);

  const [tema, setTema] = useState<Tema>({ id: 0, descricao: '' });
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPostagemPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout();
      }
    }
  }

  async function buscarTemaPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout();
      }
    }
  }

  async function buscarTemas() {
    try {
      await buscar('/temas', setTemas, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado', 'info');
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    buscarTemas();

    if (id !== undefined) {
      buscarPostagemPorId(id);
    }
  }, [id]);

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema,
    });
  }, [tema]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
      usuario: usuario,
    });
  }

  function retornar() {
    navigate('/postagens');
  }

  async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta('Postagem atualizada com sucesso', 'sucesso');
      } catch (error: any) {
        if (error.toString().includes('403')) {
          handleLogout();
        } else {
          ToastAlerta('Erro ao atualizar a Postagem', 'erro');
        }
      }
    } else {
      try {
        await cadastrar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta('Postagem cadastrada com sucesso', 'sucesso');
      } catch (error: any) {
        if (error.toString().includes('403')) {
          handleLogout();
        } else {
          ToastAlerta('Erro ao cadastrar a Postagem', 'erro');
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  const carregandoTema = tema.descricao === '';

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8">
        {id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}
      </h1>

      <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovaPostagem}>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Título da Postagem</label>
          <input
            type="text"
            placeholder="Titulo"
            name="titulo"
            required
            className="border-2 border-gray-700 rounded p-2 shadow-md"
            value={postagem.titulo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Texto da Postagem</label>
          <input
            type="text"
            placeholder="Texto"
            name="texto"
            required
            className="border-2 border-gray-700 rounded p-2 shadow-md"
            value={postagem.texto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>Tema da Postagem</p>
          <select
            name="tema"
            id="tema"
            className="border p-2 border-gray-800 rounded shadow-md"
            onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
          >
            <option value="" selected disabled>
              Selecione um Tema
            </option>

            {temas.map((tema) => (
              <>
                <option value={tema.id}>{tema.descricao}</option>
              </>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="rounded disabled:bg-gray-200 bg-gray-600 my-4 hover:bg-gray-800 text-white font-bold w-1/2 mx-auto py-2 flex justify-center hover:scale-101 transition-all shadow-md cursor-pointer"
          disabled={carregandoTema}
        >
          {isLoading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            />
          ) : (
            <span>{id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormPostagem;
