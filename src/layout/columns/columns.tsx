import React, { ReactNode, CSSProperties } from 'react';

interface Props {
  children: ReactNode;
  gap?: CSSProperties['gap'];
  alignItems?: CSSProperties['alignItems'];
  className?: string;
}

export const Columns: React.FC<Props> = ({ children, gap = '16px', alignItems  = 'stretch', className }) => {
  const containerStyle: CSSProperties = {
    display: 'flex',
    gap,
    alignItems,
  };

  return (
    <div className={className} style={containerStyle}>
      {children}
    </div>
  );
};
