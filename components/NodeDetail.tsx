
import React from 'react';
import { D3Node } from '../types';
import { CloseIcon, FeatureIcon, FocusIcon } from './icons';

interface NodeDetailProps {
  node: D3Node | null;
  onClose: () => void;
}

export const NodeDetail: React.FC<NodeDetailProps> = ({ node, onClose }) => {
  return (
    <div
      className={`absolute top-0 right-0 h-full w-full md:w-1/3 lg:w-1/4 bg-gray-800/80 backdrop-blur-sm shadow-2xl transition-transform duration-500 ease-in-out transform ${
        node ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {node && (
        <div className="p-6 h-full flex flex-col text-gray-200 overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
             <h2 className="text-2xl font-bold text-white pr-4">{node.name}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <CloseIcon />
            </button>
          </div>

          <div className="flex-grow space-y-4">
            <p className="text-gray-300 leading-relaxed">{node.description}</p>
            
            {node.unified_dimension_focus && (
                <div className="p-4 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center text-sm font-semibold text-purple-300 mb-2">
                        <FocusIcon />
                        <span className="ml-2">Unified Dimension Focus</span>
                    </div>
                    <p className="text-gray-300">{node.unified_dimension_focus}</p>
                </div>
            )}

            {node.original_app_feature && (
                <div className="p-4 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center text-sm font-semibold text-blue-300 mb-2">
                        <FeatureIcon />
                        <span className="ml-2">Original App Feature</span>
                    </div>
                    <p className="text-gray-300">{node.original_app_feature}</p>
                </div>
            )}
          </div>

          <div className="mt-6 text-xs text-gray-500 text-center">
            Node ID: {node.id}
          </div>
        </div>
      )}
    </div>
  );
};
