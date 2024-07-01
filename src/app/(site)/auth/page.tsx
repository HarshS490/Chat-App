import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import AuthForm from "./AuthForm";

type Props = {};

export default function page({}: Props) {
  return (
    <AuthForm/>
  );
}
