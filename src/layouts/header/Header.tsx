import Sidebar from "./Sidebar";
import Logo from '@/assets/imgs/logo.png';
import UserLogged from "./UserLogged";

const Header = () => {
  return (
    <div className='header h-10 px-2 py-1 flex bg-indigo-1000 justify-between'>
      <div className="flex">
        <div className='mr-10'>
          <img src={Logo} className='h-full' />
        </div>
        <Sidebar />
      </div>
      <UserLogged />
    </div>
  )
}
export default Header;