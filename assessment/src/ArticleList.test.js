// ArticleList.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import ArticleList from './ArticleList';

// Mock axios
jest.mock('axios');

const mockArticles = [
    {
        title: 'Article 1',
        abstract: 'Abstract for Article 1',
        url: 'http://example.com/article1',
    },
    {
        title: 'Article 2',
        abstract: 'Abstract for Article 2',
        url: 'http://example.com/article2',
    },
];

test('renders ArticleList component', () => {
    render(<ArticleList />);
    expect(screen.getByText('Articles')).toBeInTheDocument();
});

test('fetches and displays articles', async () => {
    axios.get.mockResolvedValue({ data: { results: mockArticles } });

    render(<ArticleList />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.getByText('Article 1')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Article 2')).toBeInTheDocument());
});

