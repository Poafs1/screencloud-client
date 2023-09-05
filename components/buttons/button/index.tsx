import classNames from 'classnames';
import { FormikProps } from 'formik';
import Link from 'next/link';
import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  label?: string;
  link?: string;
  buttonWidth?: 'full' | 'auto';
  appearance?: 'primary' | 'secondary';
}

const Button = (props: IButtonProps) => {
  const { leadingIcon, trailingIcon, label, onClick, link, disabled, buttonWidth, type, form, appearance } = props;

  const renderAppearance = () => {
    if (appearance === 'primary')
      return classNames(disabled ? 'bg-gray-200 text-gray-400' : 'bg-primary-400 text-gray-900');

    if (appearance === 'secondary') return 'bg-white border border-gray-300 text-gray-900';
  };

  const renderButton = () => {
    return (
      <div
        className={classNames(
          'flex items-center justify-center space-x-2 rounded-lg py-2.5 px-4 text-sm',
          disabled ? 'text-black-200' : '',
          renderAppearance(),
        )}>
        {leadingIcon}
        {label && <span className='flew-grow font-bold'>{label}</span>}
        {trailingIcon}
      </div>
    );
  };

  if (link) {
    return (
      <Link href={link} className='block'>
        {renderButton()}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      form={form}
      className={classNames(buttonWidth ? `w-${buttonWidth}` : 'w-full')}>
      {renderButton()}
    </button>
  );
};

Button.defaultProps = {
  appearance: 'primary',
  buttonWidth: 'auto',
};

export const handleDisabledButton = (formik: FormikProps<any>) => !(formik.dirty && formik.isValid);

export default Button;
