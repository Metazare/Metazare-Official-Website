import React from 'react';
import ReactDOM from 'react-dom/client';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './Hooks/useAuth';
import './Styles/main.scss'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<App/>}/>
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);


// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AuthProvider>
//         <Routes>
//           <Route path="/*" element={<App/>}/>
//         </Routes>
//       </AuthProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();