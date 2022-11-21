type PowerStockProps = {
  categoryId: number;
  categoryName: string;
  clickNCollectStoreCount: number;
  energyTier: number;
  useNewLabelAndIndicator: boolean;
  isLimitedQuantity: boolean;
  manufacturerName: string;
  price: number;
  primaryImage2: string;
  productId: number;
  salesArguments: string;
  shortDescription: string;
  stockCount: number;
  stockDeliveryDateConfirmed: boolean;
  stockLimitedRemaining: number;
  title: string;
  url: string;
  advertisingCampaigns: {
    campaignId: number;
    name: string;
    friendlyUrl: string;
    badgeStyle: string;
    boxText: string;
    enhancedText: boolean;
    externalUrl: string;
    urlType: string;
    hideProductPage: boolean;
    ctaButton: string;
    activeFrom: Date;
    activeTo: Date;
    priority: number;
  }[];
  breadcrumb: {
    id: number;
    name: string;
    nameSlug: string;
    sortValue: number;
  }[];
  productReview: {
    nativeAverageRating: number;
    overallAverageRating: number;
  };
  hasDescription: boolean;
  serviceCategoryId: number;
  vatPercent: number;
  modelType: number;
  priceType: number;
  barcode: string;
  eanGtin12: string;
  showSavingsAs: number;
  productImages: {
    isPrimary: boolean;
    imageType: number;
    basePath: string;
    variants: {
      filename: string;
      width: number;
      height: number;
      isTransparent: boolean;
    }[];
  }[];
  productManuals: any[];
  campaignMediaUrl: string;
  webStatus: number;
  productManufactorIdentity: string;
  warranty: number;
  webStockStatus: number;
  webStockText: string;
  webStockTextShort: string;
  webStockMeta: string;
  cncStockStatus: number;
  cncStockText: string;
  canAddToCart: boolean;
  isOnDemand: boolean;
  elguideId: string;
  isRecurringPaymentProduct: boolean;
};

const checkPowerStock = async (sku: string) => {
  const fetchedData = await fetch(
    `https://www.power.no/api/v2/products?ids=${sku}&allowWebStatus8=true`,
    {}
  );

  const data: PowerStockProps[] = await fetchedData.json();

  return data?.find((item) => item.productId === parseInt(sku, 10));
};

export { checkPowerStock };
