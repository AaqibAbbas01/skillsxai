declare module 'paytmchecksum' {
  const PaytmChecksum: {
    generateSignature(
      params: string | Record<string, string>,
      key: string
    ): Promise<string>
    verifySignature(
      params: string | Record<string, string>,
      key: string,
      checksum: string
    ): Promise<boolean>
  }
  export default PaytmChecksum
}
