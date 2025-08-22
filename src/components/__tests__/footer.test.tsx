import { render, screen } from '@testing-library/react';
import { Footer } from '../layout/footer';

describe('Footer', () => {
  it('renders footer with correct content', () => {
    render(<Footer />);
    
    // Check for main elements
    expect(screen.getByText('Built with')).toBeInTheDocument();
    expect(screen.getByText('Md. Afzal Hassan Ehsani')).toBeInTheDocument();
    expect(screen.getByText('© 2025 GitLaunch')).toBeInTheDocument();
    
    // Check for social links
    expect(screen.getByLabelText('GitHub Profile')).toBeInTheDocument();
    expect(screen.getByLabelText('LinkedIn Profile')).toBeInTheDocument();
    expect(screen.getByLabelText('Twitter Profile')).toBeInTheDocument();
    
    // Check for project links
    expect(screen.getByText('MIT License')).toBeInTheDocument();
    expect(screen.getByText('View Source')).toBeInTheDocument();
  });

  it('has correct external links', () => {
    render(<Footer />);
    
    const githubLink = screen.getByLabelText('GitHub Profile').closest('a');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/iemafzalhassan');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});