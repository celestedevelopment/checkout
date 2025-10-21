'use client';

import { useT } from '@/app/hooks/useTranslation';

interface EmailInputProps {
  email: string;
  onEmailChange: (email: string) => void;
  onVerificationStart: () => void;
  sendVerificationCode: (email: string) => Promise<{ success: boolean }>;
}

export default function EmailInput({ 
  email, 
  onEmailChange, 
  onVerificationStart, 
  sendVerificationCode 
}: EmailInputProps) {
  const t = useT();
  
  const validateAndSendCode = async (emailValue: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|it|org|net|edu|gov|co|uk|de|fr|es|ca|au|jp|br|in|ru|cn|mx|nl|se|no|dk|fi|pl|cz|hu|ro|bg|hr|si|sk|lt|lv|ee|ie|pt|gr|tr|il|za|eg|ma|ng|ke|gh|tz|ug|zw|bw|mw|zm|ao|mz|mg|mu|sc|re|yt|km|dj|so|et|er|sd|ly|tn|dz|mr|ml|bf|ne|td|cf|cm|gq|ga|cg|cd|bi|rw|ug|ke|tz|mw|zm|zw|bw|na|za|ls|sz|mg|mu|sc|re|yt|km|dj|so|et|er|sd|ss|ly|tn|dz|mr|ml|bf|ne|td|cf|cm|gq|ga|cg|cd|bi|rw)$/;
    
    if (emailRegex.test(emailValue)) {
      await sendVerificationCode(emailValue);
      onVerificationStart();
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 select-none">
        {t('emailAddress', 'Email address')}
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => {
          const emailValue = e.target.value;
          onEmailChange(emailValue);
          
          // Controlla automaticamente se l'email è valida con un dominio completo
          const emailRegex = /^[^\s@]+@[^\s@]+\.(com|it|org|net|edu|gov|co|uk|de|fr|es|ca|au|jp|br|in|ru|cn|mx|nl|se|no|dk|fi|pl|cz|hu|ro|bg|hr|si|sk|lt|lv|ee|ie|pt|gr|tr|il|za|eg|ma|ng|ke|gh|tz|ug|zw|bw|mw|zm|ao|mz|mg|mu|sc|re|yt|km|dj|so|et|er|sd|ly|tn|dz|mr|ml|bf|ne|td|cf|cm|gq|ga|cg|cd|bi|rw|ug|ke|tz|mw|zm|zw|bw|na|za|ls|sz|mg|mu|sc|re|yt|km|dj|so|et|er|sd|ss|ly|tn|dz|mr|ml|bf|ne|td|cf|cm|gq|ga|cg|cd|bi|rw)$/;
          
          if (emailRegex.test(emailValue)) {
            setTimeout(async () => {
              await validateAndSendCode(emailValue);
            }, 800); // Delay leggermente più lungo per permettere di completare la digitazione
          }
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            validateAndSendCode(email);
          }
        }}
        onBlur={() => {
          // Anche quando l'utente esce dal campo, controlla se l'email è valida
          validateAndSendCode(email);
        }}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-black"
        placeholder=""
      />
    </div>
  );
}