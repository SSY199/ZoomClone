import { ReactNode } from 'react';

const MeetingLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return <main>{children}</main>;
};

export default MeetingLayout;
