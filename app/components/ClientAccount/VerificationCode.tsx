'use client';

import React from 'react';

interface VerificationCodeProps {
  email: string;
  verificationCode: string[];
  onCodeChange: (code: string[]) => void;
  onBackToEmail: () => void;
  onResendCode: () => void;
  verificationError: boolean;
  codeError: string;
  resendCooldown: number;
  isResending: boolean;
  resendSuccess: boolean;
  validateCode: (code: string[]) => void;
}

export default function VerificationCode({
  email,
  verificationCode,
  onCodeChange,
  onBackToEmail,
  onResendCode,
  verificationError,
  codeError,
  resendCooldown,
  isResending,
  resendSuccess,
  validateCode
}: VerificationCodeProps) {

  const handleCodeChange = (index: number, value: string) => {
    const newCode = [...verificationCode];
    newCode[index] = value;
    onCodeChange(newCode);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
    
    // Check if code is complete and validate
    validateCode(newCode);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    // Handle backspace
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="transition-all duration-300 ease-in-out">
      <div className="mb-3 py-2 px-3 bg-gray-50 rounded-md">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">{email}</span>
          <button 
            onClick={onBackToEmail}
            className="text-gray-400 hover:text-gray-600 text-sm"
          >
            ✕
          </button>
        </div>
      </div>
      
      <div className="mb-3">
        <h3 className="text-base font-medium text-gray-900 mb-2 select-none">Enter your verification code</h3>
        <p className="text-xs text-gray-600 mb-3 select-none">
          Enter the code sent to <span className="font-medium text-gray-900 select-none">{email}</span> to securely authenticate your account.
        </p>
        
        <div className="flex gap-2 mb-3">
          {verificationCode.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              id={`code-${index}`}
              className={`w-10 h-10 text-center text-base font-medium border rounded-md focus:outline-none focus:ring-2 text-black ${
                verificationError || codeError
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
          ))}
        </div>
        
        {/* Notifica di errore unificata */}
        {(verificationError || codeError) && (
          <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center gap-2">
              <span className="text-red-500 text-sm select-none">⚠</span>
              <span className="text-red-700 text-xs font-medium select-none">
                {codeError || 'Verification code was invalid'}
              </span>
            </div>
          </div>
        )}
        
        {/* Notifica di successo per resend code */}
        {resendSuccess && (
          <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center gap-2">
              <span className="text-green-500 text-sm select-none">✓</span>
              <span className="text-green-700 text-xs font-medium select-none">Verification code has been resent to your email.</span>
            </div>
          </div>
        )}
        
        <div className="text-xs text-gray-600 mb-2 select-none">
          Didn&apos;t receive code? 
          <button 
            onClick={onResendCode}
            disabled={resendCooldown > 0 || isResending}
            className={`ml-1 select-none ${
              resendCooldown > 0 || isResending 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-blue-600 hover:underline'
            }`}
          >
            {isResending 
              ? 'Sending...' 
              : resendCooldown > 0 
                ? `Resend code (${resendCooldown}s)` 
                : 'Resend code'
            }
          </button>
        </div>
      </div>
    </div>
  );
}