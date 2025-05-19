"use client";

import React, { useEffect, useState } from "react";

type SuccessModalProps = {
  message: string;
};

const SuccessModal: React.FC<SuccessModalProps> = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow transition-opacity duration-300">
      <p>{message}</p>
    </div>
  );
};

export default SuccessModal;
