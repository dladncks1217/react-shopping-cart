import { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';

import { cartListState } from '../../pages/ProductListPage';
import { ProductItemData } from '../../types';
import StepperButton from '../StepperButton/StepperButton';
import styles from './style.module.css';

interface ProductAdditionProps {
  productInformation: ProductItemData;
  closeModalByClick: () => void;
}

const ProductAddition = ({ productInformation, closeModalByClick }: ProductAdditionProps) => {
  const [cartList, setCartList] = useRecoilState(cartListState);
  const [quantity, setQuantity] = useState(1);

  const handleCartAdd = useCallback(() => {
    const compareProductId = productInformation.id;
    const selectedCartItemIndex = cartList.findIndex(
      (cartItem) => cartItem.product.id === compareProductId
    );

    if (selectedCartItemIndex === -1) {
      const newCartId = Number(new Date());
      const newCartItem = {
        id: newCartId,
        quantity,
        product: productInformation,
      };
      setCartList([...cartList, newCartItem]);
    } else {
      const updatedCartList = [...cartList];
      updatedCartList[selectedCartItemIndex] = {
        ...updatedCartList[selectedCartItemIndex],
        quantity,
      };
      setCartList(updatedCartList);
    }

    closeModalByClick();
  }, [cartList, closeModalByClick, productInformation, quantity, setCartList]);

  return (
    <div className={styles.container}>
      <h4 className={styles.header}>장바구니 담기</h4>
      <div className={styles.informationContainer}>
        <img src={productInformation.imageUrl} alt={productInformation.name} />
        <div>
          <h4 className={styles.productName}>{productInformation.name}</h4>
          <h4 className={styles.productPrice}>{productInformation.price}원</h4>
          <StepperButton count={quantity} setCount={setQuantity} />
        </div>
      </div>
      <div className={styles.totalPriceContainer}>
        <h5>합계</h5>
        <h3>{productInformation.price * quantity} 원</h3>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.cancelButton} onClick={closeModalByClick}>
          취소
        </button>
        <button className={styles.addButton} onClick={handleCartAdd}>
          장바구니 담기
        </button>
      </div>
    </div>
  );
};

export default ProductAddition;
