import React from 'react';
import toast, { ToastPosition, Toaster } from 'react-hot-toast';
import styles from './style.module.css';

type TypeToastr = {
    position?: ToastPosition,
};

export default function MyToastr(props: TypeToastr) {
  const { position } = props;

  return (
    <Toaster
      position={ position ?? "top-center"}
      toastOptions={{
        className: styles.toaster,
        success: {
            style: {
                color: 'black',
            },
            icon: ''
        },
        error: {
            style: {
                color: 'red',
            },
            icon: ''
        },
      }}
    />
  );
};