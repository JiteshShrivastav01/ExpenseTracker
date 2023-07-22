import classes from './Navbar.module.css'
import { NavLink, Link} from 'react-router-dom'
import { AuthActions } from '../../store'
import {FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';




const Navbar = (props) => {
    // const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const isLoggedIn = useSelector(state =>state.auth.isLoggedIn)

  
    return (
      <div className={classes.navbar}>
        <div className={classes['logo-name']}>
          <p className={classes.Brand} href="#home">ExpenseTracker</p>
        </div>
        <div className={classes.btn}>
          <div>
            {!isLoggedIn && <li className={classes.list}>
              <NavLink to="/login" className={classes.loginBtn}>Login</NavLink>
            </li>}
            {isLoggedIn && <li className={classes.list}>
              <NavLink to="/login"  className={classes.loginBtn} onClick={AuthActions.logout} exact>Logout</NavLink>
            </li>}
          </div>
          {isLoggedIn &&
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
