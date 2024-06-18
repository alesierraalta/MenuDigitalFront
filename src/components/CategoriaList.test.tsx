import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import CategoriaList from './CategoriaList';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CategoriaList', () => {
  it('should render categories', async () => {
    const categorias = [
      { id_categoria: 1, nombre_categoria: 'Entradas' },
      { id_categoria: 2, nombre_categoria: 'Platos Principales' }
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: categorias });

    render(<CategoriaList />);

    const categoryElements = await screen.findAllByText(/Entradas|Platos Principales/i);
    expect(categoryElements.length).toBe(2);
  });

  it('should display error message on fetch failure', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Error fetching categorias'));

    render(<CategoriaList />);

    const errorMessage = await screen.findByText(/Error fetching categorias/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
