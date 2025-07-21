import { useParams } from 'react-router-dom';
import { PresentationPage } from '@/components/presentation/presentation-page/Main';

export default function PresentationViewPage() {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return <div>Presentation not found</div>;
  }

  return <PresentationPage id={id} />;
}