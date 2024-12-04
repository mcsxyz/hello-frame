import { useEffect, useState } from 'react'
import sdk, { type FrameContext } from '@farcaster/frame-sdk'
import { useAccount } from 'wagmi'
import { RainbowButton } from "@/components/ui/rainbow-button"

export default function Frame() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false)
  const [context, setContext] = useState<FrameContext>()
  const { address } = useAccount()

  // Placeholder values for prototyping
  const PLACEHOLDER_USERNAME = 'eth.eth'
  const PLACEHOLDER_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678'

  const displayUsername = context?.user?.username || PLACEHOLDER_USERNAME
  const displayAddress = address || PLACEHOLDER_ADDRESS

  const isDevelopment = !context?.user?.username || !address

  useEffect(() => {
    const load = async () => {
      setContext(await sdk.context)
      sdk.actions.ready()
    }
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true)
      load()
    }
  }, [isSDKLoaded])

  if (!isSDKLoaded) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-[300px] mx-auto py-4 px-2 text-center">
      {isDevelopment && (
        <div className="bg-yellow-100 border-yellow-400 border text-yellow-700 px-4 py-2 rounded mb-4 text-sm">
          offchain
        </div>
      )}
      
      <h1 className="text-2xl font-bold mb-8">Frames Template</h1>
      
      <div className="text-sm mb-2">
        Username: @{displayUsername}
      </div>
      
      <div className="text-sm">
        Wallet: {displayAddress.slice(0, 5)}...{displayAddress.slice(-5)}
      </div>

      <RainbowButton className="mt-8">Sublimate Your Narrative</RainbowButton>
    </div>
  )
}