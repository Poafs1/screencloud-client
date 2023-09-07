import { ReactElement, useMemo, useState } from 'react';
import Layout from '../layouts';
import { CONSTANTS } from '../constants';
import Button, { handleDisabledButton } from '../components/buttons/button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputForm from '../components/forms/inputForm/v1';
import Link from 'next/link';
import { IAuthInput } from '../interfaces/auth';
import FormHero from '../components/templates/formHero';
import axios from 'axios';
import { SERVER } from '../configs';
import Table from '../components/lists/table';
import { INotes, IWithdrawInput } from '../interfaces/withdraw';
import { mergeWith, isNumber } from 'lodash';
import classNames from 'classnames';

function Home(): ReactElement {
  const [isActivated, setIsActivated] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [isOverdraft, setIsOverdraft] = useState(false);
  const [withdrawNotes, setWithdrawNotes] = useState<INotes>({
    '5': 0,
    '10': 0,
    '20': 0,
  });

  const balanceTableHeaders = useMemo(
    () => [
      {
        title: 'Note',
        id: 'note',
      },
      {
        title: 'Amount',
        id: 'amount',
      },
    ],
    [],
  );

  const balanceTableData = useMemo(
    () =>
      Object.entries(withdrawNotes).map(([key, value]) => {
        return {
          id: `balance-data-${key}`,
          note: key,
          amount: value,
        };
      }),
    [withdrawNotes],
  );

  const balanceTableFooter = useMemo(
    () => [
      {
        id: 'balance-total-amount',
        label: 'Total',
        value: `£${Object.entries(withdrawNotes || {}).reduce((acc, [key, value]) => acc + Number(key) * value, 0)}`,
      },
    ],
    [withdrawNotes],
  );

  const authForm = useFormik({
    initialValues: {
      pin: '',
    },
    validationSchema: Yup.object({
      pin: Yup.string().required('Required'),
    }),
    onSubmit: async (values: IAuthInput) => onAuthentication(values),
  });

  const withdrawForm = useFormik({
    initialValues: {
      amount: 0,
    },
    validationSchema: Yup.object({
      amount: Yup.number().required('Required'),
    }),
    onSubmit: async (values: Omit<IWithdrawInput, 'pin'>) => onWithdraw(values),
  });

  const onAuthentication = async (values: IAuthInput) => {
    const { pin } = values;

    const res = await axios
      .post(`${SERVER}/api/core/auth`, {
        pin,
      })
      .catch(() => {
        authForm.setErrors({
          pin: 'Something went wrong, please check your PIN',
        });

        return;
      });

    if (!res || res.status !== 201) {
      return;
    }

    const { currentBalance: currentBalanceData } = res.data;

    setCurrentBalance(currentBalanceData);
    setIsActivated(true);
  };

  const onWithdraw = async (values: Omit<IWithdrawInput, 'pin'>) => {
    const { amount } = values;

    const body = {
      amount,
      pin: authForm.values.pin,
    };

    const res = await axios.post(`${SERVER}/api/core/withdraw`, body).catch(() => {
      withdrawForm.setErrors({
        amount: 'Something went wrong, please try again later',
      });

      return null;
    });

    if (!res || res.status !== 201) {
      return null;
    }

    const { notes: notesData, isOverdraft: isOverdraftData, currentBalance: currentBalanceData } = res.data;

    const mergeNotes = mergeWith({}, withdrawNotes, notesData, (value1, value2) => {
      if (isNumber(value1) && isNumber(value2)) {
        return value1 + value2;
      }

      return undefined;
    });

    setWithdrawNotes(mergeNotes);
    setIsOverdraft(isOverdraftData);
    setCurrentBalance(currentBalanceData);

    withdrawForm.resetForm();
  };

  return (
    <FormHero>
      {isActivated ? (
        <>
          <div>
            <h2 className='mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900'>Withdraw Transaction</h2>
            <p className='mt-2 text-sm leading-6 text-gray-500'>
              {isOverdraft ? 'Your credit balance is overdraft' : 'Your credit balance:'}
              <br />
              <span
                className={classNames('font-semibold text-2xl', isOverdraft ? 'text-danger-400' : 'text-primary-400')}>
                {currentBalance}£
              </span>
            </p>
          </div>
          <form onSubmit={withdrawForm.handleSubmit} className='space-y-8'>
            <InputForm
              label='Amount'
              name='amount'
              formik={withdrawForm}
              type='number'
              placeholder='0.0'
              currency={{
                sign: '£',
                suffix: 'EUR',
              }}
            />
            <Button label='Withdraw' disabled={handleDisabledButton(withdrawForm)} buttonWidth='full' type='submit' />
          </form>
          <Table headers={balanceTableHeaders} data={balanceTableData} footer={balanceTableFooter} />
        </>
      ) : (
        <>
          <div>
            <h2 className='mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900'>
              Welcome to ScreenCloud ATM
            </h2>
            <p className='mt-2 text-sm leading-6 text-gray-500'>
              New Joiner?{' '}
              <Link href={CONSTANTS.website} className='font-semibold text-primary-400 hover:text-primary-500'>
                Learn more about ScreenCloud
              </Link>
            </p>
          </div>
          <form onSubmit={authForm.handleSubmit} className='space-y-8'>
            <InputForm label='PIN' name='pin' formik={authForm} type='text' placeholder='Enter your PIN' />
            <Button label='Next' disabled={handleDisabledButton(authForm)} buttonWidth='full' type='submit' />
          </form>
        </>
      )}
    </FormHero>
  );
}

const HOCHome: any = Home;

HOCHome.getLayout = function GetLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default HOCHome;
