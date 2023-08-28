import * as admin from "firebase-admin";

/**
 * Parser가 가져오는 정보
 */
export type ProductInfo = {
  sitename: string;
  title: string;
  originPrice: string;
  totalPrice: string;
  thumbnailURL: string;
  isRocketDelivery: boolean;
  deliveryFee: number;
  options: Option[];
  optionPrice: OptionPrice[];
};

export type Option = {
  optionTitle: string;
  /**
   *  "independent" OR "dependent" OR undefined
   * 독립형 옵션인지 종속형 옵션인지 구분
   */
  type?: string;
  attributes: Array<{
    attributeId: string;
    name: string;
    optionPrice: number;
    selected: boolean;
    imageURL?: string;
    dependentOptionTitle?: string;
  }>;
};

export type OptionPrice = {
  priceId: string;
  price: number;
};
export type OptionAttribute = {
  attributeId: string;
  name: string;
  /**
   * 옵션에 의해 변경되는 금액
   */
  optionPrice: number;
  selected: boolean;
  imageURL?: string;
  dependentOptionTitle?: string;
};
/**
 * 클라이언트가 구매요청을 보내는 데이터의 구성요소
 * DB와 일대일 대응이 아님.
 */
export type Order = {
  orderId: string;
  userUid: string;
  requestTime: admin.firestore.Timestamp;
  productInfo: ProductInfo[];
  status: string;
  expectedPrice: number;
  totalPrice?: number;
  clientComments?: string;
};
