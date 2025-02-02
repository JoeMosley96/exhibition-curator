

interface ErrorAlertProps {
  errors: { [key: string]: string };

  setErrors: React.Dispatch<React.SetStateAction<{ title: string; serverError: string; [key: string]: string }>>;

  errorKey: string;
}
export default function ErrorAlert({ errors, setErrors, errorKey }: ErrorAlertProps) {
  return (
    <div
      className='bg-red-100 border border-red-400 text-red-700 px-4 py-1 my-1 rounded relative'
      role='alert'>
      <strong className='font-bold'>Error! </strong>
      <span className='block sm:inline'>{errors[errorKey]}</span>
      <button
        className='absolute top-0 bottom-0 right-0 px-2'
        onClick={() => {
          setErrors((prevState) => {
            let newErrors = { ...prevState, ...errors };
            delete newErrors[errorKey];
            return {
              title: newErrors.title || '',
              serverError: newErrors.serverError || '',
            };
          });
        }}>
        X
      </button>
    </div>
  );
}
