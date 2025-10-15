
import { useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {

    const {navigate, token, backendUrl } = useCart()
    const [searchParams, setSearchParams]= useSearchParams()

     const success = searchParams.get('success')
     const orderId = searchParams.get('orderId')

    const verifyPayment = async ()=>{
          try {
            if(!token){

                return null
            }
            const response = await axios.post(backendUrl + "/api/orders/verifyStripe",{success,orderId},{headers:{token}})
            if(response.data.success){
                // Cartdata will be empty
                navigate('/orders')
            }else{
                navigate('/cart')
            }
          } catch (error) {
            console.log(error);
            toast.error(error.message)
            
          }
    }

    useEffect(()=>{
     verifyPayment()
    },[token])

  return (
    <div>

      
    </div>
  )
}

export default Verify
