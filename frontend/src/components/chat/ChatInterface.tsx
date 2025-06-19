import { SimpleChatInterface } from './SimpleChatInterface';
import { Notebook, Source } from '../../types';

interface ChatInterfaceProps {
  notebook: Notebook;
  sources: Source[];
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  notebook, 
  sources 
}) => {
  return (
    <SimpleChatInterface 
      notebook={notebook} 
      sources={sources} 
    />
  );
};