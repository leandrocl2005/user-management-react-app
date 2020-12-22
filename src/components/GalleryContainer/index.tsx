import React from 'react';

import { Container } from './styles';

interface GalleryContainerProps {
  containerStyle?: object;
}

const GalleryContainer: React.FC<GalleryContainerProps> = ({
  children,
  containerStyle,
  ...rest
}) => {
  return (
    <Container style={containerStyle} {...rest}>
      {children}
    </Container>
  );
};

export default GalleryContainer;
