import {useLocation} from 'react-router-dom';

const Header = (props) => {
       const location = useLocation()
       return (
              <header className="header">
                 <h1>{props.tit}</h1>    
                 {location.pathname === '/' && <button style={{ backgroundColor :props.show?"Red":"Black"}}className="btn" onClick={props.onAdd}>{props.show ?"Close":"Add"}</button>}
              </header>
       )
}

export default Header
