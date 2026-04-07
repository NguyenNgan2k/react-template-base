export type AccountInfoRequest = {
  account: string;
};

export type AccountInfo = {
  accountCode: string;
  accountType: string;
  custCode: string;
  marketingId: string;
  marketingName: string;
  group: string;
  id: string;
  cc: string;
  accountName: string;
};

export type AccountBalanceRequest = {
  account: string;
  data: {
    symbol: string;
    price: string;
    side: "B" | "S";
  };
};

export type AccountBalance = {
  accType: string;
  sym: string;
  balance: string;
  volumeAvaiable: string;
  marginratio: string;
  accName: string;
  maxFee: string;
  cashAvaiable: string;
  ee: string;
  pp: string;
  im_ck: string;
};
