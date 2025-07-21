import { useParams } from 'react-router-dom';
import { OutlineList } from '@/components/presentation/outline/OutlineList';

export default function PresentationGeneratePage() {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return <div>Presentation not found</div>;
  }

  return <OutlineList presentationId={id} />;
}