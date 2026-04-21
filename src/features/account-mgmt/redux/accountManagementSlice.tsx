import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  AbnormalLimit,
  AbnormalLimitRequest,
  AccountFilter,
  AccountFilterRequest,
  CollateralAssets,
  CollateralAssetsRequest,
  ListProduct,
  ListProductRequest,
  LoanableSecurities,
  LoanableSecuritiesRequest,
  MarginAccount,
  MarginAccountRequest,
  RegularAccount,
  RegularAccountRequest,
  ResourceManagement,
  ResourceManagementRequest,
  StockOwnership,
  StockOwnershipRequest,
  UbViolation,
  UbViolationRequest,
} from "../accountManagementType";

type AccountManagementState = {
  abnormalLimits: AbnormalLimit[];
  accountFilters: AccountFilter[];
  collateralAssets: CollateralAssets[];
  listProducts: ListProduct[];
  loanableSecurities: LoanableSecurities[];
  marginAccounts: MarginAccount[];
  regularAccounts: RegularAccount[];
  resourceManagements: ResourceManagement[];
  stockOwnerships: StockOwnership[];
  ubViolations: UbViolation[];
};

const initialState: AccountManagementState = {
  abnormalLimits: [],
  accountFilters: [],
  collateralAssets: [],
  listProducts: [],
  loanableSecurities: [],
  marginAccounts: [],
  regularAccounts: [],
  resourceManagements: [],
  stockOwnerships: [],
  ubViolations: [],
};

export const accountManagementSlice = createSlice({
  name: "accountManagement",
  initialState,
  reducers: {
    fetchAbnormalLimitRequest: (
      _state: AccountManagementState,
      _action: PayloadAction<AbnormalLimitRequest>,
    ) => { },
    fetchAccountFilterRequest: (
      _state: AccountManagementState,
      _action: PayloadAction<AccountFilterRequest>,
    ) => { },
    fetchCollateralAssetsRequest: (
      _state: AccountManagementState,
      _action: PayloadAction<CollateralAssetsRequest>,
    ) => { },
    fetchListProductRequest: (
      _state: AccountManagementState,
      _action: PayloadAction<ListProductRequest>,
    ) => { },
    fetchLoanableSecuritiesRequest: (
      _state: AccountManagementState,
      _action: PayloadAction<LoanableSecuritiesRequest>,
    ) => { },
    fetchResourceManagementRequest: (
      _state: AccountManagementState,
      _action: PayloadAction<ResourceManagementRequest>,
    ) => { },
    fetchRegularAccountRequest: (
      _state: AccountManagementState,
      _action: PayloadAction<RegularAccountRequest>,
    ) => { },
    fetchMarginAccountRequest: (
      _state: AccountManagementState,
      _action: PayloadAction<MarginAccountRequest>,
    ) => { },
    fetchStockOwnershipRequest: (
      _state: AccountManagementState,
      _action: PayloadAction<StockOwnershipRequest>,
    ) => { },
    fetchUbViolationRequest: (
      _state: AccountManagementState,
      _action: PayloadAction<UbViolationRequest>,
    ) => { },
    fetchAbnormalLimitSuccess: (
      state: AccountManagementState,
      action: PayloadAction<AbnormalLimit[]>,
    ) => {
      state.abnormalLimits = action.payload;
    },
    fetchAccountFilterSuccess: (
      state: AccountManagementState,
      action: PayloadAction<AccountFilter[]>,
    ) => {
      state.accountFilters = action.payload;
    },
    fetchCollateralAssetsSuccess: (
      state: AccountManagementState,
      action: PayloadAction<CollateralAssets[]>,
    ) => {
      state.collateralAssets = action.payload;
    },
    fetchListProductSuccess: (
      state: AccountManagementState,
      action: PayloadAction<ListProduct[]>,
    ) => {
      state.listProducts = action.payload;
    },
    fetchLoanableSecuritiesSuccess: (
      state: AccountManagementState,
      action: PayloadAction<LoanableSecurities[]>,
    ) => {
      state.loanableSecurities = action.payload;
    },
    fetchResourceManagementSuccess: (
      state: AccountManagementState,
      action: PayloadAction<ResourceManagement[]>,
    ) => {
      state.resourceManagements = action.payload;
    },
    fetchRegularAccountSuccess: (
      state: AccountManagementState,
      action: PayloadAction<RegularAccount[]>,
    ) => {
      state.regularAccounts = action.payload;
    },
    fetchMarginAccountSuccess: (
      state: AccountManagementState,
      action: PayloadAction<MarginAccount[]>,
    ) => {
      state.marginAccounts = action.payload;
    },
    fetchStockOwnershipSuccess: (
      state: AccountManagementState,
      action: PayloadAction<StockOwnership[]>,
    ) => {
      state.stockOwnerships = action.payload;
    },
    fetchUbViolationSuccess: (
      state: AccountManagementState,
      action: PayloadAction<UbViolation[]>,
    ) => {
      state.ubViolations = action.payload;
    },
    fetchAbnormalLimitError: () => { },
    fetchAccountFilterError: () => { },
    fetchCollateralAssetsError: () => { },
    fetchListProductError: () => { },
    fetchLoanableSecuritiesError: () => { },
    fetchResourceManagementError: () => { },
    fetchRegularAccountError: () => { },
    fetchMarginAccountError: () => { },
    fetchStockOwnershipError: () => { },
    fetchUbViolationError: () => { },
  },
});

export const {
  fetchAbnormalLimitRequest,
  fetchAbnormalLimitSuccess,
  fetchAbnormalLimitError,
  fetchAccountFilterRequest,
  fetchAccountFilterSuccess,
  fetchAccountFilterError,
  fetchCollateralAssetsRequest,
  fetchCollateralAssetsSuccess,
  fetchCollateralAssetsError,
  fetchListProductRequest,
  fetchListProductSuccess,
  fetchListProductError,
  fetchLoanableSecuritiesRequest,
  fetchLoanableSecuritiesSuccess,
  fetchLoanableSecuritiesError,
  fetchMarginAccountRequest,
  fetchMarginAccountSuccess,
  fetchMarginAccountError,
  fetchRegularAccountRequest,
  fetchRegularAccountSuccess,
  fetchRegularAccountError,
  fetchResourceManagementRequest,
  fetchResourceManagementSuccess,
  fetchResourceManagementError,
  fetchStockOwnershipRequest,
  fetchStockOwnershipSuccess,
  fetchStockOwnershipError,
  fetchUbViolationRequest,
  fetchUbViolationSuccess,
  fetchUbViolationError,
} = accountManagementSlice.actions;

export default accountManagementSlice.reducer;

export const selectAbnormalLimits = (state: {
  accountManagement: AccountManagementState;
}) => state.accountManagement.abnormalLimits;

export const selectAccountFilters = (state: {
  accountManagement: AccountManagementState;
}) => state.accountManagement.accountFilters;

export const selectCollateralAssets = (state: {
  accountManagement: AccountManagementState;
}) => state.accountManagement.collateralAssets;

export const selectListProducts = (state: {
  accountManagement: AccountManagementState;
}) => state.accountManagement.listProducts;

export const selectLoanableSecurities = (state: {
  accountManagement: AccountManagementState;
}) => state.accountManagement.loanableSecurities;

export const selectRegularAccounts = (state: {
  accountManagement: AccountManagementState;
}) => state.accountManagement.regularAccounts;

export const selectMarginAccounts = (state: {
  accountManagement: AccountManagementState;
}) => state.accountManagement.marginAccounts;

export const selectResourceManagements = (state: {
  accountManagement: AccountManagementState;
}) => state.accountManagement.resourceManagements;

export const selectStockOwnerships = (state: {
  accountManagement: AccountManagementState;
}) => state.accountManagement.stockOwnerships;

export const selectUbViolations = (state: {
  accountManagement: AccountManagementState;
}) => state.accountManagement.ubViolations;
