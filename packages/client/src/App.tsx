import { useEffect, useState } from 'react';
import { Button } from './components/ui/button';

function App() {
   const [message, setMessage] = useState('');

   useEffect(() => {
      fetch('/api/hello')
         .then((response) => response.json())
         .then((data) => setMessage(data.message));
   }, []);
   return (
      <div className="p-4">
         <h1 className="font-bold text-3xl">
            R3k5 Development Server Frontend
         </h1>
         <p>{message}</p>
         <Button>Click Me</Button>
      </div>
   );
}

export default App;
