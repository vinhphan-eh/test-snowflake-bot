import { useEffect } from 'react';
import { useGetSuperAppToken } from '../../../../../common/auth/store/useSuperAppTokenStore';
import { useSessionStore } from '../../../../../common/stores/useSessionStore';
import { isEnabledForEh } from '../../../../../common/types/react-query';
import { useGetDiscountShopProductDetailQuery } from '../../../../../new-graphql/generated';
import { getProductDetailFromStore, updateProductDetailWithFreshData } from '../store/useDiscountShopStore';

export const useLoadProductDetailToStore = () => {
  const { loginProvider, token } = useGetSuperAppToken('useLoadProductDetailToStore');
  const productDetail = getProductDetailFromStore();
  const orgId = useSessionStore(state => state.currentOrgId) ?? '';
  const { data, isError, isLoading } = useGetDiscountShopProductDetailQuery(
    {
      input: {
        productCode: productDetail?.productCode ?? '',
        orgId,
      },
    },
    { enabled: !!orgId && isEnabledForEh(token, loginProvider) && !!productDetail }
  );

  useEffect(() => {
    if (data?.me?.swagStore?.discountShopProductDetails?.product?.id) {
      updateProductDetailWithFreshData(data.me.swagStore.discountShopProductDetails.product);
    }
  }, [data?.me?.swagStore?.discountShopProductDetails?.product]);

  return {
    data,
    isError,
    isLoading,
  };
};

// conditional hook pattern
export const LoadProductDetail = () => {
  useLoadProductDetailToStore();
  return null;
};
