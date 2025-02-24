import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
} from '@phosphor-icons/react';
import { ReactNode, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

function Footer() {
  const data = new Date().getFullYear();

  const { usuario } = useContext(AuthContext);

  let component: ReactNode;

  if (usuario.token !== '') {
    component = (
      <div className="flex justify-center bg-gray-900 text-white">
        <div className="container flex justify-center gap-5 items-center p-4">
          <p className="text-lg">
            Blog Pessoal | Copyright: {data}
          </p>
          <div className="flex gap-2">
            <a
              href="https://www.linkedin.com/school/generationbrasil"
              target="_blank"
            >
              <LinkedinLogo size={30}/>
            </a>
            <a
              href="https://www.instagram.com/generationbrasil"
              target="_blank"
            >
              <InstagramLogo size={30}/>
            </a>
            <a href="https://www.facebook.com/generationbrasil" target="_blank">
              <FacebookLogo size={30} />
            </a>
          </div>
        </div>
      </div>
    );
  }
  return <>{component}</>;
}

export default Footer;
