import React from 'react';
import PropTypes from 'prop-types';


const MainImage = ({ src, alt }) => {
    return (
        <span className="image main">
            <hr/>
            <img src={src} alt={alt}/>
            <hr/>
        </span>
    );
};

MainImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
};


export default MainImage;