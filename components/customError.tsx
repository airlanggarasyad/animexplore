import { Alert } from "antd"
import { useState } from "react";

export default function CustomError({ msg, onClose, type }) {
  return (
    <Alert
      message={msg}
      type={type}
      closable
      onClose={onClose}
    />
  )
}