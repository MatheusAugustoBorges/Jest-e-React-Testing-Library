import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { Pokedex } from '../pages';

const pokemonListSimulator = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://archives.bulbagarden.net/media/upload/0/0a/Spr_5b_004.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Alola Route 3',
        map: 'https://archives.bulbagarden.net/media/upload/9/93/Alola_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 3',
        map: 'https://archives.bulbagarden.net/media/upload/4/4a/Kanto_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 4',
        map: 'https://archives.bulbagarden.net/media/upload/2/24/Kanto_Route_4_Map.png',
      },
      {
        location: 'Kanto Rock Tunnel',
        map: 'https://archives.bulbagarden.net/media/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
      },
    ],
    summary: 'The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly.',
  },
];

const isPokemonFavoriteById = {
  25: true,
  4: false,
  10: false,
  23: false,
  65: false,
  151: false,
  78: false,
  143: false,
  148: false,
};

describe('<Pokemon />', () => {
  it('Verfica se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ pokemonListSimulator }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    // Verifica nome do Pikachu
    expect(screen.getByText(`${pokemonListSimulator[0].name}`)).toBeInTheDocument();

    // ------- Outra forma de capturar o tipo na aplicação -------
    // Verifica tipo do Pikachu
    // const typePikachu = screen.queryByTestId('pokemon-type');
    // expect(typePikachu).toBeInTheDocument();
    // -------------------------------------------------------

    // Verifica tipo do Pikachu
    const typePikachu = screen.queryAllByText(`${pokemonListSimulator[0].type}`);
    expect(typePikachu[0]).toBeInTheDocument();

    // ------- Tentativa de correção -------
    // pokemonListSimulator[1].type = '';
    // const typeErrorPikachu = screen.queryAllByText(`${pokemonListSimulator[1].type}`);
    // expect(typeErrorPikachu[0]).not.toBeInTheDocument();
    // -------------------------------------------------------

    // Verifica peso do Pikachu
    const weightValuePikachu = pokemonListSimulator[0].averageWeight.value;
    const weightUnitPikachu = pokemonListSimulator[0].averageWeight.measurementUnit;
    const weightPikachu = screen
      .getByText(`Average weight: ${weightValuePikachu} ${weightUnitPikachu}`);
    expect(weightPikachu).toBeInTheDocument();

    // Verifica imagem do Pikachu
    const imagePikachu = screen.getByRole('img', { name: `${pokemonListSimulator[0].name} sprite` });
    // Verifica o atributo src da imagem - se a URL está correta
    expect(imagePikachu).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    // Verifica o atributo alt da imagem - se a URL está correta
    expect(imagePikachu).toHaveAttribute('alt', `${pokemonListSimulator[0].name} sprite`);
  });

  it('Verfica se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon e, ao clicar, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    const { history } = renderWithRouter(
      <Pokedex
        pokemonList={ pokemonListSimulator }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    // Verifica link More details na <Pokedex />
    const LinkDetails = screen.getByRole('link', { name: /More details/i });
    expect(LinkDetails).toBeInTheDocument();

    // Clica no link "More details"
    act(() => {
      userEvent.click(LinkDetails);
    });

    // Verifica rota da Home ('/')
    expect(history.location.pathname).toBe(`/pokemon/${pokemonListSimulator[0].id}`);
  });

  it('Verifica se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ pokemonListSimulator }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    // Verifica imagem favoritando Pikachu
    const imagePikachu = screen.getByRole('img', { name: `${pokemonListSimulator[0].name} is marked as favorite` });
    // Verifica o atributo src da imagem - se a URL está correta
    expect(imagePikachu).toHaveAttribute('src', '/star-icon.svg');
    // Verifica o atributo alt da imagem - se a URL está correta
    expect(imagePikachu).toHaveAttribute('alt', `${pokemonListSimulator[0].name} is marked as favorite`);
  });
});
