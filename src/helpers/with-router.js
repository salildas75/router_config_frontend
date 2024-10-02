import { useRecoilValue } from "recoil"
import React from "react"
import { globalSpinner } from "../recoil/atoms"

// Higher order component for adding hooks as parameters to class component
export const withRouter = (Component) => {
  const Wrapper = (props) => {
    return (
      <Component
        globalSpinnerState={useRecoilValue(globalSpinner)}
        {...props}
      />
    )
  }

  return Wrapper
}
