/* ===== Account Profile===== */

import type { OptionTypeBank } from "../components/inputs/InputSearchFieldBank";
import type { ApiResponse } from "./common";

export interface AccountProfileValue {
  pkCustCustomer: string;
  cBranchCode: string;
  cSubBranchCode: string;
  cMarketingId: string;
  cMktName: string;
  cCustomerCode: string;
  cCardIdType: string;
  cCardId: string;
  cIdIssueDate: string;
  cIdExpireDate: string;
  cIssuePlace: string;
  cIssuePlaceName: string;
  cPolicyCode: string;
  cCommPackage: string;
  cCommName: string;
  cCommRate: number;
  cCustomerType: string;
  cTaxCode: string;
  cNationalCode: string;
  cCustomerName: string;
  cCustGender: string;
  cCustBirthDay: string;
  cVnFlag: number;
  cCustEmail: string;
  cCustMobile: string;
  cCustTel: string;
  cContactAddress: string;
  cResedenceAddress: string;
  cProvinceCode: string;
  cAuthenSign: string;
  cFrontCard: string;
  cBackCard: string;
  cSignImg: string;
  cFaceImg: string;
  cInternetFlag: number;
  cPhoneFlag: number;
  cMarginFlag: number;
  cIsFirstNickname: number;
  cAccountDefault: string;
  cUserName: string;
  cRankName: string;
  cAccType: string;
  cPointValue: number;
  cAvatarImg: string;
  cAvatarDefault: string;
  cBackGroundImg: string;
  cShortName: string;
  cPhoneOtp: string;
}

export type AccountProfile = Partial<AccountProfileValue>;

export type AccountProfileResponse = ApiResponse<AccountProfile>;

export type ListAccountItemValue = {
  acccode: string;
  accname: string;
  acctype: string;
  type: string;
  authen: string;
  serial: string;
  orderacc: string;
};

export type ListAccountItem = Partial<ListAccountItemValue>;

export type ListAccountResponse = ApiResponse<ListAccountItem[]>;

/* ====Change Nickname===== */

export interface ChangeNicknamePayload {
  ACTION_TYPE: string;
  PASS_WORD: string;
  NICK_NAME: string;
}

export interface ChangeNicknameForm {
  actionType: string;
  password?: string;
  nickname: string;
}

export type ChangeNicknameResponse = ApiResponse<{
  cAccountCode: string;
  cNickName: string;
  cChangeDate: string;
}>;

export type ChangeNicknameDataResponse = ChangeNicknameResponse["data"];

/* ====Change Account Info==== */

export interface ChangeAccountInfoForm {
  email: string;
  address: string;
  phoneNumber: string;
}

export type ChangeAccountInfoResponse = ApiResponse<{
  C_ACCOUNT_CODE: string;
  C_CHANGE_DATE: string;
}>;

export type ChangeAccountInfoDataResponse = ChangeAccountInfoResponse["data"];

export interface ChangeAccountInfoPayload {
  CUST_MOBILE: string;
  CUST_EMAIL: string;
  CONTACT_ADDRESS: string;
}

export type ChangeAccountInfoActionPayload = ChangeAccountInfoPayload & {
  otp: string;
};

export type ChangeAccountInfoType = "email" | "address" | "phoneNumber";

/* ====Change Avatar==== */

export interface ChangeAccountAvaPayload {
  CHANNEL: string;
  BACK_GROUND_IMG: string;
  AVATAR_IMG_DEFAULT: string;
  AVATAR_IMG: string;
}

export type ChangeAccountAvaResponse = ApiResponse<{
  cAccountCode: string;
  cAvatarImg: string;
  cBackGroundImg: string;
}>;

/* ===== Account Setting ===== */

export type AccountSettingTypes = "infor" | "accBen" | "security" | "saleId";

/* ===== Beneficiary Account ===== */

export interface AccountBenAddForm {
  accountName: string;
  accountNumber: string;
  bank: OptionTypeBank;
}

/* ==== Bank List ==== */

export interface BankDetail {
  pkBank: string;
  bankCode: string;
  bankName: string;
  shortName: string;
  englishBankName: string;
  onlineVpb: string;
  bankKey: string;
  flagForeign: number;
}

export type ListBank = ApiResponse<BankDetail[]>;

/** === List tài khoản thụ hưởng === */

export type Beneficiary = {
  pkBen: string;
  customerCode: string;
  customerName: string;
  accountType: string;
  accountTypeName: string;
  bankCode: string | null;
  bankName: string;
  shortName: string;
  bankAccountCode: string;
  bankAccountName: string | null;
  provinceCode: string | null;
  provinceName: string | null;
  bankBranchCode: string | null;
  bankBranchName: string | null;
  content: string;
  creatorCode: string;
  createTime: string;
  openDate: string;
  status: string;
  defaultFlag: number;
  active: number;
  approverCode: string | null;
};

export type ListBeneficiary = ApiResponse<Beneficiary[]>;

/* ==== Update Beneficiary ==== */

export type UpdateBeneficiaryPayload = {
  accountAuthor: string;
  accountType: string;
  bankCode: string;
  bankAccountCode: string;
  channel: string;
  defaultFlag: number;
};

export type UpdateBeneficiaryActionPayload = {
  params: UpdateBeneficiaryPayload;
  otp?: string;
};

export type UpdateBeneficiaryResponse = ApiResponse<null>;

/** ==== Delete Beneficiary ==== */
export type DeleteBeneficiaryPayload = {
  id: string;
  channel: string;
};

export type DeleteBeneficiaryActionPayload = {
  params: DeleteBeneficiaryPayload;
  otp?: string;
};

export type DeleteBeneficiaryResponse = ApiResponse<null>;

export type UpdateBeneficiaryDefPayload = {
  id: string;
};

export type UpdateBeneficiaryDefActionPayload = {
  params: UpdateBeneficiaryDefPayload;
  otp?: string;
};

export type UpdateBeneficiaryDefResponse = ApiResponse<null>;

export type CheckPassPayload = {
  passWord: string;
};

export type CheckPassResponse = ApiResponse<null>;

export type ChangePass = {
  accountCode: string;
  userCode: string;
  accountName: string;
  customerCode: string;
};

export type ChangePassPayload = {
  oldPassWord: string;
  passWord: string;
};

export type ChangePassActionPayload = {
  params: ChangePassPayload;
  otp?: string;
};

export type ChangePassResponse = ApiResponse<ChangePass>;

export type CheckCardIdPayload = {
  accountCode: string;
  cardId: string;
};

export type CheckCardId = {
  sessionId: string;
};

export type CheckCardIdResponse = ApiResponse<CheckCardId>;

/** ===== Account saleId ===== */

export type SaleInfor = {
  branchName: string;
  subBranchName: string;
  frontUserCode: string;
  frontUserName: string;
  managerCode: string;
  email: string;
  branchCode?: string;
  subBranchCode?: string;
  phone?: string;
};

export type SaleInforResponse = ApiResponse<SaleInfor>;

export type ChangeSaleIdPayload = {
  saleId: string;
};

export type ChangeSaleIdActionPayload = {
  params: ChangeSaleIdPayload;
  otp?: string;
};

export type ChangeSaleIdResponse = ApiResponse<SaleInfor>;

export type LockAccountResponse = ApiResponse<null>;
