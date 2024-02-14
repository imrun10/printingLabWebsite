"use client";
import React from "react";
import Header from "@/components/Header";
import { Button, Typography, Card, CardContent } from "@mui/joy";
import Image from "next/image";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Link from "next/link";
import Footer from "@/components/footer";
import { send } from "process";
import { sendEmail } from "@/utils/sendEmai";
import { useEffect } from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";

import "./globals.css";


export default function DefaultLayout(){

  // reroute to home immediately
  useEffect(() => {
    window.location.href = "/Home";
  }, []);
}