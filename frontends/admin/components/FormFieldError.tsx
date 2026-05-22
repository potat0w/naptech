type FormFieldErrorProps = {
  message?: string;
};

export default function FormFieldError({ message }: FormFieldErrorProps) {
  if (!message) return null;

  return (
    <p className="mt-1 text-xs text-red-600" role="alert">
      {message}
    </p>
  );
}
