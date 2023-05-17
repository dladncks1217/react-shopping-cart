import { memo, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import CartIcon from '../../assets/cart-icon.svg';
import Logo from '../../assets/logo.png';
import { cartListState } from '../../store/cart';
import styles from './style.module.css';

const Header = () => {
  const navigate = useNavigate();
  const cartItemList = useRecoilValue(cartListState);
  const headerDiv = useRef<HTMLDivElement>(null);

  const navigateToMainPage = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const navigateToCartPage = useCallback(() => {
    navigate('/cartlist');
  }, [navigate]);

  useEffect(() => {
    return () => {
      if (headerDiv.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        headerDiv.current.innerHTML =
          '<div class="added-message">장바구니에 상품을 추가했습니다.</div>';
      }
    };
  }, [cartItemList]);

  return (
    <header>
      <div ref={headerDiv}></div>
      <div className={styles.container}>
        <img src={Logo} alt="logo" className={styles.logo} onClick={navigateToMainPage} />
        <button type="button">
          {cartItemList.length > 0 && (
            <span className={styles.cartItemCount}>{cartItemList.length}</span>
          )}
          <img
            src={CartIcon}
            alt="cart icon"
            className={styles.cartIcon}
            onClick={navigateToCartPage}
          />
          <span className={styles.label}>장바구니</span>
        </button>
      </div>
    </header>
  );
};

export default memo(Header);
