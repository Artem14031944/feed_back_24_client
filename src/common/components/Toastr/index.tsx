import React from 'react';
import { ToastPosition, Toaster } from 'react-hot-toast';
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
            background: '#fb9090',
            borderColor: '#fb9090'
          },
          icon: ''
        },
        error: {
          style: {
            color: 'red',
            background: '#f1c0c0',
            borderColor: 'red'
          },
          icon: ''
        },
      }}
    />
  );
};