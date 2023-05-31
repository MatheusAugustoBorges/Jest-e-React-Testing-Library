import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe('<About />', () => {
  it('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    // Verifica título na About com tag <h2 />
    const titlePageAbout = screen.getByRole('heading', { level: 2 });

    // Verifica título na About com tag <h2 /> sendo 'About Pokédex'
    expect(titlePageAbout).toHaveTextContent('About Pokédex');
  });

  it('Verifica se a página contém dois parágrafos com texto sobre a Pokédex;', () => {
    renderWithRouter(<About />);
    // Verifica primeiro parágrafo na About com tag <p />
    expect(screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon')).toBeInTheDocument();

    // Verifica segundo parágrafo na About com tag <p />
    expect(screen.getByText('One can filter Pokémon by type, and see more details for each one of them')).toBeInTheDocument();
  });

  it('Verifica se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    // Verifica a imagem na página através da tag <img />
    const image = screen.getByRole('img');

    // Verifica o atributo src da imagem - se a URL está correta
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
