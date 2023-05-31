import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('<NotFound.js />', () => {
  it('Verifica se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    // Verifica título na NotFound com tag <h2 />
    const titlePageNotFound = screen.getByRole('heading', { level: 2 });

    // Verifica título na NotFound com tag <h2 /> sendo 'Page requested not found'
    expect(titlePageNotFound).toHaveTextContent('Page requested not found');
  });

  it('Verifica se a página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    // Verifica a imagem na página através da tag <img />
    const image = screen.getByRole('img');

    // Verifica o atributo src da imagem - se a URL está correta
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
