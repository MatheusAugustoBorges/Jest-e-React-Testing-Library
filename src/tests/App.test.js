import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('<App /> - Verifica se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  it('Verfica se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação;', () => {
    const { history } = renderWithRouter(<App />);

    // ------------------------Link Home---------------------------------
    // Verifica link Home no <App />
    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toBeInTheDocument();

    // Clica no link "Home"
    act(() => {
      userEvent.click(homeLink);
    });

    // Verifica rota da Home ('/')
    expect(history.location.pathname).toBe('/');
  });
  // ------------------------Link About---------------------------------
  it('Verfica se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    // Verifica link About no <App />
    const aboutLink = screen.getByRole('link', { name: /About/i });
    expect(aboutLink).toBeInTheDocument();

    // Clica no link "About"
    act(() => {
      userEvent.click(aboutLink);
    });

    // Verifica rota da About ('/about')
    expect(history.location.pathname).toBe('/about');
  });

  // ------------------------Link Favorite Pokémon---------------------------------
  it('Verfica se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    // Verifica link Favorite Pokémon no <App />
    const favoritePokemonLink = screen.getByRole('link', { name: /Favorite Pokémon/i });
    expect(favoritePokemonLink).toBeInTheDocument();

    // Clica no link "Favorite Pokémon"
    act(() => {
      userEvent.click(favoritePokemonLink);
    });

    // Verifica rota da Favorite Pokémon ('/favorites')
    expect(history.location.pathname).toBe('/favorites');
  });

  // ------------------------Link Inexistente---------------------------------
  it('Verfica se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);

    // Verifica o link inexistente
    act(() => {
      history.push('/semnome');
    });

    const titleNotFound = screen.getByRole('heading', { level: 2 });

    expect(history.location.pathname).toBe('/semnome');
    expect(titleNotFound).toHaveTextContent('Page requested not found');
  });
});
