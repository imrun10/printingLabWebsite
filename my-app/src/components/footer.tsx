import React from 'react';
import { Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-600 py-6 mt-auto">
            <Typography variant="body2" color="textSecondary" align="center">
                {'Made with '}
                <span role="img" aria-label="love">
                    ❤️
                </span>
                {' by '}
                <Link color="inherit" href="https://www.example.com">
                    Dlabs
                </Link>
            </Typography>
        </footer>
    );
};

export default Footer;
