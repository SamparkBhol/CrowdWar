import React from 'react';
import { ICONS } from '@/lib/constants';

const Header = ({ round }) => {
  const { Swords } = ICONS;
  return (
    <header className="fixed top-0 left-0 right-0 border-b border-gray-800 bg-black/50 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg shadow-lg">
              <Swords className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                CrowdWar
              </h1>
              <p className="text-gray-400 text-sm tracking-wide">Collective Intelligence Simulator</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-400 uppercase tracking-widest">Round</div>
              <div className="text-3xl font-bold text-orange-400">{round}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
