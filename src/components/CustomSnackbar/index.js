import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const getTypeClass = (type) => {
  if (type === 'error') {
    return 'bg-red-700';
  } else if (type === 'warning') {
    return 'bg-yellow-700';
  } else if (type === 'success') {
    return 'bg-green-700';
  } else {
    return 'bg-blue-600';
  }
};

const getIcon = (type) => {
  if (type === 'error') {
    return <svg className="w-4 h-4 mr-2" viewBox="64 64 896 896" xmlns="http://www.w3.org/2000/svg">
             <path fill="white" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
             <path fill="white" d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" />
           </svg>
  } else if (type === 'warning') {
    return <svg className="w-4 h-4 mr-2" viewBox="64 64 896 896" xmlns="http://www.w3.org/2000/svg">
             <path fill="white" d="M464 720a48 48 0 1096 0 48 48 0 10-96 0zm16-304v184c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V416c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8zm475.7 440l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zm-783.5-27.9L512 239.9l339.8 588.2H172.2z"/>
           </svg>;
  } else if (type === 'success') {
    return <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
             <path fill="white" d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"/>
           </svg>;
  } else {
    return <svg className="w-4 h-4 mr-2" viewBox="64 64 896 896" xmlns="http://www.w3.org/2000/svg">
             <path fill="white" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"/>
             <path fill="white" d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"/>
           </svg>;
  }
}

const getPositionStyle = (anchorOrigin) => {
  if (anchorOrigin.vertical === "top") {
    if (anchorOrigin.horizontal === "left") {
      return {
        top: 24,
        left: 24,
        right: 'auto'
      };
    } else if (anchorOrigin.horizontal === "center") {
      return {
        top: 24,
        left: '50%',
        right: 'auto',
        transform: 'translateX(-50%)'
      };
    } else {
      return {
        top: 24,
        right: 24,
        left: 'auto'
      };
    }
  } else {
    if (anchorOrigin.horizontal === "left") {
      return {
        bottom: 24,
        left: 24,
        right: 'auto'
      };
    } else if (anchorOrigin.horizontal === "center") {
      return {
        bottom: 24,
        left: '50%',
        right: 'auto',
        transform: 'translateX(-50%)'
      };
    } else {
      return {
        bottom: 24,
        right: 24,
        left: 'auto'
      };
    }
  }
}

const CustomSnackbar = ({ isOpen, message, type, anchorOrigin, onClose }) => {
  const [opacity, setOpacity] = useState(0);
  const [transform, setTransform] = useState("scale(0.75, 0.5625)");
  const typeClass = getTypeClass(type);
  const positionStyle = getPositionStyle(anchorOrigin);
  const icon = getIcon(type);

  useEffect(() => {
    if (isOpen) {
      setOpacity(1);
      setTransform("none");
    } else {
      setOpacity(0);
      setTransform("scale(0.75, 0.5625)");
    }
  }, [isOpen]);


  return (
    <>
      {isOpen &&
      <div className="fixed z-50" style={positionStyle}>
        <div className={`${typeClass} text-white rounded-sm w-60 min-w-max py-2 px-4`}
             style={{
               opacity: opacity,
               transform: transform,
               transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
             }}>
          <div className="flex items-center text-white">
            {icon}
            <span className="flex-1">{message}</span>
            <button onClick={onClose}>
              <svg className="text-white w-4" xmlns="http://www.w3.org/2000/svg" width="20"
                   height="20" viewBox="0 0 20 20">
                <path
                  d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                  fill="white"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      }
    </>
  );
};

CustomSnackbar.propTypes = {
  message: PropTypes.any,
  type: PropTypes.string,
  anchorOrigin: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
};

CustomSnackbar.defaultProps = {
  message: 'Hello...',
  type: 'information',
  anchorOrigin: { vertical: "top", horizontal: "center" },
  isOpen: false
};

export default CustomSnackbar;
