// custom hooks



import { useEffect, useState } from 'react';


import { fetchUser } from '@/api/database/fetch';




export default function useCustomer() { // custom hook to get the customer data
    const [checkUser, setCheckUser] = useState<any>(null);
    
    useEffect(() => {
        const checkUser = async () => {
            const user = await fetchUser();
            if (user) {
              console.log("Signed in already", user);
              setCheckUser(user)
            } else {
              console.log("Not signed in");
              setCheckUser(null)

            }
          };
      
          checkUser();
        
    }, []);
    return checkUser;
}


