import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PaginationControls from './PaginationControls';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
  }));

// Mock useRouter
const mockPush = jest.fn();
useRouter.mockImplementation(() => ({
  push: mockPush,
}));

describe('PaginationControls', () => {
  it('renders correctly with middle page selected', () => {
    render(<PaginationControls page={3} totalPages={5} />);

    // Check that previous and next buttons are rendered and not disabled
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();

    // Check that page numbers 1 through 5 are rendered
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(`${i}`)).toBeInTheDocument();
    }
  });

  it('navigates to the previous page when Previous is clicked', () => {
    render(<PaginationControls page={3} totalPages={5} />);
    fireEvent.click(screen.getByText('Previous'));
    expect(mockPush).toHaveBeenCalledWith('/?page=2');
  });

  it('navigates to the next page when Next is clicked', () => {
    render(<PaginationControls page={3} totalPages={5} />);
    fireEvent.click(screen.getByText('Next'));
    expect(mockPush).toHaveBeenCalledWith('/?page=4');
  });

  it('disables Previous button on the first page', () => {
    render(<PaginationControls page={1} totalPages={5} />);
    fireEvent.click(screen.getByText('Previous'));
    // on the first page, the Previous button click should not trigger navigation
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('disables Next button on the last page', () => {
    render(<PaginationControls page={5} totalPages={5} />);
    fireEvent.click(screen.getByText('Next'));
    //on the last page, the Next button click should not trigger navigation
    expect(mockPush).not.toHaveBeenCalled();
  });
});
