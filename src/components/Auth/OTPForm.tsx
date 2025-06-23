/* eslint-disable react-hooks/exhaustive-deps */
import {useForm, useWatch} from 'react-hook-form';
import {Text, View} from 'react-native';
import {OTPFormInputs} from '../../types/formType';
import PrimaryButton from '../buttons/PrimaryButton';
// import InputTextField from '../inputs/InputTextField';
import TextButton from '../buttons/TextButton';
// import {RootStackNavProp} from '../../types/navigationType';
// import {useNavigation} from '@react-navigation/native';
import OtpInputField from '../inputs/OtpInputField';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavProp} from '../../types/navigationType';
import React, {useEffect} from 'react';
import {cn} from '../../common/cn';
import {
  useRequestResetPasswordMutation,
  useVarifyOTPMutation,
} from '../../features/auth/authSlice';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';

const CountdownTimer = React.memo(({secondsLeft}: {secondsLeft: number}) => {
  if (secondsLeft === 0) {
    return null;
  }

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <Text className="text-[11px] font-SF font-normal w-24 ml-1 text-pink">
      {minutes}:{seconds.toString().padStart(2, '0')}
    </Text>
  );
});

const OTForm = ({email, expires_in}: {email: string; expires_in: number}) => {
  const navigation = useNavigation<RootStackNavProp<'ResetPassword'>>();
  const [verifyOtp, {isLoading}] = useVarifyOTPMutation();
  const [requestResetPassword, {isLoading: requestLoading}] =
    useRequestResetPasswordMutation();
  const {handleSubmit, control, reset, setError} = useForm<OTPFormInputs>({
    mode: 'onTouched',
    defaultValues: {
      otp: '',
    },
  });

  const otpValue = useWatch({
    control,
    name: 'otp',
  });

  const [secondsLeft, setSecondsLeft] = React.useState(expires_in || 300);

  // Countdown effect
  React.useEffect(() => {
    if (secondsLeft === 0) {
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleResend = async () => {
    try {
      const result = await requestResetPassword({email: email});
      if (result?.error) {
        if ('data' in (result?.error || {})) {
          let errMsg = (
            result.error as FetchBaseQueryError & {data: {detail?: string}}
          ).data?.detail;
          setError('otp', {
            type: 'manual',
            message: errMsg,
          });
        }
        return;
      }
      if (result?.data) {
        // Here you would actually trigger resend OTP API call
        // setSecondsLeft(0); // restart timer
      }
    } catch (err: unknown) {
    }
  };

  const onSubmit = async (data: OTPFormInputs) => {
    const payload = {
      email: email,
      otp: data.otp,
    };
    try {
      const result = await verifyOtp(payload);
      if (result?.error) {
        if ('data' in (result?.error || {})) {
          let errMsg = (
            result.error as FetchBaseQueryError & {
              data: {detail: string};
            }
          ).data?.detail;
          setError('otp', {
            type: 'manual',
            message: errMsg,
          });
        }
        return;
      }
      if (result?.data && result?.data?.otp_verified) {
        reset();
        navigation.replace('ResetPassword', {email: email});
      }
    } catch (err: unknown) {
    }
  };

  // Auto-submit when OTP has 4 digits
  useEffect(() => {
    if (otpValue?.length === 4) {
      handleSubmit(onSubmit)();
    }
  }, [otpValue]);

  return (
    <View className="">
      <Text className="font-DMSerRegular mb-3 text-textColor text-xl font-normal text-center">
        {'Forget Password'}
      </Text>
      <Text className="font-SF mb-1 text-sndTextColor text-[13px] font-normal text-center">
        {`Input the verification code that already sent to ${email || ''}`}
      </Text>
      <View className="py-3">
        <OtpInputField
          name="otp"
          control={control}
          rules={{
            required: 'OTP is required',
            pattern: {
              value: /^\d{4}$/,
              message: 'OTP is invalid',
            },
          }}
        />
        <PrimaryButton
          title={'Confirm'}
          className={''}
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}
        />
        <View className="flex-row justify-center items-center mt-2">
          <Text className="text-[11px] font-SF font-normal text-sndTextColor">
            {'Didn’t receive email? '}
          </Text>
          <TextButton
            title={'Resend'}
            loading={requestLoading}
            disabled={secondsLeft !== 0}
            onPress={handleResend}
            btnTextColor={secondsLeft !== 0 ? 'text-pink' : 'text-textColor'}
            className={cn(
              'text-[11px] font-SF font-normal text-center',
              secondsLeft !== 0 ? '' : 'underline',
            )}
            btnClassName="self-center"
          />
          <CountdownTimer secondsLeft={secondsLeft} />
        </View>
      </View>
    </View>
  );
};

export default OTForm;
