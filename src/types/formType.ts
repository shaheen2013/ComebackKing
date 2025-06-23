export interface LoginFormInputs {
  email: string;
  password: string;
}
export interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  role?: string;
  // confirmPassword: string;
}

export interface ForgetPasswordFormInputs {
  email: string;
}

export interface OTPFormInputs {
  otp: string;
}

export interface ResetPasswordFormInputs {
  new_password: string;
  confirm_password: string;
  email?: string;
}
