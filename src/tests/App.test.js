import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Verifica se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  const { history } = renderWithRouter(<App />);

  // ------------------------Link Home---------------------------------
  // Verifica link Home no <App />
  const homeLink = screen.getByRole('link', { name: /Home/i });
  expect(homeLink).toBeInTheDocument();

  // Clica no link "Home"
  act(() => {
    userEvent.click(homeLink);
  });

  // Verifica título na Home com tag <h2 />
  const titlePageHome = screen.getByRole('heading', { level: 2 });

  // Verifica rota da Home ('/')
  expect(history.location.pathname).toBe('/');

  // Verifica título na Home com tag <h2 /> sendo 'Encountered Pokémon'
  expect(titlePageHome).toHaveTextContent('Encountered Pokémon');

  // ------------------------Link About---------------------------------
  // Verifica link About no <App />
  const aboutLink = screen.getByRole('link', { name: /About/i });
  expect(aboutLink).toBeInTheDocument();

  // Clica no link "About"
  act(() => {
    userEvent.click(aboutLink);
  });

  // Verifica título na About com tag <h2 />
  const titlePageAbout = screen.getByRole('heading', { level: 2 });

  // Verifica rota da About ('/about')
  expect(history.location.pathname).toBe('/about');

  // Verifica título na About com tag <h2 /> sendo 'About Pokédex'
  expect(titlePageAbout).toHaveTextContent('About Pokédex');

  // ------------------------Link About---------------------------------
  // Verifica link Favorite Pokémon no <App />
  const favoritePokemonLink = screen.getByRole('link', { name: /Favorite Pokémon/i });
  expect(favoritePokemonLink).toBeInTheDocument();

  // Clica no link "Favorite Pokémon"
  act(() => {
    userEvent.click(favoritePokemonLink);
  });

  // Verifica título na About com tag <h2 />
  const titlePageFavoritePokemon = screen.getByRole('heading', { level: 2 });

  // Verifica rota da About ('/about')
  expect(history.location.pathname).toBe('/favorites');

  // Verifica título na About com tag <h2 /> sendo 'About Pokédex'
  expect(titlePageFavoritePokemon).toHaveTextContent('Favorite Pokémon');
});
