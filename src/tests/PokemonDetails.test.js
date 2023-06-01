import { screen } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { PokemonDetails } from '../pages';

const pokemonList = [
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

describe('<PokemonDetails.js />', () => {
  it('Verfica se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<PokemonDetails
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    // Verifica nome do Pikachu
    expect(screen.getByText(`${pokemonList[0].name} Details`)).toBeInTheDocument();
  });
});
