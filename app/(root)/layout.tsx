import { ReactNode } from 'react';

import StreamVideoProvider from '@/providers/StreamClientProvider';

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return <StreamVideoProvider>{children}</StreamVideoProvider>;
};

export default RootLayout;
