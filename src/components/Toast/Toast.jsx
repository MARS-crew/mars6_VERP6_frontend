import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const Toast = () => {
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleToast = (event) => {
      setMessage(event.detail.message);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    };

    window.addEventListener('showToast', handleToast);
    return () => {
      window.removeEventListener('showToast', handleToast);
    };
  }, []);

  if (!show) return null;

  return createPortal(
    <div className="fixed top-10 right-10 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg left-[50%] right-[35%]">
      {message}
    </div>,
    document.body
  );
};

export default Toast; 