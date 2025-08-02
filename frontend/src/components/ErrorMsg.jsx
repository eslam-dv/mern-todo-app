import { useEffect, useState } from "react";

const ErrorMsg = ({ isError, error, message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timer;
    if (isError) {
      setIsVisible(true);

      timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    } else {
      setIsVisible(false);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isError]);

  if (isVisible)
    return <div className="text-red-500 mb-3">{error.message || message}</div>;
};

export default ErrorMsg;
