import { tokenLogos } from '@components/Header/Wallet/AddTokenList'
import { useMarketMetadata } from '@context/MarketMetadata'
import { getErrorMessage } from '@utils/onboarding'
import { addTokenToWallet } from '@utils/wallet'
import { getSupportedChainIds } from 'chains.config'
import { ReactElement, useState } from 'react'
import { toast } from 'react-toastify'
import { useAccount, useNetwork, useProvider } from 'wagmi'
import { OnboardingStep } from '..'
import content from '../../../../../content/onboarding/steps/importCustomTokens.json'
import StepBody from '../StepBody'
import StepHeader from '../StepHeader'

export default function ImportCustomTokens(): ReactElement {
  const { title, subtitle, body, image }: OnboardingStep = content

  const { address: accountId } = useAccount()
  const web3Provider = useProvider()
  const { chain } = useNetwork()
  const { approvedBaseTokens } = useMarketMetadata()

  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState(false)

  const importCustomToken = async (
    web3Provider: any,
    tokenAddress: string,
    tokenSymbol: string,
    tokenDecimals: number,
    tokenLogo?: string
  ) => {
    setLoading(true)
    try {
      if (!getSupportedChainIds().includes(chain?.id)) throw new Error()

      await addTokenToWallet(
        tokenAddress,
        tokenSymbol,
        tokenDecimals,
        tokenLogo
      )
      setCompleted(true)
    } catch (error) {
      toast.error(
        getErrorMessage({
          accountId,
          web3Provider: !!web3Provider,
          networkId: chain?.id
        })
      )
      if (error.message) console.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const actions = approvedBaseTokens?.map((token) => ({
    buttonLabel: `Import ${token.symbol} Token`,
    buttonAction: async () => {
      await importCustomToken(
        web3Provider,
        token.address,
        token.symbol,
        token.decimals,
        tokenLogos?.[token.symbol]?.url
      )
    },
    successMessage: `Successfully imported ${token.symbol} test token`,
    loading,
    completed
  }))

  return (
    <div>
      <StepHeader title={title} subtitle={subtitle} />
      <StepBody body={body} image={image} actions={actions} />
    </div>
  )
}
