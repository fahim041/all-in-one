'use client';
import { RouterProvider } from 'react-router-dom';
import router from './router';

export default function Wrapper() {
  return <RouterProvider router={router} />;
}
