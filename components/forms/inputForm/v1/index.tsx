import classNames from 'classnames';
import { FormikProps } from 'formik';

type InputType = 'text' | 'email' | 'password' | 'number' | 'date' | 'time';

interface ICurrencyProps {
  sign: string;
  suffix: string;
}

export interface IInputFormProps {
  formik: FormikProps<any>;
  label?: string;
  name: string;
  type: InputType;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  disabledErrorMessage?: boolean;
  currency?: ICurrencyProps;
}

const InputForm = (props: IInputFormProps) => {
  const { label, name, formik, type, placeholder, disabled, maxLength, disabledErrorMessage, currency } = props;

  return (
    <div>
      {label && (
        <label htmlFor={name} className='flex justify-between text-sm font-bold text-gray-900'>
          {label}
          {maxLength && (
            <p className='font-normal'>
              {formik.values[name]?.toString().length}/{maxLength}
            </p>
          )}
        </label>
      )}
      <div
        className={classNames(
          'border-gray-300 relative flex items-center overflow-hidden rounded-md border bg-white',
          label ? 'mt-1.5' : '',
        )}>
        {currency && (
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            <span className='text-gray-500 sm:text-sm'>{currency.sign}</span>
          </div>
        )}
        <input
          type={type}
          id={name}
          className={classNames(
            'block w-full border-0 text-base focus:outline-none focus:ring-0 placeholder:text-sm',
            currency ? 'pl-7 pr-12' : '',
          )}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          {...{
            ...formik.getFieldProps(name),
            value: formik.values[name] || '',
          }}
        />
        {currency && (
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
            <span className='text-gray-500 sm:text-sm' id='price-currency'>
              {currency.suffix}
            </span>
          </div>
        )}
      </div>
      {formik.touched[name] && formik.errors[name] && !disabledErrorMessage ? (
        <div className='mt-1.5 text-xs text-danger-600'>{formik.errors[name]?.toString()}</div>
      ) : null}
    </div>
  );
};

export default InputForm;
