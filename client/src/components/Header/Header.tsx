import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { Role, isLoginState, isProfile } from '../../store/userInfoAtom';
import headerlogo from '../../assets/headerlogo.svg';
import profile from '../../assets/profile.svg';
import Searchbar from './Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  HaederContainer,
  LogoContainer,
  LoginContainer,
  UnLoginContainer,
} from '../../styles/Header/Haeder';
import Dropdown from './Dropdown';
import { search, searchKeyword } from '../../store/searchbarAtom';

function Header() {
  //비로그인 상태일때
  //로그인 된 상태일때 -> 1. 파트너 로그인을 한 상태일때 2. 파트너 로그인을 하지 않은 상태일 때
  //UseContainer 안 요소를 다르게 설정해줄 것
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const setKeyword = useSetRecoilState(searchKeyword);
  const profileImg = useRecoilValue(isProfile);
  const role = useRecoilValue(Role);
  const isLogin = useRecoilValue(isLoginState);
  const setIsSearch = useSetRecoilState(search);

  const navigate = useNavigate();

  const handlePartner = () => {
    if (!isLogin) {
      toast('로그인 상태에서 이용할 수 있는 서비스입니다.');
      navigate('/login');
    } else {
      navigate('/partner');
    }
  };

  const handleClick = () => {
    navigate('/home');
    setIsSearch(false);
    setKeyword('');
  };

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <HaederContainer>
      <LogoContainer>
        <img
          className="w-[140px] h-[40px] cursor-pointer"
          alt="logo"
          src={headerlogo}
          onClick={handleClick}
        />
        <Searchbar />
      </LogoContainer>
      {!isLogin ? (
        <UnLoginContainer>
          <div className="cursor-pointer mr-[50px]" onClick={handlePartner}>
            파트너 등록
          </div>
          <ToastContainer
            toastClassName={
              'h-[20px] rounded-md text-sm font-medium bg-[#EDF1F8] text-[#4771B7] text-center mt-[70px]'
            }
            position="top-right"
            limit={1}
            closeButton={false}
            autoClose={2000}
            hideProgressBar
          />
          <Link to="/login" className="mr-[50px]">
            로그인
          </Link>
          <Link
            to="/register"
            className="border border-[#4771B7] text-[#4771B7] px-[30px] py-2"
          >
            회원가입
          </Link>
        </UnLoginContainer>
      ) : (
        <LoginContainer>
          <Link
            to={role === 'PARTNER' ? '/store/add' : '/partner'}
            className="mt-1"
          >
            {role === 'PARTNER' ? '업체 등록' : '파트너 등록'}
          </Link>
          {profileImg !== 'default image' ? (
            <img
              src={profileImg}
              className="w-[30px] ml-[40px] rounded-full"
              onClick={handleDropdownClick}
            />
          ) : (
            <img
              src={profile}
              className="w-[30px] ml-[40px]"
              onClick={handleDropdownClick}
            />
          )}
          {isOpen && <Dropdown />}
        </LoginContainer>
      )}
    </HaederContainer>
  );
}

export default Header;
