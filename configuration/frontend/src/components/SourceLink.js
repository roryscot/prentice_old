import React from 'react';

const SourceLink = props => {
  /* eslint-disable jsx-a11y/anchor-has-content */
  return (
    <a href={process.env.REACT_APP_GITHUB_PAGE_BASE} target="_blank" rel="noopener noreferrer" {...props} />
  );
};

export default SourceLink;
