import classes from './Navbar.module.css'
import { NavLink, Link} from 'react-router-dom'
import AuthContext from '../Context/AuthContext';
import { useContext } from 'react';
import {FaUserCircle } from 'react-icons/fa';




const Navbar = (props) => {
    const ctx=useContext(AuthContext)

  
    return (
      <div className={classes.navbar}>
        <div className={classes['logo-name']}>
          <p className={classes.Brand} href="#home">ExpenseTracker</p>
        </div>
        <div className={classes.btn}>
          <div>
            {!ctx.isLoggedIn && <li className={classes.list}>
              <NavLink to="/login" className={classes.loginBtn}>Login</NavLink>
            </li>}
            {ctx.isLoggedIn && <li className={classes.list}>
              <NavLink to="/login"  className={classes.loginBtn} onClick={ctx.onLogout} exact>Logout</NavLink>
            </li>}
          </div>
          {ctx.isLoggedIn &&
            <div className={classes.userProfile}>
              <FaUserCircle className={classes.userIcon} onClick={props.showProfile}/>
              <p>Your profile is incomplete. </p>
              <button className={classes.userBtn}><Link to='/update'>Complete Now. </Link></button>
            </div>
          }
        </div>
      </div>
    );
  };

export default Navbar
