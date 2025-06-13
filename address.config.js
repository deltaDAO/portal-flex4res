const PONTUSX_ADDRESSES = require('./pontusxAddresses.json')

module.exports = {
  whitelists: {
    'nft.owner': [
      '0x4A806a4851472F7cFd579d3FF5465F03c3c2B5d4',
      '0x21CF19e1FaF3A62f82B432f82152e8c5C0FdBdaF',
      '0x9dfbda23b65efB1c836828D74a96eB8528A60f3C',
      '0xb2AF8b92bFaC5299Cb6EDEf16150BFD1d4d26a93',
      '0x3dB4E0b1fC6072271BF51e9a0CC17E3c7C4C99f5',
      '0xDfB0A2BDC779f6053c7ee92601D867ec03A7b47c', // PTW TU Darmstadt
      '0x1cb07921EC1362c6394EEECF86959A5DB6797Afe', // Savvy
      '0x28553327C3e469a2De5D53faaE2d27C0c0Fa4d1b', // Ideko
      '0x28553327C3e469a2De5D53faaE2d27C0c0Fa4d1b', // PTW TU Darmstadt
      '0x345d301C97eb25468fDd7eDfb1B6e9C7f0B9F784', // Univsersität Siegen
      '0xEa458168651e7D254408Ea941BAf4210de1564E1', // Hans Berg
      '0x6Ec302A62ed554878b9e7862BF1bd5cdd22d03c7', // Intrasoft
      '0xA6FEd8D39cF98C6f7d4c31Da790c9c94e837c3ca', // LMS
      '0xD63fFbB727dc1Bf681F727b78b5F4C738E01f6Db', // Beia
      '0xBA87B2E7F71013Fe6561a877928EA265531B06d1', // TU Wien
      '0x9f4ceE0eBD03a1e9E4DcffaF876873d7a3e9595c', // AMIDS
      '0x6d006671dA78354C200B03eF5E58F948977362cD' // A1
    ],
    'datatokens.address': []
  },
  featured: [
    {
      title: 'Featured Service Offerings',
      assets: [
        'did:op:c524a2ad8aab175315cdbb106289114079637529af988874c1a31e9a179e4540', // ToolCondition-Algorithm - EuProGigant Validation Platform
        'did:op:291ac52240e7c422aa8e67f9369efa7b30cbdc3f494922f1b646a8091a97fdb6', // CO2-Estimate Algorithm - EuProGigant Validation Platform
        'did:op:ec6abd810b3f3d9f3cf7fbbfd3462e289ee9700f0a1ca492adaf6a8c7d0bdce7' // Workpiece 882
      ]
    }
  ],
  verifiedAddresses: PONTUSX_ADDRESSES
}
