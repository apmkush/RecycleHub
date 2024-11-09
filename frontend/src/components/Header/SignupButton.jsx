import DarkMode from './DarkMode';
import { Link } from 'react-router-dom';

const SignupButton = ({isLoggedIn}) => {
    return (
        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          <DarkMode />
          {!isLoggedIn && (
            <>
              <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-md">
                Login
              </Link>
              <Link to="/signup" className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-200 shadow-md">
                Signup
              </Link>
            </>
          )}
          {isLoggedIn && (
            <>
                <Link to="/" className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-200 shadow-md">
                    Logout
                </Link>
            </>
          )} 
        </div>
    ) ; 
}

export default SignupButton ; 