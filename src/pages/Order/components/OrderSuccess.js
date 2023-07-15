import { Link } from "react-router-dom"

export const OrderSuccess = ({data}) => {
  function generateRandomId(length) {
    let id = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters.charAt(randomIndex);
    }
    
    return id;
  }
  
  // Example usage
  
  return (
    <section className="text-xl text-center max-w-4xl mx-auto my-10 py-5 dark:text-slate-100 border dark:border-slate-700 rounded">
        <div className="my-5">
            <p className="bi bi-check-circle text-green-600 text-7xl mb-5"></p>
            <p>Thank you {data.user.name} for the order!</p>
            <p>Your Order ID: {data.id}</p>          
        </div>
        <div className="my-5">
            <p>Your order is confirmed.</p>
            <p>Please check your mail ({data.user.email}) for the eBook.</p>
            <p className="my-5">Payment ID: {generateRandomId(10)}</p>
        </div>
        <Link to="/products" type="button" className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">Continue Shopping <i className="ml-2 bi bi-cart"></i></Link>
    </section>
  )
}