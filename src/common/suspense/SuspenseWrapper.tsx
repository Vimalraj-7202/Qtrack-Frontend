import { Suspense } from 'react';
import Spinner from '@/common/suspense/Spinner';

const SuspenseWrapper = (Component: any) => (props: any) => (
  <Suspense fallback={<Spinner />}>
    <Component {...props} />
  </Suspense>
);

export default SuspenseWrapper;
