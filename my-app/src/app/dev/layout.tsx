import React from 'react';
import Header from '../../components/Header';


export default function layout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div>
            {/* Header */}
         
            {/* Main content */}
            <main>
                {children}
            </main>

            {/* Footer */}
         
        </div>
    );
};

