import React, { ReactNode, CSSProperties } from 'react';

interface Props {
  children: ReactNode;
  spacing?: string;
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  wrap?: boolean;
}

export const Rows: React.FC<Props> = ({
  children,
  spacing = '16px',
  align = 'flex-start',
  wrap = true,
}) => {
  const rowStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing,
    alignItems: align,
    flexWrap: wrap ? 'wrap' : 'nowrap',
    width: '100%',
  };

  return <div style={rowStyle}>{children}</div>;
};
