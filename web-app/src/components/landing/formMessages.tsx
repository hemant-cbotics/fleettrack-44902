import React from "react";

type TLandingFormMessageProps = {
  heading?: string;
  message: string;
  variant?: 'success' | 'error';
};

export const LandingFormMessage = ({ heading = '', message, variant = 'error' }: TLandingFormMessageProps) => {
  const wrapperClass = variant === 'success' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50';
  const headingClass = variant === 'success' ? 'text-green-800' : 'text-red-800';
  const messageClass = variant === 'success' ? 'text-green-700' : 'text-red-700';

  return (
    <div role="alert" className={`col-span-6 rounded border-s-4 p-4 ${wrapperClass}`}>
      {!!heading && <strong className={`block font-bold mb-2 ${headingClass}`}>{heading}</strong>}

      <p className={`text-sm ${messageClass}`}>
        {message}
      </p>
    </div>
  );
}