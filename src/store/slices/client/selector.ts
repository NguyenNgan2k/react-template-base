import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../..";
import type { ApiStatus, Option } from "../../../types";
import type {
  AccountProfile,
  BankDetail,
  Beneficiary,
  ChangeNicknameDataResponse,
  CheckCardId,
  CheckPassResponse,
  ListAccountItem,
  SaleInfor,
} from "../../../types/client";

/** =============DATA============= */

export const selectLoginModalOpen = (state: RootState): boolean =>
  state.client.data.loginModalOpen;

export const selectForgotAccountModalOpen = (state: RootState): boolean =>
  state.client.data.forgotAccountModalOpen;

export const selectAccountProfile = (state: RootState): AccountProfile | null =>
  state.client.data.accountProfile;

export const selectListAccount = (state: RootState): ListAccountItem[] =>
  state.client.data.listAccount;

export const makeSelectAccountsWithout = () =>
  createSelector(
    [selectListAccount, (_, accountOut) => accountOut],
    (listAccount, accountOut) =>
      listAccount?.filter((acc: ListAccountItem) => acc.acccode !== accountOut),
  );

export const selectSessionExpired = (state: RootState): boolean | null =>
  state.client.data.sessionExpired;

export const selectAccountProfileStatus = (state: RootState): ApiStatus =>
  state.client.status.fetchAccountProfile;

export const selectChangeNicknameStatus = (state: RootState): ApiStatus =>
  state.client.status.fetchChangeNickname;

export const selectCheckNicknameStatus = (state: RootState): ApiStatus =>
  state.client.status.fetchCheckNickname;

export const selectCheckNickname = (
  state: RootState,
): ChangeNicknameDataResponse | null => state.client.data.checkNickname;

export const selectListBank = (state: RootState): BankDetail[] =>
  state.client.data.listBank;

export const selectListBeneficiary = (state: RootState): Beneficiary[] =>
  state.client.data.listBeneficiary;

export const selectListBeneficiaryLoading = (state: RootState): boolean =>
  state.client.status.fetchListBeneficiary.loading;

export const selectBeneficiaryOptions = createSelector(
  [selectListBeneficiary],
  (list) =>
    list.map((ben) => ({
      value: ben.bankAccountCode ?? "",
      label: ben.bankAccountName ?? "",
    })),
);

export const makeSelectBeneficiaryByCode = () =>
  createSelector([selectListBeneficiary, (_, code) => code], (listBen, code) =>
    listBen?.find((ben: Beneficiary) => ben.bankAccountCode === code),
  );

export const selectCheckPass = (state: RootState): CheckPassResponse | null =>
  state.client.data.checkPass;

export const selectCheckCardId = (state: RootState): CheckCardId | null =>
  state.client.data.checkCardId;

export const selectSaleInfor = (state: RootState): SaleInfor | null =>
  state.client.data.saleInfor;

/** =====================STATUS=================== */

export const selectFectchAccountInfoStatus = (state: RootState): ApiStatus =>
  state.client.status.fetchChangeAccountInfo;

export const selectFectchAccountAvaStatus = (state: RootState): ApiStatus =>
  state.client.status.fetchChangeAccountAva;

export const selectListBankStatus = (state: RootState): ApiStatus =>
  state.client.status.fetchListBank;

export const selectUpdateBeneficiaryStatus = (state: RootState): ApiStatus =>
  state.client.status.fetchUpdateBeneficiary;

export const selectUpdateBeneficiaryDefStatus = (state: RootState): ApiStatus =>
  state.client.status.fetchUpdateBeneficiaryDef;

export const selectListBeneficiaryStatus = (state: RootState): ApiStatus =>
  state.client.status.fetchListBeneficiary;

export const selectDeleteBeneficiaryStatus = (state: RootState): ApiStatus =>
  state.client.status.fetchDeleteBeneficiary;

export const selectCheckPassStatus = (state: RootState): ApiStatus =>
  state.client.status.fetchCheckPass;

export const selectChangePassStatus = (state: RootState): ApiStatus =>
  state.client.status.fetchChangePass;

export const selectCheckCardIdStatus = (state: RootState): ApiStatus =>
  state.client.status.fetchCheckCardId;

export const selectSaleInforStatus = (state: RootState): ApiStatus =>
  state.client.status.fetchSaleInfor;

export const selectChangeSaleIdStatus = (state: RootState): ApiStatus =>
  state.client.status.fetchChangeSaleId;

export const selectSelectedAccount = (state: RootState): string | null =>
  state.client.data.selectedAccount;
