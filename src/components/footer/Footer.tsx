import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react";

function Footer() {
  const data = new Date().getFullYear();

  return (
    <>
      <div className="flex justify-center bg-cyan-900 text-white">
        <div className="container flex flex-col items-center py-4">
          <p className="text-xl font-bold">
            Blog Pessoal Vinicius | Copyright: {data}
          </p>
          <p className="text-lg">Acesse nossas redes sociais</p>
          <div className="flex gap-2">
            <a
              href="https://www.linkedin.com/in/vinicius-rodrigues2004/"
              target="_blank"
            >
              <LinkedinLogo size={48} weight="bold" />
            </a>
            <a href="https://github.com/Vinicius-Rodriguess" target="_blank">
              <GithubLogo size={48} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
