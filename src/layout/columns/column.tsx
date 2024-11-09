import React, { ReactNode, CSSProperties } from 'react';

interface Props {
  children: ReactNode;
  flex?: CSSProperties['flex'];
  alignSelf?: CSSProperties['alignSelf'];
  className?: string;
  style?: CSSProperties;
}

export const Column: React.FC<Props> = ({ children, flex = 1, alignSelf, className, style }) => {
  const columnStyle: CSSProperties = {
    flex,
    alignSelf,
    ...style,
  };

  return (
    <div className={className} style={columnStyle}>
      {children}
    </div>
  );
};