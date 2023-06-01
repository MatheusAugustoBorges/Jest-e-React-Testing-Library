import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { Pokedex } from '../pages';
import pokemonList from '../data';

const isPokemonFavoriteById = {
  25: true,
  4: true,
  10: false,
  23: false,
  65: false,
  151: false,
  78: false,
  143: false,
  148: false,
};

const pokemonTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

describe('<Pokedex.js />', () => {
  it('Verifica se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ pokemonList }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    // Verifica título na Pokedex com tag <h2 />
    const titlePagePokedex = screen.getByRole('heading', { level: 2 });

    // Verifica título na NotFound com tag <h2 /> sendo 'Encountered Pokémon'
    expect(titlePagePokedex).toHaveTextContent('Encountered Pokémon');
  });

  it('Verifica se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ pokemonList }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    // Verifica botão Próximo Pokémon
    const btnNext = screen.getByRole('button', { name: /Próximo Pokémon/i });
    expect(btnNext).toBeInTheDocument();

    // Simula o click no botão 'Próximo Pokémon' e verifica seu nome na aplicação
    pokemonList.forEach((pokemon) => {
      // Verifica nome de pokemon na tela
      expect(screen.getByText(`${pokemon.name}`)).toBeInTheDocument();
      // Clica no botão Próximo Pokémon
      act(() => {
        userEvent.click(btnNext);
      });
      // Verifica se tem um pokemon por vez
      const names = screen.getAllByTestId('pokemon-name');
      expect(names).toHaveLength(1);
    });
  });

  it('Verifica se a Pokédex tem todos os botões de filtro', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ pokemonList }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    // Verifica todos botões com tipos de Pokemon -> Total: 7 botões
    // Botões com testId='pokemon-type-button'
    // Exceto botão 'All' -> Esse botão não tem testId='pokemon-type-button'
    const btnAllFilter = screen.queryAllByTestId('pokemon-type-button');
    expect(btnAllFilter).toHaveLength(7);
  });

  it('Simula o click no botão que seleciona um tipo de Pokemon e verifica se a paǵina mostra somente os Pokemons pertencentes a esse filtro', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ pokemonList }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    // Verifica botão de filtro: 'All'
    const btnNoFilter = screen.getByRole('button', { name: 'All' });

    // Simula o click no botão que seleciona um tipo de Pokemon
    pokemonTypes.forEach((type) => {
      const btnFilter = screen.getByRole('button', { name: `${type}` });
      // Clica no botão do tipo de Pokemon selecionado
      act(() => {
        userEvent.click(btnFilter);
      });
      expect(btnNoFilter).toBeInTheDocument();

      // Salva em um array somente os Pokemons filtrados pelo tipo selecionado acima
      const pokemonListFiltered = pokemonList.filter((pokemon) => pokemon.type === type);

      // Verifica botão Próximo Pokémon e o salva na variável btnNext
      const btnNext = screen.getByRole('button', { name: /Próximo Pokémon/i });
      expect(btnNext).toBeInTheDocument();

      // Simula o click no botão 'Próximo Pokémon' e verifica seu nome na aplicação
      pokemonListFiltered.forEach((pokemon) => {
      // Verifica nome de pokemon na tela
        expect(screen.getByText(`${pokemon.name}`)).toBeInTheDocument();
        // Clica no botão Próximo Pokémon
        act(() => {
          userEvent.click(btnNext);
        });
        expect(btnNoFilter).toBeInTheDocument();
      });
    });
  });

  it('Simula o click no botão que reseta os filtros (botão de filtro: All) e mostra todos os Pokemons', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ pokemonList }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    // Verifica botão Próximo Pokémon
    const btnNext = screen.getByRole('button', { name: /Próximo Pokémon/i });
    expect(btnNext).toBeInTheDocument();

    // Verifica botão de filtro: 'All'
    const btnNoFilter = screen.getByRole('button', { name: 'All' });
    expect(btnNoFilter).toBeInTheDocument();

    // Clica no botão de filtro: 'All'
    act(() => {
      userEvent.click(btnNoFilter);
    });

    // Simula o click no botão 'Próximo Pokémon' e verifica seu nome na aplicação
    pokemonList.forEach((pokemon) => {
      // Verifica nome de pokemon na tela
      expect(screen.getByText(`${pokemon.name}`)).toBeInTheDocument();
      // Clica no botão Próximo Pokémon
      act(() => {
        userEvent.click(btnNext);
      });
    });
  });

  it('Verifica se botão que reseta os filtros (botão de filtro: All) está sempre visível', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ pokemonList }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    // Verifica botão de filtro: 'All'
    const btnNoFilter = screen.getByRole('button', { name: 'All' });
    expect(btnNoFilter).toBeInTheDocument();
  });
});
