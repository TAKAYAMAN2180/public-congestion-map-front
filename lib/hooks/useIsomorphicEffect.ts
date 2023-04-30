import { useEffect, useLayoutEffect } from 'react'

//Warning: useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial
// , non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See https://reactjs.org/link/uselayou
// teffect-ssr for common fixes.
//上記のエラーを回避するために利用

export const useIsomorphicEffect = () => {
    return typeof window !== 'undefined' ? useLayoutEffect : useEffect
}