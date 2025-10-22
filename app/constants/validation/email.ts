// Email Validation Constants
export const EMAIL_VALIDATION = {
  // Comprehensive email regex with extensive TLD support
  REGEX: /^[^\s@]+@[^\s@]+\.(com|it|org|net|edu|gov|co|uk|de|fr|es|ca|au|jp|br|in|ru|cn|mx|nl|se|no|dk|fi|pl|cz|hu|ro|bg|hr|si|sk|lt|lv|ee|ie|pt|gr|tr|il|za|eg|ma|ng|ke|gh|tz|ug|zw|bw|mw|zm|ao|mz|mg|mu|sc|re|yt|km|dj|so|et|er|sd|ly|tn|dz|mr|ml|bf|ne|td|cf|cm|gq|ga|cg|cd|bi|rw|ug|ke|tz|mw|zm|zw|bw|na|za|ls|sz|mg|mu|sc|re|yt|km|dj|so|et|er|sd|ss|ly|tn|dz|mr|ml|bf|ne|td|cf|cm|gq|ga|cg|cd|bi|rw)$/,
  
  // Validation delay for auto-validation
  AUTO_VALIDATION_DELAY: 800, // milliseconds
} as const;

// Email validation helper function
export const validateEmail = (email: string): boolean => {
  return EMAIL_VALIDATION.REGEX.test(email);
};