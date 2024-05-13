import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { zPad } from "../../../utils/number";

type TResendCodeProps = {
  isLoading?: boolean;
  delay?: number;
  onResendCode: (successCallback: any, errorCallback: any) => void;
  resendSuccessCallback: (callback: any) => void;
  resendErrorCallback: (callback: any) => void;
};

export const ResendCode: FC<TResendCodeProps> = ({ isLoading, delay = 30, onResendCode, resendSuccessCallback, resendErrorCallback }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'twoFactorAuthenticationScreen' });
  const [sending, setSending] = useState(false);

  const timerDuration = delay;
  const [timer, setTimer] = useState(timerDuration);
  const id = useRef<any>();
  const clear = () => {
    window.clearInterval(id.current);
  };
  const initTimer = () => {
    id.current = window.setInterval(() => {
      setTimer((time) => time - 1);
    }, 1000);
  }

  const resetTimer = () => {
    clear();
    setTimer(timerDuration);
    initTimer();
  }

  useEffect(() => {
    initTimer();
    return () => clear();
  }, []);

  useEffect(() => {
    if (timer === 0) {
      clear();
    }
  }, [timer]);

  const handleResendCode = () => {
    if (timer !== 0 || isLoading) {
      return;
    }
    onResendCode?.(() => {
      resendSuccessCallback?.(() => {
        resetTimer();
      });
    }, () => {
      resendErrorCallback?.(() => {
        // Do nothing
      });
    })
  }

  return (
    <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
      <p className="w-full mt-4 text-center text-sm text-gray-500 sm:mt-0">
        {t("code_not_received")}{" "}
        <span className={`${timer === 0 && !isLoading ? 'text-accent-blue-bright cursor-pointer' : 'text-gray-400'} font-bold`} onClick={handleResendCode}>
          {t("resend_code")}
        </span>
        <span className={`pl-2${timer === 0 ? ' hidden' : ''}`}>
          <>&bull;</>
          <span className="ml-2 font-bold text-black">{`${Math.floor(timer / 60)}:${zPad(timer % 60, 2)}`}</span>
        </span>
      </p>
    </div>
  );
}
