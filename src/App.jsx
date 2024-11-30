import { useCallback, useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import generalRoutes from './routers/GeneralRoutes';
import adminRouter from './routers/AdminRoutes';
import professorRouter from './routers/ProfessorRoutes';
import userRouter from './routers/UserRoutes';
import { useSession } from './context/session-context';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const {isAuth, setIsAuth} = useSession();
  const [user, setUser] = useState(null);

  const fetchSession = useCallback(() => {
    const user = localStorage.getItem('user');

    if (user) {
      try {
        setIsLoading(true);
        const parsedUser = JSON.parse(user); // Intentar parsear el JSON
        setIsAuth(true);
        setUser(parsedUser);
        console.log(localStorage.getItem('user'));
        console.log(localStorage.getItem('accessToken'));
      } catch (e) {
        console.error("Error al parsear el usuario:", e);
        setIsAuth(false);
        setUser(null);
      }
    } else {
      setIsAuth(false);
      setUser(null);
    }
    setIsLoading(false);
  }, [isAuth]);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-screen">
        <div className="flex items-center gap-1">
          <p className="text-xs ">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isAuth) return <RouterProvider router={generalRoutes} />;

  // Redirigir a las rutas específicas según el rol del usuario
  return (
    <>
      {user && (
        <>
          {user.rol === 'Administrador' && <RouterProvider router={adminRouter} />}
          {user.rol === 'Profesor' && <RouterProvider router={professorRouter} />}
          {user.rol === 'Usuario' && <RouterProvider router={userRouter} />}
          {/* Otras rutas o lógica para roles adicionales */}
        </>
      )}
    </>
  );
}

export default App;