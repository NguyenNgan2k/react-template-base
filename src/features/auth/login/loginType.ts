export type LoginRequest = {
  user: string;
  password: string;
  device: "web";
};

export type LoginResponse = {
  b2: string;
  cBizUnit: string;
  cBranchCode: string;
  cDataRightGroup: string;
  cDataRightList: string;
  cFuncList: Array<string>;
  cFuncList2: Array<string>;
  cFuncRightGroup: string;
  cLevel?: string;
  cResetPwdFlag: number;
  cSubBranchCode: string;
  sessionId: string;
};

export type ChangePassRequest = {
  oldPassWord: string;
  password: string;
};

export type ChangePassResponse = {

}

export type UserData = {
  userId: string;
  b2: string;
  cBizUnit: string;
  cBranchCode: string;
  cDataRightGroup: string;
  cDataRightList: string;
  cFuncList: Array<string>;
  cFuncList2: Array<string>;
  cFuncRightGroup: string;
  cLevel?: string;
  cResetPwdFlag: number;
  cSubBranchCode: string;
  sessionId: string;
};

export type UserStatus = "forceChangePass" | "active";
