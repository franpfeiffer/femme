/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react"
import { Card } from '../Card/Card';
import { ProductosContext } from "../context/ProductoContext";
import { ProductosProvider } from "../context/ProductosProvider";
import { CarritoContext } from "../context/CarritoContext";
import { Container, Row, Col } from "react-bootstrap";
import { WhatsAppButton } from "../WhatsAppLogo/WhatsAppLogo";
import { useLocation } from 'react-router-dom';

export const CompraScreenCate = () => {
  const location = useLocation();
  const categoria = location.pathname.split('/')[2];
  return (
    <div>{categoria}</div>
  )
}
